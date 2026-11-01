import { motion } from "motion/react";
import { Smartphone, MonitorSmartphone, GitBranch, Wrench, Image as ImageIcon, MessageSquare, TerminalSquare, Globe, Eye } from "lucide-react";
import { Badge, GlassCard, Note, Reveal, SlideShell, Sources } from "../components/ui";
import { useNav } from "../lib/nav";
import type { Maturity } from "../content/types";

export function CaseGlass() {
  const steps = [
    "Lukas identifica a necessidade",
    "Conversa com o ChatGPT",
    "Compartilha referências e prints",
    "Pede um concept (em um chat só de imagens)",
    "Analisa o resultado",
    "Pede refinamentos (identidade visual e logo)",
    "Discute animações e tecnologias",
    "Transforma a proposta em planejamento",
    "Encaminha a implementação ao Claude Code",
    "Acompanha testes e homologação",
  ];
  return (
    <SlideShell
      eyebrow="Capítulo 03 · Exemplos reais"
      title="Caso real: LK Glass Motion (tela de loading)"
      lead="A tela de carregamento não representava a identidade visual desejada, demorava e, em caso de erro, só mostrava “erro 400”."
    >
      <ol className="grid gap-2 sm:grid-cols-2">
        {steps.map((s, i) => (
          <Reveal key={s} delay={0.05 * i}>
            <li className="glass flex items-center gap-3 px-4 py-2.5 text-sm">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-gold/50 font-mono text-[11px] text-gold-hi">{i + 1}</span>
              {s}
            </li>
          </Reveal>
        ))}
      </ol>
      <Note tone="warn">
        A reunião mostra o planejamento, as Issues criadas e o desenvolvimento em andamento (01:20:40–01:25:49). Ela não afirma que a
        funcionalidade já esteja publicada.
      </Note>
      <Sources list={["01:07:28", "01:08:23", "01:10:27", "01:20:40", "52:53"]} />
    </SlideShell>
  );
}

export function Tools() {
  const tools = [
    { icon: MessageSquare, n: "ChatGPT", d: "Pesquisa, planejamento e especificação. Três usos: planejamento/controle, imagens e outros projetos.", s: ["13:11", "01:24:13"] },
    { icon: TerminalSquare, n: "Claude Code", d: "Implementa, testa, abre PRs e lê o CI para corrigir erros.", s: ["55:27", "01:02:28"] },
    { icon: MonitorSmartphone, n: "Claude Desktop", d: "Interface com navegador integrado, arquivos e várias conversas. Lukas recomenda no lugar do VS Code.", s: ["34:23", "01:15:52"] },
    { icon: Smartphone, n: "Remote Control", d: "Controla sessões que rodam no PC a partir do navegador ou do celular, inclusive na rua.", s: ["55:34", "01:17:44"] },
    { icon: GitBranch, n: "GitHub", d: "Epics, Issues, PRs, CI e histórico. Contas pessoal e da empresa, com organização privada.", s: ["50:41", "51:26"] },
    { icon: Wrench, n: "DDAE", d: "Ajuda o Claude Code na execução técnica. Regras e permissões ficam com o GitHub.", s: ["53:58", "54:07"] },
    { icon: Globe, n: "Navegador e testes", d: "Ambiente local onde se homologa e onde o Claude Code testa o que construiu.", s: ["01:16:11", "59:46"] },
    { icon: ImageIcon, n: "Geração de imagens", d: "Chat de imagens do ChatGPT gera os concepts e as referências visuais.", s: ["01:09:28", "01:24:20"] },
  ];
  return (
    <SlideShell
      eyebrow="Capítulo 03 · Exemplos reais"
      title="Ferramentas e produtividade"
      lead="Cada ferramenta tem um papel. Nenhuma substitui a pessoa que decide e valida."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {tools.map((t, i) => (
          <Reveal key={t.n} delay={0.04 * i}>
            <GlassCard hover className="h-full p-4">
              <t.icon size={20} className="text-gold" aria-hidden />
              <h3 className="mt-1.5 font-semibold">{t.n}</h3>
              <p className="mt-1 text-[13px] leading-snug text-mute">{t.d}</p>
              <Sources list={t.s} />
            </GlassCard>
          </Reveal>
        ))}
      </div>
      <Note>
        Lukas deixou o Claude Code rodando enquanto dormia e, ao acordar, viu que trabalhou por cerca de 8 horas e usou pouco do
        limite semanal (06:07–06:57). Isso é relato dele, não uma métrica medida. Automação do desenvolvimento não é autonomia irrestrita:
        escopo, critérios, CI e homologação continuam valendo.
      </Note>
    </SlideShell>
  );
}

