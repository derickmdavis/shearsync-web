import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Root & Foil Ops",
  description: "Root & Foil internal operations workspace",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
