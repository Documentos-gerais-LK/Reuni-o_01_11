import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BookText, ChevronLeft, ChevronRight, HelpCircle, ListTree, Maximize, Minimize } from "lucide-react";
import { AnimatedBackground } from "./components/ui";
import { FaqPanel, GlossaryPanel, IndexPanel } from "./components/Overlays";
import { NavContext } from "./lib/nav";
import { BeforeAfter, Cover, Purpose } from "./slides/part1";
import { Concepts, NeedSlide, Overview, Research, WhoDoesWhat } from "./slides/part2";
import { CI, GitHubSlide, Homologation, Implementation, Publish, Spec } from "./slides/part3";
import { CaseGlass, Ideas, LeoJourney, TaskPanel, Tools, Traceability } from "./slides/part4";
import { NextSteps, Record } from "./slides/part5";
import { chapters } from "./content/method";

type Target = { ts: string; n: number } | null;

interface SlideDef {
  title: string;
  chapter: number;
  render: (target: Target) => ReactNode;
}

const slides: SlideDef[] = [
  { title: "Capa", chapter: 1, render: () => <Cover /> },
  { title: "Por que tivemos esta reunião?", chapter: 1, render: () => <Purpose /> },
  { title: "Antes e agora", chapter: 1, render: () => <BeforeAfter /> },
  { title: "Visão geral da metodologia", chapter: 2, render: () => <Overview /> },
  { title: "Quem faz o quê?", chapter: 2, render: () => <WhoDoesWhat /> },
  { title: "Necessidade", chapter: 2, render: () => <NeedSlide /> },
  { title: "Pesquisa e refinamento", chapter: 2, render: () => <Research /> },
  { title: "Concepts visuais", chapter: 2, render: () => <Concepts /> },
  { title: "Especificação e organização", chapter: 2, render: () => <Spec /> },
  { title: "GitHub e rastreabilidade", chapter: 2, render: () => <GitHubSlide /> },
  { title: "Implementação com Claude Code", chapter: 2, render: () => <Implementation /> },
  { title: "CI e testes automatizados", chapter: 2, render: () => <CI /> },
  { title: "Homologação humana", chapter: 2, render: () => <Homologation /> },
  { title: "Publicação", chapter: 2, render: () => <Publish /> },
  { title: "Caso real: LK Glass Motion", chapter: 3, render: () => <CaseGlass /> },
  { title: "Ferramentas e produtividade", chapter: 3, render: () => <Tools /> },
  { title: "Como o Léo pode aplicar", chapter: 3, render: () => <LeoJourney /> },
  { title: "Rastreabilidade e colaboração", chapter: 3, render: () => <Traceability /> },
  { title: "Painel de tarefas (concept)", chapter: 4, render: () => <TaskPanel /> },
  { title: "Outras ideias mencionadas", chapter: 4, render: () => <Ideas /> },
  { title: "Registro original da reunião", chapter: 5, render: (t) => <Record target={t} /> },
  { title: "Próximos passos", chapter: 5, render: () => <NextSteps /> },
];

