import type { Metadata } from 'next';
import { Syne, Space_Mono, DM_Sans } from 'next/font/google';
import './globals.css';

const syne = Syne({ 
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne'
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono'
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans'
});

export const metadata: Metadata = {
  title: 'Africa & Middle East — Economic Overview',
  description: 'Economic Overview for Africa and Middle East',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${spaceMono.variable} ${dmSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
