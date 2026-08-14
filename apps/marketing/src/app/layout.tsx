import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "Root & Foil | Simple Business Software for Independent Hair Professionals",
  description:
    "Root & Foil brings online booking, client profiles, formulas, reminders, waitlists, and business insights together in one complete product for independent stylists and barbers.",
  openGraph: {
    title:
      "Root & Foil | The Complete Business Platform for Independent Hair Professionals",
    description:
      "Root & Foil brings online booking, client profiles, formulas, reminders, waitlists, and business insights together in one complete product for independent stylists and barbers.",
  },
  twitter: {
    title:
      "Root & Foil | The Complete Business Platform for Independent Hair Professionals",
    description:
      "Root & Foil brings online booking, client profiles, formulas, reminders, waitlists, and business insights together in one complete product for independent stylists and barbers.",
  },
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
