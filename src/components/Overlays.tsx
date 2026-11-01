import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { chapters, faq, glossary } from "../content/method";
import { Ts } from "./ui";

export function Drawer({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className="glass slide-scroll h-full w-full max-w-md overflow-y-auto !rounded-none bg-graphite/95 p-5 outline-none"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gold-hi">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Fechar" className="rounded-lg border border-white/10 p-1.5 hover:border-gold/50">
            <X size={16} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function GlossaryPanel({ onClose }: { onClose: () => void }) {
  return (
    <Drawer title="Glossário" onClose={onClose}>
      <dl className="flex flex-col gap-3">
        {glossary.map((g) => (
          <div key={g.term}>
            <dt className="text-sm font-semibold text-gold-hi">{g.term}</dt>
            <dd className="text-sm text-soft/85">{g.def}</dd>
          </div>
        ))}
      </dl>
    </Drawer>
  );
}

export function FaqPanel({ onClose }: { onClose: () => void }) {
  return (
    <Drawer title="Perguntas que o Léo poderia fazer" onClose={onClose}>
      <div className="flex flex-col gap-2">
        {faq.map((f) => (
          <details key={f.q} className="glass px-3 py-2">
            <summary className="cursor-pointer text-sm font-medium">{f.q}</summary>
            <p className="mt-2 text-sm text-soft/85">{f.a}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {f.sources.map((s) => (
                <Ts key={s} t={s} />
              ))}
            </div>
          </details>
        ))}
      </div>
    </Drawer>
  );
}

export function IndexPanel({
  slides,
  current,
  onPick,
  onClose,
}: {
  slides: Array<{ title: string; chapter: number }>;
  current: number;
  onPick: (i: number) => void;
  onClose: () => void;
}) {
  return (
    <Drawer title="Índice" onClose={onClose}>
      <nav aria-label="Capítulos e slides" className="flex flex-col gap-4">
        {chapters.map((c) => (
          <div key={c.id}>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              Capítulo 0{c.id} · {c.title}
            </p>
            <ul className="flex flex-col">
              {slides.map((s, i) =>
                s.chapter === c.id ? (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => onPick(i)}
                      aria-current={i === current ? "page" : undefined}
                      className={`flex w-full gap-3 rounded-lg px-2 py-1.5 text-left text-sm hover:bg-white/5 ${i === current ? "bg-gold/10 text-gold-hi" : "text-soft/85"}`}
                    >
                      <span className="w-6 shrink-0 font-mono text-xs text-mute">{String(i + 1).padStart(2, "0")}</span>
                      {s.title}
                    </button>
                  </li>
                ) : null,
              )}
            </ul>
          </div>
        ))}
      </nav>
    </Drawer>
  );
}
