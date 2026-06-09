# admin-agent
Backend control plane for the proto-2 business operations suite.

## Panels/Tools
The backend UI will be comprised of workspaces with tools and panels and a blank canvas underneath, tools will be in toolbars and panels will get added/dropped onto the moveable/scaleable canvas. Some tool UI will be attachable panels to the toolbars (ie: image library, documents). List of tools/panels.!List will be updated when the next tool is being build so this is not a complete list yet!

---The browser operator---
- Inspect the page visually first, then augment that view with cheap DOM data.
- Drive a real Playwright browser with live screenshots, events, and secure credential injection on the server.
- Handle sites that need human-style interaction when normal browser automation is not enough.
- Keep credentials off the prompt and out of the UI, except for server-side storage and execution.

## Direction
- Keep naming aligned to reusable workspaces, operators, and workflows instead of one-off app labels.
- Prefer shared catalogs and components over hard-coded UI branches in the page shell.
- Refactor early when the structure starts blocking new tools or agents.
- Keep changes general enough to support future limited-scope operators inside larger workflows.

## High-Level Principles

- **Be concise.** Avoid unnecessary comments or over-explanation in code.
- **Prefer composition.** Build reusable operators, workflows, and panels instead of hard-coded features.
- **Move to catalogs.** Pull constants and shared definitions out of large component files into centralized structures.
- **Refactor early.** When the current shape starts blocking new tools, workflows, or agents, restructure before adding more.
- **Server-side security.** Credentials and sensitive data stay on the server only—never in prompts or UI.

## Notes

- Keep answers concise.
- Avoid adding comments unless the code truly needs them.
- If a structural choice matters, check how similar open source projects organize it before expanding the pattern here.

