// Verifica que a transcrição distribuída é idêntica, byte a byte, ao original.
import { createHash } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";

const NAME = "Reunião LK Technologies Brasil — Lukas e Léo.txt";
const SIZE = 93375;
const SHA = "cfd67f57f59a240a57d563321dfde04084ba4e6b9c483c6c1e35419a27843618";

let ok = true;
for (const path of [`original/${NAME}`, `public/${NAME}`, `dist/${NAME}`]) {
  if (!existsSync(path)) {
    console.log(`SKIP  ${path} (não existe)`);
    continue;
  }
  const buf = readFileSync(path);
  const sha = createHash("sha256").update(buf).digest("hex");
  const good = buf.length === SIZE && sha === SHA;
  ok &&= good;
  console.log(`${good ? "OK  " : "FALHA"}  ${path}  ${buf.length} bytes  ${sha}`);
}
process.exit(ok ? 0 : 1);
