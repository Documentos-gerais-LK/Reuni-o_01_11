/** Mapeia cada caractere ao seu "caractere base" (sem acento, minúsculo) mantendo o mesmo comprimento. */
export function fold(text: string): string {
  let out = "";
  for (const ch of text) {
    const base = ch.normalize("NFD").charAt(0).toLowerCase();
    // ch pode ter 2 unidades UTF-16 (emoji); preserve o comprimento
    out += ch.length === 1 ? base : "\u0000".repeat(ch.length);
  }
  return out;
}

/** Retorna [início, fim) de cada ocorrência de `query` em `text`, ignorando acentos e caixa. */
export function findRanges(text: string, query: string): Array<[number, number]> {
  const q = fold(query.trim());
  if (!q) return [];
  const hay = fold(text);
  const ranges: Array<[number, number]> = [];
  let i = hay.indexOf(q);
  while (i !== -1) {
    ranges.push([i, i + q.length]);
    i = hay.indexOf(q, i + q.length);
  }
  return ranges;
}

export const TS_LINE = /^(\d{2}:\d{2}(?::\d{2})?)( )(leo kirime|LK technologies Brasil)(:)/;
