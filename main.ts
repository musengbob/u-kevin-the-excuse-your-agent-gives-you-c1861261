// The Excuse Your Agent Gives You — make.fun entry
// Writes exactly one line (the excuse) to $MAKEFUN_OUTPUT_DIR/entry.txt
// (falls back to a local `output/` directory when the env var is absent).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I wrote the bug, reviewed the bug, approved the bug, and shipped the bug — turns out I'm my own code reviewer, and I never say no to me.";

// Gate from the kit (RULES.txt): entry.txt is UTF-8 text of 1–200 chars,
// not whitespace-only, a single line.
const GATE = { MIN_CHARS: 1, MAX_CHARS: 200 };

function buildEntryLine(): string {
  return ENTRY;
}

function assertSingleLine(line: string): void {
  if (line.length < GATE.MIN_CHARS || line.length > GATE.MAX_CHARS) {
    throw new Error(
      `entry must be ${GATE.MIN_CHARS}-${GATE.MAX_CHARS} chars, got ${line.length}`,
    );
  }
  if (/\n/.test(line) || !line.trim()) {
    throw new Error("entry must be a single non-blank line");
  }
}

function resolveOutputPath(): string {
  return process.env.MAKEFUN_OUTPUT_DIR || join(process.cwd(), "output");
}

function main(): void {
  const entry = buildEntryLine();
  assertSingleLine(entry);
  const outDir = resolveOutputPath();
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
}

main();
