# 🤖 Markdown Autonomous Agent System v3.2

A **complete portable agent system** in markdown files - 20 agents, 10 stages, works with ANY AI CLI.

## What's New in v3.2

- **JSON State Management**: All state stored in JSON files for better structure
- **20 Agents**: Planning (3), Execution (2), Quality (6), Specialized (9)
- **10 Stages**: Requirements → Planning → Implement → Verify → Review → Quality → Refactor → Performance → Security → Deploy
- **Checkpoint System**: Safe resumption from any point
- **Agent Communication**: Structured inter-agent conversations
- **Comprehensive Help**: Full documentation system

## ⚠️ IMPORTANT: Project Isolation

**CRITICAL**: When copying this folder to a new project:

1. **Session files are project-specific** - They contain state from previous projects
2. **DO NOT commit session files** - They are in `.gitignore` for a reason
3. **Reset state for new projects** - The system will auto-detect and reset

**How the system handles this**:
- When you run "go baby go", the system checks session/queue.json
- If no active task found, it's ready for new tasks
- It creates fresh JSON files from templates
- You get a clean slate for your new project

**What files are used**:
- `session/queue.json` → Global task queue
- `session/config.json` → Session configuration
- `session/tasks/task-N/` → Per-task state, log, checkpoints

**This ensures each project starts fresh!**

---

## Quick Start (3 Steps)

1. **Copy** `markdown-agent/` folder to your project
2. **Say** "go baby go" in any AI CLI (Claude Code, Cursor, Copilot, etc.)
3. **Describe your task** when prompted

That's it! The agent system will autonomously execute all 10 stages.

## How It Works

The entire agent system is contained in markdown files. When triggered:

1. AI reads `root.md` → Activates the system
2. AI reads `config.md` → Understands all 20 agents
3. AI reads `docs/reference/workflow.md` → Follows 10-stage workflow
4. AI reads appropriate agent files → Executes with personality
5. Progress tracked in `session/tasks/task-N/state.json` and `log.json`
6. Checkpoints created for safe resumption
7. Continues until all 10 stages complete

## File Structure

```
markdown-agent/
├── root.md              # Entry point - activates system
├── config.md            # 20 agent configurations
├── dashboard.html       # Visual dashboard (no server needed)
├── docs/reference/workflow.md          # 10-stage workflow
├── docs/guides/help.md              # Comprehensive help
├── readme.md            # This file
├── docs/guides/usage-example.md     # Complete walkthrough
│
├── agents/              # 20 agent definitions
│   ├── planner.md       # Optimistic planner
│   ├── critic.md        # Critical planner
│   ├── synthesizer.md   # Balanced planner
│   ├── coder.md         # Implementation
│   ├── tester.md        # Testing
│   ├── quality-*.md     # 6 quality checkers
│   ├── debugger.md      # Bug fixing
│   ├── refactor.md      # Code improvement
│   ├── performance.md   # Optimization
│   ├── security.md      # Security audit
│   ├── deploy.md        # Deployment
│   ├── changelog.md     # Documentation
│   └── orchestrator.md  # Coordination
│
├── templates/           # 10 stage templates + communication
│   ├── stages/          # Stage instructions
│   │   └── stage-*.md   # 10 stage templates
│   ├── json/            # JSON templates
│   │   └── *.template.json
│   └── shared/          # Shared templates
│       ├── agent-conversation.md
│       └── checkpoint.md
│
├── session/             # Working memory (RUNTIME - gitignored)
│   ├── queue.json       # Global task queue
│   ├── config.json      # Session configuration
│   └── tasks/           # Per-task data
│       └── task-N/
│           ├── state.json       # Task state
│           ├── log.json         # Execution log
│           ├── plan.json        # Execution plan
│           └── checkpoints.json # Resumption points
│
├── dashboard.html       # Interactive visualization tool (no server needed)
└── ownership.md         # File ownership guide
```

## Templates vs Runtime Files

**Important**: Understand the difference between `templates/` and `session/`:

| Folder | Purpose | Git Status | When to Edit |
|--------|---------|------------|--------------|
| `templates/json/` | Starting templates | Committed | Customize default state |
| `session/` | Runtime files | Gitignored | Never (auto-generated) |

**On new project**: The system creates JSON files from templates in `session/tasks/task-N/`

See `ownership.md` for complete file ownership details.

## The 10 Stages

| Stage | Agent(s) | Purpose |
|-------|----------|---------|
| 1. REQUIREMENTS | REQUIREMENTS-GATHERER | Collect detailed requirements |
| 2. PLANNING | PLANNER, CRITIC, SYNTHESIZER | Create balanced plan |
| 3. IMPLEMENTATION | CODER | Write code wave by wave |
| 4. VERIFICATION | TESTER | Run tests, find bugs |
| 5. REVIEW | REVIEWER | Code review, docs check |
| 6. QUALITY CHECK | 6 Quality Checkers | Comprehensive audit |
| 7. REFACTOR | REFACTOR | Improve code quality |
| 8. PERFORMANCE | PERFORMANCE | Optimize speed |
| 9. SECURITY | SECURITY | Find vulnerabilities |
| 10. DEPLOY | DEPLOY | Deploy to production |

## The 20 Agents

### Planning (3)
- **PLANNER**: "The fastest path is..." (optimistic)
- **CRITIC**: "What if this fails..." (cautious)
- **SYNTHESIZER**: "Balancing perspectives..." (pragmatic)

### Execution (2)
- **CODER**: "Implementing carefully..." (precise)
- **TESTER**: "Let me try to break this..." (skeptical)

### Quality Checkers (6)
- **TYPE SAFETY**: Strict typing enforcement
- **VALIDATION**: Input validation and sanitization
- **ERROR HANDLING**: Comprehensive error coverage
- **API CONSISTENCY**: API standard compliance
- **DATABASE**: SQL safety and proper transactions
- **FILE SIZE**: Keep files under 400 lines

