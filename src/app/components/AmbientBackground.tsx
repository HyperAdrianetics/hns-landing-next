import React from "react";

const AmbientBackground = () => {
  return (
    <div aria-hidden className="ambient-bg">
      <div className="ambient-blob ambient-blob--magenta" />
      <div className="ambient-blob ambient-blob--gold" />
      <div className="ambient-blob ambient-blob--green" />
    </div>
  );
};

export default AmbientBackground;
