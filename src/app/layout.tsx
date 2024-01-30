import type { Metadata } from 'next';
import { inter } from './lib/fonts';
import './styles/globals.css';

export const metadata: Metadata = {
  title: 'Flashcards Home',
  description: 'a website where you can try and create Flashcards.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
