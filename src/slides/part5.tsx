import { BookOpen } from "lucide-react";
import { Badge, GlassCard, Reveal, Ts } from "../components/ui";
import { DownloadButton } from "../components/DownloadButton";
import { TranscriptViewer } from "../components/TranscriptViewer";
import { GUIDE_NAME, GUIDE_URL } from "../lib/nav";
import { joint, leo, lukas } from "../content/pendings";
import type { Pending, Status } from "../content/types";

export function Record({ target }: { target: { ts: string; n: number } | null }) {
  return (
    <div className="mx-auto flex h-full w-full max-w-6xl flex-col gap-3 px-4 pb-20 pt-16 sm:px-8">
      <header className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Capítulo 05 · Registro</p>
          <h2 className="text-2xl font-semibold sm:text-3xl">REGISTRO ORIGINAL DA REUNIÃO</h2>
        </div>
        <p className="text-sm text-mute">Reunião de 01/11/2026 · início 15:56:48 · duração 103 min</p>
      </header>
      <TranscriptViewer target={target} />
    </div>
  );
}

const tone: Record<Status, "green" | "gold" | "blue"> = { Combinado: "green", "A validar": "gold", "Ideia em estudo": "blue" };

function Block({ title, who, items }: { title: string; who: string; items: Pending[] }) {
  return (
    <GlassCard className="flex flex-col p-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">{title}</p>
      <h3 className="mb-2 text-lg font-semibold">{who}</h3>
      <ul className="flex flex-col gap-2.5">
        {items.map((p) => (
          <li key={p.text} className="border-t border-white/5 pt-2 first:border-0 first:pt-0">
            <div className="flex items-start gap-2">
              <Badge tone={tone[p.status]}>{p.status}</Badge>
              <p className="text-[13px] leading-snug text-soft/90">{p.text}</p>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-1 pl-0.5">
              {p.sources.map((s) => (
                <Ts key={s} t={s} />
              ))}
              {p.note && <span className="text-[11px] text-mute">{p.note}</span>}
            </div>
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}

export function NextSteps() {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-7xl flex-col justify-center gap-4 px-4 pb-24 pt-16 sm:px-8">
      <Reveal>
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Capítulo 05 · Encaminhamentos</p>
          <h2 className="text-2xl font-semibold sm:text-4xl">PRÓXIMOS PASSOS — LK TECHNOLOGIES BRASIL</h2>
          <p className="mt-1 text-lg text-mute">O que ficou encaminhado após nossa reunião?</p>
        </header>
      </Reveal>
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <DownloadButton />
        <a
          href={GUIDE_URL}
          download={GUIDE_NAME}
          className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm text-soft/85 transition hover:border-gold/60 hover:text-gold-hi"
        >
          <BookOpen size={16} aria-hidden /> Guia prático de aplicação (.md)
        </a>
      </div>
      <div className="grid gap-3 lg:grid-cols-3">
        <Block title="Bloco A" who="Lukas" items={lukas} />
        <Block title="Bloco B" who="Léo" items={leo} />
        <Block title="Bloco C" who="Decisões conjuntas" items={joint} />
      </div>
      <p className="text-xs text-mute">
        Nenhum prazo foi inventado: quando a reunião não definiu, o item aparece sem data. “Amanhã” na transcrição significa 02/11/2026.
      </p>
    </div>
  );
}
