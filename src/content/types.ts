export type Status = "Combinado" | "A validar" | "Ideia em estudo";
export type Maturity = "Em uso" | "Em desenvolvimento" | "Proposta" | "Em estudo";

export interface Chapter {
  id: number;
  title: string;
}

export interface MethodStep {
  id: string;
  name: string;
  short: string;
  means: string;
  goal: string;
  who: string;
  tool: string;
  result: string;
  sources: string[];
}

export interface Pending {
  text: string;
  status: Status;
  sources: string[];
  note?: string;
}
