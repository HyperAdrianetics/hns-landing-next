import type { Metadata } from "next";
import { Open_Sans, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import AmbientBackground from "./components/AmbientBackground";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-display",
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

// Token del origin trial de Chrome para HTML-in-Canvas. Es público (viaja en el
// HTML), va atado a un origen concreto y caduca; si falta o vence, los efectos
// de Canvas UI siguen funcionando en su modo WebGL sin romper nada.
const originTrialToken = process.env.ORIGIN_TRIAL_TOKEN;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      {originTrialToken ? (
        <meta httpEquiv="origin-trial" content={originTrialToken} />
      ) : null}
      <body className={`${openSans.className} ${spaceGrotesk.variable} antialiased`}>
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

        <AmbientBackground />
        {children}
      </body>
    </html>
  );
}
