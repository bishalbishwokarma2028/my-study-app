---
name: Vercel output directory
description: How to configure Vite + vercel.json so Vercel finds the build output for the scorpstudy artifact
---

The vite.config.ts outDir must resolve to `artifacts/scorpstudy/dist` (local to the artifact).
vercel.json must set `"outputDirectory": "artifacts/scorpstudy/dist"`.

**Why:** Vercel throws "No Output Directory named 'public' found" when outDir is set to a workspace-root-level `public` folder — Vercel doesn't find it after the build completes.

**How to apply:** Any time vite.config.ts build outDir or vercel.json outputDirectory is changed, keep them in sync: outDir = `path.resolve(import.meta.dirname, "dist")`, outputDirectory = `"artifacts/scorpstudy/dist"`.

Also set `sourcemap: false` in the vite build config to suppress noisy shadcn/ui sourcemap warnings during Vercel builds.
