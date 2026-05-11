"use client";

import { motion, useAnimationControls } from "framer-motion";
import { Brain, Eye, Scan } from "lucide-react";
import { useCallback, useEffect, type ComponentType } from "react";

type LogoItem =
  | { name: string; type: "svg"; src: string }
  | { name: string; type: "icon"; icon: ComponentType<{ className?: string }> };

const techStack: LogoItem[] = [
  { name: "Python", type: "svg", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "JavaScript", type: "svg", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", type: "svg", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "React", type: "svg", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Next.js", type: "svg", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "TailwindCSS", type: "svg", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Node.js", type: "svg", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "PostgreSQL", type: "svg", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "Java", type: "svg", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
  { name: "C", type: "svg", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" },
  { name: "R", type: "svg", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/r/r-original.svg" },
  { name: "Django", type: "svg", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg" },
  { name: "OpenCV", type: "svg", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg" },
  { name: "MediaPipe", type: "icon", icon: Scan },
  { name: "FastAPI", type: "icon", icon: Brain },
  { name: "Computer Vision", type: "icon", icon: Eye },
];

const repeatedTechStack = [...techStack, ...techStack, ...techStack];

export default function TechStack() {
  const controls = useAnimationControls();

  const startBelt = useCallback(() => {
    controls.start({
      x: ["0%", "-33.333%"],
      transition: {
        duration: 30,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
      },
    });
  }, [controls]);

  useEffect(() => {
    startBelt();
  }, [startBelt]);

  return (
    <section id="stack" className="bg-zinc-950 py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-100 md:text-4xl">The Arsenal</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-zinc-400 md:text-base">
          Architecting with modern, scalable, and AI-native technologies.
        </p>
      </div>

      <motion.div
        className="relative mt-16 w-full overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
        onHoverStart={() => controls.stop()}
        onHoverEnd={startBelt}
      >
        <motion.div
          className="flex w-max gap-4 px-6"
          animate={controls}
          drag="x"
          dragElastic={0.06}
          dragMomentum
          dragConstraints={{ left: -420, right: 120 }}
          onDragStart={() => controls.stop()}
          onDragEnd={startBelt}
        >
          {repeatedTechStack.map((tech, index) => (
            <article
              key={`${tech.name}-${index}`}
              className="flex h-24 min-w-[160px] flex-col items-center justify-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/50 px-4 backdrop-blur-sm"
            >
              {tech.type === "svg" ? (
                <img src={tech.src} alt={tech.name} className="h-10 w-10 object-contain" loading="lazy" />
              ) : (
                <tech.icon className="h-10 w-10 text-zinc-200" />
              )}
              <p className="text-sm font-medium text-zinc-300">{tech.name}</p>
            </article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
