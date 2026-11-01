import { describe, expect, it } from "vitest";
import { findRanges, fold, TS_LINE } from "./search";

describe("search", () => {
  it("preserva o comprimento ao remover acentos", () => {
    const s = "Reunião — Léo ação";
    expect(fold(s).length).toBe(s.length);
  });
  it("ignora acentos e caixa", () => {
    expect(findRanges("Homologação humana", "HOMOLOGACAO")).toEqual([[0, 11]]);
  });
  it("encontra várias ocorrências", () => {
    expect(findRanges("pr pr PR", "pr")).toHaveLength(3);
  });
  it("busca vazia não retorna nada", () => {
    expect(findRanges("abc", "  ")).toEqual([]);
  });
  it("reconhece linhas de fala com timestamp", () => {
    expect("01:03:41 leo kirime: Não.".match(TS_LINE)?.[1]).toBe("01:03:41");
    expect("54:07 LK technologies Brasil: x".match(TS_LINE)?.[3]).toBe("LK technologies Brasil");
  });
});
