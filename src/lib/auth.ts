import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { prisma } from './prisma';

export const authOptions: NextAuthOptions = {
  ...(process.env.DATABASE_URL && { adapter: PrismaAdapter(prisma) }),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user && user && process.env.DATABASE_URL) {
        try {
          // Get user data from database including credits and tier
          const dbUser = await prisma.user.findUnique({
            where: { id: user.id },
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
              credits: true,
              tier: true,
            },
          });

          if (dbUser) {
            session.user = {
              ...session.user,
              id: dbUser.id,
              credits: Number(dbUser.credits),
              tier: dbUser.tier,
            };
          }
        } catch {
          console.warn('Database not available during session callback');
        }
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account && user.email && process.env.DATABASE_URL) {
        try {
          // Auto-create user if doesn't exist
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
          });

          if (!existingUser) {
            await prisma.user.create({
              data: {
                email: user.email,
                name: user.name || '',
                image: user.image,
                credits: 0,
                tier: 'basic',
              },
            });
          }
        } catch {
          console.warn('Database not available during sign in');
        }
      }
      return true;
    },
  },
  session: {
    strategy: process.env.DATABASE_URL ? 'database' : 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
};