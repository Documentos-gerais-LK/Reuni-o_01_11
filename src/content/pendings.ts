import type { Pending } from "./types";

export const lukas: Pending[] = [
  { text: "Enviar ao Léo os dois materiais: o registro da reunião e um passo a passo para aplicar a metodologia.", status: "Combinado", sources: ["01:27:30", "01:28:41", "01:41:02"] },
  { text: "Criar um concept do painel de tarefas e enviar ao Léo para ele opinar.", status: "Combinado", sources: ["01:42:26"] },
  { text: "Terminar a parte de Clientes e seguir para Projetos e depois para a página de Tarefas.", status: "Combinado", sources: ["01:33:39", "01:35:32", "01:41:02"], note: "Nome da terceira página está com grafia imprecisa na transcrição (01:41:02)." },
  { text: "Mapear a posição para a reunião de amanhã (02/11).", status: "Combinado", sources: ["01:36:37"] },
  { text: "Enviar o print das configurações de voz do ChatGPT e checar o caminho no Android.", status: "Combinado", sources: ["01:39:37", "01:38:24"] },
  { text: "Pesquisar a API do GitHub e avaliar um plugin para alimentar o painel de tarefas.", status: "A validar", sources: ["01:35:06", "01:35:48"], note: "Lukas disse que vai pesquisar com o ChatGPT; Léo sugeriu uma API para o Git (01:35:23)." },
  { text: "Deixar a ideia da Lívia amadurecer.", status: "Ideia em estudo", sources: ["23:13", "01:30:39"] },
];

export const leo: Pending[] = [
  { text: "Receber os dois materiais, estudar a metodologia e colar no ChatGPT para pedir ajuda na aplicação.", status: "Combinado", sources: ["01:28:41", "01:29:28"] },
  { text: "Testar o fluxo em projeto pessoal, entre hoje e amanhã (planejamento e implementação).", status: "Combinado", sources: ["01:29:34", "01:40:54"] },
  { text: "Avisar o Lukas quando o aprendizado estiver validado, para ele poder mandar demandas da LK.", status: "Combinado", sources: ["01:41:02"] },
  { text: "Depois dos testes, aplicar no sistema da LK e dividir as tarefas.", status: "A validar", sources: ["01:29:34"], note: "Sem data definida." },
  { text: "Conectar o ChatGPT ao GitHub, com contas pessoal e da empresa, e liberar acesso na organização da LK.", status: "A validar", sources: ["49:13", "50:05", "51:26"] },
  { text: "Conferir o modo de voz do ChatGPT (instalar no celular, se necessário).", status: "A validar", sources: ["01:38:00", "01:40:10"] },
];

export const joint: Pending[] = [
  { text: "Modelo de distribuição de tarefas entre os dois após os testes do Léo.", status: "A validar", sources: ["01:29:34"] },
  { text: "Visibilidade de progresso e de responsáveis: timeline, percentual e justificativa do atraso.", status: "A validar", sources: ["01:41:02", "01:41:52", "01:42:03"] },
  { text: "Estrutura do futuro painel de tarefas: Epics, tarefas e blocos de progresso.", status: "Ideia em estudo", sources: ["01:33:39", "01:34:53"] },
  { text: "Integração do painel com o GitHub (API ou plugin).", status: "Ideia em estudo", sources: ["01:35:06", "01:35:23"] },
  { text: "Organização privada da LK no GitHub e repositórios bem organizados.", status: "A validar", sources: ["51:02", "51:26"] },
  { text: "Lívia: nome e escopo como assistente da LK.", status: "Ideia em estudo", sources: ["00:42", "00:56", "21:44"] },
];
