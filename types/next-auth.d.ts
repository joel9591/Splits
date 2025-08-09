
import NextAuth from "next-auth";
import { DefaultSession, DefaultUser, Profile } from "next-auth"; 
import { JWT as NextAuthJWT } from "next-auth/jwt"; 
import { GoogleProfile as GoogleProviderProfile } from "next-auth/providers/google"; 

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      provider?: string; 
    } & DefaultSession["user"];
    expires: string;
  }

  
  interface User extends DefaultUser {
    id: string;
    provider?: string; 
  }
}

declare module "next-auth/jwt" {
  interface JWT extends NextAuthJWT {
    id: string;
    provider?: string; 
    iat?: number; 
  }
}


declare module "next-auth/providers/google" {
  interface GoogleProfile extends Profile {
    picture?: string;
  }
}