# Claude Code configuration

## HyperFrames video skills

This repo does **not** ship the HyperFrames skills. They are framework-general
knowledge, so they are installed once per machine and are then available in every
project — nothing to vendor here, nothing to keep in sync.

Install (or update) them with one command:

```bash
npx hyperframes skills update
```

| Location | Used by |
| --- | --- |
| `~/.claude/skills/` | Claude Code, in every project |
| `~/.agents/skills/` | Codex, Cursor, Gemini CLI, and other skill-aware agents |

Requires **Node.js 22+** and **git**. Rendering video additionally needs **FFmpeg**.
Nothing is added to this project's `package.json`.

### What you get

Nine core skills, led by the `/hyperframes` router — read first for any request to
make, edit, animate, or render a video:

| Skill | Covers |
| --- | --- |
| `/hyperframes` | Router and capability map; picks and installs the right workflow |
| `/hyperframes-core` | Composition contract: `data-*` timing, clips, tracks, determinism |
| `/hyperframes-animation` | Motion rules, transitions, GSAP / Lottie / Three.js adapters |
| `/hyperframes-keyframes` | Seek-safe keyframes, camera moves, motion diagnostics |
| `/hyperframes-creative` | Creative direction: `frame.md`, palettes, typography, beats |
| `/hyperframes-audio` | Mixing placed audio: voiceover carve, effect chain, buses |
| `/hyperframes-cli` | Dev loop: `init`, `lint`, `preview`, `render`, cloud rendering |
| `/hyperframes-registry` | Install registry blocks/components via `hyperframes add` |
| `/media-use` | Sourcing media: BGM, SFX, images, icons, voices, transcription |

Eleven creation workflows — `/product-launch-video`, `/motion-graphics`,
`/music-to-video`, `/slideshow`, `/pr-to-video` and others — are **not** installed up
front. The router pulls each one the first time it is needed.

### Using it

Name the router in your request, e.g.
`Using /hyperframes, make a 15s intro for the services page`.

Check what is installed and whether it is current:

```bash
npx hyperframes skills check
```

### Before you install

Skills run with full agent permissions, and this set comes from a third party
([HyperFrames](https://github.com/heygen-com/hyperframes) by HeyGen, Apache-2.0).
Review them like any other dependency.

The CLI has no version pin — it always installs upstream `main`, so an update can
change skill behaviour. Re-run `skills check` after updating if that matters to you.

## `settings.local.json`

`.claude/settings.local.json` is git-ignored: Claude Code writes each developer's own
permission choices there, which should not be shared.
