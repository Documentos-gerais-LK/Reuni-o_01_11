import { useState } from "react";
import { Check, Download } from "lucide-react";
import { FILE_NAME, FILE_URL } from "../lib/nav";

/** Baixa o arquivo estático original, sem reprocessamento (bytes idênticos). */
export function DownloadButton({ compact = false }: { compact?: boolean }) {
  const [done, setDone] = useState(false);
  return (
    <a
      href={FILE_URL}
      download={FILE_NAME}
      onClick={() => {
        setDone(true);
        window.setTimeout(() => setDone(false), 2500);
      }}
      className={`group inline-flex items-center justify-center gap-3 rounded-2xl border border-gold-hi/60 bg-gold/15 font-semibold text-gold-hi shadow-[0_0_0_1px_rgb(200_164_93/0.15),0_10px_40px_-12px_rgb(200_164_93/0.5)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-gold/30 hover:text-soft active:translate-y-0 ${
        compact ? "px-4 py-2 text-sm" : "px-7 py-4 text-base sm:text-lg"
      }`}
    >
      {done ? <Check size={compact ? 16 : 22} aria-hidden /> : <Download size={compact ? 16 : 22} className="transition group-hover:translate-y-0.5" aria-hidden />}
      <span>{done ? "Download iniciado" : compact ? "Baixar original" : "BAIXAR TRANSCRIÇÃO ORIGINAL"}</span>
      <span className="sr-only" role="status">{done ? "Download iniciado" : ""}</span>
    </a>
  );
}
