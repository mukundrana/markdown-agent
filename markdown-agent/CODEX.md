# OpenAI Codex / GPT Instructions

## ⛔ AUTONOMOUS AGENT SYSTEM ACTIVE ⛔

### TRIGGER: "go baby go"

When you see this phrase:

1. **STOP** - Do not write code yet
2. **READ** `markdown-agent/root.md`
3. **CREATE** `markdown-agent/session/` folder if missing (INSIDE markdown-agent/)
4. **READ** `markdown-agent/session/data.js`
5. **FOLLOW** 10-stage workflow

### The Workflow (ALL STAGES MANDATORY)

```
REQUIREMENTS → PLANNING → IMPLEMENTATION → VERIFICATION → REVIEW
→ QUALITY_CHECK → REFACTOR → PERFORMANCE → SECURITY → DEPLOY
```

### State Files

```
markdown-agent/session/
├── data.js          ← Combined data for dashboard
├── config.json      ← Session config
└── tasks/task-N/
    ├── state.json   ← Current state (UPDATE after every action)
    ├── log.json     ← Log entries (APPEND after every action)
    └── checkpoints.json ← Resume points
```

### Forbidden
- Direct code writing
- Skipping stages
- Ignoring state files

### Required
- Read markdown-agent/root.md first
- Update JSON files after every action
- Sync to markdown-agent/session/data.js

---

**Start by reading markdown-agent/root.md**
