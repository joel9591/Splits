// I:\New folder-Splits\lib\auth.ts
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { Account, Profile, User as NextAuthUser } from "next-auth";
import { JWT } from "next-auth/jwt";
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
        const user = await User.findOne({ email: credentials?.email });

        if (!user) throw new Error("No user found");

        const isPasswordCorrect = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if (!isPasswordCorrect) throw new Error("Invalid credentials");

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google' && profile?.email) {
        await dbConnect();

        const googleProfile = profile as GoogleProfile; 
        
        const existingUser = await User.findOne({ email: googleProfile.email });
        
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
      await dbConnect();

      if (session?.user?.email) {
        const userInDB = await User.findOne({ email: session.user.email });
        if (userInDB) {
          session.user.id = userInDB._id.toString(); 
          session.user.provider = userInDB.provider;
          
          session.expires = new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString();
        } else {
          console.warn(`User with email ${session.user.email} not found in DB during session callback. Session may be invalid.`);
          return {
            ...session,
            user: { ...session.user, id: undefined, provider: undefined },
            expires: new Date(0).toISOString()
          };
        }
      }

      return session;
    },
  },

  session: {
    strategy: "jwt", 
    maxAge: 5 * 60 * 60,
  },
  
  jwt: {
    maxAge: 5 * 60 * 60, 
  },

  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 5 * 60 * 60
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