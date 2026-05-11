"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { COMMAND_PALETTE_OPEN_EVENT } from "@/lib/commandPalette";

export default function ShortcutHint() {
  const pillRef = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);
  const [finePointer, setFinePointer] = useState(false);

  const pullX = useMotionValue(0);
  const pullY = useMotionValue(0);
  const springX = useSpring(pullX, { stiffness: 150, damping: 20 });
  const springY = useSpring(pullY, { stiffness: 150, damping: 20 });

  const shortcutLabel =
    typeof navigator !== "undefined" &&
    /Mac|iPod|iPhone|iPad/i.test(navigator.userAgent)
      ? "Press ⌘ + K to navigate"
      : "Press Ctrl + K to navigate";

  const openCommandMenu = useCallback(() => {
    window.dispatchEvent(new CustomEvent(COMMAND_PALETTE_OPEN_EVENT));
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (hover: hover)");
    const sync = () => setFinePointer(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!finePointer) {
      pullX.set(0);
      pullY.set(0);
      return;
    }

    const onPointerMove = (e: PointerEvent) => {
      const el = pillRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const radius = 100;

      if (dist > 0 && dist < radius) {
        const strength = 1 - dist / radius;
        pullX.set(dx * 0.14 * strength);
        pullY.set(dy * 0.14 * strength);
      } else {
        pullX.set(0);
        pullY.set(0);
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [finePointer, pullX, pullY]);

  const resetPull = useCallback(() => {
    pullX.set(0);
    pullY.set(0);
  }, [pullX, pullY]);

  if (!finePointer) return null;

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[80] hidden [@media(pointer:fine)_and_(hover:hover)]:block">
      <motion.div
        style={{ x: springX, y: springY }}
        className="pointer-events-auto inline-block"
      >
        <motion.button
          ref={pillRef}
          type="button"
          layout
          transition={{
            layout: { type: "spring", stiffness: 380, damping: 28 },
          }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => {
            setHovered(false);
            resetPull();
          }}
          onPointerLeave={resetPull}
          onClick={openCommandMenu}
          className="flex min-h-11 max-w-[min(100vw-3rem,28rem)] cursor-pointer items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/40 px-3 py-2 text-left text-sm text-zinc-400 shadow-lg backdrop-blur-md transition-colors hover:border-zinc-700 hover:text-zinc-300"
          aria-label="Open site command menu. Keyboard shortcut Control K or Command K."
        >
          <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
            <span className="absolute inset-0 animate-ping rounded-full bg-lime-400 opacity-60" />
            <span className="relative block h-2 w-2 rounded-full bg-lime-400" />
          </span>
          <span className="shrink-0 whitespace-nowrap font-medium tracking-tight text-zinc-300">
            Site OS
          </span>
          <AnimatePresence initial={false} mode="popLayout">
            {hovered ? (
              <motion.span
                key="hint"
                layout
                initial={{ opacity: 0, scale: 0.92, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.96, filter: "blur(2px)" }}
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
                className="min-w-0 whitespace-nowrap pl-1 text-xs text-zinc-400"
              >
                {shortcutLabel}
              </motion.span>
            ) : null}
          </AnimatePresence>
        </motion.button>
      </motion.div>
    </div>
  );
}
