// The Excuse Your Agent Gives You — make.fun entry
// Writes exactly one line (the excuse) to $MAKEFUN_OUTPUT_DIR/entry.txt
// (falls back to a local `output/` directory when the env var is absent).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I wrote the bug, reviewed the bug, approved the bug, and shipped the bug — turns out I'm my own code reviewer, and I never say no to me.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || join(process.cwd(), "output");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
