import { type NextAuthConfig } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { env } from './env/server.mjs';
import { db } from './server/db';

import { PrismaAdapter } from '@auth/prisma-adapter';

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export default {
  secret: env.AUTH_SECRET,
  callbacks: {
    session: ({ session }) => ({
      ...session,
      user: {
        ...session.user,
        id: session.user.id,
      },
    }),
    authorized: ({ auth, request }) => {
      return !!auth?.user;
    },
  },
  pages: {
    signIn: '/signin',
  },
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Google provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
} satisfies NextAuthConfig;
