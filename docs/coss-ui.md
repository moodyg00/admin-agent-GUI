# coss ui Guidelines (Preferred, Not Strict)

**Preferred**: Use coss ui components for all UI to maintain premium, consistent, agent-native feel.

**Flexibility**: You may switch to shadcn/ui (or other) **only if it clearly improves the UI/UX**. In that case you **must** provide a clear written explanation of:
- The specific improvement
- Why coss ui was insufficient for that use case

## Installation (when using coss)
pnpm dlx skills add cosscom/coss (or follow current coss registry)

## Core Principles (when using coss)
- Use coss Dialog / Sheet / Drawer correctly (section structure: Header, Panel, Footer)
- Always use render props pattern where applicable
- Tailwind v4 semantic colors and --alpha() syntax
- data-slot selectors for styling
- Font variables: --font-sans, --font-mono, --font-heading

## Migration Notes
- asChild → render
- onSelect → onClick for many components
- ToggleGroup type="multiple"

## Enforcement
Grok should default to coss. Any use of shadcn must be justified in the commit/PR description. No unexplained deviations allowed.

**Reference**: Full coss skill loaded automatically when working on UI tasks.

---
**Note**: This file is human-only. Agents/Grok must not edit it.