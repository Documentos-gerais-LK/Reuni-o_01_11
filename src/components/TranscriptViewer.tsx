import { memo, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, ChevronUp, Copy, Check, Maximize2, Minimize2, Search } from "lucide-react";
import { FILE_URL } from "../lib/nav";
import { findRanges, TS_LINE } from "../lib/search";
import { DownloadButton } from "./DownloadButton";

const toSeconds = (ts: string) => ts.split(":").reduce((a, p) => a * 60 + Number(p), 0);

type Hit = { line: number; start: number; end: number };

const Line = memo(function Line({
  text,
  index,
  hits,
  activeHit,
  flash,
}: {
  text: string;
  index: number;
  hits: Hit[];
  activeHit: Hit | null;
  flash: boolean;
}) {
  const m = text.match(TS_LINE);
  const parts: Array<{ s: number; e: number; cls: string }> = [];
  if (m) {
    const tsEnd = m[1].length;
    const spEnd = tsEnd + 1 + m[3].length;
    parts.push({ s: 0, e: tsEnd, cls: "text-gold-hi font-semibold" });
    parts.push({ s: tsEnd + 1, e: spEnd, cls: m[3].startsWith("leo") ? "text-sky-300 font-medium" : "text-gold font-medium" });
  }
  // Fatia o texto em pedaços (estilo + marcação de busca) sem alterar um único caractere.
  const cuts = new Set<number>([0, text.length]);
  parts.forEach((p) => (cuts.add(p.s), cuts.add(p.e)));
  hits.forEach((h) => (cuts.add(h.start), cuts.add(h.end)));
  const pts = [...cuts].sort((a, b) => a - b);
  const nodes = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const [a, b] = [pts[i], pts[i + 1]];
    const cls = parts.find((p) => a >= p.s && b <= p.e)?.cls;
    const hit = hits.find((h) => a >= h.start && b <= h.end);
    const body = text.slice(a, b);
    const inner = cls ? <span className={cls}>{body}</span> : body;
    nodes.push(
      hit ? (
        <mark key={i} data-active={hit === activeHit ? "1" : undefined} className={`hit ${hit === activeHit ? "hit-active" : ""}`}>
          {inner}
        </mark>
      ) : (
        <span key={i}>{inner}</span>
      ),
    );
  }
  return (
    <div data-line={index} data-ts={m?.[1]} className={`whitespace-pre-wrap break-words rounded px-2 ${flash ? "bg-gold/20" : ""}`}>
      {text.length === 0 ? "​" : nodes}
    </div>
  );
});

export function TranscriptViewer({ target }: { target: { ts: string; n: number } | null }) {
  const [raw, setRaw] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [flashLine, setFlashLine] = useState<number | null>(null);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let alive = true;
    fetch(FILE_URL)
      .then((r) => (r.ok ? r.arrayBuffer() : Promise.reject()))
      // ignoreBOM: true mantém um eventual BOM, para a exibição refletir o arquivo como está.
      .then((buf) => alive && setRaw(new TextDecoder("utf-8", { ignoreBOM: true }).decode(buf)))
      .catch(() => alive && setError(true));
    return () => {
      alive = false;
    };
  }, []);

  const lines = useMemo(() => (raw === null ? [] : raw.split("\n")), [raw]);

  const hits = useMemo(() => {
    const all: Hit[] = [];
    if (!query.trim()) return all;
    lines.forEach((l, i) => findRanges(l, query).forEach(([s, e]) => all.push({ line: i, start: s, end: e })));
    return all;
  }, [lines, query]);

  useEffect(() => setActive(0), [query]);

  const hitsByLine = useMemo(() => {
    const map = new Map<number, Hit[]>();
    hits.forEach((h) => map.set(h.line, [...(map.get(h.line) ?? []), h]));
    return map;
  }, [hits]);

  const activeHit = hits[active] ?? null;

  useEffect(() => {
    box.current?.querySelector('mark[data-active="1"]')?.scrollIntoView({ block: "center" });
  }, [activeHit, hits]);

  // Navegação a partir de um chip de timestamp.
  useEffect(() => {
    if (!target || !lines.length || !box.current) return;
    const want = toSeconds(target.ts);
    let best = -1;
    lines.forEach((l, i) => {
      const m = l.match(TS_LINE);
      if (m && toSeconds(m[1]) <= want) best = i;
    });
    if (best < 0) return;
    setQuery("");
    setFlashLine(best);
    requestAnimationFrame(() => box.current?.querySelector(`[data-line="${best}"]`)?.scrollIntoView({ block: "center" }));
    const id = window.setTimeout(() => setFlashLine(null), 2600);
    return () => window.clearTimeout(id);
  }, [target, lines]);

  const copy = async () => {
    if (raw === null) return;
    try {
      await navigator.clipboard.writeText(raw);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = raw;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const step = (d: number) => hits.length && setActive((a) => (a + d + hits.length) % hits.length);

  return (
    <div className={expanded ? "fixed inset-0 z-50 flex flex-col bg-ink/95 p-3 sm:p-6" : "flex min-h-0 flex-1 flex-col"}>
      <div className="glass flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 border-b border-gold/20 p-3">
          <div className="flex min-w-[200px] flex-1 items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-2.5">
            <Search size={15} className="text-mute" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                e.stopPropagation();
                if (e.key === "Enter") step(e.shiftKey ? -1 : 1);
              }}
              placeholder="Buscar na transcrição…"
              aria-label="Buscar na transcrição"
              className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-mute"
            />
            {query && (
              <span className="whitespace-nowrap font-mono text-xs text-mute">{hits.length ? `${active + 1}/${hits.length}` : "0"}</span>
            )}
          </div>
          <button type="button" aria-label="Resultado anterior" onClick={() => step(-1)} className="rounded-lg border border-white/10 p-2 hover:border-gold/50">
            <ChevronUp size={15} />
          </button>
          <button type="button" aria-label="Próximo resultado" onClick={() => step(1)} className="rounded-lg border border-white/10 p-2 hover:border-gold/50">
            <ChevronDown size={15} />
          </button>
          <button type="button" onClick={copy} className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-sm hover:border-gold/50">
            {copied ? <Check size={15} /> : <Copy size={15} />} {copied ? "Copiado" : "Copiar texto"}
          </button>
          <DownloadButton compact />
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-label={expanded ? "Recolher visualizador" : "Expandir visualizador"}
            className="rounded-lg border border-white/10 p-2 hover:border-gold/50"
          >
            {expanded ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>
        </div>
        <div
          ref={box}
          tabIndex={0}
          role="region"
          aria-label="Transcrição original da reunião"
          onKeyDown={(e) => e.stopPropagation()}
          className="slide-scroll min-h-0 flex-1 overflow-y-auto p-3 font-mono text-[13px] leading-relaxed text-soft/90"
        >
          {error && <p className="text-rose-300">Não foi possível carregar o arquivo. Use “npm run preview” ou o botão de download.</p>}
          {raw === null && !error && <p className="text-mute">Carregando transcrição…</p>}
          {lines.map((l, i) => (
            <Line
              key={i}
              text={l}
              index={i}
              hits={hitsByLine.get(i) ?? []}
              activeHit={activeHit && activeHit.line === i ? activeHit : null}
              flash={flashLine === i}
            />
          ))}
        </div>
      </div>
      <p className="mt-2 text-center text-[12px] text-mute">
        Transcrição automatizada, preservada conforme o registro original. Pode conter imprecisões de reconhecimento de voz.
      </p>
    </div>
  );
}
