"use client";

import { motion } from "framer-motion";

const terminalLine = "> Status: Architecting autonomous agents...";

export default function VibeBox() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <motion.article
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 240, damping: 18 }}
          className="relative aspect-square overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-md"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(161,161,170,0.18) 1px, transparent 0)",
              backgroundSize: "16px 16px",
            }}
          />
          <div className="relative flex h-full flex-col items-center justify-center text-center">
            <div className="relative mb-5 flex items-center justify-center">
              <motion.span
                className="absolute h-16 w-16 rounded-full border border-cyan-400/60"
                animate={{ scale: [0.8, 1.8], opacity: [0.5, 0] }}
                transition={{ duration: 2.2, ease: "easeOut", repeat: Number.POSITIVE_INFINITY }}
              />
              <motion.span
                className="absolute h-16 w-16 rounded-full border border-cyan-300/35"
                animate={{ scale: [0.9, 2.2], opacity: [0.35, 0] }}
                transition={{
                  duration: 2.2,
                  ease: "easeOut",
                  repeat: Number.POSITIVE_INFINITY,
                  delay: 0.7,
                }}
              />
              <span className="h-3.5 w-3.5 rounded-full bg-cyan-400 shadow-[0_0_24px_rgba(34,211,238,0.8)]" />
            </div>
            <p className="text-sm font-medium tracking-wide text-zinc-300">Visakhapatnam, IN</p>
          </div>
        </motion.article>

        <motion.article
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 240, damping: 18 }}
          className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-md md:col-span-2"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(132,204,22,0.2),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.22),transparent_45%)]" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 7, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
                className="relative h-16 w-16 shrink-0 rounded-full border border-zinc-700 bg-zinc-950/80"
              >
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  <circle cx="50" cy="50" r="42" fill="#09090b" stroke="#3f3f46" strokeWidth="2" />
                  <circle cx="50" cy="50" r="24" fill="none" stroke="#52525b" strokeWidth="1.6" />
                  <circle cx="50" cy="50" r="6" fill="#a3a3a3" />
                </svg>
              </motion.div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Now Playing</p>
                <p className="mt-1 text-base font-semibold text-zinc-100 md:text-lg">
                  90s Boom Bap Classics
                </p>
              </div>
            </div>

            <div className="flex items-end gap-1.5 self-start md:self-end" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((bar) => (
                <motion.span
                  key={bar}
                  className="w-1.5 rounded-full bg-lime-400/90"
                  animate={{ height: ["10px", "28px", "14px", "24px", "12px"] }}
                  transition={{
                    duration: 1 + bar * 0.2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>
        </motion.article>

        <motion.article
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 240, damping: 18 }}
          className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-md md:col-span-3"
        >
          <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/80">
            <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/90" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300/90" />
              <span className="h-2.5 w-2.5 rounded-full bg-lime-400/90" />
            </div>
            <div className="px-4 py-5 font-mono">
              <motion.p
                className="text-sm text-lime-300 md:text-base"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 2.4, ease: "easeInOut" }}
                style={{ whiteSpace: "nowrap", overflow: "hidden" }}
              >
                {terminalLine}
                <motion.span
                  className="ml-1 inline-block h-4 w-[2px] bg-lime-300 align-middle"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.9, repeat: Number.POSITIVE_INFINITY }}
                />
              </motion.p>

              <div className="mt-4 inline-flex items-center rounded-full border border-lime-400/30 bg-lime-500/10 px-3 py-1 text-xs font-semibold text-lime-300">
                Success: GITAM University | Batch of 2027
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
