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

const Techonolgies = () => {
  const techItems = [
    { src: react, alt: "React", selected: true },
    { src: nodeJs, alt: "Node.js", selected: true },
    { src: python, alt: "Python", selected: true },
    { src: typescript, alt: "TypeScript", selected: true },
    { src: aws, alt: "AWS", selected: true },
    { src: docker, alt: "Docker", selected: true },
    { src: postgresSql, alt: "PostgreSQL", selected: true },
    { src: mongoDb, alt: "MongoDB", selected: true },
    { src: nextJs, alt: "Next.js", selected: true },
    { src: reactNative, alt: "React Native", selected: true },
  ];
  return (
    <section
      id="technologies"
      className="min-h-screen p-5 pt-30 container mx-auto"
    >
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-0 w-full border border-[#383E36]">
        <article className="col-span-2 md:col-span-2 lg:col-span-2 flex items-center justify-center ring-1 ring-inset ring-[#383E36] min-h-[230px] relative ">
          <div className="bg-[radial-gradient(circle_at_top_left,_rgba(63,183,36,0.15)_0%,_rgba(127,231,122,0.05)_30%,_rgba(6,8,17,1)_100%)] w-full h-full absolute top-0 left-0 z-0"></div>

          <h2 className="text-4xl font-bold mb-4 text-[var(--primaryYellow)] z-10">
            Tecnologías <br />
            <span className="text-[var(--primaryGreen)]">que dominamos</span>
          </h2>
        </article>
        {techItems.map((item) => (
          <article
            key={item.alt}
            className="col-span-1 md:col-span-1 lg:col-span-1 flex items-center justify-center h-[230px] ring-1 ring-inset ring-[#383E36] relative"
          >
            {item.selected && (
              <div className="bg-[radial-gradient(circle_at_top_left,_rgba(63,183,36,0.15)_0%,_rgba(127,231,122,0.05)_30%,_rgba(6,8,17,1)_100%)] w-full h-full absolute top-0 left-0 z-0"></div>
            )}

            <Image src={item.src} alt={item.alt} height={95} className="z-10" />
          </article>
        ))}
      </div>
    </section>
  );
};

export default Techonolgies;
