import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ShearSync Booking",
  description: "Public booking flow for ShearSync stylists.",
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
