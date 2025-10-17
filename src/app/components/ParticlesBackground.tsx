"use client";

import { useEffect } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import particlesConfig from "../../particlesjs-config.json";
import type { Engine, ISourceOptions } from "tsparticles-engine";

const ParticlesBackground = () => {
  useEffect(() => {
    // Nada especial que inicializar aquí si no lo necesitas
  }, []);

  const init = async (main: Engine) => {
    await loadFull(main);
  };

  return (
    <div className="fixed inset-0 -z-10">
      <Particles
        id="tsparticles"
        init={init}
        options={particlesConfig as ISourceOptions}
      />
    </div>
  );
};

export default ParticlesBackground;
