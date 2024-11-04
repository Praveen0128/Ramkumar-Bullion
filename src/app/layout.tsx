// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";


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
        <div>{children}</div>
      </body>
    </html>
  );
}
