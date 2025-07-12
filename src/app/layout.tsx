import "./globals.css";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Image-Inator',
  description: 'A simple image manager',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-blue-100">
        {children}
      </body>
    </html>
  );
}
