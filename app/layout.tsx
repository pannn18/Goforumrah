import type { Metadata } from "next";
import "../styles/main.scss";

export const metadata: Metadata = {
  title: "Goforumrah",
  description: "Search low prices on hotels, flights, and car rentals",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/illiyin-logo.png" />
        <link rel="apple-touch-icon" href="/images/illiyin-logo.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
