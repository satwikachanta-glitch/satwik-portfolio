"use client";

import { Search } from "lucide-react";
import { COMMAND_PALETTE_OPEN_EVENT } from "@/lib/commandPalette";

export default function MobileCommandTrigger() {
  return (
    <button
      type="button"
      onClick={() => {
        window.dispatchEvent(new CustomEvent(COMMAND_PALETTE_OPEN_EVENT));
      }}
      className="fixed z-[95] flex h-11 w-11 items-center justify-center rounded-full border border-zinc-700/80 bg-zinc-900/70 text-zinc-200 shadow-lg backdrop-blur-md transition-colors hover:border-zinc-600 hover:bg-zinc-800/80 active:bg-zinc-800 md:hidden bottom-[max(1.5rem,env(safe-area-inset-bottom,0px))] left-[max(1.5rem,env(safe-area-inset-left,0px))]"
      aria-label="Open command menu"
    >
      <Search className="h-5 w-5 shrink-0" aria-hidden />
    </button>
  );
}
