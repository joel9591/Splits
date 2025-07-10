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
    // Attach MongoDB _id to JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Already correct for both Google & Credentials
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
        }
      }

      return session;
    },
  },

  session: {
    strategy: "jwt", // ✔ good for scalability
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
