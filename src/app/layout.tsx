import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import ParticlesBackground from "./components/ParticlesBackground";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hypernetics",
  description: "Torunga idean makto solukar dinetal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.className} antialiased`}>
        <ParticlesBackground />
        {children}
      </body>
    </html>
  );
}
