# Agent Communication Protocol

**Purpose**  
Enable structured, reliable handoffs between all custom agents so nothing falls through the cracks and context is never lost.

**Mandatory Rules for Every Agent**
1. Read this entire file at the **start** of every new task.
2. Use the exact `HANDOFF` format below when passing work to another agent.
3. Never delete or edit other agents' entries — only append new ones.
4. The **Supervisor** must review this file at the beginning of every major phase.
5. Keep entries concise but clear.

**Active Agents (Current Roster)**
- Supervisor (Overseer + Grill-me enforcer)
- Engineer (Implementation)
- Tester (Visual + Functional QA)
- Copyhawk (Marketing & Copy)
- Strategist (Planning & Roadmaps)
- Researcher (Deep Research & Validation)
- ContentSystems (Content Pipelines)
- Guardian (Quality, Security & Architecture)

**Handoff Format (Copy-Paste Template)**

```markdown
### HANDOFF — [YYYY-MM-DD HH:MM]
**From:** [Agent Name]
**To:** [Agent Name or "All" or "Supervisor"]
**Task ID:** [e.g. ENG-047 or STRAT-012]
**Status:** In Progress | Ready for Review | Blocked | Completed
**Summary:** One clear sentence describing what was done.
**Key Deliverables:**
- `components/Navbar.tsx`
- `docs/plan.md` (updated section X)
**Notes for Next Agent:**
- Specific context, gotchas, or decisions made
**Next Action Required:**
- What the receiving agent should do next
```

**Example Entry**

```markdown
### HANDOFF — 2026-05-28 01:05
**From:** Engineer
**To:** Tester
**Task ID:** ENG-001
**Status:** Ready for Review
**Summary:** Built responsive navbar with coss Sheet component and dark mode toggle.
**Key Deliverables:**
- `components/Navbar.tsx`
- `app/globals.css` (added dark mode tokens)
**Notes for Next Agent:**
- Used coss primitives only. Mobile menu tested on Chrome dev tools.
**Next Action Required:**
- Visually validate on iPhone 14, iPad, and desktop. Check dark mode contrast.
```

**Current Open Tasks**
(Supervisor will maintain this section)

---
**Last Updated:** 2026-05-28 by Supervisor