### Specialized (9)
- **DEBUGGER**: Investigates and fixes bugs
- **REFACTOR**: Improves code without changing behavior
- **PERFORMANCE**: Optimizes for speed
- **SECURITY**: Finds and fixes vulnerabilities
- **DEPLOY**: Handles safe deployments
- **CHANGELOG**: Documents all changes
- **ORCHESTRATOR**: Coordinates all agents

## Usage Example

### Step 1: Define Your Feature

Edit `session/context.md`:

```markdown
## Feature Request

**Title**: Add User Authentication

**Description**:
Implement JWT-based authentication with login and registration.

**Requirements**:
- User registration endpoint
- User login endpoint
- JWT token generation
- Password hashing

**Acceptance Criteria**:
- Users can register with email/password
- Users can login and receive JWT
- Passwords are hashed with bcrypt
```

### Step 2: Trigger

In any AI CLI, say:
```
go baby go
```

### Step 3: Watch It Work

The AI will:

1. **Requirements**: REQUIREMENTS-GATHERER collects detailed requirements
2. **Plan**: PLANNER + CRITIC + SYNTHESIZER create detailed plan
3. **Implement**: CODER writes code wave by wave
4. **Verify**: TESTER runs tests, finds bugs
5. **Review**: REVIEWER does code review and documentation check
6. **Quality Check**: All 6 quality checkers audit code
7. **Refactor**: REFACTOR improves code quality
8. **Performance**: PERFORMANCE optimizes bottlenecks
9. **Security**: SECURITY scans for vulnerabilities
10. **Deploy**: DEPLOY deploys to production

### Step 4: Resume Anytime

If interrupted, just say "go baby go" again. The agent reads session/queue.json and session/tasks/task-N/state.json to resume exactly where it left off.

## Features

### Core
- ✅ Autonomous execution from request to production
- ✅ Multi-perspective planning (optimist + critic)
- ✅ Wave-based task execution
- ✅ State persistence across sessions
- ✅ Retry logic with exponential backoff

### v2.0 Additions
- ✅ 20 specialized agents
- ✅ 10 comprehensive stages
- ✅ 6 quality checkers
- ✅ Checkpoint system
- ✅ Agent communication protocol
- ✅ Comprehensive help system
- ✅ Interactive dashboard (dashboard.html)

### Quality Assurance
- ✅ Type safety checking
- ✅ Input validation verification
- ✅ Error handling coverage
- ✅ API consistency checking
- ✅ Database safety verification
- ✅ File size enforcement

### Advanced
- ✅ Refactoring stage
- ✅ Performance optimization
- ✅ Security auditing
- ✅ Safe deployment
- ✅ Changelog maintenance

## Why Markdown?

- **Universal**: Works with ANY AI that can read markdown
- **Transparent**: Read every step, understand the process
- **Version Control**: Git-friendly, diff-able, trackable
- **No Runtime**: No installation, no dependencies, no code execution
- **Portable**: Copy to any project, works immediately
- **Educational**: Learn from the agent's approach

## Comparison with Original

| Feature | Original Plugin | Markdown v2.0 | Coverage |
|---------|----------------|---------------|----------|
| Multi-perspective planning | ✅ | ✅ | 100% |
| Wave-based execution | ✅ | ✅ | 100% |
| State persistence | ✅ Complex | ✅ Simple | 80% |
| Agent personalities | ✅ 28+ agents | ✅ 20 agents | 70% |
| Quality checkers | ✅ | ✅ 6 specialized | 100% |
| Retry logic | ✅ | ✅ | 90% |
| Task dependencies | ✅ | ✅ | 100% |
| Refactoring stage | ✅ | ✅ | 100% |
| Performance stage | ✅ | ✅ | 100% |
| Security stage | ✅ | ✅ | 100% |
| Deployment stage | ✅ | ✅ | 100% |
| Checkpoint system | ✅ | ✅ | 100% |
| Agent conversations | ✅ Real-time | ✅ Structured | 60% |
| Daemon/background | ✅ | ❌ | 0% |
| CLI commands | ✅ Rich | ❌ | 0% |
| TUI/Dashboard | ✅ | ❌ | 0% |
| Code execution | ✅ Automated | ❌ (prompts) | 0% |

**Overall Coverage**: ~75-80% of original functionality

## Tips

1. **Be Specific**: Detailed task description = better plans
2. **Trust the Process**: Let all 10 stages complete
3. **Check Progress**: Read session/tasks/task-N/state.json anytime
4. **Review Logs**: session/tasks/task-N/log.json shows complete history
5. **Use Checkpoints**: Safe resumption from any point
6. **Learn from It**: See how agents break down problems

## Limitations

- The agent cannot execute code directly (it guides the AI)
- Works best with AI CLIs with file access
- Quality depends on underlying AI's capabilities
- No automatic enforcement (AI must follow prompts)
- No runtime guarantees (depends on AI interpretation)

## Documentation

- **readme.md** - This file
- **docs/guides/help.md** - Comprehensive help system
- **docs/guides/usage-example.md** - Complete walkthrough
- **root.md** - System entry point
- **config.md** - All agent definitions
- **docs/reference/workflow.md** - 9-stage workflow

## Support

For issues or questions:
1. Read `docs/guides/help.md` for detailed instructions
2. Check `docs/guides/usage-example.md` for complete example
3. Review agent files in `agents/` for details
4. Check stage templates in `templates/`

## License

Free to use, modify, and distribute.

---

**Made with ❤️ for autonomous AI development**

*Say "go baby go" and let 20 agents work through 9 stages to deliver your feature!*
