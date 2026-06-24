import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build as esbuild } from "esbuild";

globalThis.require = createRequire(import.meta.url);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "../..");

async function buildVercel() {
  const outfile = path.resolve(rootDir, "api/_app.cjs");

  await esbuild({
    entryPoints: [path.resolve(__dirname, "src/app.ts")],
    platform: "node",
    target: "node18",
    bundle: true,
    format: "cjs",
    outfile,
    logLevel: "info",
    sourcemap: false,
    external: [
      "*.node",
      "sharp",
      "canvas",
      "bcrypt",
      "argon2",
      "fsevents",
      "pg-native",
      "better-sqlite3",
      "sqlite3",
    ],
  });

  console.log("Vercel bundle written to api/_app.cjs");
}

buildVercel().catch((err) => {
  console.error(err);
  process.exit(1);
});
