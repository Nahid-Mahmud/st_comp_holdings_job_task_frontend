import type { Metadata } from 'next';
import { Geist, Geist_Mono, Red_Hat_Display } from 'next/font/google';
import './globals.css';
import { Providers } from '@/providers';

import localFont from 'next/font/local';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const redHatDisplay = Red_Hat_Display({
  variable: '--font-red-hat-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const proximaNova = localFont({
  src: '../font/Proxima-Nova-Regular.woff',
  variable: '--font-proxima-nova',
});

export const metadata: Metadata = {
  title: 'ST Comp Holdings - Dashboard',
  description: 'Manage your services, clients, and business operations',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${redHatDisplay.variable} ${proximaNova.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
