import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import ParticlesBackground from "./components/ParticlesBackground";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hypernetics | Desarrollo de Software Personalizado",
  description:
    "Creamos soluciones de software a la medida para empresas que buscan optimizar procesos, innovar y crecer con tecnología de alto rendimiento.",
  keywords: [
    "desarrollo de software",
    "software personalizado",
    "aplicaciones web",
    "hypernetics",
    "tecnología empresarial",
  ],
  openGraph: {
    title: "Hypernetics | Desarrollo de Software Personalizado",
    description:
      "Soluciones tecnológicas personalizadas para empresas que buscan eficiencia, innovación y escalabilidad.",
    url: "https://hns-landing-next.vercel.app/",
    siteName: "Hypernetics",
    images: [
      {
        url: "https://hns-landing-next.vercel.app/og-image.jpg", // cámbialo por tu imagen real
        width: 1200,
        height: 630,
        alt: "Hypernetics - Desarrollo de Software",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hypernetics | Desarrollo de Software Personalizado",
    description:
      "Creamos software a la medida para empresas que buscan crecer con innovación tecnológica.",
    images: ["https://hns-landing-next.vercel.app/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
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
