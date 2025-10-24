import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import logoHypernetics from "../../../public/hypernetics-logo.svg";

export const metadata: Metadata = {
  title: "Términos y Condiciones — Hypernetics",
  description:
    "Términos y Condiciones de uso del sitio y contratación de servicios de Hypernetics, S.A. de C.V. en México.",
  openGraph: {
    title: "Términos y Condiciones — Hypernetics",
    description: "Condiciones de uso del sitio, contratación, propiedad intelectual, responsabilidad y contacto.",
    url: "https://hypernetics.com.mx/terminos-y-condiciones",
    siteName: "Hypernetics",
    locale: "es_MX",
    type: "website",
  },
};

export default function TerminosYCondiciones() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-white">
      {/* Header */}
      <header className="border-b border-[var(--primaryBlue)] bg-[var(--primaryBlue)]/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-[var(--primaryYellow)]">
              <Image
                src={logoHypernetics}
                alt="Logo de Hypernetics"
                width={48}
                height={48}
                className="h-12 w-auto"
              />
            </Link>
            <nav className="hidden md:flex gap-6 text-sm">
              <Link href="/#nosotros" className="hover:text-[var(--primaryGreen)] transition-colors">
                Nosotros
              </Link>
              <Link href="/#servicios" className="hover:text-[var(--primaryGreen)] transition-colors">
                Servicios
              </Link>
              <Link href="/#proceso" className="hover:text-[var(--primaryGreen)] transition-colors">
                Proceso
              </Link>
              <Link href="/#contacto" className="hover:text-[var(--primaryGreen)] transition-colors">
                Contacto
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <p className="text-gray-400 text-sm mb-4">Última actualización: 24 de octubre de 2025</p>

        <h1 className="text-4xl md:text-5xl font-bold text-[var(--primaryYellow)] mb-8">
          Términos y Condiciones
        </h1>

        <div className="space-y-6 text-gray-300 leading-relaxed">
          <p>
            Estos Términos y Condiciones (los &quot;<strong className="text-white">Términos</strong>&quot;) regulan el acceso y uso del sitio{" "}
            <a href="https://hypernetics.com.mx/" className="text-[var(--primaryGreen)] hover:underline">
              hypernetics.com.mx
            </a>{" "}
            (el &quot;<strong className="text-white">Sitio</strong>&quot;) y, en lo que corresponda, la contratación de servicios con{" "}
            <strong className="text-white">Hypernetics, S.A. de C.V.</strong> (&quot;<strong className="text-white">Hypernetics</strong>&quot;, &quot;nosotros&quot;).
            Al usar el Sitio o contratar nuestros servicios, aceptas estos Términos.
          </p>

          <p>
            <strong className="text-white">Responsable y contacto:</strong> Hypernetics, S.A. de C.V., con domicilio en Prolongación Puente
            Titla 181, Ampliacion el Santuario 09829, Iztapalapa, CDMX, correo:{" "}
            <a href="mailto:contacto@hypernetics.com.mx" className="text-[var(--primaryGreen)] hover:underline">
              contacto@hypernetics.com.mx
            </a>.
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--primaryYellow)] mt-8 mb-4">
              1) Ámbito de aplicación
            </h2>
            <p>
              Estos Términos aplican al uso del Sitio y a las interacciones comerciales que se inicien a través del Sitio.
              Las prestaciones específicas de proyectos y servicios profesionales se sujetarán además a sus{" "}
              <em className="text-gray-400">contratos, órdenes de trabajo, propuestas o cotizaciones</em> particulares
              (&quot;<strong className="text-white">Contratos Específicos</strong>&quot;). En caso de conflicto, prevalecerán las
              condiciones de los Contratos Específicos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--primaryYellow)] mt-8 mb-4">
              2) Uso del Sitio
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Debes usar el Sitio de forma lícita y conforme a estos Términos.</li>
              <li>
                No está permitido: i) el acceso no autorizado a sistemas o datos; ii) introducir malware, bots o
                scraping agresivo; iii) vulnerar medidas de seguridad; iv) infringir derechos de terceros; v) usar
                contenido del Sitio fuera de lo permitido.
              </li>
              <li>
                Podemos suspender o limitar el acceso al Sitio por mantenimiento, seguridad o causa de fuerza mayor.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--primaryYellow)] mt-8 mb-4">
              3) Información y contenidos
            </h2>
            <p>
              El contenido del Sitio es informativo. Procuramos exactitud y actualización, pero puede contener referencias
              generales o no reflejar cambios más recientes. No constituye asesoría técnica o legal. Cualquier decisión
              debe evaluarse con profesionales especializados.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--primaryYellow)] mt-8 mb-4">
              4) Propuestas, cotizaciones y contratación
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                Las cotizaciones tienen vigencia limitada y están sujetas a alcance, supuestos y exclusiones
                establecidos por escrito.
              </li>
              <li>
                La contratación se considera perfeccionada cuando exista aceptación escrita de la propuesta y, en su
                caso, pago o anticipo pactado.
              </li>
              <li>Modificaciones al alcance, entregables o plazos deben acordarse por escrito (órdenes de cambio).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--primaryYellow)] mt-8 mb-4">
              5) Precios, facturación y pagos
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                Los precios se expresan en <strong className="text-white">MXN</strong> salvo que se indique otra moneda.
                Se adicionarán impuestos aplicables.
              </li>
              <li>
                Los pagos se realizan por los medios y fechas pactadas. La falta de pago faculta a suspender entregas o
                servicios.
              </li>
              <li>
                Costos de terceras plataformas, licencias o infraestructura (ej. nubes, pasarelas) podrán facturarse por
                separado si así se acuerda.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--primaryYellow)] mt-8 mb-4">
              6) Propiedad intelectual
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                El Sitio, su diseño, logotipos, marcas, texto e imágenes son propiedad de Hypernetics o de sus
                licenciantes. Todos los derechos reservados.
              </li>
              <li>
                En proyectos, la titularidad sobre <em className="text-gray-400">entregables</em> (código fuente,
                documentación, arte) se definirá en los Contratos Específicos. Salvo pacto distinto, Hypernetics
                retendrá propiedad sobre herramientas, librerías internas, know-how y plantillas preexistentes
                utilizadas para entregar el servicio, otorgando al cliente una licencia de uso limitada necesaria
                para explotar los entregables.
              </li>
              <li>El uso de marcas o casos de éxito del cliente con fines de portafolio requiere autorización previa.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--primaryYellow)] mt-8 mb-4">
              7) Confidencialidad y datos personales
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                Cada parte se obliga a mantener confidencial la información no pública recibida de la otra, usándola
                solo para el fin del proyecto.
              </li>
              <li>
                El tratamiento de datos personales se rige por nuestro{" "}
                <Link href="/aviso-de-privacidad" className="text-[var(--primaryGreen)] hover:underline">
                  Aviso de Privacidad
                </Link>.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--primaryYellow)] mt-8 mb-4">
              8) Enlaces y servicios de terceros
            </h2>
            <p>
              El Sitio puede contener enlaces a sitios o servicios de terceros (p. ej., pasarelas de pago, nubes,
              herramientas). Hypernetics no controla esos recursos ni asume responsabilidad por su contenido,
              disponibilidad o políticas.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--primaryYellow)] mt-8 mb-4">
              9) Garantías y soporte
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                Salvo lo pactado en Contratos Específicos, el Sitio y su contenido se proporcionan &quot;tal cual&quot;, sin
                garantías de disponibilidad, adecuación a un propósito particular o ausencia de errores.
              </li>
              <li>
                Los niveles de servicio (SLA), periodos de garantía y soporte de proyectos se regirán por los Contratos
                Específicos.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--primaryYellow)] mt-8 mb-4">
              10) Limitación de responsabilidad
            </h2>
            <p>
              En la máxima medida permitida por la ley, Hypernetics no será responsable por daños indirectos, incidentales,
              especiales, punitivos o consecuenciales (incluido lucro cesante, pérdida de datos o de negocios). La
              responsabilidad total de Hypernetics por cualquier reclamación relacionada con el Sitio o los servicios se
              limitará al monto efectivamente pagado a Hypernetics por el cliente en los <strong className="text-white">12 meses</strong> previos
              al hecho que dio origen a la reclamación, salvo dolo o culpa grave.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--primaryYellow)] mt-8 mb-4">
              11) Indemnización
            </h2>
            <p>
              Te obligas a indemnizar y sacar en paz y a salvo a Hypernetics frente a reclamos de terceros derivados de tu
              uso indebido del Sitio o incumplimiento de estos Términos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--primaryYellow)] mt-8 mb-4">
              12) Fuerza mayor
            </h2>
            <p>
              Ninguna parte será responsable por incumplimientos debidos a eventos fuera de su control razonable (p. ej.,
              fallas de proveedores de nube, ciberataques masivos, desastres naturales, órdenes gubernamentales), siempre
              que notifique y mitigue razonablemente los efectos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--primaryYellow)] mt-8 mb-4">
              13) Modificaciones
            </h2>
            <p>
              Podemos actualizar estos Términos para reflejar cambios legales u operativos. Publicaremos la versión vigente
              en{" "}
              <Link href="/terminos-y-condiciones" className="text-[var(--primaryGreen)] hover:underline">
                /terminos-y-condiciones
              </Link>{" "}
              con su fecha de última actualización. El uso continuo del Sitio implica aceptación de la versión vigente.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--primaryYellow)] mt-8 mb-4">
              14) Terminación
            </h2>
            <p>
              Podemos limitar o terminar el acceso al Sitio si incumples estos Términos. La terminación no afecta
              obligaciones devengadas (pagos, confidencialidad, propiedad intelectual, limitación de responsabilidad).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--primaryYellow)] mt-8 mb-4">
              15) Comunicaciones electrónicas
            </h2>
            <p>
              Aceptas recibir comunicaciones electrónicas (correos, avisos en el Sitio). Conservaremos evidencia razonable
              de dichas comunicaciones.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--primaryYellow)] mt-8 mb-4">
              16) Ley aplicable y jurisdicción
            </h2>
            <p>
              Estos Términos se rigen por las leyes de los <strong className="text-white">Estados Unidos Mexicanos</strong>. Para la
              interpretación y cumplimiento, las partes se someten a los tribunales competentes de la{" "}
              <strong className="text-white">Ciudad de México</strong>, renunciando a cualquier otro fuero por razón de su
              domicilio presente o futuro.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--primaryYellow)] mt-8 mb-4">
              17) Contacto
            </h2>
            <p>
              Para dudas sobre estos Términos, contáctanos en{" "}
              <a href="mailto:contacto@hypernetics.com.mx" className="text-[var(--primaryGreen)] hover:underline">
                contacto@hypernetics.com.mx
              </a>{" "}
              o en Prolongación Puente Titla 181, Ampliacion el Santuario 09829, Iztapalapa, CDMX.
            </p>
          </section>

          <div className="bg-[var(--primaryBlue)]/30 border border-[var(--primaryBlue)] rounded-xl p-6 mt-8">
            <p className="text-sm text-gray-400">
              Este documento es un <strong className="text-white">modelo general</strong> y no constituye asesoría legal.
              Ajusta los términos a tus procesos y Contratos Específicos y consulta a tu asesor jurídico, en especial si
              prestas servicios en otras jurisdicciones o manejas software con licenciamiento particular.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--primaryBlue)] bg-[var(--primaryBlue)]/30 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© {new Date().getFullYear()} Hypernetics. Todos los derechos reservados.</p>
            <nav className="flex gap-4">
              <Link href="/aviso-de-privacidad" className="hover:text-[var(--primaryGreen)] transition-colors">
                Aviso de privacidad
              </Link>
              <span>·</span>
              <Link href="/terminos-y-condiciones" className="hover:text-[var(--primaryGreen)] transition-colors">
                Términos y condiciones
              </Link>
              <span>·</span>
              <Link href="/sitemap.xml" className="hover:text-[var(--primaryGreen)] transition-colors">
                Sitemap
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
