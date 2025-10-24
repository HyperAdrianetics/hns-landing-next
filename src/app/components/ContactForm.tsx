"use client";

import React, { useState } from "react";
import Link from "next/link";

interface FormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  company: string;
  message: string;
  perfil: string;
  urgent: boolean;
}

const ContactForm = () => {
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    company: "",
    message: "",
    perfil: "",
    urgent: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!acceptedPrivacy) {
      setSubmitStatus({
        type: "error",
        message: "Por favor acepta el Aviso de Privacidad para continuar.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // Aquí debes poner la URL de tu webhook de n8n
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || "";

      if (!webhookUrl) {
        throw new Error("La URL del webhook no está configurada");
      }

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el formulario");
      }

      setSubmitStatus({
        type: "success",
        message:
          "¡Formulario enviado exitosamente! Nos pondremos en contacto contigo pronto.",
      });

      // Limpiar formulario
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        budget: "",
        company: "",
        message: "",
        perfil: "",
        urgent: false,
      });
      setAcceptedPrivacy(false);
    } catch (error) {
      console.error("Error al enviar formulario:", error);
      setSubmitStatus({
        type: "error",
        message:
          "Hubo un error al enviar el formulario. Por favor intenta nuevamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#151922] text-white flex flex-col gap-8 py-8 lg:px-15 px-8 rounded-xl w-full"
    >
      {/* Mensaje de estado */}
      {submitStatus.type && (
        <div
          className={`p-4 rounded-lg ${
            submitStatus.type === "success"
              ? "bg-green-900/30 border border-green-500 text-green-300"
              : "bg-red-900/30 border border-red-500 text-red-300"
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Nombre completo"
        required
        className="py-3 border-x-0 border-t-0 border-b border-white bg-transparent focus:outline-none focus:border-[var(--primaryGreen)]  focus:text-[var(--primaryGreen)] placeholder:focus:text-[var(--primaryGreen)]"
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Correo electrónico"
        required
        className="py-3 border-x-0 border-t-0 border-b border-white bg-transparent focus:outline-none focus:border-[var(--primaryGreen)]  focus:text-[var(--primaryGreen)] placeholder:focus:text-[var(--primaryGreen)]"
      />

      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
        placeholder="Teléfono"
        required
        className="py-3 border-x-0 border-t-0 border-b border-white bg-transparent focus:outline-none focus:border-[var(--primaryGreen)]  focus:text-[var(--primaryGreen)] placeholder:focus:text-[var(--primaryGreen)]"
      />

      <select
        name="perfil"
        value={formData.perfil}
        onChange={handleInputChange}
        required
        className="py-3 border-x-0 border-t-0 border-b border-white bg-transparent focus:outline-none focus:border-[var(--primaryGreen)]  focus:text-[var(--primaryGreen)] placeholder:focus:text-[var(--primaryGreen)]"
      >
        <option value="">Puesto de trabajo</option>
        <option value="CEO/Fundador">CEO / Fundador</option>
        <option value="Director">Director</option>
        <option value="Gerente">Gerente</option>
        <option value="Coordinador">Coordinador</option>
        <option value="Desarrollador">Desarrollador</option>
        <option value="Diseñador">Diseñador</option>
        <option value="Marketing">Marketing</option>
        <option value="Emprendedor">Emprendedor</option>
        <option value="Otro">Otro</option>
      </select>

      <select
        name="projectType"
        value={formData.projectType}
        onChange={handleInputChange}
        required
        className="py-3 border-x-0 border-t-0 border-b border-white bg-transparent focus:outline-none focus:border-[var(--primaryGreen)]  focus:text-[var(--primaryGreen)] placeholder:focus:text-[var(--primaryGreen)]"
      >
        <option value="">Tipo de proyecto</option>
        <option value="web">Desarrollo web</option>
        <option value="mobile">Desarrollo móvil</option>
        <option value="desktop">Aplicación de escritorio</option>
        <option value="ecommerce">E-commerce</option>
        <option value="api">API / Backend</option>
        <option value="marketing">Marketing digital</option>
        <option value="consulting">Consultoría</option>
        <option value="other">Otro</option>
      </select>

      <select
        name="budget"
        value={formData.budget}
        onChange={handleInputChange}
        required
        className="py-3 border-x-0 border-t-0 border-b border-white bg-transparent focus:outline-none focus:border-[var(--primaryGreen)]  focus:text-[var(--primaryGreen)] placeholder:focus:text-[var(--primaryGreen)]"
      >
        <option value="">Presupuesto estimado (MXN)</option>
        <option value="<50k">Menos de $50,000</option>
        <option value="50k-100k">$50,000 - $100,000</option>
        <option value="100k-250k">$100,000 - $250,000</option>
        <option value="250k-500k">$250,000 - $500,000</option>
        <option value="500k+">$500,000+</option>
      </select>

      <input
        type="text"
        name="company"
        value={formData.company}
        onChange={handleInputChange}
        placeholder="Empresa o nombre del proyecto"
        className="py-3 border-x-0 border-t-0 border-b border-white bg-transparent focus:outline-none focus:border-[var(--primaryGreen)]  focus:text-[var(--primaryGreen)] placeholder:focus:text-[var(--primaryGreen)]"
      />

      <textarea
        name="message"
        value={formData.message}
        onChange={handleInputChange}
        placeholder="Cuéntanos sobre tu proyecto"
        rows={3}
        required
        className="py-3 border-x-0 border-t-0 border-b border-white bg-transparent focus:outline-none focus:border-[var(--primaryGreen)]  focus:text-[var(--primaryGreen)] placeholder:focus:text-[var(--primaryGreen)] resize-none"
      ></textarea>

      {/* Checkbox urgente */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="urgent"
          name="urgent"
          checked={formData.urgent}
          onChange={handleInputChange}
          className="mt-1 w-4 h-4 accent-[var(--primaryGreen)] cursor-pointer"
        />
        <label
          htmlFor="urgent"
          className="text-sm text-gray-300 leading-relaxed cursor-pointer"
        >
          Este proyecto es urgente (menos de 2 semanas)
        </label>
      </div>

      {/* Checkbox de Aviso de Privacidad */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="privacy-policy"
          checked={acceptedPrivacy}
          onChange={(e) => setAcceptedPrivacy(e.target.checked)}
          required
          className="mt-1 w-4 h-4 accent-[var(--primaryGreen)] cursor-pointer"
        />
        <label
          htmlFor="privacy-policy"
          className="text-sm text-gray-300 leading-relaxed cursor-pointer"
        >
          He leído y acepto el{" "}
          <Link
            href="/aviso-de-privacidad"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--primaryGreen)] hover:underline font-medium"
          >
            Aviso de Privacidad
          </Link>{" "}
          de Hypernetics, S.A. de C.V.
        </label>
      </div>

      <button
        type="submit"
        className="bg-[var(--primaryGreen)] py-4 mt-5 rounded-xl text-black font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!acceptedPrivacy || isSubmitting}
      >
        {isSubmitting ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
};

export default ContactForm;
