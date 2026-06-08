# Visual Browser Agent Foundation (clean base)

This is the minimal, clean foundation for a **visual-first, human-style browser navigation and operation** system.

The operator is designed to:
- First look at the screenshot to understand the visible page and its interactable parts (buttons, links, form fields, menu items, search boxes, filters, extractable data) exactly as a human would.
- Augment that visual understanding with cheap structured data pulled from the DOM (and console where relevant).
- Decide and execute actions via a real Playwright browser.
- Handle secure credentials (username/password never leave the server or enter any prompt — only injected at execution time via the "perform secure login for the current domain using stored credentials" marker).
- Stream full events (thoughts, actions, observations, screenshots) for live UI and audit.

Everything is built so a fresh agent (new context window) can evolve the "thinking" / prompt design / features without being stuck on old scaffolding.

## Core Pieces (the stable base we are confident won't be changed)

- **BrowserOperator** (lib/operators/BrowserOperator.ts): Thin driver. Spins Playwright, neutral bootstrap, cheap obs (body + links + CSS interactives with [filled]), selective screenshots + archive on real change, execute (with secure marker resolution), event emission, simple no-progress guard, calls reasoner for decisions.
- **Prompt composition** (lib/reasoners/BrowserActionReasoner.ts + xaiClient + skills/browser/*.md): Builds the exact system + user prompt the model receives (skills injected, strict json_schema, explicit inference params, visual obs emphasis). Login rules and sequence are part of the foundation.
- **UI** (app/page.tsx focused on Visual Browser workspace + components/LiveBrowserView.tsx + EventStream.tsx): Key connect, task Run (exact prompt sent), live browser view (screenshots), event stream, secure logins form (save creds), output gallery.
- **Event logging**: Full AgentEvent stream (thought/action/observation/error/screenshot/result) + ViewState for the live view.
- **Database + credential wiring**: Prisma (adminagent schema on shared proto2 Postgres) + secure-store (AES-256-GCM, domain normalization including auth subdomains, live queries). API routes use dynamic imports for robustness. Sessions (Playwright storageState) also persisted.
- **Operator abstraction** (lib/operators/types.ts): Simple interface so the foundation is extensible without locking the next agent in.

## Quick Start

```bash
cd /Users/grant/Desktop/APP-LAB/dev/admin-agent
npm install
npm run dev
```

Open http://localhost:3000 (Visual Browser tab is the core).

1. Paste your xAI key (vision access recommended for screenshots).
2. (Optional) Save credentials in the Secure Logins form for sites that need auth.
3. Enter a task (e.g. "go to google.com and login then take a screenshot of the homepage") and press Run.
4. Watch the live view (screenshots), event stream, and captured output.

The exact prompt you type is sent to the browser operator. The reasoner receives the current cheap obs (including the improved CSS selector list from the visual/DOM understanding) + any screenshot.

## Architecture (visual-first foundation)

- Substrate (BrowserOperator): reliable execution, cheap obs (DOM + the CSS interactive list that helps the model "see" buttons/fields/etc.), security (creds only at Playwright time), event emission, screenshot archive on change.
- Prompt Agent (BrowserActionReasoner + skills): owns the fuzzy policy. System prompt tells it to treat the screenshot + cheap data like a human would (understand interactables first). Strict structured output for actions (goto/click/type/.../done). Secure markers for creds.
- UI + events: direct, no iframes. Polls status, renders live view + typed event log.

No executive layer, no heavy strategy machine, no simulation in the foundation. The next agent is free to change how the reasoner "thinks" or how prompts are built.

## Notes for the next agent

- This is deliberately the smallest working base with the pieces we are confident are solid (operator, events, DB/secure, prompt wiring, focused UI).
- You can evolve the BrowserActionReasoner, the skills, the obs quality, or even replace the reasoner entirely.
- The visual-first guidance is intentional: prefer screenshot understanding of the visible page + cheap data over pure text or URL tricks.
- Clean tree, no stale executive/TARS/strategy scaffolding left.

See the code for the exact prompts the model receives on a "nav to X and login" task (system + skills + per-step instruction + current cheap obs).

All exploration / dead code removed so you have a clean start.
| Firecrawl | firecrawl/firecrawl | Scrape / crawl / map / agent UI with clean markdown output |
| Photos | immich-app/immich | Drag-upload photo grid, lightbox, albums, local persistence (real facial/map would need their stack) |
| PDF | Stirling-Tools/Stirling-PDF | Client-side merge/split/watermark/etc using pdf-lib (many of the 50+ tools) |
| Analytics | umami-software/umami | Live analytics dashboard, visitors, charts, events |
| World | koala73/worldmonitor | Global intel: news feeds, risk maps, finance (globe + layers stub) |
| OpenCut | OpenCut-app/OpenCut | Web video editor timeline stub (full Rust rewrite too big) |
| Pixi | pixijs/pixijs | Real interactive PixiJS WebGL demos (bunny, particles, drawing) |
| Invoke | invoke-ai/InvokeAI | AI image studio + canvas (prompt + free image API + local brushes) |
| Mobile | mobile-next/mobile-mcp | iOS/Android simulator frame + MCP-style tap/swipe/type automation log |

## Architecture & Notes on "Merging"

- Single Next.js 16 + TypeScript + Tailwind app (easy to split into pnpm workspaces/turbo later).
- Every view is a self-contained React component with its own state/logic.
- Real libraries used wherever practical: PixiJS, pdf-lib, Monaco, Recharts, framer-motion, sonner, PIXI runtime, etc.
- Heavy backends (full Immich ML containers, Invoke local models, Stirling Java server, actual Firecrawl infra, OpenMontage Python+Remotion full, vscode monolith, Tauri worldmonitor desktop) are represented by high-fidelity, useful simulations that capture the *feel and core workflows*. This is the only practical way to have them "run together" instantly.
- Agent TARS web UI source lives inside the bytedance repo (under multimodal/tarko/agent-ui + @agent-tars/* packages). We implemented the spirit (chat + live operator view + event stream) rather than trying to vendor the entire thing.
- The bottom agent bar + command palette is the "glue" that makes it feel like one admin/agent operating system.

## Why some things are limited (and what would make them real)

- **vscode / InvokeAI / Immich / Stirling full / OpenMontage full / worldmonitor desktop**: enormous or require native runtimes/models/servers. We took the heart (editor, canvas gen, photo grid, PDF ops, video pipeline, maps+intel).
- **mobile-mcp**: the real thing talks to Xcode/ADB devices. Our version gives the exact UX an agent would drive.
- Adding a real backend for any of them is straightforward — each view is isolated.

## Future / Polish ideas (have fun)

- Persist more state to IndexedDB (photos, memory layers, open files).
- Real Pixi scenes saved/loaded, full particle editor.
- Wire the global agent prompt into the specific views (e.g. "scrape X" actually triggers Firecrawl view logic).
- Add a shared "MCP tool registry" that all agentic views can call.
- Theme switcher + coss-ui components if you want that system.
- Export the whole state as a portable "workspace" json.

## Attribution & Thanks

Every tab footer or header calls out the original project. This is a celebration and unification layer, not a replacement. Go star the originals:

calesthio/OpenMontage, TencentCloud/TencentDB-Agent-Memory, microsoft/vscode, firecrawl/firecrawl, immich-app/immich, Stirling-Tools/Stirling-PDF, umami-software/umami, koala73/worldmonitor, OpenCut-app/OpenCut, pixijs/pixijs, invoke-ai/InvokeAI, kortix-ai/suna, mobile-next/mobile-mcp, bytedance/UI-TARS-desktop.

Built for the admin-agent-gui vision — a place where a human + fleet of agents can operate all the tools that run a business from one beautiful screen.

Run it. Switch fast. Tell the agent to do things. Have fun.
