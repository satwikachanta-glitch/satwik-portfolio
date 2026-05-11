"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Copy,
  FileText,
  Folder,
  Search,
  X,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentType,
  type KeyboardEvent as ReactKeyboardEvent,
  type SVGProps,
} from "react";
import { COMMAND_PALETTE_OPEN_EVENT } from "@/lib/commandPalette";

const EMAIL = "satwikachanta2005@gmail.com";
const GITHUB_URL = "https://www.github.com/satwikachanta-glitch";
const LINKEDIN_URL =
  "https://www.linkedin.com/in/satwik-achanta-710537293/";
const RESUME_PDF_URL = "/resume.pdf";

/** lucide-react@1.14 does not ship GitHub/LinkedIn brand icons — local SVGs keep the same names. */
function Github(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function Linkedin(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0c0 1.139-.924 2.065-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

type CommandAction = {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  /** Shown in UI after the Alt / ⌥ prefix, e.g. "P" → "⌥ P". */
  hintKey: string;
  run: () => void;
};

function useAltKbdPrefix() {
  const [prefix, setPrefix] = useState("Alt");

  useEffect(() => {
    const isMac =
      typeof navigator !== "undefined" &&
      /Mac|iPod|iPhone|iPad/i.test(navigator.userAgent);
    setPrefix(isMac ? "⌥" : "Alt");
  }, []);

  return prefix;
}

export default function CommandMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [copyToast, setCopyToast] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const copyToastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const titleId = useId();
  const altKbdPrefix = useAltKbdPrefix();

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      return;
    }
    setCopyToast(true);
    if (copyToastTimeoutRef.current) clearTimeout(copyToastTimeoutRef.current);
    copyToastTimeoutRef.current = setTimeout(() => {
      setCopyToast(false);
      copyToastTimeoutRef.current = null;
    }, 2000);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setActiveIndex(0);
    setCopyToast(false);
    if (copyToastTimeoutRef.current) {
      clearTimeout(copyToastTimeoutRef.current);
      copyToastTimeoutRef.current = null;
    }
  }, []);

  const commands: CommandAction[] = [
    {
      id: "projects",
      label: "View Projects",
      icon: Folder,
      hintKey: "P",
      run: () => {
        close();
        document.getElementById("projects")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      },
    },
    {
      id: "email",
      label: "Copy Email",
      icon: Copy,
      hintKey: "C",
      run: () => {
        void handleCopyEmail();
      },
    },
    {
      id: "github",
      label: "GitHub",
      icon: Github,
      hintKey: "G",
      run: () => {
        window.open(GITHUB_URL, "_blank", "noopener,noreferrer");
        close();
      },
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: Linkedin,
      hintKey: "L",
      run: () => {
        window.open(LINKEDIN_URL, "_blank", "noopener,noreferrer");
        close();
      },
    },
    {
      id: "resume",
      label: "View Resume / CV",
      icon: FileText,
      hintKey: "R",
      run: () => {
        window.open(RESUME_PDF_URL, "_blank", "noopener,noreferrer");
        close();
      },
    },
  ];

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.trim().toLowerCase()),
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    const onOpenRequest = () => {
      setIsOpen(true);
    };
    window.addEventListener(COMMAND_PALETTE_OPEN_EVENT, onOpenRequest);
    return () =>
      window.removeEventListener(COMMAND_PALETTE_OPEN_EVENT, onOpenRequest);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isK = e.code === "KeyK" || e.key.toLowerCase() === "k";
      if ((e.metaKey || e.ctrlKey) && isK) {
        e.preventDefault();
        setIsOpen((open) => {
          const next = !open;
          if (!next) {
            setQuery("");
            setActiveIndex(0);
            setCopyToast(false);
          }
          return next;
        });
        return;
      }

      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        close();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  /** Site-wide Alt + letter shortcuts (capture: runs before menu search input). */
  useEffect(() => {
    const onKeyDownCapture = (e: KeyboardEvent) => {
      if (!e.altKey || e.metaKey || e.ctrlKey || e.repeat) return;

      const searchFocused = document.activeElement === inputRef.current;
      const skipAltChordsWhileFiltering =
        isOpen && searchFocused && query.trim().length > 0;
      if (skipAltChordsWhileFiltering) return;

      const code = e.code;
      const keyHandlers: Record<string, () => void> = {
        KeyR: () => {
          window.open(RESUME_PDF_URL, "_blank", "noopener,noreferrer");
          if (isOpen) close();
        },
        KeyG: () => {
          window.open(GITHUB_URL, "_blank", "noopener,noreferrer");
          if (isOpen) close();
        },
        KeyL: () => {
          window.open(LINKEDIN_URL, "_blank", "noopener,noreferrer");
          if (isOpen) close();
        },
        KeyP: () => {
          if (isOpen) close();
          document.getElementById("projects")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        },
        KeyC: () => {
          void handleCopyEmail();
        },
      };

      const run = keyHandlers[code];
      if (!run) return;

      e.preventDefault();
      e.stopPropagation();
      run();
    };

    window.addEventListener("keydown", onKeyDownCapture, true);
    return () => window.removeEventListener("keydown", onKeyDownCapture, true);
  }, [isOpen, query, close, handleCopyEmail]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const id = window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
    return () => window.cancelAnimationFrame(id);
  }, [isOpen]);

  useEffect(
    () => () => {
      if (copyToastTimeoutRef.current) clearTimeout(copyToastTimeoutRef.current);
    },
    [],
  );

  const onMenuKeyDown = (e: ReactKeyboardEvent<HTMLElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) =>
        filtered.length ? (i + 1) % filtered.length : 0,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) =>
        filtered.length ? (i - 1 + filtered.length) % filtered.length : 0,
      );
    } else if (e.key === "Enter" && filtered.length > 0) {
      const target = e.target as HTMLElement;
      const fromSearch = target.tagName === "INPUT";
      const fromOption = target.getAttribute("role") === "option";
      if (fromSearch || fromOption) {
        e.preventDefault();
        void filtered[activeIndex]?.run();
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen ? (
        <motion.div
          key="command-palette"
          className="fixed inset-0 z-[100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
            aria-hidden="true"
            onClick={close}
            role="presentation"
          />
          <div className="relative flex h-full max-h-[100dvh] items-start justify-center overflow-y-auto p-4 pt-[15vh] sm:pt-[20vh] pointer-events-none">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 6 }}
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
              className="pointer-events-auto w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/90 shadow-2xl ring-1 ring-white/5 backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={onMenuKeyDown}
            >
              <h2 id={titleId} className="sr-only">
                Command menu
              </h2>
              <div className="flex items-center gap-2 border-b border-zinc-800/80 px-3 py-3 sm:px-4">
                <Search
                  className="h-5 w-5 shrink-0 text-zinc-500"
                  aria-hidden
                />
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search commands…"
                  className="min-w-0 flex-1 bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 outline-none"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  aria-label="Search commands"
                  aria-controls="command-listbox"
                  aria-activedescendant={
                    filtered[activeIndex]
                      ? `command-option-${filtered[activeIndex].id}`
                      : undefined
                  }
                />
                <button
                  type="button"
                  onClick={close}
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-zinc-700/80 bg-zinc-950/50 text-zinc-400 transition-colors hover:bg-zinc-800/80 hover:text-zinc-200"
                  aria-label="Close command menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <ul
                id="command-listbox"
                className="max-h-[min(60vh,24rem)] overflow-y-auto p-2"
                role="listbox"
                aria-label="Commands"
              >
                {filtered.length === 0 ? (
                  <li className="px-3 py-8 text-center text-sm text-zinc-500">
                    No commands match.
                  </li>
                ) : (
                  filtered.map((cmd, index) => {
                    const Icon = cmd.icon;
                    const selected = index === activeIndex;
                    return (
                      <li key={cmd.id} role="presentation">
                        <button
                          type="button"
                          id={`command-option-${cmd.id}`}
                          role="option"
                          aria-selected={selected}
                          className={`flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-zinc-200 transition-colors hover:bg-zinc-800/50 sm:py-3 ${
                            selected ? "bg-zinc-800/50" : ""
                          }`}
                          onMouseEnter={() => setActiveIndex(index)}
                          onClick={() => void cmd.run()}
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-700/80 bg-zinc-950/40">
                            <Icon className="h-4 w-4 text-zinc-300" />
                          </span>
                          <span className="min-w-0 flex-1 font-medium">
                            {cmd.label}
                          </span>
                          <kbd
                            className="inline-flex shrink-0 items-center gap-0.5 rounded border border-zinc-600 bg-zinc-950/80 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-zinc-400"
                            aria-label={`${altKbdPrefix} ${cmd.hintKey}`}
                          >
                            <span className="text-zinc-500">{altKbdPrefix}</span>
                            <span className="text-zinc-500" aria-hidden>
                              +
                            </span>
                            <span>{cmd.hintKey}</span>
                          </kbd>
                        </button>
                      </li>
                    );
                  })
                )}
              </ul>

              <AnimatePresence>
                {copyToast ? (
                  <motion.div
                    key="copy-toast"
                    role="status"
                    aria-live="polite"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-zinc-800/80 bg-lime-500/10 px-4 py-3 text-center text-sm font-medium text-lime-300"
                  >
                    Copied!
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
