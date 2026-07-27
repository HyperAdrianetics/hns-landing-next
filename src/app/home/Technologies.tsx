import React from "react";
import Image from "next/image";
import react from "../assets/technologies/react.svg";
import nodeJs from "../assets/technologies/node-js.svg";
import python from "../assets/technologies/python.svg";
import typescript from "../assets/technologies/typescript.svg";
import docker from "../assets/technologies/docker.svg";
import postgresSql from "../assets/technologies/postgresql.svg";
import mongoDb from "../assets/technologies/mongodb.svg";
import nextJs from "../assets/technologies/nextjs.svg";
import reactNative from "../assets/technologies/reactnative.svg";
import aws from "../assets/technologies/aws.svg";

const techItems = [
  { src: react, alt: "React" },
  { src: nodeJs, alt: "Node.js" },
  { src: python, alt: "Python" },
  { src: typescript, alt: "TypeScript" },
  { src: aws, alt: "AWS" },
  { src: docker, alt: "Docker" },
  { src: postgresSql, alt: "PostgreSQL" },
  { src: mongoDb, alt: "MongoDB" },
  { src: nextJs, alt: "Next.js" },
  { src: reactNative, alt: "React Native" },
];

const Technologies = () => {
  return (
    <section id="technologies" className="container mx-auto px-5 py-24">
      <p className="section-label">Stack</p>
      <h2 className="mt-4 text-4xl font-bold text-[var(--primaryYellow)]">
        Tecnologías{" "}
        <span className="text-[var(--primaryGreen)]">que dominamos</span>
      </h2>

      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {techItems.map((item) => (
          <article
            key={item.alt}
            className="glass-card glass-card--hover flex h-[140px] items-center justify-center"
          >
            <Image src={item.src} alt={item.alt} height={60} />
          </article>
        ))}
      </div>
    </section>
  );
};

export default Technologies;
