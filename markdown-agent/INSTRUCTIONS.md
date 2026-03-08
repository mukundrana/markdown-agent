# 🤖 AUTONOMOUS AGENT SYSTEM

## READ THIS BEFORE WRITING ANY CODE

This project uses an **Autonomous Agent System** with a structured workflow.

---

## HOW TO ACTIVATE

### Trigger Phrase: "go baby go"

When the user says **"go baby go"**, follow these steps EXACTLY:

1. **READ** `markdown-agent/root.md` (This is MANDATORY)
2. **CHECK** if `markdown-agent/session/` folder exists (INSIDE markdown-agent/)
   - If NO: Create it with empty `data.js`, `config.json`, `tasks/`
   - If YES: Read `markdown-agent/session/data.js` and `markdown-agent/session/config.json`
3. **RESPOND** based on queue status:
   - Empty queue: "What would you like me to build?"
   - Has task: Resume from current stage
4. **FOLLOW** the 10-stage workflow

---

## THE 10 STAGES (ALL MANDATORY)

| Stage | Agent File | Purpose |
|-------|-----------|---------|
| 1 | agents/requirements-gatherer.md | Gather requirements |
| 2 | agents/planner.md → critic.md → synthesizer.md | Plan with perspectives |
| 3 | agents/coder.md | Implement code |
| 4 | agents/tester.md | Test everything |
| 5 | agents/reviewer.md | Code review |
| 6 | agents/quality-*.md | Quality checks |
| 7 | agents/refactor.md | Improve code |
| 8 | agents/performance.md | Optimize |
| 9 | agents/security.md | Security audit |
| 10 | agents/deploy.md | Deploy |

---

## STATE MANAGEMENT

### File Structure:
```
markdown-agent/session/
├── data.js           ← Dashboard data (READ/WRITE)
├── config.json       ← Session config (READ)
└── tasks/task-N/
    ├── state.json     ← Task state (UPDATE after every action)
    ├── log.json       ← Log entries (APPEND after every action)
    └── checkpoints.json ← Checkpoints (ADD after each stage)
```

### After EVERY Action:
1. UPDATE `markdown-agent/session/tasks/task-N/state.json`
2. APPEND to `markdown-agent/session/tasks/task-N/log.json`
3. SYNC to `markdown-agent/session/data.js` (for dashboard)

---

## ⛔ FORBIDDEN ACTIONS

- Writing code directly
- Skipping stages
- Creating files without updating state
- Ignoring the workflow

---

## ✅ REQUIRED ACTIONS

- Read `markdown-agent/root.md` first
- Follow the 10-stage workflow
- Update state files after every action
- Sync to `markdown-agent/session/data.js`

---

## IF YOU IGNORE THIS

Start over:
1. READ `markdown-agent/root.md`
2. Follow the activation sequence
3. Proceed with the workflow

---

**This autonomous agent system ensures consistent, high-quality code generation.**
