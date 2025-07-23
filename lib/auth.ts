import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // Credentials Provider (Email + Password)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({ email: credentials?.email });

        if (!user) throw new Error("No user found");

        const isPasswordCorrect = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if (!isPasswordCorrect) throw new Error("Invalid credentials");

        return {
          id: user._id.toString(), // ✅ Use MongoDB ObjectId
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  callbacks: {
    // Handle sign in and create user if they don't exist
    async signIn({ user, account, profile }) {
      // Only process Google sign-ins
      if (account?.provider === 'google' && profile?.email) {
        await dbConnect();
        
        // Check if user already exists
        const existingUser = await User.findOne({ email: profile.email });
        
        if (!existingUser) {
          // Create new user from Google profile
          const newUser = await User.create({
            name: profile.name || 'Google User',
            email: profile.email,
            image: profile.image || profile.picture,
            provider: 'google',
            // No password needed for Google auth
          });
          
          console.log(`Created new user from Google sign-in: ${newUser._id}`);
        } else {
          // Update existing user with latest Google profile info
          existingUser.provider = existingUser.provider || 'google';
          existingUser.image = profile.image || profile.picture || existingUser.image;
          await existingUser.save();
        }
      }
      
      return true; // Allow sign-in
    },
    
    // Attach MongoDB _id to JWT token and add timestamp
    async jwt({ token, user, account }) {
      // Initialize token if this is a sign-in
      if (user) {
        token.id = user.id; // Already correct for both Google & Credentials
        token.provider = account?.provider || 'credentials';
        token.iat = Math.floor(Date.now() / 1000); // issued at time
      }
      
      // Check token age and reject if too old
      const tokenAge = Math.floor(Date.now() / 1000) - (token.iat as number);
      if (tokenAge > 60 * 60) { // 1 hour in seconds
        return {}; // Empty token will trigger a sign-out
      }
      
      return token;
    },

    // Attach MongoDB _id to session from token or DB
    async session({ session, token }) {
      await dbConnect();

      if (session?.user?.email) {
        // Always fetch user from DB to get Mongo ObjectId
        const userInDB = await User.findOne({ email: session.user.email });
        if (userInDB) {
          session.user.id = userInDB._id.toString(); // ✅ Force correct ObjectId
          session.user.provider = userInDB.provider;
          
          // Add session expiry time
          session.expires = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 hour from now
        } else {
          // If user not found in DB, invalidate session
          return null;
        }
      }

      return session;
    },
  },

  session: {
    strategy: "jwt", // ✔ good for scalability
    maxAge: 60 * 60, // 1 hour in seconds
  },
  
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 // 1 hour in seconds
      },
    },
  },

  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
