import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY_LINE =
  "I'm out of office — your email has been forwarded to my houseplant, who now has final say on everything until Monday.";

function validateEntry(line: string): void {
  const trimmed = line.trim();
  if (trimmed.length === 0) {
    throw new Error("entry must not be blank");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be exactly one line");
  }
  if (trimmed.length < 1 || trimmed.length > 160) {
    throw new Error(
      `entry must be 1-160 characters, got ${trimmed.length}`
    );
  }
}

function resolveOutputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv !== undefined && fromEnv.length > 0) {
    return fromEnv;
  }
  return "/output";
}

function main(): void {
  validateEntry(ENTRY_LINE);
  const outputDir = resolveOutputDir();
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.txt"), ENTRY_LINE + "\n", "utf8");
}

main();
