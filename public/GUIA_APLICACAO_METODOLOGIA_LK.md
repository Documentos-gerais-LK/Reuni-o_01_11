# Guia de aplicação da metodologia de desenvolvimento — LK Technologies Brasil

Material complementar à reunião de 01/11/2026 entre Lukas e Léo. É um **guia organizado e didático**, derivado da conversa. Não substitui a transcrição original, que é o registro fiel.

Os números entre parênteses, como (58:53), são os timestamps da transcrição onde o assunto aparece. Onde o guia traz modelos (templates), eles são sugestões de organização baseadas no que Lukas descreveu, não um padrão fechado pela LK.

> **Confidencial.** Contém informações internas da LK. Não publique.

---

## 1. A ideia em poucas linhas

Antes, a demanda ficava numa conversa, o Claude Code dizia uma coisa, o chat outra, e era difícil reconstruir quem decidiu o quê (32:23). Hoje o trabalho passa por etapas registradas:

**Necessidade → Pesquisa → Especificação → Implementação → Testes (CI) → Homologação → Publicação**

- O **ChatGPT** ajuda a pensar e organizar.
- O **Claude Code** implementa e verifica.
- A **pessoa responsável** valida o comportamento real.
- O **GitHub** mantém o histórico.

A IA participa muito, mas a necessidade, as decisões, a validação e a responsabilidade pela entrega são humanas.

---

## 2. Quem faz o quê

| Etapa | Responsabilidade principal |
|---|---|
| Necessidade | Lukas/LK, com apoio do ChatGPT |
| Pesquisa | ChatGPT e decisão humana |
| Especificação | ChatGPT, com validação de Lukas |
| Implementação | Claude Code |
| Testes automatizados e CI | Claude Code + infraestrutura de CI |
| Homologação | Programador responsável, Lukas ou Léo |
| Publicação | Claude Code, após os gates de aprovação |

O **DDAE** ajuda o Claude Code na execução técnica, mas o controle do que será feito, as regras e as permissões ficam com o GitHub (54:03–54:11).

---

## 3. Passo a passo

### Passo 1 — Necessidade
Olhe para a funcionalidade e pergunte: qual problema existe, quem se beneficia, o que precisa ser resolvido, por que é importante e o que seria uma solução satisfatória. Tire prints da tela atual e converse com o ChatGPT (08:21, 10:05).

### Passo 2 — Pesquisa
Explore alternativas, riscos e tecnologias com o ChatGPT. Depois peça que ele confira no projeto. Teste as bibliotecas sugeridas antes de decidir. Lukas diz que a IA não tem senso de decisão: a escolha é sua (01:21:50).

### Passo 3 — Concept visual (se houver interface)
Use um **chat separado só para imagens**. Peça ao chat de planejamento um prompt e a lista do que anexar, leve ao chat de imagens, gere o concept, dê feedback e refine. O concept final vira referência para o Claude Code, porque só texto não basta (13:11, 01:08:57).

### Passo 4 — Especificação no GitHub
Peça ao ChatGPT para criar a **Epic central** e as **Issues**. Lukas pede antes uma auditoria da arquitetura e da segurança (51:26–52:21). Cada Issue deve ter o modelo da seção 4.

### Passo 5 — Implementação
Entregue a Epic e a Issue ao Claude Code. A cada nova Epic, ou conforme a situação, cria-se uma branch de desenvolvimento; cada tarefa vira um PR dessa branch (58:53). A estratégia de branches pode mudar de projeto para projeto.

### Passo 6 — Testes e CI
Ao abrir o PR, o CI roda as verificações. Se algo falhar, o Claude Code lê o resultado, corrige e tenta de novo (01:02:28). Se falhar no CI, não chega em produção (31:08).

### Passo 7 — Homologação
Abra a funcionalidade e valide na prática (seção 6). Decida **GO** ou **NO-GO**. Em NO-GO, a tarefa volta para ajuste.

### Passo 8 — Publicação
Só depois dos gates de aprovação. Entenda a diferença:
- **Pull Request:** pedido para juntar o trabalho.
- **Merge:** a mudança aprovada entra na branch principal.
- **Deploy:** a versão passa a rodar no ambiente online.

Um PR aberto não significa produção. (Na reunião, a publicação foi resumida como “só o PR” (56:07); essa distinção é um esclarecimento deste guia.)

---

## 4. Modelos

### 4.1 Modelo de necessidade

```
Título:
Problema (o que não funciona ou falta hoje):
Quem é beneficiado:
O que precisamos resolver:
Por que é importante:
O que seria uma solução satisfatória:
Referências (prints, links, concepts):
```

### 4.2 Modelo de especificação (Epic)

```
Epic: <nome>
Objetivo:
Resultado esperado para o usuário:
Fora da Epic (exclusões):
Issues previstas:
Riscos e dependências:
```

### 4.3 Modelo de tarefa (Issue)

Baseado no exemplo ditado por Lukas (56:40):

```
Título:
Problema / objetivo:
Escopo (o que será feito):
Exclusões (o que NÃO será feito agora):
Critérios de aceite:
  - [ ] ...
Dependências:
Evidências esperadas (PR, checks, antes e depois):
Responsável:
```

