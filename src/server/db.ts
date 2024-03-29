import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import { env } from '../env/server.mjs';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
