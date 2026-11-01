import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ChevronRight, Circle, CheckCircle2, Loader2, XCircle, Wrench, Play, RotateCcw, Rocket } from "lucide-react";
import { Badge, GlassCard, Note, SlideShell, Sources } from "../components/ui";
import { useNav } from "../lib/nav";

export function Spec() {
  const terms = [
    ["Epic", "Conjunto maior de entregas. Ex.: o usuário consegue logar sem problema de segurança."],
    ["Issue", "Trabalho documentado, com o resultado esperado."],
    ["Task", "Cada tarefa da Epic. Gera uma branch e um PR."],
    ["Escopo", "O que será feito."],
    ["Exclusões", "O que não será feito agora."],
    ["Critério de aceite", "A condição que permite considerar a tarefa correta."],
    ["Dependências", "O que a tarefa precisa para funcionar (ex.: um serviço de e-mail confiável)."],
    ["Evidências", "Provas do que foi feito: PR, checks, antes e depois."],
    ["Responsabilidades", "Quem faz o quê na tarefa."],
  ];
  return (
    <SlideShell
      eyebrow="Capítulo 02 · A metodologia"
      title="Especificação e organização"
      lead="Depois da pesquisa, o ChatGPT transforma o planejamento em registros no GitHub: uma Epic central e as Issues."
    >
      <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {terms.map(([t, d]) => (
          <GlassCard key={t} className="p-3.5">
            <p className="text-sm font-semibold text-gold-hi">{t}</p>
            <p className="text-[13px] leading-snug text-mute">{d}</p>
          </GlassCard>
        ))}
      </div>
      <Note>
        Exemplo de Issue ditado na reunião: objetivo (permitir cadastro de usuário), escopo (formulário, validação, e-mail de
        confirmação), exclusões (login com Google), critério de aceite (pessoa nova cria conta e recebe e-mail; e-mail inválido ou
        repetido dá erro claro) e dependência (SMTP confiável) (56:40).
      </Note>
      <Sources list={["51:26", "52:21", "52:53", "56:40", "57:57", "58:21"]} />
    </SlideShell>
  );
}

export function GitHubSlide() {
  const chain = ["Epic", "Issues", "Branches", "Pull Requests", "Checks", "Histórico"];
  const gains = [
    "Saber o que foi planejado",
    "Identificar alterações",
    "Acompanhar responsáveis",
    "Conferir resultados",
    "Verificar o status técnico",
    "Recuperar decisões anteriores",
  ];
  return (
    <SlideShell
      eyebrow="Capítulo 02 · A metodologia"
      title="GitHub como fonte de rastreabilidade"
      lead="Cada passo deixa um registro. O GitHub é onde a equipe consegue ver o que foi combinado e o que foi feito."
    >
      <div className="relative">
        <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {chain.map((c, i) => (
            <motion.li
              key={c}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="glass relative flex items-center justify-between px-3 py-4 text-sm font-semibold"
            >
              {c}
              {i < chain.length - 1 && <ChevronRight size={16} className="hidden text-gold lg:block" aria-hidden />}
            </motion.li>
          ))}
        </ol>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {gains.map((g) => (
          <div key={g} className="flex items-center gap-2 text-sm text-soft/90">
            <CheckCircle2 size={16} className="shrink-0 text-gold" aria-hidden /> {g}
          </div>
        ))}
      </div>
      <GlassCard className="p-4 text-sm text-soft/90">
        Lukas mostra no GitHub o que o ChatGPT criou: 8 Issues (a partir da #475) para a tela de loading, com especificações como o
        inventário de rotas e a página de erro personalizada (52:53–53:30).
      </GlassCard>
      <Note tone="warn">Ter uma Issue não significa que a tarefa está concluída. Concluir exige PR, checks verdes e homologação.</Note>
      <Sources list={["32:23", "52:53", "53:30", "01:02:28"]} />
    </SlideShell>
  );
}

export function Implementation() {
  const steps = [
    ["Lê a especificação", "Epic e Issue da tarefa"],
    ["Analisa o repositório", "Entende o código existente"],
    ["Cria a branch", "Conforme a estratégia do projeto"],
    ["Desenvolve", "Dentro do escopo"],
    ["Commit", "Registra a mudança"],
    ["Abre o Pull Request", "Primeiro como rascunho"],
    ["Revisão e correções", "Ajusta o que o CI ou a pessoa apontar"],
  ];
  const [n, setN] = useState(0);
  const { reduced } = useNav();
  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setN((v) => (v + 1) % (steps.length + 1)), 1600);
    return () => window.clearInterval(id);
  }, [reduced, steps.length]);
  return (
    <SlideShell
      eyebrow="Capítulo 02 · A metodologia"
      title="Implementação com Claude Code"
      lead="Cada tarefa avança sozinha até o PR. Lukas acompanha, inclusive do celular, pelo Remote Control."
    >
      <ol className="grid gap-2">
        {steps.map(([t, d], i) => (
          <li key={t}>
            <button
              type="button"
              onClick={() => setN(i + 1)}
              className={`glass flex w-full items-center gap-3 px-4 py-2.5 text-left transition ${i < n ? "!border-gold/60" : "opacity-60"}`}
            >
              {i < n ? <CheckCircle2 size={18} className="text-gold-hi" aria-hidden /> : <Circle size={18} className="text-mute" aria-hidden />}
              <span className="text-sm font-semibold">{t}</span>
              <span className="text-xs text-mute">{d}</span>
            </button>
          </li>
        ))}
      </ol>
      <div className="grid gap-3 sm:grid-cols-2">
        <Note>
          Segundo Lukas, a cada nova Epic, ou conforme a situação, cria-se uma branch de desenvolvimento. Cada tarefa vira um PR
          dessa branch (58:53). A estratégia pode mudar conforme o projeto; não é uma regra universal.
        </Note>
        <Note>
          O PR abre como rascunho e depois vira oficial. Ao abrir, o CI roda e o Claude Code acompanha o resultado (01:04:25).
        </Note>
      </div>
      <Sources list={["53:58", "55:27", "55:34", "58:53", "01:04:25"]} />
    </SlideShell>
  );
}

