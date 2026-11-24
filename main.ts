import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// News-image entry: the program ships the finished 1024x1024 image of
// Monday 24 November 2026's world news and copies it to the output dir.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "entry.png");

// Fail loudly instead of shipping an empty output when the image is missing.
const size = statSync(src).size;
if (size < 10000) throw new Error(`entry.png suspiciously small: ${size} bytes`);

mkdirSync(outDir, { recursive: true });
copyFileSync(src, join(outDir, "entry.png"));
console.log(`wrote ${join(outDir, "entry.png")} (${size} bytes)`);
