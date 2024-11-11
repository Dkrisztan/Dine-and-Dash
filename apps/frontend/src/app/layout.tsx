import './globals.css';
import '@uploadthing/react/styles.css';

import type { Metadata } from 'next';
import { Karla } from 'next/font/google';

import Footer from '@/components/footer/Footer';
import { TopNav } from '@/components/navbar/TopNav';
import { Toaster } from '@/components/ui/sonner';
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
      <body className={`${fredoka.className} antialiased min-h-screen flex flex-col`}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          <TopNav />
          {children}
          <Footer />
        </ThemeProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