type Stage = 0 | 1 | 2 | 3 | 4;
const stageNames = ["Aguardando", "Executando", "Falhou", "Corrigindo", "Aprovado"];
const checks = ["Typecheck", "Lint", "Testes unitários", "Testes de integração", "Testes E2E", "Build", "Verificação de segurança (se aplicável)"];
const failing = new Set([2, 4]);

function statusOf(i: number, stage: Stage): "wait" | "run" | "fail" | "fix" | "ok" {
  if (stage === 0) return "wait";
  if (stage === 1) return "run";
  if (stage === 2) return failing.has(i) ? "fail" : "ok";
  if (stage === 3) return failing.has(i) ? "fix" : "ok";
  return "ok";
}

export function CI() {
  const [stage, setStage] = useState<Stage>(0);
  const [auto, setAuto] = useState(false);
  const { reduced } = useNav();
  useEffect(() => {
    if (!auto) return;
    if (stage >= 4) return void setAuto(false);
    const id = window.setTimeout(() => setStage((s) => (s + 1) as Stage), reduced ? 400 : 1300);
    return () => window.clearTimeout(id);
  }, [auto, stage, reduced]);
  const icon = {
    wait: <Circle size={18} className="text-mute" />,
    run: <Loader2 size={18} className="animate-spin text-gold-hi" />,
    fail: <XCircle size={18} className="text-rose-400" />,
    fix: <Wrench size={18} className="text-amber-300" />,
    ok: <CheckCircle2 size={18} className="text-emerald-400" />,
  };
  return (
    <SlideShell
      eyebrow="Capítulo 02 · A metodologia"
      title="CI e testes automatizados"
      lead="Simulação didática de um Pull Request. Os nomes e resultados abaixo são ilustrativos."
    >
      <div className="flex flex-wrap items-center gap-2">
        {stageNames.map((n, i) => (
          <button
            key={n}
            type="button"
            onClick={() => (setAuto(false), setStage(i as Stage))}
            aria-pressed={stage === i}
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${stage === i ? "border-gold-hi bg-gold text-ink" : "border-white/15 text-mute hover:text-soft"}`}
          >
            {n}
          </button>
        ))}
        <button
          type="button"
          onClick={() => (stage >= 4 ? (setStage(0), setAuto(true)) : setAuto((a) => !a))}
          className="ml-auto flex items-center gap-1.5 rounded-lg border border-gold/50 px-3 py-1.5 text-sm text-gold-hi hover:bg-gold/15"
        >
          {stage >= 4 ? <RotateCcw size={14} /> : <Play size={14} />} {stage >= 4 ? "Repetir" : auto ? "Pausar" : "Executar simulação"}
        </button>
      </div>
      <GlassCard className="divide-y divide-white/5">
        <div className="flex items-center justify-between px-4 py-2.5 text-sm">
          <span className="font-mono text-gold-hi">PR · Tarefa de exemplo</span>
          <Badge tone={stage === 4 ? "green" : stage === 2 ? "red" : "gold"}>{stageNames[stage]}</Badge>
        </div>
        {checks.map((c, i) => {
          const s = statusOf(i, stage);
          return (
            <div key={c} className="flex items-center gap-3 px-4 py-2 text-sm" aria-label={`${c}: ${s}`}>
              {icon[s]}
              <span>{c}</span>
              <span className="ml-auto text-xs text-mute">
                {s === "wait" ? "aguardando" : s === "run" ? "executando" : s === "fail" ? "falhou" : s === "fix" ? "Claude Code corrigindo" : "aprovado"}
              </span>
            </div>
          );
        })}
      </GlassCard>
      <div className="grid gap-3 sm:grid-cols-2">
        <Note>
          Lukas relata um teste com cerca de 1.500 testes em que 200 falharam durante a noite: o Claude Code leu o CI, achou o erro e
          corrigiu sozinho (59:46, 01:01:57).
        </Note>
        <Note tone="warn">Testes ajudam a detectar regressões, mas não garantem ausência absoluta de defeitos. Por isso há homologação.</Note>
      </div>
      <Sources list={["31:08", "59:46", "01:01:57", "01:02:28", "01:07:01"]} />
    </SlideShell>
  );
}

const checklist = [
  "O problema original foi resolvido?",
  "O visual corresponde ao esperado?",
  "A navegação funciona?",
  "As regras de negócio estão corretas?",
  "Não há inconsistência perceptível?",
  "Os critérios de aceite foram atendidos?",
];

export function Homologation() {
  const [ok, setOk] = useState<boolean[]>(checklist.map(() => false));
  const go = ok.every(Boolean);
  const touched = ok.some(Boolean);
  return (
    <SlideShell
      eyebrow="Capítulo 02 · A metodologia"
      title="Homologação humana"
      lead="Depois da implementação e das verificações, quem é responsável abre a funcionalidade e confere se ela se comporta como deveria."
    >
      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <GlassCard className="divide-y divide-white/5">
          {checklist.map((c, i) => (
            <label key={c} className="flex cursor-pointer items-center gap-3 px-4 py-3 text-[15px] hover:bg-white/5">
              <input
                type="checkbox"
                checked={ok[i]}
                onChange={() => setOk((o) => o.map((v, j) => (j === i ? !v : v)))}
                className="h-4 w-4 accent-[#C8A45D]"
              />
              {c}
            </label>
          ))}
        </GlassCard>
        <GlassCard className="flex flex-col items-center justify-center gap-3 p-6 text-center" >
          <p className="text-xs uppercase tracking-widest text-mute">Decisão</p>
          <motion.p
            key={String(go)}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-5xl font-bold ${go ? "text-emerald-300" : touched ? "text-rose-300" : "text-mute"}`}
            role="status"
          >
            {go ? "GO" : touched ? "NO-GO" : "—"}
          </motion.p>
          <p className="text-sm text-mute">
            {go ? "Pode seguir para a publicação." : touched ? "A demanda volta para ajuste." : "Marque os itens conforme valida."}
          </p>
        </GlassCard>
      </div>
      <Note>
        Nos PRs, o Claude Code às vezes pede homologação: entre na página e teste (31:08). Lukas também testa clicando na página e, se
        não for o que queria, pede ajustes (55:42). Segundo ele, o checkpoint é “GO ou não GO” (59:46).
      </Note>
      <Sources list={["31:08", "32:23", "55:42", "59:46"]} />
    </SlideShell>
  );
}

export function Publish() {
  const flow = ["Implementação validada", "Aprovação", "Merge", "Deploy", "Verificação pós-publicação"];
  return (
    <SlideShell
      eyebrow="Capítulo 02 · A metodologia"
      title="Publicação"
      lead="Pull Request, merge e deploy são operações diferentes. Ter um PR aberto não significa estar em produção."
    >
      <ol className="flex flex-wrap items-center gap-2">
        {flow.map((f, i) => (
          <li key={f} className="flex items-center gap-2">
            <span className="glass px-3 py-2 text-sm font-medium">{f}</span>
            {i < flow.length - 1 && <ChevronRight size={16} className="text-gold" aria-hidden />}
          </li>
        ))}
      </ol>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ["Pull Request", "O pedido para juntar o trabalho de uma branch. É a conversa e o registro dos testes."],
          ["Merge", "A mudança aprovada entra na branch principal do projeto."],
          ["Deploy", "A versão passa a rodar no ambiente online, onde os usuários acessam."],
        ].map(([t, d]) => (
          <GlassCard key={t} className="p-4">
            <Rocket size={18} className="text-gold" aria-hidden />
            <h3 className="mt-1 font-semibold">{t}</h3>
            <p className="text-sm text-mute">{d}</p>
          </GlassCard>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Note>
          Do que foi dito: se falhar no CI, não chega em produção (31:08). Quando o trabalho é finalizado, o passo seguinte é deixar
          online (56:13–56:17). O Claude Code pode executar a publicação quando autorizado e com os requisitos de aprovação atendidos.
        </Note>
        <Note tone="warn">
          Na reunião, Léo resumiu a publicação como “só o PR mesmo” (56:07). A separação entre PR, merge e deploy é um
          esclarecimento didático desta apresentação, não algo detalhado na conversa.
        </Note>
      </div>
      <Sources list={["31:08", "56:07", "56:13", "56:17"]} />
    </SlideShell>
  );
}
