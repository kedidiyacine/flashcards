import '@/app/styles/globals.css';

import { cookies } from 'next/headers';

import { TRPCReactProvider } from '@/trpc/react';
import { inter } from './components/fonts';

export const metadata = {
  title: 'Flashcards',
  description: 'create and play decks of flashcards',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
