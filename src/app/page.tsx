"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  ChevronDown,
  Code2,
  Download,
  ExternalLink,
  Link as LinkIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import VibeBox from "@/components/VibeBox";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Home() {
  const [altHeld, setAltHeld] = useState(false);

  useEffect(() => {
    const syncAlt = (e: KeyboardEvent) => setAltHeld(e.altKey);
    const onBlur = () => setAltHeld(false);
    window.addEventListener("keydown", syncAlt);
    window.addEventListener("keyup", syncAlt);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("keydown", syncAlt);
      window.removeEventListener("keyup", syncAlt);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  return (
    <main className="bg-zinc-950">
      {/* --- HERO SECTION --- */}
      <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6 py-14">
        {/* Background Animated Orbs */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-16 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl"
          animate={{ x: [0, 90, -40, 0], y: [0, -50, 30, 0] }}
          transition={{ duration: 22, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-7rem] top-[-4rem] h-[26rem] w-[26rem] rounded-full bg-lime-500/20 blur-3xl"
          animate={{ x: [0, -110, 50, 0], y: [0, 70, -35, 0] }}
          transition={{ duration: 28, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-7rem] left-[40%] h-[23rem] w-[23rem] rounded-full bg-cyan-500/20 blur-3xl"
          animate={{ x: [0, 60, -70, 0], y: [0, -30, 45, 0] }}
          transition={{ duration: 24, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        {/* Hero Content */}
        <motion.div
          className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            variants={itemVariants}
            className="text-balance text-4xl font-black leading-[1.1] tracking-tight text-transparent sm:text-5xl md:text-7xl lg:text-8xl bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-500 bg-clip-text"
          >
            Satwik Achanta
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 font-mono text-sm tracking-widest text-lime-400 drop-shadow-[0_0_16px_rgba(132,204,22,0.45)] md:text-base"
          >
            Full-Stack AI Engineer
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-zinc-400"
          >
            Bridging the gap between raw LLM capabilities and seamless user interfaces. Specializing in
            autonomous agents, computer vision, and production-ready architecture.
          </motion.p>

          {/* Social Links & CTA */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-lime-400 px-6 py-3 text-sm font-bold text-zinc-950 shadow-[0_0_24px_rgba(163,230,53,0.35)] ring-2 ring-lime-200/90 transition-all duration-300 hover:scale-105 hover:bg-lime-300 hover:shadow-[0_0_28px_rgba(163,230,53,0.45)]"
            >
              <motion.span
                className="inline-flex items-center justify-center"
                aria-hidden
                whileHover={{ x: 3, y: -2 }}
                transition={{ type: "spring", stiffness: 420, damping: 22 }}
              >
                <ExternalLink className="h-4 w-4 opacity-90" />
              </motion.span>
              View CV
              <span
                className={`inline-flex shrink-0 items-center justify-center overflow-hidden transition-all duration-200 ease-out ${
                  altHeld
                    ? "ml-0.5 max-w-[1.25rem] translate-x-0 opacity-100"
                    : "max-w-0 -translate-x-1 opacity-0"
                }`}
                aria-hidden={!altHeld}
              >
                <Download className="h-3.5 w-3.5" />
              </span>
            </Link>

            <Link
              href="#projects"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-zinc-600 bg-zinc-900/50 px-6 py-3 text-sm font-semibold text-zinc-100 transition-all duration-300 hover:scale-105 hover:border-zinc-500 hover:bg-zinc-800/70"
            >
              View Projects
            </Link>

            <Link
              href="#stack"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900/40 px-6 py-3 text-sm font-medium text-zinc-100 transition-all duration-300 hover:scale-105 hover:border-zinc-500 hover:bg-zinc-800/60"
            >
              View Arsenal
            </Link>

            <Link
              href="https://www.github.com/satwikachanta-glitch"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/40 px-6 py-3 text-sm font-medium text-zinc-100 transition-all duration-300 hover:scale-105 hover:border-zinc-500 hover:bg-zinc-800/60"
            >
              <Code2 className="h-4 w-4" />
              GitHub
            </Link>

            <Link
              href="https://www.linkedin.com/in/satwik-achanta-710537293/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/40 px-6 py-3 text-sm font-medium text-zinc-100 transition-all duration-300 hover:scale-105 hover:border-lime-400/50 hover:bg-zinc-800/60"
            >
              <LinkIcon className="h-4 w-4" />
              LinkedIn
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll hint: link-sized touch target (44px) */}
        <motion.div
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 sm:bottom-8"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <Link
            href="#stack"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-900/40 hover:text-zinc-300"
            aria-label="Scroll to content"
          >
            <ChevronDown className="h-6 w-6" aria-hidden />
          </Link>
        </motion.div>
      </section>

      {/* --- TECH STACK SECTION --- */}
      <div className="relative z-20">
        <TechStack />
      </div>
      {/* --- PROJECTS SECTION --- */}
      <div className="relative z-30">
        <Projects />
      {/* --- VIBE CHECK SECTION --- */}
      <VibeBox />
      </div>
      {/* --- FOOTER SECTION --- */}
    <Footer />
    </main>

  );
}