const RECORD_INDEX = slides.findIndex((s) => s.title.startsWith("Registro"));
const clamp = (n: number) => Math.min(slides.length - 1, Math.max(0, n));
const fromHash = () => {
  const n = parseInt(window.location.hash.replace(/^#\/?/, ""), 10);
  return Number.isFinite(n) ? clamp(n - 1) : 0;
};

export default function App() {
  const [index, setIndex] = useState(fromHash);
  const [dir, setDir] = useState(1);
  const [panel, setPanel] = useState<null | "index" | "glossary" | "faq">(null);
  const [target, setTarget] = useState<Target>(null);
  const [full, setFull] = useState(false);
  const reduced = !!useReducedMotion();

  const goTo = useCallback((i: number) => {
    setIndex((cur) => {
      const next = clamp(i);
      setDir(next >= cur ? 1 : -1);
      return next;
    });
    setPanel(null);
  }, []);

  useEffect(() => {
    window.history.replaceState(null, "", `#/${index + 1}`);
    document.title = `${index + 1}/${slides.length} · ${slides[index].title} — LK Technologies Brasil`;
  }, [index]);

  useEffect(() => {
    const onHash = () => setIndex(fromHash());
    const onFs = () => setFull(!!document.fullscreenElement);
    window.addEventListener("hashchange", onHash);
    document.addEventListener("fullscreenchange", onFs);
    return () => {
      window.removeEventListener("hashchange", onHash);
      document.removeEventListener("fullscreenchange", onFs);
    };
  }, []);

  const toggleFull = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void document.documentElement.requestFullscreen?.().catch(() => {});
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("input, textarea, select, [contenteditable]") || e.ctrlKey || e.metaKey || e.altKey) return;
      if (panel && e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
          return goTo(index + 1);
        case "ArrowLeft":
        case "PageUp":
          return goTo(index - 1);
        case "Home":
          return goTo(0);
        case "End":
          return goTo(slides.length - 1);
        case "f":
        case "F":
          return toggleFull();
        case "i":
        case "I":
        case "Escape":
          return setPanel("index");
        case "g":
        case "G":
          return setPanel("glossary");
        case "?":
          return setPanel("faq");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, panel, goTo, toggleFull]);

  const nav = useMemo(
    () => ({
      openTranscript: (ts: string) => {
        setTarget((t) => ({ ts, n: (t?.n ?? 0) + 1 }));
        setDir(1);
        setIndex(RECORD_INDEX);
        setPanel(null);
      },
      goTo,
      openGlossary: () => setPanel("glossary"),
      openFaq: () => setPanel("faq"),
      reduced,
    }),
    [goTo, reduced],
  );

  const slide = slides[index];
  const chapter = chapters.find((c) => c.id === slide.chapter);
  const btn = "grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-black/30 backdrop-blur hover:border-gold/60 disabled:opacity-30";

  return (
    <NavContext.Provider value={nav}>
      <div className="relative h-full w-full overflow-hidden">
        <AnimatedBackground />
        <div className="absolute inset-x-0 top-0 z-30 h-1 bg-white/5" role="progressbar" aria-valuemin={1} aria-valuemax={slides.length} aria-valuenow={index + 1} aria-label="Progresso da apresentação">
          <motion.div className="h-full bg-gradient-to-r from-gold to-gold-hi" animate={{ width: `${((index + 1) / slides.length) * 100}%` }} transition={{ duration: reduced ? 0 : 0.4 }} />
        </div>

        <header className="absolute inset-x-0 top-1 z-30 flex items-center justify-between gap-2 px-3 py-2 sm:px-5">
          <div className="flex min-w-0 items-center gap-2.5">
            <button type="button" onClick={() => setPanel("index")} className={btn} aria-label="Abrir índice (tecla I)" title="Índice (I)">
              <ListTree size={17} />
            </button>
            <img src="./brand/lk-marca.png" alt="" className="h-7 w-auto" />
            <span className="hidden truncate text-xs text-mute sm:block">
              Capítulo 0{slide.chapter} · {chapter?.title}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setPanel("glossary")} className={btn} aria-label="Glossário (tecla G)" title="Glossário (G)">
              <BookText size={17} />
            </button>
            <button type="button" onClick={() => setPanel("faq")} className={btn} aria-label="Perguntas do Léo (tecla ?)" title="Perguntas (?)">
              <HelpCircle size={17} />
            </button>
            <button type="button" onClick={toggleFull} className={btn} aria-label={full ? "Sair da tela cheia" : "Tela cheia (tecla F)"} title="Tela cheia (F)">
              {full ? <Minimize size={17} /> : <Maximize size={17} />}
            </button>
          </div>
        </header>

        <main className="absolute inset-0">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={index}
              custom={dir}
              initial={reduced ? false : { opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, x: dir * -40 }}
              transition={{ duration: reduced ? 0 : 0.28, ease: "easeOut" }}
              className="slide-scroll h-full overflow-y-auto"
              aria-live="polite"
            >
              {slide.render(target)}
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="absolute inset-x-0 bottom-0 z-30 flex items-center justify-between px-3 py-3 sm:px-5">
          <button type="button" onClick={() => goTo(index - 1)} disabled={index === 0} className={btn} aria-label="Slide anterior">
            <ChevronLeft size={18} />
          </button>
          <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 font-mono text-xs text-mute backdrop-blur">
            {String(index + 1).padStart(2, "0")} / {slides.length} · {slide.title}
          </span>
          <button type="button" onClick={() => goTo(index + 1)} disabled={index === slides.length - 1} className={btn} aria-label="Próximo slide">
            <ChevronRight size={18} />
          </button>
        </footer>

        {panel === "index" && <IndexPanel slides={slides} current={index} onPick={goTo} onClose={() => setPanel(null)} />}
        {panel === "glossary" && <GlossaryPanel onClose={() => setPanel(null)} />}
        {panel === "faq" && <FaqPanel onClose={() => setPanel(null)} />}
      </div>
    </NavContext.Provider>
  );
}
