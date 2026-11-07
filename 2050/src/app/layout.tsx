import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "RYTHE ATELIER — Beyond Retail 2050",
    template: "%s — RYTHE ATELIER"
  },
  description:
    "An evolving digital atelier by RYTHE ATELIER. Designed with intention.",
  applicationName: "RYTHE ATELIER 2050",
  robots: { index: false, follow: false }
};

export const viewport: Viewport = {
  themeColor: "#101014",
  colorScheme: "dark"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
