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


1. Paste your xAI key (vision access recommended for screenshots).
2. Save credentials in the Secure Logins form for sites that need auth.
3. Enter a task (e.g. "go to google.com and login then take a screenshot of the homepage") and press Run.
4. Watch the live view (screenshots), event stream, and captured output.

The exact prompt you type is sent to the browser operator. The reasoner receives the current cheap obs (including the improved CSS selector list from the visual/DOM understanding) + any screenshot.


## Notes for the next agent

- This is deliberately the smallest working base with the pieces we are confident are solid (operator, events, DB/secure, prompt wiring, focused UI).
- You can evolve the BrowserActionReasoner, the skills, the obs quality, or even replace the reasoner entirely.
- The visual-first guidance is intentional: prefer screenshot understanding of the visible page + cheap data over pure text or URL tricks.
- Clean tree, no stale executive/strategy scaffolding left.
