import { createContext, useContext } from "react";

export interface Nav {
  /** Abre o registro original, rolando até a linha com esse timestamp. */
  openTranscript: (ts: string) => void;
  goTo: (index: number) => void;
  openGlossary: () => void;
  openFaq: () => void;
  reduced: boolean;
}

export const NavContext = createContext<Nav>({
  openTranscript: () => {},
  goTo: () => {},
  openGlossary: () => {},
  openFaq: () => {},
  reduced: false,
});

export const useNav = () => useContext(NavContext);

export const FILE_NAME = "Reunião LK Technologies Brasil — Lukas e Léo.txt";
export const FILE_URL = "./" + encodeURIComponent(FILE_NAME);
export const GUIDE_NAME = "GUIA_APLICACAO_METODOLOGIA_LK.md";
export const GUIDE_URL = "./" + GUIDE_NAME;
