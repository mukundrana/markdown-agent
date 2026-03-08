---
help_version: "1.0.0"
---

# 📚 Markdown Autonomous Agent System - Help

## Quick Links

- [Getting Started](#getting-started)
- [Agent Reference](#agent-reference)
- [Workflow Stages](#workflow-stages)
- [State Management](#state-management)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

---

## Getting Started

### How do I activate the agent?

Copy the `markdown-agent/` folder to your project, then in any AI CLI say:
```
go baby go
```

### How do I define a feature?

Edit `markdown-agent/session/context.md` with your feature details:
- Feature title
- Description
- Requirements
- Acceptance criteria
- Technical context

### Can I stop and resume?

Yes! The agent tracks all progress in `state.md`. Just say "go baby go" again to resume.

---

## Agent Reference

### Planning Agents

| Agent | Personality | Role |
|-------|-------------|------|
| **PLANNER** | Optimistic | Creates fast-paced plans |
| **CRITIC** | Cautious | Adds defensive tasks |
| **SYNTHESIZER** | Balanced | Merges plans |

### Execution Agents

| Agent | Personality | Role |
|-------|-------------|------|
| **CODER** | Precise | Writes code and tests |
| **TESTER** | Skeptical | Finds bugs and issues |

### Quality Checkers

| Agent | Focus | Checks |
|-------|-------|--------|
| **TYPE SAFETY** | Strict typing | No `any`, proper interfaces |
| **VALIDATION** | Input safety | All inputs validated |
| **ERROR HANDLING** | Defensive | Proper try/catch everywhere |
| **API CONSISTENCY** | Standards | Consistent responses/status codes |
| **DATABASE** | SQL safety | No injection, proper transactions |
| **FILE SIZE** | Conciseness | Files under 400 lines |

### Specialized Agents

| Agent | Personality | Role |
|-------|-------------|------|
| **DEBUGGER** | Analytical | Investigates and fixes bugs |
| **REFACTOR** | Improver | Improves code quality |
| **PERFORMANCE** | Optimizer | Speeds up code |
| **SECURITY** | Paranoid | Finds vulnerabilities |
| **DEPLOY** | Reliable | Safe deployments |
| **CHANGELOG** | Historian | Documents changes |
| **ORCHESTRATOR** | Coordinator | Manages agent flow |

---

## Workflow Stages

### 1. Planning
PLANNER + CRITIC create plans → SYNTHESIZER merges → plan.md created

### 2. Implementation
CODER executes tasks wave by wave, updating state.md

### 3. Verification
TESTER runs tests, finds bugs, creates fix tasks if needed

### 4. Review
Final code review, documentation check

### 5. Quality Check (NEW)
All 6 quality checkers run comprehensive audit

### 6. Refactor (NEW)
REFACTOR improves code quality

### 7. Performance (NEW)
PERFORMANCE optimizes speed

### 8. Security (NEW)
SECURITY audits for vulnerabilities

### 9. Deploy (NEW)
DEPLOY safely deploys to production

---

## State Management

### state.md Structure

```markdown
## Current Status
- Stage: Current stage name
- Status: Current status
- Current Wave: Wave number
- Current Task: Task ID

## Progress Summary
- Total/Completed waves
- Total/Completed tasks
- Failed tasks list
```

### Checkpoints

Created at key points for safe resumption. Stored in `session/checkpoints.md`.

### Logs

Append-only log in `session/log.md` records all actions.

---

## Troubleshooting

### Agent not activating?

- Check `markdown-agent/root.md` exists
- Verify you're in the correct directory
- Try saying "read markdown-agent/root.md" first

### Agent stuck?

- Check `state.md` for current position
- Read `session/checkpoints.md` for last checkpoint
- Try resuming with explicit instructions

### Tests failing?

- Read `session/log.md` for error details
- Check if bug tasks were created in plan.md
- Ensure CODER implemented fixes

### Lost progress?

- Progress is in `state.md`
- Full history in `session/log.md`
- Checkpoints in `session/checkpoints.md`

---

## Best Practices

### Writing Good Feature Requests

1. **Be Specific**: Clear requirements lead to better plans
2. **Include Acceptance Criteria**: Define what "done" looks like
3. **Provide Context**: Tech stack, conventions, architecture notes
4. **List Dependencies**: What already exists

### Letting the Agent Work

1. **Trust the Process**: All stages have a purpose
2. **Don't Interrupt**: Let stages complete naturally
3. **Check Progress**: Read state.md anytime
4. **Review Logs**: log.md shows what happened

### Resuming After Interruption

1. **Say "go baby go"**: Agent reads state.md
2. **Automatic Resume**: Continues from where it stopped
3. **No Manual Intervention**: Agent handles resumption

---

## File Reference

### Core Files
- `root.md` - Entry point
- `config.md` - All agent definitions
- `docs/reference/workflow.md` - 9-stage workflow
- `state.md` - Current progress
- `plan.md` - Generated plan

### Agent Files
- `agents/*.md` - Individual agent definitions

### Templates
- `templates/stages/stage-*.md` - Stage instructions
- `templates/shared/agent-conversation.md` - Communication format
- `templates/shared/checkpoint.md` - Checkpoint format

### Session Files
- `session/context.md` - Your feature request
- `session/log.md` - Execution history
- `session/checkpoints.md` - Resumption points

---

## Tips for Best Results

1. **Start Simple**: Your first feature should be straightforward
2. **Be Patient**: The agent is thorough, not fast
3. **Read Along**: Watch state.md and log.md for progress
4. **Trust Quality Stages**: The extra stages catch important issues
5. **Learn from It**: See how the agent breaks down problems

---

*This help system covers the markdown autonomous agent system. Say "go baby go" to begin!*