Exemplo resumido: *Objetivo:* permitir o cadastro de usuário e a verificação por e-mail. *Escopo:* formulário, validação, e-mail de confirmação. *Exclusões:* login com Google. *Aceite:* pessoa nova cria conta e recebe um e-mail; e-mail inválido ou repetido mostra erro claro. *Dependência:* serviço SMTP confiável.

### 4.4 Bons critérios de aceite
- São verificáveis por qualquer pessoa.
- Descrevem o comportamento, não a implementação.
- Incluem o caso de erro, não só o caminho feliz.

---

## 5. Fluxo de testes

1. O Claude Code desenvolve e roda os testes localmente.
2. Ao abrir o PR (primeiro como rascunho, depois oficial), o CI executa as verificações do projeto, por exemplo: typecheck, lint, testes unitários, de integração e E2E, build e verificações de segurança aplicáveis (01:04:25).
3. Se algo falhar, o Claude Code lê o CI, corrige e repete (01:02:28, 01:07:01).
4. Com tudo verde, segue para a homologação.

Testes ajudam a detectar regressões, mas não garantem ausência absoluta de defeitos. Por isso existe a homologação humana.

Lukas citou ainda, como melhoria futura, uma verificação para detectar chaves e variáveis sensíveis expostas (59:46).

---

## 6. Checklist de homologação

- [ ] O problema original foi resolvido?
- [ ] O visual corresponde ao esperado (e ao concept)?
- [ ] A navegação funciona?
- [ ] As regras de negócio estão corretas?
- [ ] Há alguma inconsistência perceptível?
- [ ] Os critérios de aceite foram atendidos?

**Decisão:** GO / NO-GO. Em NO-GO, registre o que ajustar e devolva a tarefa.

---

## 7. Orientações iniciais para o Léo

O combinado na reunião foi que o Léo aprenda **usando**, em projetos pessoais, antes de assumir demandas da LK (01:11:26–01:11:29, 01:29:34, 01:41:02).

**Preparação (conforme Lukas descreveu)**
1. Conectar o ChatGPT ao GitHub, com a conta pessoal e a da empresa. Na organização da LK, permitir que a conta pessoal faça requisições; os repositórios ficam privados (49:13–51:26).
2. Manter um chat de planejamento/controle e um chat só de imagens (01:24:01–01:24:20).
3. Considerar o Claude Desktop em vez do VS Code, pelas funções extras (navegador, Remote Control) (34:23).

**Jornada sugerida**
1. Escolha uma funcionalidade simples de um projeto pessoal.
2. Descreva o problema ao ChatGPT e refine a necessidade.
3. Crie uma referência visual, se precisar.
4. Defina escopo e critérios de aceite.
5. Registre as tarefas no GitHub.
6. Implemente com o Claude Code.
7. Execute as verificações.
8. Homologue.
9. Documente o resultado.
10. Avise o Lukas quando estiver confortável com o processo (01:41:02).

**Sugestão de prompt para começar** (a ideia vem de 01:28:41; o texto é uma sugestão):

> Este é o contexto de como a LK desenvolve software. Quero aprender aplicando no meu projeto pessoal. Pesquise o que Lukas faz, me diga o que você precisa saber e me ajude a definir o próximo passo.

---

## 8. Perguntas frequentes

- **O ChatGPT programa?** Neste fluxo, não: ele pensa, pesquisa e escreve a especificação. Quem implementa é o Claude Code.
- **Qual a diferença entre ChatGPT e Claude Code?** O ChatGPT tem o contexto da conversa, mas não está dentro do projeto. O Claude Code lê o repositório, escreve código e roda os testes.
- **Quem decide o que desenvolver?** Pessoas. A ideia não dá para automatizar (01:24:54).
- **O que acontece quando um teste falha?** O Claude Code lê o CI, corrige e repete. Se continuar falhando, não chega em produção.
- **Quando a tarefa está concluída?** Quando passou no CI e foi homologada (GO). Ter uma Issue ou um PR não basta.
- **Como acompanhar outro programador?** Hoje, pelo GitHub. O painel de tarefas no LK System ainda é uma ideia.

---

## 9. O que ainda não existe (para não confundir)

- O **painel de tarefas** no LK System é uma ideia em planejamento. Lukas vai criar um concept e enviar ao Léo (01:42:26).
- A **integração com o GitHub** para alimentar o painel (plugin ou API) está em estudo (01:35:06, 01:35:23).
- A **Lívia**, assistente digital, é uma ideia a maturar (23:13, 01:30:39).

## 10. Próximos passos combinados

| Quem | O quê | Status |
|---|---|---|
| Lukas | Enviar os dois materiais ao Léo | Combinado |
| Lukas | Criar o concept do painel de tarefas e enviar | Combinado |
| Léo | Testar o fluxo em projeto pessoal (hoje e amanhã) | Combinado |
| Léo | Avisar quando estiver pronto para receber demandas | Combinado |
| Léo | Aplicar no sistema da LK e dividir tarefas | A validar |
| Ambos | Modelo de distribuição, visibilidade de progresso, estrutura do painel | A validar / Ideia em estudo |

Prazos: a reunião só fixou “hoje e amanhã” para os testes do Léo (01:29:34). Nenhum outro prazo foi definido.
