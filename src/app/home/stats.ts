export const stats = [
  { value: "20+", label: "Proyectos completados", accent: "brand" },
  { value: "98%", label: "Satisfacción del cliente", accent: "green" },
  { value: "24/7", label: "Soporte sostenible", accent: "yellow" },
] as const;

export type StatAccent = (typeof stats)[number]["accent"];

export const statAccentClass: Record<StatAccent, string> = {
  brand: "text-gradient-brand",
  green: "text-[var(--primaryGreen)]",
  yellow: "text-[var(--primaryYellow)]",
};
