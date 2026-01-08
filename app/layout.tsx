import type { Metadata } from 'next';
import "../styles/main.scss";

export const metadata: Metadata = {
  title: 'Goforumrah',
  description: 'Search low prices on hotels, flights, and car rentals',
  icons: {
    icon: '/img/Illiyin Logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}