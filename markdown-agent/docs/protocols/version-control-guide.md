---
guide_version: "1.0.0"
purpose: "Clarify which files to commit to version control"
---

# 📦 Version Control Guide

## What to Commit vs What to Ignore

### ✅ COMMIT These Files (Core System)

These files define the agent system and should be committed to your repository:

```
markdown-agent/
├── root.md                          ✅ Entry point - always commit
├── README.md                        ✅ Documentation - always commit
├── config.md                        ✅ Agent configurations - always commit
├── .gitignore                       ✅ Ignore patterns - always commit
│
├── agents/                          ✅ All agent definitions - always commit
│   ├── planner.md
│   ├── critic.md
│   ├── synthesizer.md
│   ├── coder.md
│   ├── tester.md
│   ├── orchestrator.md
│   ├── debugger.md
│   ├── refactor.md
│   ├── performance.md
│   ├── security.md
│   ├── deploy.md
│   ├── CHANGElog.md
│   ├── requirements-gatherer.md
│   └── quality-*.md (6 files)
│
├── templates/                       ✅ All templates - always commit
│   ├── stages/                      ✅ Stage templates
│   │   └── STAGE_*.md (10 files)
│   ├── session/                     ✅ Session templates
│   │   ├── state.template.md
│   │   ├── task-queue.template.md
│   │   ├── log.template.md
│   │   └── context.template.md
│   └── shared/                      ✅ Shared templates
│       ├── requirements.md
│       ├── agent-conversation.md
│       └── checkpoint.md
│
└── docs/                            ✅ All documentation - always commit
    ├── guides/
    ├── protocols/
    ├── features/
    └── reference/
```

---

### ❌ DO NOT COMMIT These Files (Project State)

These files contain **project-specific state** and should NOT be committed:

**They are listed in `.gitignore`**:

```
markdown-agent/
├── session/
│   ├── state.md                    ❌ Project state - DO NOT COMMIT
│   ├── task-queue.md                ❌ Task queue - DO NOT COMMIT
│   ├── log.md                        ❌ Execution log - DO NOT COMMIT
│   ├── context.md                    ❌ Project context - DO NOT COMMIT
│   ├── checkpoints.md                ❌ Checkpoints - DO NOT COMMIT
│   ├── planner_plan.md               ❌ Planning output - DO NOT COMMIT
│   └── critic_plan.md                ❌ Planning output - DO NOT COMMIT
│
├── plan.md                          ❌ Generated plan - DO NOT COMMIT
│
└── task-requirements/                ❌ Task requirements - DO NOT COMMIT
    └── task-*.md                     ❌ Individual task requirements
```

---

## Why This Matters

### If You Commit Session Files:
1. ❌ Other developers see YOUR project state
2. ❌ Git shows false "changes" when you're just working
3. ❌ Merge conflicts on state files
4. ❌ Old task requirements pollute the repo
5. ❌ Confusing git history with work-in-progress commits

### If You Use .gitignore Correctly:
1. ✅ Each developer gets clean slate
2. ✅ Git history stays clean
3. ✅ No merge conflicts on state
4. ✅ Only real code changes are committed
5. ✅ Easy to see what changed

---

## Setting Up .gitignore

### The `.gitignore` file should contain:

```gitignore
# Session Files - DO NOT COMMIT
session/state.md
session/task-queue.md
session/log.md
session/context.md
session/checkpoints.md
session/planner_plan.md
session/critic_plan.md
plan.md
task-requirements/

# Dashboard - Optional
dashboard.html
```

### How to Add to Your Repo:

```bash
cd your-project/
cp path/to/markdown-agent/.gitignore .
git add .gitignore
git commit -m "chore: add gitignore for markdown-agent session files"
```

---

## Workflow

### Starting a New Task:
```bash
# Session files are ignored by git
# Just start working - state won't be committed
cd your-project/
# ... work on task ...
# State changes happen in session/ files
# Git status shows clean (no session file changes)
git status  # ✅ Clean - only real code changes shown
```

### Committing Your Work:
```bash
# When you commit, only code changes are included
# Session state stays local to your machine
git add .
git commit -m "feat: add user authentication"
# ✅ Commit includes code only, not session state
```

---

### Copying to New Project:
```bash
# When you copy to new project, templates come along
cp -r markdown-agent new-project/

# Session templates are in templates/session/ (good!)
ls new-project/markdown-agent/templates/session/
# state.template.md ✅
# task-queue.template.md ✅
# log.template.md ✅
# context.template.md ✅

# When you activate in new project:
# System detects templates and initializes fresh state
```

---

## For Hackathon Participants

### Sharing Your Markdown-Agent:

If you want to share your markdown-agent system with judges:

1. ✅ **DO share**: The core system files (agents/, templates/, *.md)
2. ❌ **DON'T share**: Your session/ files (they're your work-in-progress)
3. ✅ **Clean state before sharing**: Delete your session files or let recipients start fresh

### Demo Script:
```bash
# For clean demo, reset session state
cd markdown-agent
cp templates/session/state.template.md session/state.md
cp templates/session/task-queue.template.md session/task-queue.md
cp templates/session/log.template.md session/log.md
cp templates/session/context.template.md session/context.md

# Now you have clean state for demo
# Judges see a fresh system, not your work-in-progress
```

---

## Checklist

Before committing, verify:

- [ ] `.gitignore` includes all session files
- [ ] `git status` shows no session file changes
- [ ] Session templates (`.template.md`) are committed
- [ ] Actual session files (no `.template`) are NOT committed
- [ ] `plan.md` is ignored
- [ ] `task-requirements/` is ignored

---

## Summary

**COMMIT**: Core system files (agents, templates, docs, config)
**IGNORE**: Project state files (session files, plan.md, requirements)

**Result**: Clean git history, easy collaboration, no merge conflicts on state

---

*This guide ensures your markdown-agent is properly versioned and shared.*