export function LeoJourney() {
  const steps = [
    "Escolher uma funcionalidade simples de um projeto pessoal",
    "Descrever o problema ao ChatGPT",
    "Refinar a necessidade",
    "Criar uma referência visual, se precisar",
    "Definir escopo e critérios de aceite",
    "Registrar as tarefas no GitHub",
    "Implementar com o Claude Code",
    "Executar as verificações",
    "Homologar",
    "Documentar o resultado",
  ];
  return (
    <SlideShell
      eyebrow="Capítulo 03 · Exemplos reais"
      title="Como o Léo pode aplicar"
      lead="Léo pretende aprender experimentando nos próprios projetos antes de assumir demandas da LK."
    >
      <ol className="relative grid gap-2 sm:grid-cols-2">
        {steps.map((s, i) => (
          <Reveal key={s} delay={0.04 * i}>
            <li className="glass flex items-center gap-3 px-4 py-2.5 text-sm">
              <span className="font-mono text-xs text-gold">{String(i + 1).padStart(2, "0")}</span>
              {s}
            </li>
          </Reveal>
        ))}
      </ol>
      <div className="grid gap-3 sm:grid-cols-2">
        <Note>
          Léo: “melhor eu quebrar o meu sistema, que eu sei quebrar, do que o nosso” (01:13:33). Lukas diz que só levou à LK o que já
          tinha validado nos projetos pessoais (01:13:38).
        </Note>
        <Note>
          Combinado: Léo testa entre hoje e amanhã e depois aplica no sistema da LK, dividindo as tarefas (01:29:34). Lukas fica
          aguardando o aviso para mandar demandas (01:41:02).
        </Note>
      </div>
      <Sources list={["01:11:26", "01:13:33", "01:29:34", "01:41:02"]} />
    </SlideShell>
  );
}

export function Traceability() {
  const qs = [
    "O que está sendo desenvolvido?",
    "Quem é o responsável?",
    "Quais tarefas estão em andamento?",
    "O que foi concluído?",
    "O que está bloqueado?",
    "Por que uma entrega ainda não terminou?",
  ];
  return (
    <SlideShell
      eyebrow="Capítulo 03 · Exemplos reais"
      title="Rastreabilidade e colaboração"
      lead="Lukas e Léo precisam conseguir responder, sem perguntar um ao outro no WhatsApp:"
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {qs.map((q, i) => (
          <Reveal key={q} delay={0.06 * i}>
            <GlassCard className="flex items-center gap-3 p-4">
              <Eye size={18} className="shrink-0 text-gold" aria-hidden />
              <span className="text-[15px]">{q}</span>
            </GlassCard>
          </Reveal>
        ))}
      </div>
      <Note>
        Lukas descreveu a dor: ficar mandando tarefa no chat ou no WhatsApp e perguntar “quem está responsável?” e “quantos por cento
        está concluído?” é horrível (01:41:02). Antes, até o Claude perguntava onde estavam e não sabia a porcentagem (01:25:49).
      </Note>
      <p className="max-w-3xl text-sm text-mute">
        O ganho esperado é organizacional: menos tempo para saber em que pé está cada coisa. Nenhuma métrica foi medida na reunião,
        então esta apresentação não inventa uma.
      </p>
      <Sources list={["01:25:49", "01:34:53", "01:41:02"]} />
    </SlideShell>
  );
}

