"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function Spotlight() {
  const [isMounted, setIsMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    setIsMounted(true);
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    const moveTo = (clientX: number, clientY: number) => {
      mouseX.set(clientX);
      mouseY.set(clientY);
    };

    /** Pointer events cover mouse + most touch/pen on modern browsers. */
    const onPointerMove = (e: PointerEvent) => {
      moveTo(e.clientX, e.clientY);
    };

    /** iOS / legacy: explicit touch tracking so the glow follows the finger. */
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) moveTo(t.clientX, t.clientY);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
    };
  }, [mouseX, mouseY]);

  const background = useMotionTemplate`radial-gradient(600px at ${springX}px ${springY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
  const gridMask = useMotionTemplate`radial-gradient(260px at ${springX}px ${springY}px, black 20%, transparent 80%)`;

  if (!isMounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <motion.div className="absolute inset-0" style={{ background }} />
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(161,161,170,0.22) 1px, transparent 0)",
          backgroundSize: "22px 22px",
          maskImage: gridMask,
          WebkitMaskImage: gridMask,
        }}
      />
    </div>
  );
}
