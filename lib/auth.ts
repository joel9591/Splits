// I:\New folder-Splits\lib\auth.ts
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/mongodb"; // Ensure this path is correct for your DB connection
import User from "@/models/User"; // Ensure this path is correct for your User model
import bcrypt from "bcryptjs";
import { Account, Profile, User as NextAuthUser } from "next-auth"; // Explicit imports
import { JWT } from "next-auth/jwt"; // Explicit import
import { GoogleProfile } from "next-auth/providers/google"; // Explicit import for Google profile type

export const authOptions: AuthOptions = {
  ...( {
    trustHost: true,
  } as any ),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!, // Using ! asserts non-null
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect(); // Connect to DB for credentials login

        if (!credentials?.email || !credentials?.password) {
            throw new Error("Please enter both email and password.");
        }

        const user = await User.findOne({ email: credentials.email });

        if (!user) {
            throw new Error("No user found with this email.");
        }

        // Compare hashed password
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) {
            throw new Error("Invalid credentials. Please check your password.");
        }

        // Return user object compatible with NextAuth.js
        return {
          id: user._id.toString(), // Mongoose _id needs to be stringified
          name: user.name,
          email: user.email,
          image: user.image || null, // Include image if available
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google' && profile?.email) {
        await dbConnect(); // Connect to DB for Google sign-in

        const googleProfile = profile as GoogleProfile; // Type assertion

        // Check if user already exists
        let existingUser = await User.findOne({ email: googleProfile.email });

        if (!existingUser) {
          // Create new user if not found
          const newUser = await User.create({
            name: googleProfile.name || 'Google User',
            email: googleProfile.email,
            image: googleProfile.image || googleProfile.picture,
            provider: 'google',
            // password: a dummy password or mark as no-password if using only social login
            // For security, if you also have credentials, you might want to prevent sign-in
            // if the email exists but has no Google provider linked, or link it.
          });
          console.log(`Created new user from Google sign-in: ${newUser._id}`);
        } else {
          // Update existing user's provider and image if necessary
          existingUser.provider = existingUser.provider || 'google';
          existingUser.image = googleProfile.image || googleProfile.picture || existingUser.image;
          await existingUser.save();
          console.log(`Updated existing user: ${existingUser._id}`);
        }
      }
      return true; // Allow sign in
    },

    async jwt({ token, user, account }) {
      // Add user ID and provider to JWT token
      if (user) {
        token.id = user.id;
        token.provider = account?.provider || token.provider || 'credentials'; // Persist provider
      }
      return token;
    },

    async session({ session, token }) {
      // Add ID and provider from JWT token to session
      if (token.id) {
        session.user.id = token.id as string;
      }
      if (token.provider) {
        session.user.provider = token.provider as string;
      }

      // Re-fetch user data from DB for latest info (optional, but robust)
      await dbConnect();
      if (session.user?.email) {
        const userInDB = await User.findOne({ email: session.user.email });
        if (userInDB) {
          session.user.id = userInDB._id.toString();
          session.user.provider = userInDB.provider;
          session.user.name = userInDB.name;
          session.user.image = userInDB.image;
        } else {
          console.warn(`User with email ${session.user.email} not found in DB during session callback. Session may be invalid.`);
          // Invalidate session if user not found in DB
          return {
            ...session,
            user: { ...session.user, id: undefined, provider: undefined, name: undefined, image: undefined },
            expires: new Date(0).toISOString() // Expire the session immediately
          };
        }
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 5 * 60 * 60, // 5 hours
  },

  jwt: {
    maxAge: 5 * 60 * 60, // JWT token valid for 5 hours
  },

  cookies: {
    // Default cookie configuration is usually sufficient, but explicit is fine
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 5 * 60 * 60 // Max age for the cookie
      },
    },
  },

  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },

  secret: process.env.NEXTAUTH_SECRET, // MUST be set in production
  // debug: process.env.NODE_ENV === "development", // Uncomment for verbose logs in development
  
};

// Extend the session and JWT types for custom properties
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      provider?: string | null;
    };
  }
  interface User {
    id: string;
    provider?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    provider?: string | null;
  }
}