import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { GoogleProfile } from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter both email and password.");
        }

        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("No user found with this email.");
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Invalid credentials. Please check your password.");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image || null,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google' && profile?.email) {
        await dbConnect();
        const googleProfile = profile as GoogleProfile;

        let existingUser = await User.findOne({ email: googleProfile.email });

        if (!existingUser) {
          const newUser = await User.create({
            name: googleProfile.name || 'Google User',
            email: googleProfile.email,
            image: googleProfile.image || googleProfile.picture,
            provider: 'google',
          });
          console.log(`Created new user from Google sign-in: ${newUser._id}`);
        } else {
          existingUser.provider = existingUser.provider || 'google';
          existingUser.image = googleProfile.image || googleProfile.picture || existingUser.image;
          await existingUser.save();
          console.log(`Updated existing user: ${existingUser._id}`);
        }
      }
      return true;
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.provider = account?.provider || 'credentials';
      }
      return token;
    },

    async session({ session, token }) {
      // Simplified session callback - avoid DB queries here
      if (token.id) {
        session.user.id = token.id as string;
      }
      if (token.provider) {
        session.user.provider = token.provider as string;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours (increased from 5 hours)
  },

  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours (increased from 5 hours)
  },

  // Remove custom cookie configuration - let NextAuth handle it
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
