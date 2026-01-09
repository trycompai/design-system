import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Comp Example App',
  description: 'Example application using @trycompai/design-system',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
