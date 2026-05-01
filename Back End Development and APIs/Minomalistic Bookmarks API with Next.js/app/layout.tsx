import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Bookmarks API',
  description: 'A minimalistic bookmarks API built with Next.js and TypeScript',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#fafafa' }}>
        {children}
      </body>
    </html>
  );
}
