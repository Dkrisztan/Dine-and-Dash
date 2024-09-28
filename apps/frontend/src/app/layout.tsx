import './globals.css';

import type { Metadata } from 'next';
import { Karla } from 'next/font/google';

import { ThemeProvider } from '@/components/ui/theme-provider';

export const metadata: Metadata = {
  title: 'Dine & Dash',
  description: 'Thesis full stack application',
};

const fredoka = Karla({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${fredoka.className} antialiased`}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
