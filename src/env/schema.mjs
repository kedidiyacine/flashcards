// @ts-check
import { z } from 'zod';

export const serverSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  DATABASE_URL: z
    .string()
    .url()
    .refine(
      (str) => !str.includes('YOUR_DATABASE_URL_HERE'),
      'You forgot to change the default URL'
    ),
  DATABASE_PRISMA_URL: z
    .string()
    .url()
    .refine(
      (str) => !str.includes('YOUR_DATABASE_PRISMA_URL_HERE'),
      'You forgot to change the default PRISMA URL'
    ),
  DATABASE_URL_NON_POOLING: z
    .string()
    .url()
    .refine(
      (str) => !str.includes('YOUR_DATABASE_URL_NON_POOLING_HERE'),
      'You forgot to change the default URL NON POOLING'
    ),
  DATABASE_USER: z
    .string()
    .refine(
      (str) => !str.includes('YOUR_DATABASE_USER_HERE'),
      'You forgot to change the default USER'
    ),
  DATABASE_HOST: z
    .string()
    .refine(
      (str) => !str.includes('YOUR_DATABASE_HOST_HERE'),
      'You forgot to change the default HOST'
    ),
  DATABASE_PASSWORD: z
    .string()
    .refine(
      (str) => !str.includes('YOUR_DATABASE_PASSWORD_HERE'),
      'You forgot to change the default PASSWORD'
    ),
  DATABASE_DATABASE: z
    .string()
    .refine(
      (str) => !str.includes('YOUR_DATABASE_DEPLOYER_HERE'),
      'You forgot to change the default DEPLOYER'
    ),
  AUTH_SECRET: z
    .string()
    .refine((str) => !str.includes('YOUR_AUTH_SECRET_HERE')),
  AUTH_URL: z.string().refine((str) => !str.includes('YOUR_AUTH_URL_HERE')),
  GOOGLE_CLIENT_ID: z
    .string()
    .refine((str) => !str.includes('YOUR_GOOGLE_CLIENT_ID_HERE')),
  GOOGLE_CLIENT_SECRET: z
    .string()
    .refine((str) => !str.includes('YOUR_GOOGLE_CLIENT_SECRET_HERE')),
});

/**
 * You can't destruct `process.env` as a regular object in the Next.js
 * middleware, so you have to do it manually here.
 * @type {{ [k in keyof z.infer<typeof serverSchema>]: z.infer<typeof serverSchema>[k] | undefined }}
 */
export const serverEnv = {
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_PRISMA_URL: process.env.DATABASE_PRISMA_URL,
  DATABASE_URL_NON_POOLING: process.env.DATABASE_URL_NON_POOLING,
  DATABASE_USER: process.env.DATABASE_USER,
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_DATABASE: process.env.DATABASE_DATABASE,
  AUTH_SECRET: process.env.AUTH_SECRET,
  AUTH_URL: process.env.AUTH_URL,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({
  // NEXT_PUBLIC_CLIENTVAR: z.string(),
});

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {
  // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
};
