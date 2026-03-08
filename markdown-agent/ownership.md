# File Ownership Guide

> Defines which files users can modify vs system-managed files

---

## Quick Reference

| Path | Owner | User Can Edit | Purpose |
|------|-------|---------------|---------|
| `agents/*.md` | System | No (fork instead) | Agent definitions |
| `config.md` | System | No | System configuration |
| `root.md` | System | No | Entry point |
| `session/*.md` | System (auto) | No (indirect) | Runtime state |
| `templates/` | User | Yes | Customization |
| `docs/` | Either | Yes | Documentation |
| `dashboard.html` | User | Yes | Visualization |

---

## File Categories

### System Files (DO NOT EDIT)

These files define the agent system behavior. Modifying them may cause unexpected behavior:

```
agents/
├── orchestrator.md      # Coordination agent
├── planner.md           # Planning agent
├── critic.md            # Critical analysis agent
├── synthesizer.md       # Plan synthesis agent
├── coder.md             # Implementation agent
├── tester.md            # Testing agent
├── reviewer.md          # Code review agent
├── quality-*.md         # 6 quality checker agents
├── refactor.md          # Refactoring agent
├── performance.md       # Performance agent
├── security.md          # Security agent
├── deploy.md            # Deployment agent
├── changelog.md         # Changelog agent
├── debugger.md          # Debugging agent
└── requirements-gatherer.md  # Requirements agent

config.md                # System settings
root.md                  # Entry point
```

### Runtime Files (AUTO-GENERATED)

These files are created and modified by the agent system during execution:

```
session/
├── queue.json           # Global task queue
├── config.json          # Session configuration
└── tasks/
    └── task-N/
        ├── state.json           # Current execution state
        ├── log.json             # Execution history
        ├── plan.json            # Execution plan
        ├── checkpoints.json     # Resumption checkpoints
        └── reports/             # Generated reports

task-requirements/
└── task-N-requirements.md  # Per-task requirements
```

**Note**: Do not manually edit these files. They are managed by the agent system.

### User-Customizable Files

These files can be safely modified:

```
templates/
├── json/                # JSON templates
│   ├── state.template.json
│   ├── log.template.json
│   ├── plan.template.json
│   ├── checkpoints.template.json
│   ├── queue.template.json
│   └── config.template.json
├── stages/              # Stage templates
│   └── stage-*.md
└── shared/              # Shared templates
    └── *.md

docs/                    # Documentation (optional edits)
dashboard.html           # Interactive visualization (optional)
```

---

## Customization Guide

### Creating Custom Agents

1. **Copy existing agent as template**:
   ```bash
   cp agents/coder.md agents/custom/my-coder.md
   ```

2. **Modify for your needs**:
   - Change `agent_type` in frontmatter
   - Update responsibilities
   - Adjust voice/personality

3. **Reference in your workflow**:
   - Update relevant stage templates
   - Or specify in task context

### Customizing Templates

Templates in `templates/` folder define the starting state for sessions:

1. **Edit templates/session/*.template.md** to change initial session state
2. **Edit templates/stages/*.md** to modify stage execution
3. **Edit templates/shared/*.md** for shared formats

### Modifying Workflow

To change the workflow stages:

1. **Edit templates/stages/** files
2. **Update config.md** stage list
3. **Update root.md** stage mapping table

---

## Version Control Recommendations

### Commit These Files
- All `agents/*.md` files
- `config.md`, `root.md`
- `templates/` folder
- `docs/` folder
- `OWNERSHIP.md`

### Add to .gitignore
```
session/
task-requirements/
*.log
```

This ensures:
- System files are versioned
- Runtime state is not committed
- Each developer/project has isolated state

---

## When Updates Are Needed

### System Updates
When updating the agent system:
1. Pull latest `agents/`, `config.md`, `root.md`
2. Check `CHANGELOG.md` for breaking changes
3. Review `docs/MIGRATION.md` if available
4. Test with existing projects

### Breaking Changes
If agent definitions change significantly:
1. Archive old `session/` files
2. Start fresh session
3. Re-run from planning stage

---

## Support

For questions about file ownership:
1. Check this file first
2. Review `docs/guides/help.md`
3. Check `readme.md` for overview

---

*Last Updated: 2026-03-07*
