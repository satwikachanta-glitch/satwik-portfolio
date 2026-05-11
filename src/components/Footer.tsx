"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Headphones, MapPin, Terminal } from "lucide-react";

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText("satwikachanta2005@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="relative overflow-hidden border-t border-zinc-900 bg-zinc-950 px-6 pt-32 pb-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
        <h2 className="select-none text-center text-[15vw] leading-none font-black tracking-tighter text-zinc-800/50 transition-colors duration-500 hover:text-zinc-700">
          LET&apos;S BUILD.
        </h2>

        <motion.button
          type="button"
          onClick={handleCopy}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="-mt-3 inline-flex min-h-11 cursor-pointer items-center justify-center gap-3 rounded-full border border-zinc-700 bg-zinc-900/80 px-8 py-3 text-zinc-200 backdrop-blur-md transition-all hover:bg-zinc-800 sm:py-4"
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="copied"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center gap-3"
              >
                <Check className="h-5 w-5 text-lime-400" />
                <span className="text-sm font-medium">Copied to clipboard! ✌️</span>
              </motion.span>
            ) : (
              <motion.span
                key="default"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center gap-3"
              >
                <Copy className="h-5 w-5 text-zinc-300" />
                <span className="text-sm font-medium">satwikachanta2005@gmail.com</span>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        <div className="mt-24 flex w-full flex-wrap items-center justify-between gap-4 text-xs font-medium text-zinc-500">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-lime-500 animate-pulse" />
            <span>Available for 2026 Internships</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              <span>Visakhapatnam, IN</span>
            </div>
            <div className="inline-flex items-center gap-1.5">
              <Headphones className="h-3.5 w-3.5" />
              <span>Vibing to 90s Boom Bap</span>
            </div>
            <div className="inline-flex items-center gap-1.5">
              <Terminal className="h-3.5 w-3.5" />
              <span>Built with Agentic AI</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
