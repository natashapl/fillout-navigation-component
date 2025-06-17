import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fillout Navigation Component",
  description: "Fillout Engineering: Take-Home Assessment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