export function TaskPanel() {
  const { reduced } = useNav();
  const tasks = [
    { n: "Tarefa 01", who: "Lukas", st: "Em andamento", pct: 60, tone: "gold" as const, why: "Aguardando ajuste visual da tela." },
    { n: "Tarefa 02", who: "Léo", st: "Em validação", pct: 90, tone: "blue" as const, why: "Homologando o comportamento." },
    { n: "Tarefa 03", who: "—", st: "Não iniciada", pct: 0, tone: "grey" as const, why: "Depende da Tarefa 01." },
  ];
  return (
    <SlideShell
      eyebrow="Capítulo 04 · Evolução da LK"
      title="Próxima evolução: painel de tarefas"
      lead="Na reunião, Lukas e Léo discutiram um módulo no LK System que mostra tarefas, responsáveis, progresso e justificativas."
    >
      <Note tone="warn">
        Concept ilustrativo. Os dados abaixo são fictícios e o módulo ainda não foi desenvolvido. A ideia é que ele puxe informações
        do GitHub no futuro (01:35:06).
      </Note>
      <GlassCard className="p-4 sm:p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
          <Badge>Projeto: LK System</Badge>
          <Badge tone="grey">Epic: exemplo</Badge>
          <Badge tone="grey">Integração GitHub: futura</Badge>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {tasks.map((t) => (
            <div key={t.n} className="rounded-xl border border-white/10 bg-black/25 p-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{t.n}</span>
                <Badge tone={t.tone}>{t.st}</Badge>
              </div>
              <p className="mt-1 text-sm text-mute">Responsável: {t.who}</p>
              <div className="mt-3 flex gap-0.5" aria-label={`${t.pct}% concluído`}>
                {Array.from({ length: 10 }).map((_, i) => (
                  <motion.span
                    key={i}
                    initial={reduced ? false : { opacity: 0.2 }}
                    animate={{ opacity: i < t.pct / 10 ? 1 : 0.2 }}
                    transition={{ delay: 0.05 * i }}
                    className="h-2 flex-1 rounded-sm bg-gold"
                  />
                ))}
              </div>
              <p className="mt-1 text-right font-mono text-xs text-gold-hi">{t.pct}%</p>
              <p className="mt-2 text-xs text-mute">Justificativa: {t.why}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-mute" aria-hidden>
          <span>Timeline</span>
          <div className="h-px flex-1 bg-gradient-to-r from-gold to-transparent" />
          <span>01 → 02 → 03</span>
        </div>
      </GlassCard>
      <p className="text-sm text-mute">
        Ideias ditadas: um card por tarefa, com status e porcentagem (01:34:53), e uma caixa para justificar por que está em 20% (01:42:03).
        Lukas vai criar um concept e enviar ao Léo (01:42:26).
      </p>
      <Sources list={["01:33:39", "01:34:53", "01:41:52", "01:42:03"]} />
    </SlideShell>
  );
}

const ideas: Array<{ m: Maturity; t: string; d: string; s: string[] }> = [
  { m: "Em uso", t: "ChatGPT conectado ao GitHub da LK", d: "Lukas conectou o chat ao GitHub da empresa e ao pessoal.", s: ["49:08", "50:05"] },
  { m: "Em uso", t: "Fluxo Epic → Issue → PR → CI", d: "Método que Lukas já aplica no LK System.", s: ["57:57", "58:53"] },
  { m: "Em desenvolvimento", t: "Páginas do LK System", d: "Lukas termina a parte de Clientes e segue para Projetos e Tarefas.", s: ["01:33:39", "01:35:32"] },
  { m: "Proposta", t: "Painel de tarefas integrado ao GitHub", d: "Plugin ou API para alimentar os cards.", s: ["01:35:06", "01:35:23"] },
  { m: "Em estudo", t: "Lívia, assistente digital da LK", d: "Ideia de assistente com contexto, para a equipe e, no futuro, clientes. Lukas quer maturar.", s: ["00:42", "23:13", "01:30:39"] },
  { m: "Em estudo", t: "Conexão com WhatsApp", d: "Lukas mencionou ver depois como conectar.", s: ["01:36:37"] },
];
const tone = { "Em uso": "green", "Em desenvolvimento": "gold", Proposta: "blue", "Em estudo": "grey" } as const;

export function Ideas() {
  return (
    <SlideShell
      eyebrow="Capítulo 04 · Evolução da LK"
      title="Outras ideias mencionadas"
      lead="O foco da apresentação é a metodologia. Estas discussões ficam registradas com o seu estágio real."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ideas.map((i) => (
          <GlassCard key={i.t} hover className="flex flex-col gap-1.5 p-4">
            <Badge tone={tone[i.m]}>{i.m}</Badge>
            <h3 className="font-semibold leading-snug">{i.t}</h3>
            <p className="text-[13px] text-mute">{i.d}</p>
            <Sources list={i.s} />
          </GlassCard>
        ))}
      </div>
      <Note>
        Também apareceram assuntos comerciais (por exemplo, a abordagem de um site pronto para uma cliente). Eles ficam no registro
        original e não fazem parte desta metodologia (38:13–46:26).
      </Note>
    </SlideShell>
  );
}
