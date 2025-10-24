import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import Script from "next/script";
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
    url: "https://hypernetics.com.mx/",
    siteName: "Hypernetics",
    images: [
      {
        url: "https://hypernetics.com.mx/og-image.jpg",
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
    images: ["https://hypernetics.com.mx/og-image.jpg"],
  },
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
    <html lang="es">
      <body className={`${openSans.className} antialiased`}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4XGJE6WLZ1"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4XGJE6WLZ1');
          `}
        </Script>

        <ParticlesBackground />
        {children}
      </body>
    </html>
  );
}
