import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';

import ModalProvider from '@/providers/modal-provider';
import ToastProvider from '@/providers/toast-provider';
import { ThemeProvider } from '@/providers/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'URL Shortener — Custom Short Link & Analytics',
  description:
    'URL Shortener is a free tool to shorten URLs and generate short links URL shortener allows to create a shortened link making it easy to share.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary:
            'bg-zinc-900 hover:bg-zinc-900/90 active:bg-zinc-900/90 focus:shadow-none',
          footerActionLink:
            'text-zinc-900 hover:text-zinc-900/90 active:text-zinc-900/90 focus:shadow-none',
          socialButtonsBlockButton: 'focus:shadow-none',
          formFieldInput:
            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
          formFieldInputShowPasswordButton: 'focus:shadow-none',
          userButtonPopoverCard: 'shadow-lg border border-gray-100 rounded-lg',
          userButtonTrigger: 'focus:shadow-none focus:ring ring-zinc-900/50',
          badge: 'text-white bg-zinc-900/50',
          profileSectionPrimaryButton:
            'hover:bg-zinc-900/50 active:bg-zinc-900/50 text-zinc-900 hover:text-white font-extrabold focus:shadow-none focus:ring-2 ring-zinc-900/50',
          accordionTriggerButton:
            'focus:shadow-none focus:ring-2 ring-zinc-900/50',
          navbarButton:
            'focus:shadow-none focus:ring-2 ring-zinc-900/50 dark:text-foreground',
          avatarImageActionsUpload: 'text-zinc-900/90',
          formButtonReset:
            'text-gray-900 hover:bg-secondary focus:shadow-none focus:ring-2 ring-zinc-900/50 dark:text-foreground',
          card: 'dark:bg-background',
          headerTitle: 'dark:text-foreground',
          headerSubtitle: 'dark:text-foreground',
          profileSectionTitleText: 'dark:text-foreground'
        }
      }}
    >
      <html lang='en' suppressHydrationWarning>
        <body className={inter.className} suppressHydrationWarning>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <ToastProvider />
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
