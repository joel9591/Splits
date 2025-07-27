// I:\New folder-Splits\types\next-auth.d.ts
import NextAuth from "next-auth";
import { DefaultSession, DefaultUser, Profile } from "next-auth"; // Import DefaultSession, DefaultUser, and Profile
import { JWT as NextAuthJWT } from "next-auth/jwt"; // Import JWT as NextAuthJWT to avoid naming conflict
import { GoogleProfile as GoogleProviderProfile } from "next-auth/providers/google"; // Import specific GoogleProfile type

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and `getServerSession`
   * Type for the `session` object
   */
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      provider?: string; // ADD THIS LINE for the 'provider' property
    } & DefaultSession["user"]; // Keep DefaultSession["user"] for other standard properties
    expires: string; // Ensure this is also present if you're setting it explicitly
  }

  /**
   * The `User` type defines how the user object looks.
   */
  interface User extends DefaultUser {
    id: string;
    provider?: string; // ADD THIS LINE for the 'provider' property on the User type
  }
}

declare module "next-auth/jwt" {
  /**
   * The `JWT` type defines how the JWT token looks.
   */
  interface JWT extends NextAuthJWT {
    id: string;
    provider?: string; // ADD THIS LINE for the 'provider' property on the JWT
    iat?: number; // ADD THIS LINE if you were setting 'iat' manually or accessing it
  }
}

// Extend the Profile type specifically for Google to include 'picture'
declare module "next-auth/providers/google" {
  interface GoogleProfile extends Profile {
    // Google's OAuth profile might include a 'picture' property for the user's avatar.
    picture?: string;
  }
}