"use client";

import { useState } from "react";

export type Service = {
  title: string;
  description: string;
  items?: string[];
};

// Filas de servicios. La pintura inunda la fila con hover o foco (CSS); el clic
// o toque la deja abierta o la cierra (aria-expanded). Sin JS, todas abiertas.
const ServiceList = ({ services }: { services: Service[] }) => {
  const [open, setOpen] = useState<ReadonlySet<number>>(new Set());

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <ul className="svc-list">
      {services.map((service, i) => {
        const isOpen = open.has(i);
        const panelId = `svc-panel-${i}`;
        return (
          <li key={service.title} className="svc-row" data-open={isOpen}>
            <h3>
              <button
                type="button"
                className="svc-btn"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
              >
                <span className="svc-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="svc-title">{service.title}</span>
                <span aria-hidden className="svc-arrow">
                  →
                </span>
              </button>
            </h3>
            <div id={panelId} role="region" aria-label={service.title} className="svc-panel">
              <div className="svc-panel-inner">
                <p>{service.description}</p>
                {service.items && service.items.length > 0 ? (
                  <ul className="svc-tags">
                    {service.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ServiceList;
