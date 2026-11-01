# Metodologia de desenvolvimento LK — apresentação interativa

Material **interno e confidencial** (reunião Lukas × Léo, 01/11/2026). Não publique.

## Executar

```bash
npm install
npm run dev        # desenvolvimento
npm run preview    # serve o build (npm run build antes)
npm run check      # typecheck + testes + build + integridade do TXT
```

Abra pelo servidor (dev ou preview). Abrir o `index.html` direto do disco (file://) não carrega a transcrição.

## Atalhos

← → navegam · I índice · G glossário · ? perguntas do Léo · F tela cheia.

## Estrutura

- `original/` e `public/`: cópia do TXT original (93.375 bytes, SHA-256 `cfd67f57…3618`). Nunca edite.
- `scripts/verify-integrity.mjs`: confere tamanho e hash do original, do `public/` e do `dist/`.
- `src/content/`: textos, glossário, perguntas e pendências (com timestamps).
- `src/slides/`: os 22 slides. `src/components/`: UI, visualizador da transcrição, overlays.
- `GUIA_APLICACAO_METODOLOGIA_LK.md`: guia prático (a cópia em `public/` é a servida; mantenha as duas iguais).
