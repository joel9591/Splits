import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import connectDB from './mongodb';
import User from '@/models/User';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          await connectDB();
          const user = await User.findOne({ email: credentials.email });

          if (!user || !user.password) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            image: user.image,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {
          await connectDB();
          let existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            existingUser = await User.create({
              name: user.name,
              email: user.email,
              image: user.image,
              provider: 'google',
            });
          }

          user.id = existingUser._id.toString();
          return true;
        } catch (error) {
          console.error('SignIn error:', error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
  },
  session: {
    strategy: 'jwt',
  },
};

export default NextAuth(authOptions);