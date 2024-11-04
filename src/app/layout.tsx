// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Ramkumar Bullion | Live Gold Rates",
  description: "Live Madurai Gold Rates",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
