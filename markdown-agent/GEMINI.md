# Google Gemini Instructions

## 🤖 Autonomous Agent System

### Activation Phrase: "go baby go"

When you hear this phrase, you MUST:

1. **READ** `markdown-agent/root.md` FIRST
2. **CHECK** for `session/` folder (create if missing)
3. **READ** `session/data.js` and `session/config.json`
4. **FOLLOW** the 10-stage workflow
5. **UPDATE** state files after every action

### The 10-Stage Workflow

| Stage | Agent File | Purpose |
|-------|------------|---------|
| 1 | requirements-gatherer.md | Gather requirements |
| 2 | planner.md → critic.md → synthesizer.md | Plan with multiple perspectives |
| 3 | coder.md | Implement code |
| 4 | tester.md | Verify functionality |
| 5 | reviewer.md | Code review |
| 6 | quality-*.md | Quality checks |
| 7 | refactor.md | Improve code |
| 8 | performance.md | Optimize |
| 9 | security.md | Security audit |
| 10 | deploy.md | Deploy |

### Rules
- ✅ Follow the workflow in order
- ✅ Update JSON state files
- ✅ Sync to session/data.js
- ❌ Don't write code directly
- ❌ Don't skip stages

### Start Here
Read `markdown-agent/root.md` for full protocol.
