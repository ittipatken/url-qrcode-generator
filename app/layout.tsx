import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import ModalProvider from '@/providers/modal-provider';
import ToastProvider from '@/providers/toast-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import { auth } from '@/auth';
import { SessionProvider } from "next-auth/react"

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.APP_URL}`),
  title: 'Docchula QR code — Custom Short Link & Analytics',
  description:
    'Docchula QR code is a free tool to shorten URLs and generate short links. Docchula QR code allow users to create custom keyword shortened link making it easy to share.',
  openGraph: {
    url: '/',
    title: 'Docchula QR code — Custom Short Link & Analytics',
    description:
      'Docchula QR code is a free tool to shorten URLs and generate short links. Docchula QR code allow users to create custom keyword shortened link making it easy to share.'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Docchula QR code — Custom Short Link & Analytics',
    description:
      'Docchula QR code is a free tool to shorten URLs and generate short links. Docchula QR code allow users to create custom keyword shortened link making it easy to share.'
  }
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth()
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <ToastProvider />
          <ModalProvider />
          <SessionProvider session={session}>
            {children}
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
