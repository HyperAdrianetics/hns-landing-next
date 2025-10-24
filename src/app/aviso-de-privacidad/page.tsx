import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import logoHypernetics from "../../../public/hypernetics-logo.svg";

export const metadata: Metadata = {
  title: "Aviso de Privacidad — Hypernetics",
  description:
    "Aviso de Privacidad de Hypernetics, S.A. de C.V. sobre el tratamiento de datos personales conforme a la LFPDPPP en México.",
  openGraph: {
    title: "Aviso de Privacidad — Hypernetics",
    description: "Cómo tratamos tus datos personales, derechos ARCO y medios de contacto.",
    url: "https://hypernetics.com.mx/aviso-de-privacidad",
    siteName: "Hypernetics",
    locale: "es_MX",
    type: "website",
  },
};

export default function AvisoDePrivacidad() {
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
        <p className="text-gray-400 text-sm mb-4">Última actualización: 21 de agosto de 2025</p>

        <h1 className="text-4xl md:text-5xl font-bold text-[var(--primaryYellow)] mb-8">
          Aviso de Privacidad
        </h1>

        <div className="space-y-6 text-gray-300 leading-relaxed">
          <div>
            <p><strong className="text-white">Responsable:</strong> Hypernetics, S.A. de C.V. (&quot;Hypernetics&quot;).</p>
            <p><strong className="text-white">Domicilio:</strong> [Indica domicilio completo del responsable].</p>
            <p>
              <strong className="text-white">Contacto de privacidad:</strong>{" "}
              <a href="mailto:contacto@hypernetics.com.mx" className="text-[var(--primaryGreen)] hover:underline">
                contacto@hypernetics.com.mx
              </a>
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--primaryYellow)] mt-8 mb-4">
              1) Datos personales que recabamos
            </h2>
            <p>
              Nombre, apellidos, teléfono, correo electrónico, empresa, puesto, país/ciudad, datos de facturación (RFC,
              razón social, domicilio fiscal), datos de pago (a través de pasarelas), e información técnica (IP, cookies,
              páginas visitadas, tiempo de sesión). Cualquier dato que proporciones en formularios o medios de contacto
              podrá ser tratado.
            </p>
            <p className="mt-2">
              <em className="text-gray-400">Datos sensibles:</em> Hypernetics no solicita datos personales sensibles. En caso de recibirlos, se
              tratarán con medidas reforzadas y consentimiento expreso.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--primaryYellow)] mt-8 mb-4">
              2) Finalidades del tratamiento
            </h2>
            <p>
              <strong className="text-white">Primarias:</strong> atender solicitudes, elaborar cotizaciones, crear y administrar
              cuentas/contratos, facturación, soporte técnico, cumplimiento de obligaciones legales y fiscales.
            </p>
            <p className="mt-2">
              <strong className="text-white">Secundarias:</strong> comunicaciones comerciales y newsletters, invitaciones a eventos, encuestas,
              estadísticas para mejorar servicios. Si no deseas finalidades secundarias, escribe a{" "}
              <a href="mailto:contacto@hypernetics.com.mx" className="text-[var(--primaryGreen)] hover:underline">
                contacto@hypernetics.com.mx
              </a>{" "}
              con el asunto &quot;Negativa a finalidades secundarias&quot;.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--primaryYellow)] mt-8 mb-4">
              3) Fundamento y consentimiento
            </h2>
            <p>
              Tratamos tus datos conforme a la LFPDPPP y su Reglamento, con base en tu consentimiento, la relación
              (pre)contractual y el cumplimiento de obligaciones legales.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--primaryYellow)] mt-8 mb-4">
              4) Transferencias y encargados
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong className="text-white">Encargados (proveedores):</strong> infraestructura, alojamiento, analítica, pagos, mensajería,
                soporte. Tratan datos por cuenta de Hypernetics mediante contratos de confidencialidad y protección de
                datos.
              </li>
              <li>
                <strong className="text-white">Autoridades:</strong> cuando lo exija la ley u orden competente.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--primaryYellow)] mt-8 mb-4">
              5) Conservación y seguridad
            </h2>
            <p>
              Conservamos datos por el tiempo necesario para las finalidades y obligaciones legales. Aplicamos medidas
              administrativas, técnicas y físicas para protegerlos contra pérdida, acceso no autorizado o uso indebido.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--primaryYellow)] mt-8 mb-4">
              6) Derechos ARCO y revocación
            </h2>
            <p>
              Puedes ejercer <strong className="text-white">Acceso</strong>, <strong className="text-white">Rectificación</strong>, <strong className="text-white">Cancelación</strong> u
              <strong className="text-white"> Oposición</strong> (ARCO), y revocar tu consentimiento:
            </p>
            <ol className="list-decimal list-inside space-y-2 ml-4 mt-4">
              <li>
                Envía correo a{" "}
                <a href="mailto:contacto@hypernetics.com.mx" className="text-[var(--primaryGreen)] hover:underline">
                  contacto@hypernetics.com.mx
                </a>{" "}
                con asunto &quot;Derechos ARCO&quot;.
              </li>
              <li>
                Incluye: nombre completo, medio de contacto, identificación oficial (o poder), y descripción del derecho
                y los datos involucrados.
              </li>
              <li>
                Plazos: respuesta en máx. 20 días hábiles; de proceder, ejecución en los siguientes 15 días hábiles.
              </li>
            </ol>
            <p className="mt-4">
              En supuestos de cancelación u oposición, tus datos podrán permanecer bloqueados por el tiempo legalmente
              requerido antes de su supresión.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--primaryYellow)] mt-8 mb-4">
              7) Medios para limitar uso o divulgación
            </h2>
            <p>
              Solicita tu exclusión de listas internas de mercadotecnia escribiendo a{" "}
              <a href="mailto:contacto@hypernetics.com.mx" className="text-[var(--primaryGreen)] hover:underline">
                contacto@hypernetics.com.mx
              </a>
              . También puedes inscribirte al REPEP.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--primaryYellow)] mt-8 mb-4">
              8) Cookies y tecnologías similares
            </h2>
            <p>
              Usamos cookies para mejorar tu experiencia y analizar el uso del sitio. Puedes deshabilitarlas desde tu
              navegador, lo que podría limitar funcionalidades. Tipos: esenciales, analíticas, funcionales y (si se
              habilitan) publicitarias.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--primaryYellow)] mt-8 mb-4">
              9) Menores de edad
            </h2>
            <p>
              Nuestros servicios no están dirigidos a menores de 18 años. Eliminaremos datos de menores cuando no exista el
              consentimiento correspondiente.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--primaryYellow)] mt-8 mb-4">
              10) Cambios al Aviso
            </h2>
            <p>
              Podremos actualizar este Aviso para reflejar cambios legales u operativos. Publicaremos la versión vigente en{" "}
              <Link href="/aviso-de-privacidad" className="text-[var(--primaryGreen)] hover:underline">
                /aviso-de-privacidad
              </Link>{" "}
              con su fecha de última actualización.
            </p>
          </section>

          <div className="bg-[var(--primaryBlue)]/30 border border-[var(--primaryBlue)] rounded-xl p-6 mt-8">
            <p className="text-sm text-gray-400">
              Este documento es un modelo informativo. Adáptalo a tus procesos reales y consulta asesoría legal si tratas
              datos de otras jurisdicciones (p. ej., GDPR/CCPA).
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
