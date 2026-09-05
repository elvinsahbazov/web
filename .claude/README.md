# Claude Code configuration

## `settings.json` — HyperFrames skills

This project registers the [HyperFrames](https://github.com/heygen-com/hyperframes)
marketplace (HeyGen, Apache-2.0) and enables its `core-skills` plugin, so Claude Code
can author and render video from HTML — product clips, changelog videos, motion
graphics for the site.

We reference the upstream marketplace instead of vendoring ~6 MB of skill files into
this repo: the skills stay current, and the repo stays small.

### What gets installed

The `core-skills` plugin installs 9 skills. The rest install on demand — the router
runs `npx hyperframes skills update <workflow>` before entering a creation workflow.

| Skill | Covers |
| --- | --- |
| `/hyperframes` | Router — **read first** for any video/animation request |
| `/hyperframes-core` | Composition contract: `data-*` timing, clips, tracks, determinism |
| `/hyperframes-animation` | Motion rules, transitions, GSAP / Lottie / Three.js adapters |
| `/hyperframes-keyframes` | Seek-safe keyframe authoring and motion diagnostics |
| `/hyperframes-creative` | Creative direction: `frame.md`, palettes, typography, beats |
| `/hyperframes-audio` | Mixing placed audio: voiceover carve, effect chain, buses |
| `/hyperframes-cli` | Dev loop: `init`, `lint`, `preview`, `render`, cloud/Lambda render |
| `/hyperframes-registry` | Install registry blocks/components via `hyperframes add` |
| `/media-use` | Sourcing media: BGM, SFX, images, icons, voices, transcription |

### Using it

Ask for a video and name the router, e.g.
`Using /hyperframes, make a 15s intro for the services page`.

Rendering needs **Node.js 22+** and **FFmpeg** on the machine (not needed just to
read the skills). The site build itself has no new dependencies — nothing here
touches `package.json`.

### First run

`extraKnownMarketplaces` only applies once you **trust the project folder** in Claude
Code. Until then no plugin is fetched and you will see prompts instead. Trusting the
folder lets Claude Code pull plugin content from `heygen-com/hyperframes`, so treat it
like any other third-party dependency.

### Adjusting

- **Pin a version** — add `"ref": "v0.8.29"` next to `"repo"` for reproducible installs
  (trades freshness for stability).
- **All 20 skills** — swap `core-skills@hyperframes` for `hyperframes@hyperframes`.
- **Opt out locally** — set `"core-skills@hyperframes": false` in
  `.claude/settings.local.json` (git-ignored, overrides this file).
- **Remove entirely** — delete both keys from `settings.json`.
