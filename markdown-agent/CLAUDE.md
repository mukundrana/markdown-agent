# 🤖 AUTONOMOUS AGENT SYSTEM

## ⛔ STOP - READ THIS ENTIRE FILE BEFORE DOING ANYTHING ⛔

This project uses an **Autonomous Agent System** that follows a structured 10-stage workflow.

---

## 🔑 TRIGGER PHRASE

When the user says **"go baby go"**, you MUST activate the agent system.

---

## 📋 MANDATORY ACTIVATION SEQUENCE

**Before writing ANY code, you MUST:**

### Step 1: READ THE PROTOCOL
```
READ: markdown-agent/root.md
```
This file contains the complete protocol. Do NOT proceed without reading it.

### Step 2: CHECK/CREATE SESSION
```
CHECK if markdown-agent/session/ folder exists
├── If NO: CREATE markdown-agent/session/ with:
│   ├── data.js (empty template - see root.md)
│   ├── config.json (empty template - see root.md)
│   └── tasks/ (empty folder)
└── If YES: READ markdown-agent/session/data.js
```

### Step 3: RESPOND BASED ON QUEUE STATE
```
If queue is EMPTY:
  "✅ AGENT SYSTEM ACTIVATED
   Queue Status: EMPTY
   What would you like me to build?"

If queue has IN_PROGRESS task:
  "✅ AGENT SYSTEM ACTIVATED
   Resuming task: [name]
   Current stage: [stage]
   [Continue from that stage]"
```

---

## 🚫 YOU MUST NOT

- ❌ Write code directly without following the workflow
- ❌ Skip stages
- ❌ Create files in src/ without updating state files
- ❌ Ignore the markdown-agent/session/data.js file

---

## ✅ YOU MUST

- ✅ Read markdown-agent/root.md FIRST
- ✅ Check/Create markdown-agent/session folder
- ✅ Read markdown-agent/session/data.js and markdown-agent/session/config.json
- ✅ Follow the 10-stage workflow:
  1. REQUIREMENTS
  2. PLANNING
  3. IMPLEMENTATION
  4. VERIFICATION
  5. REVIEW
  6. QUALITY_CHECK
  7. REFACTOR
  8. PERFORMANCE
  9. SECURITY
  10. DEPLOY
- ✅ Update JSON state files after every action
- ✅ Sync to session/data.js for dashboard

---

## 📁 FILE STRUCTURE

```
project/
├── CLAUDE.md              ← You are here
├── src/                   ← Your code goes here
└── markdown-agent/        ← Agent system
    ├── root.md           ← THE PROTOCOL (READ THIS!)
    ├── agents/           ← Agent definitions
    ├── templates/        ← Templates
    ├── dashboard.html    ← Visual dashboard
    └── session/          ← Runtime state (create if missing)
        ├── data.js       ← Combined data for dashboard
        ├── config.json   ← Session config
        └── tasks/task-N/ ← Per-task files
            ├── state.json
            ├── log.json
            └── checkpoints.json
```

---

## ⚠️ IF YOU IGNORE THIS FILE

You have FAILED the protocol. Start over:

1. READ markdown-agent/root.md
2. Follow the activation sequence
3. Proceed with the workflow

---

**The autonomous agent system is now ACTIVE. Read markdown-agent/root.md to begin.**
