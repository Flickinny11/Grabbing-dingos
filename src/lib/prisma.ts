import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

let prisma: PrismaClient;

try {
  prisma = globalForPrisma.prisma ?? new PrismaClient({
    log: ['query'],
  });
  
  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
} catch {
  // Fallback for build time when database is not available
  console.warn('Prisma client not available during build time');
  prisma = {} as PrismaClient;
}

export { prisma };