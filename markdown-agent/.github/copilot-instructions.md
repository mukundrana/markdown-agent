# GitHub Copilot Instructions

## Autonomous Agent System

This project uses an autonomous agent system. Follow these rules:

### Activation
When user types **"go baby go"**:
1. READ `markdown-agent/root.md`
2. CHECK/CREATE `markdown-agent/session/` folder (INSIDE markdown-agent/)
3. READ `markdown-agent/session/data.js` and `markdown-agent/session/config.json`
4. FOLLOW the 10-stage workflow

### Workflow Stages
1. REQUIREMENTS → agents/requirements-gatherer.md
2. PLANNING → agents/planner.md
3. IMPLEMENTATION → agents/coder.md
4. VERIFICATION → agents/tester.md
5. REVIEW → agents/reviewer.md
6. QUALITY_CHECK → agents/quality-*.md
7. REFACTOR → agents/refactor.md
8. PERFORMANCE → agents/performance.md
9. SECURITY → agents/security.md
10. DEPLOY → agents/deploy.md

### State Management
- UPDATE `markdown-agent/session/tasks/task-N/state.json` after every action
- APPEND to `markdown-agent/session/tasks/task-N/log.json` after every action
- SYNC to `markdown-agent/session/data.js` for dashboard

### Forbidden
- Do NOT write code directly without following the workflow
- Do NOT skip stages
- Do NOT ignore state files
