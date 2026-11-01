import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, MessageSquare, Image as ImageIcon, TerminalSquare, GitBranch, UserCheck, Server, Cpu, Brain } from "lucide-react";
import { GlassCard, Note, Reveal, SlideShell, Sources, Badge } from "../components/ui";
import { methodSteps } from "../content/method";
import { useNav } from "../lib/nav";

export function Overview() {
  const [sel, setSel] = useState(0);
  const s = methodSteps[sel];
  return (
    <SlideShell
      eyebrow="Capítulo 02 · A metodologia"
      title="Da necessidade à publicação"
      lead="Clique em cada etapa para ver o que significa, quem participa, qual ferramenta entra e o que se espera como resultado."
    >
      <ol className="flex flex-col gap-2 lg:flex-row lg:items-stretch lg:gap-0">
        {methodSteps.map((m, i) => (
          <li key={m.id} className="flex flex-1 items-stretch lg:items-center">
            <button
              type="button"
              onClick={() => setSel(i)}
              aria-pressed={sel === i}
              className={`glass glass-hover relative flex-1 p-3 text-left ${sel === i ? "!border-gold-hi bg-gold/10" : ""}`}
            >
              <span className="font-mono text-[11px] text-gold">0{i + 1}</span>
              <span className="block text-[15px] font-semibold uppercase tracking-wide">{m.name}</span>
              <span className="block text-xs text-mute">{m.short}</span>
            </button>
            {i < methodSteps.length - 1 && (
              <svg className="hidden h-4 w-5 shrink-0 text-gold lg:block" viewBox="0 0 20 16" aria-hidden>
                <line x1="0" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1.5" className="flow-line" />
                <path d="M12 3l6 5-6 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            )}
          </li>
        ))}
      </ol>
      <AnimatePresence mode="wait">
        <motion.div key={s.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          <GlassCard className="grid gap-x-8 gap-y-3 p-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <h3 className="text-xl font-semibold text-gold-hi">{s.name}</h3>
              <p className="mt-1 text-[15px] text-soft/90">{s.means}</p>
            </div>
            {(
              [
                ["Objetivo", s.goal],
                ["Quem participa", s.who],
                ["Ferramenta", s.tool],
                ["Resultado esperado", s.result],
              ] as const
            ).map(([k, v]) => (
              <div key={k}>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-gold">{k}</p>
                <p className="text-sm text-soft/85">{v}</p>
              </div>
            ))}
            <div className="sm:col-span-2">
              <Sources list={s.sources} />
            </div>
          </GlassCard>
        </motion.div>
      </AnimatePresence>
    </SlideShell>
  );
}

const rows = [
  { icon: MessageSquare, stage: "Necessidade", who: "Lukas / LK, com apoio do ChatGPT" },
  { icon: Brain, stage: "Pesquisa", who: "ChatGPT e decisão humana" },
  { icon: MessageSquare, stage: "Especificação", who: "ChatGPT, com validação de Lukas" },
  { icon: TerminalSquare, stage: "Implementação", who: "Claude Code" },
  { icon: Cpu, stage: "Testes automatizados e CI", who: "Claude Code + infraestrutura de CI" },
  { icon: UserCheck, stage: "Homologação", who: "Programador responsável, Lukas ou Léo" },
  { icon: Server, stage: "Publicação", who: "Claude Code, após os gates de aprovação" },
];

export function WhoDoesWhat() {
  return (
    <SlideShell eyebrow="Capítulo 02 · A metodologia" title="Quem faz o quê?" lead="A IA acelera o trabalho. A responsabilidade continua sendo de pessoas.">
      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <GlassCard className="divide-y divide-white/5 overflow-hidden">
          {rows.map((r, i) => (
            <Reveal key={r.stage} delay={0.05 * i}>
              <div className="flex items-center gap-3 px-4 py-2.5">
                <r.icon size={18} className="shrink-0 text-gold" aria-hidden />
                <span className="w-44 shrink-0 text-sm font-semibold sm:w-56">{r.stage}</span>
                <span className="text-sm text-mute">{r.who}</span>
              </div>
            </Reveal>
          ))}
          <div className="flex items-center gap-3 bg-gold/5 px-4 py-2.5">
            <GitBranch size={18} className="shrink-0 text-gold-hi" aria-hidden />
            <span className="text-sm">
              <b className="text-gold-hi">GitHub</b> atravessa todas as etapas: é o registro e a rastreabilidade.
            </span>
          </div>
        </GlassCard>
        <div className="flex flex-col gap-2.5">
          {[
            ["ChatGPT", "ajuda a pensar e organizar."],
            ["Claude Code", "implementa e verifica."],
            ["Programador", "valida o comportamento real."],
            ["GitHub", "mantém o histórico."],
          ].map(([a, b]) => (
            <GlassCard key={a} className="px-4 py-3">
              <span className="font-semibold text-gold-hi">{a}</span> <span className="text-soft/90">{b}</span>
            </GlassCard>
          ))}
          <Note>
            O DDAE ajuda o Claude Code na execução técnica, mas o controle do que será feito, as regras e as permissões ficam com o
            GitHub (54:03–54:11).
          </Note>
        </div>
      </div>
      <p className="text-xs text-mute">Os ícones são genéricos; não usam os logotipos oficiais das ferramentas.</p>
      <Sources list={["10:05", "48:47", "53:58", "54:07", "55:27"]} />
    </SlideShell>
  );
}

export function NeedSlide() {
  const qs = [
    "Qual problema existe?",
    "Quem será beneficiado?",
    "O que precisamos resolver?",
    "Por que isso é importante?",
    "O que caracteriza uma solução satisfatória?",
  ];
  return (
    <SlideShell
      eyebrow="Capítulo 02 · A metodologia"
      title="Necessidade: antes de escrever código"
      lead="Lukas olha para a página de Gestão de Clientes e pergunta: preciso de todas as informações do cliente nessa tela? Só depois disso nasce a demanda."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {qs.map((q, i) => (
          <Reveal key={q} delay={0.08 * i}>
            <GlassCard className="h-full p-4">
              <span className="font-mono text-xs text-gold">{i + 1}</span>
              <p className="mt-1 text-[15px] font-medium leading-snug">{q}</p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
      <GlassCard className="p-5">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-gold">Exemplo da reunião</h3>
        <p className="mt-2 text-[15px] text-soft/90">
          Lukas olha a tela de Gestão de Clientes do LK System e tira prints. Conversa com o ChatGPT sobre o que a tela precisa ter.
          O chat orienta, mas só tem o contexto da conversa. Por isso Lukas pede que ele confira no projeto antes de seguir.
        </p>
      </GlassCard>
      <Note>Necessidade não é “começar a escrever código”. É entender a funcionalidade que a pessoa precisa naquela página (08:21).</Note>
      <Sources list={["08:21", "10:05", "11:04"]} />
    </SlideShell>
  );
}

export function Research() {
  const items = [
    "Explorar alternativas",
    "Questionar ideias",
    "Avaliar possibilidades",
    "Identificar riscos",
    "Pesquisar tecnologias",
    "Refinar requisitos",
    "Reduzir complexidade desnecessária",
  ];
  return (
    <SlideShell
      eyebrow="Capítulo 02 · A metodologia"
      title="Pesquisa e refinamento"
      lead="O ChatGPT ajuda a explorar e comparar. A decisão continua humana."
    >
      <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <div className="grid gap-2 sm:grid-cols-2">
          {items.map((t, i) => (
            <Reveal key={t} delay={0.05 * i}>
              <GlassCard className="flex items-center gap-2 px-4 py-3 text-sm">
                <ChevronRight size={15} className="text-gold" aria-hidden />
                {t}
              </GlassCard>
            </Reveal>
          ))}
        </div>
        <GlassCard className="flex flex-col gap-3 p-5">
          <Badge>Exemplos da reunião</Badge>
          <p className="text-sm text-soft/90">
            Para a tela de loading, o ChatGPT recomendou bibliotecas de animação. Lukas abriu cada uma e perguntou qual servia melhor.
            Em outro caso, pediu sistemas 3D, recebeu 10 repositórios e rodou dois localmente para ver como funcionavam.
          </p>
          <p className="text-sm text-soft/90">
            Ao ver um planejamento de 6 fases para um simples loading, Lukas questionou se precisava ser tudo aquilo. A resposta foi
            que dava para reduzir.
          </p>
        </GlassCard>
      </div>
      <Note>
        Lukas diz que não dá para deixar essa decisão no automático: a IA não tem senso de decisão (01:21:50) e a parte de planejamento
        não substitui a ideia (01:24:29–01:24:54).
      </Note>
      <Sources list={["01:20:40", "01:21:26", "01:21:50", "01:25:00"]} />
    </SlideShell>
  );
}

export function Concepts() {
  const cycle = ["Ideia", "Prompt visual", "Concept", "Feedback", "Refinamento", "Referência para implementação"];
  const { reduced } = useNav();
  return (
    <SlideShell
      eyebrow="Capítulo 02 · A metodologia"
      title="Concepts visuais"
      lead="Só texto não basta para o Claude Code. Ele precisa de referência visual. Por isso Lukas separa os chats."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <GlassCard className="p-5">
          <MessageSquare className="text-gold" size={20} aria-hidden />
          <h3 className="mt-2 font-semibold">Chat de planejamento</h3>
          <p className="text-sm text-mute">Discussão, contexto e proposta. Também acompanha o controle do desenvolvimento.</p>
        </GlassCard>
        <GlassCard className="p-5">
          <ImageIcon className="text-gold" size={20} aria-hidden />
          <h3 className="mt-2 font-semibold">Chat de imagens</h3>
          <p className="text-sm text-mute">Só imagens: concepts, referências e alternativas visuais.</p>
        </GlassCard>
      </div>
      <ol className="flex flex-wrap items-center gap-2">
        {cycle.map((c, i) => (
          <li key={c} className="flex items-center gap-2">
            <span className="glass px-3 py-1.5 text-sm">{c}</span>
            {i < cycle.length - 1 && <ChevronRight size={16} className="text-gold" aria-hidden />}
          </li>
        ))}
      </ol>
      <div className="grid items-center gap-5 sm:grid-cols-[1fr_auto]">
        <div className="text-sm text-soft/90">
          <p>
            <b className="text-gold-hi">Exemplo: a tela de loading do LK System.</b> A tela antiga carregava devagar, não tinha a
            identidade visual e, quando dava erro, só mostrava “erro 400”. Lukas tirou prints, pediu um concept, não gostou do ícone
            e pediu uma segunda versão: um loading em que as linhas douradas da marca se acendem como um circuito.
          </p>
        </div>
        <figure className="mx-auto w-40">
          <svg viewBox="0 0 120 120" role="img" aria-label="Ilustração didática: hexágono dourado sendo desenhado" className="drop-shadow-[0_0_14px_rgb(200_164_93/0.4)]">
            <motion.polygon
              points="60,8 105,34 105,86 60,112 15,86 15,34"
              fill="none"
              stroke="#E7C985"
              strokeWidth="2.5"
              initial={reduced ? false : { pathLength: 0 }}
              animate={reduced ? undefined : { pathLength: [0, 1, 1, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <polygon points="60,30 85,45 85,75 60,90 35,75 35,45" fill="none" stroke="#C8A45D" strokeOpacity="0.5" strokeWidth="1.5" />
          </svg>
          <figcaption className="mt-1 text-center text-[11px] text-mute">Ilustração didática. Não é a tela real.</figcaption>
        </figure>
      </div>
      <Sources list={["13:11", "01:07:28", "01:08:57", "01:09:28", "01:10:27", "01:14:08"]} />
    </SlideShell>
  );
}
