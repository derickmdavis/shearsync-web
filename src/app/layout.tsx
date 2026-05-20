import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DripDesk Booking",
  description: "Booking and client management for independent pros.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-page text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
