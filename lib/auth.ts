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
      console.log('[Auth] SignIn attempt:', {
        provider: account?.provider,
        email: profile?.email || user.email,
        userId: user.id
      });
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
      console.log('[Auth] JWT callback:', {
        userId: user?.id || token.id,
        provider: account?.provider || token.provider
      });
      
      if (user) {
        token.id = user.id;
        token.provider = account?.provider || token.provider || 'credentials'; 
      }
      return token;
    },

    async session({ session, token }) {
      console.log('[Auth] Session callback:', {
        userId: token.id,
        provider: token.provider,
        expires: session.expires
      });
      
      if (token.id) {
        session.user.id = token.id as string;
      }
      if (token.provider) {
        session.user.provider = token.provider as string;
      }

      
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
          
          return {
            ...session,
            user: { ...session.user, id: undefined, provider: undefined, name: undefined, image: undefined },
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
    name: process.env.NODE_ENV === 'production'
        ? '__Secure-next-auth.session-token'
        : 'next-auth.session-token',
    options: {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      domain: process.env.NODE_ENV === 'production'
          ? '.splits-kappa.vercel.app'
          : 'localhost',
    },
  },
},

  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },

  secret: process.env.NEXTAUTH_SECRET, 
  debug: true
};


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