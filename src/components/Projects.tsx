"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

type Project = {
  title: string;
  description: string;
  tags: string[];
  link: string;
};

const projects: Project[] = [
  {
    title: "ScoutOps",
    description:
      "Full-stack player report management application scaled from standard CRUD to a pgvector-backed Knowledge Base with an autonomous AI data processing agent.",
    tags: ["Next.js", "pgvector", "AI Agents", "Python"],
    link: "https://github.com/satwikachanta-glitch/scoutops",
  },
  {
    title: "Gesture Vision",
    description:
      "Hands-free, split-hand operating environment using Python and OpenCV. Engineered precise webcam-based gesture recognition for seamless OS navigation.",
    tags: ["Python", "MediaPipe", "OpenCV", "PyQt6"],
    link: "https://github.com/satwikachanta-glitch/GestureVision",
  },
  {
    title: "Google MediaPipe",
    description:
      "Resolved API inconsistency by exposing Normalized Key point in containers and cosine similarity in components.utils. CLA approved.",
    tags: ["Open Source", "Python", "Computer Vision"],
    link: "https://github.com/google-ai-edge/mediapipe/pull/6273",
  },
  {
    title: "Archestra AI",
    description:
      "Engineered bidirectional JSON configuration sync and multiline argument parser for the frontend platform.",
    tags: ["Open Source", "Architecture", "JSON"],
    link: "https://github.com/archestra-ai/archestra/compare/main...satwikachanta-glitch:archestra:main?expand=1",
  },
];

export default function Projects() {
  const [stickyBase, setStickyBase] = useState(80);
  const [stickyStep, setStickyStep] = useState(44);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => {
      if (mq.matches) {
        setStickyBase(96);
        setStickyStep(20);
      } else {
        setStickyBase(72);
        setStickyStep(52);
      }
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <section id="projects" className="bg-zinc-950 py-32">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mx-auto mb-14 max-w-3xl text-center">
          <h2 className="text-4xl font-black tracking-tight text-zinc-100 md:text-5xl">
            Featured Work
          </h2>
          <p className="mt-4 text-base text-zinc-400 md:text-lg">
            Production-ready architecture and open-source contributions.
          </p>
        </header>

        <div className="relative flex flex-col gap-8 pb-24">
          {projects.map((project, index) => {
            const isPullRequestLink =
              project.link.includes("/pull/") || project.link.includes("/compare/");
            const topOffset = stickyBase + index * stickyStep;

            return (
              <motion.article
                key={project.title}
                className="sticky"
                style={{ top: `${topOffset}px` }}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="mx-auto w-full max-w-5xl rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-2xl backdrop-blur-md md:p-12">
                  <div className="flex flex-col gap-7">
                    <div>
                      <h3 className="text-3xl font-bold text-zinc-100 md:text-4xl">{project.title}</h3>
                      <p className="mt-4 text-base leading-relaxed text-zinc-400 md:text-lg">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {project.tags.map((tag) => (
                        <span
                          key={`${project.title}-${tag}`}
                          className="rounded-full border border-zinc-700 bg-zinc-800/50 px-4 py-2 text-sm font-medium text-lime-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div>
                      <Link
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-zinc-700 bg-zinc-950/70 px-5 py-2.5 text-sm font-semibold text-zinc-100 transition-all duration-300 hover:scale-105 hover:border-lime-400/50 hover:text-lime-300"
                      >
                        {isPullRequestLink ? "View PR" : "View Repository"}
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
