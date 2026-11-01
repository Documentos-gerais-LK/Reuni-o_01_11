import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, X, ArrowRight } from "lucide-react";
import { GlassCard, Reveal, Sources, SlideShell, Note } from "../components/ui";
import { useNav } from "../lib/nav";

export function Cover() {
  const { reduced } = useNav();
  return (
    <div className="mx-auto flex min-h-full max-w-5xl flex-col items-center justify-center gap-6 px-6 pb-20 pt-16 text-center">
      <motion.img
        src="./brand/lk-marca.png"
        alt="Marca LK Technologies Brasil"
        className="h-24 w-auto drop-shadow-[0_0_30px_rgb(200_164_93/0.35)] sm:h-32"
        initial={reduced ? false : { opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
      <Reveal delay={0.25}>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">LK Technologies Brasil</p>
      </Reveal>
      <Reveal delay={0.4}>
        <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          COMO DESENVOLVEMOS <span className="gold-text">SOFTWARE NA LK</span>
        </h1>
      </Reveal>
      <Reveal delay={0.55}>
        <p className="max-w-2xl text-lg text-mute sm:text-xl">Metodologia, ferramentas, responsabilidades e rastreabilidade</p>
      </Reveal>
      <Reveal delay={0.7}>
        <GlassCard className="flex flex-col gap-1 px-6 py-4 text-sm text-soft/85 sm:flex-row sm:gap-6">
          <span>Reunião entre Lukas Alexandre Rosa e Leonardo Kirime (Léo)</span>
          <span className="hidden text-gold sm:inline">•</span>
          <span>01 de novembro de 2026</span>
        </GlassCard>
      </Reveal>
      <Reveal delay={0.85}>
        <p className="flex items-center gap-2 text-sm text-mute">
          Use <kbd className="rounded border border-white/20 px-1.5">→</kbd> para avançar <ArrowRight size={14} aria-hidden />
        </p>
      </Reveal>
    </div>
  );
}

export function Purpose() {
  const items = [
    ["Como Lukas planeja", "Conversa com o ChatGPT, pesquisa e concepts visuais."],
    ["Como organiza", "Epics e Issues no GitHub, com critérios de aceite."],
    ["Como desenvolve", "Claude Code implementa, abre PRs e corrige o que o CI aponta."],
    ["Como valida", "Testes automáticos e homologação humana antes de seguir."],
  ];
  return (
    <SlideShell
      eyebrow="Capítulo 01 · Contexto"
      title="Por que tivemos esta reunião?"
      lead="Lukas mostrou ao Léo a forma como desenvolve software hoje, para criar uma base de trabalho compartilhada entre os sócios."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map(([t, d], i) => (
          <Reveal key={t} delay={0.1 * i}>
            <GlassCard className="h-full p-5">
              <p className="text-xs font-semibold text-gold">0{i + 1}</p>
              <h3 className="mt-1 text-lg font-semibold">{t}</h3>
              <p className="mt-1 text-sm text-mute">{d}</p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
      <Note>
        Este não é um material comercial. É um alinhamento interno entre sócios. Lukas disse que Léo tem que usar, e Léo concordou:
        a ideia é aprender usando (01:11:26–01:11:29).
      </Note>
      <Sources list={["07:50", "08:21", "30:42", "01:11:26"]} />
    </SlideShell>
  );
}

const before = [
  "Demandas concentradas em conversas",
  "Desenvolvimento com menos organização formal",
  "Contexto fragmentado entre chat e Claude Code",
  "Difícil acompanhar o progresso",
  "Validações menos estruturadas",
  "Histórico difícil de reconstruir",
];
const after = [
  "Necessidades documentadas",
  "Pesquisa e planejamento",
  "Especificações com critérios de aceite",
  "Issues e Epics no GitHub",
  "Implementações versionadas e Pull Requests",
  "CI, testes e homologação",
  "Histórico rastreável",
];

export function BeforeAfter() {
  const [mode, setMode] = useState<"antes" | "agora">("antes");
  const list = mode === "antes" ? before : after;
  return (
    <SlideShell
      eyebrow="Capítulo 01 · Contexto"
      title="Antes e agora"
      lead="A evolução descrita por Lukas. Ela melhora o controle, mas não afirma que todos os problemas estão resolvidos."
    >
      <div role="tablist" aria-label="Comparação" className="flex w-fit gap-1 rounded-xl border border-gold/25 bg-black/30 p-1">
        {(["antes", "agora"] as const).map((m) => (
          <button
            key={m}
            role="tab"
            aria-selected={mode === m}
            onClick={() => setMode(m)}
            className={`rounded-lg px-5 py-2 text-sm font-semibold uppercase tracking-wider transition ${
              mode === m ? "bg-gold text-ink" : "text-mute hover:text-soft"
            }`}
          >
            {m}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.ul
          key={mode}
          initial={{ opacity: 0, x: mode === "agora" ? 24 : -24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="grid gap-2.5 sm:grid-cols-2"
        >
          {list.map((t) => (
            <li key={t} className="glass flex items-center gap-3 px-4 py-3 text-[15px]">
              {mode === "antes" ? <X size={18} className="shrink-0 text-rose-300" aria-hidden /> : <Check size={18} className="shrink-0 text-emerald-300" aria-hidden />}
              {t}
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>
      <p className="max-w-3xl text-sm text-mute">
        Segundo Lukas: antes, o escopo ficava numa conversa; o Claude Code dizia uma coisa e o chat outra. Hoje fica tudo registrado no
        histórico do Git, e “se está pronto” tem como comprovar, com teste, PR e homologação.
      </p>
      <Sources list={["31:08", "32:23", "01:25:49"]} />
    </SlideShell>
  );
}
