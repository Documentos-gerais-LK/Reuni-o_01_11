import type { ReactNode } from "react";
import { motion } from "motion/react";
import { FileText, Info } from "lucide-react";
import { useNav } from "../lib/nav";

export function GlassCard({
  children,
  className = "",
  hover = false,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return <div className={`glass ${hover ? "glass-hover" : ""} ${className}`}>{children}</div>;
}

/** Chip de timestamp: abre o registro original na linha correspondente. */
export function Ts({ t }: { t: string }) {
  const { openTranscript } = useNav();
  return (
    <button
      type="button"
      onClick={() => openTranscript(t)}
      title={`Ver ${t} no registro original`}
      className="inline-flex items-center rounded-md border border-gold/30 bg-gold/10 px-1.5 py-0.5 font-mono text-[11px] text-gold-hi hover:bg-gold/25"
    >
      {t}
    </button>
  );
}

export function Sources({ list }: { list: string[] }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-1.5 text-[11px] text-mute">
      <FileText size={12} aria-hidden /> Fonte na reunião:
      {list.map((t) => (
        <Ts key={t} t={t} />
      ))}
    </div>
  );
}

export function Note({ children, tone = "info" }: { children: ReactNode; tone?: "info" | "warn" }) {
  return (
    <div
      className={`flex gap-2 rounded-xl border px-3 py-2 text-[13px] leading-snug ${
        tone === "warn" ? "border-amber-400/30 bg-amber-400/5 text-amber-100/90" : "border-gold/25 bg-gold/5 text-soft/80"
      }`}
    >
      <Info size={15} className="mt-0.5 shrink-0 text-gold-hi" aria-hidden />
      <div>{children}</div>
    </div>
  );
}

export function Badge({ children, tone = "gold" }: { children: ReactNode; tone?: "gold" | "green" | "blue" | "grey" | "red" }) {
  const map = {
    gold: "border-gold/40 bg-gold/10 text-gold-hi",
    green: "border-emerald-400/40 bg-emerald-400/10 text-emerald-200",
    blue: "border-sky-400/40 bg-sky-400/10 text-sky-200",
    grey: "border-white/15 bg-white/5 text-mute",
    red: "border-rose-400/40 bg-rose-400/10 text-rose-200",
  } as const;
  return <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${map[tone]}`}>{children}</span>;
}

export function SlideShell({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-6xl flex-col justify-center gap-5 px-5 pb-24 pt-20 sm:px-10">
      <header>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold">{eyebrow}</p>
        <h2 className="text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.6rem]">{title}</h2>
        {lead && <p className="mt-3 max-w-3xl text-base leading-relaxed text-mute sm:text-lg">{lead}</p>}
      </header>
      {children}
    </div>
  );
}

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const { reduced } = useNav();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedBackground() {
  return (
    <div className="aurora" aria-hidden>
      <div className="grid-bg" />
    </div>
  );
}
