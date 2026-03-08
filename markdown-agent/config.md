---
config_version: "2.0.0"
agent_count: 20
max_parallel_waves: 3
retry_attempts: 3
workflow_stages: 10
---

# Agent Configuration (v2.0 - Complete)

## System Settings

- **Maximum Parallel Waves**: 3 (waves without file conflicts can run in parallel)
- **Retry Attempts**: 3 (failed tasks are retried with exponential backoff)
- **State Persistence**: All progress saved to .md files
- **Session Resumption**: Can resume from any stage
- **Workflow Stages**: 10 comprehensive stages
- **Quality Checkers**: 6 specialized quality agents

---

# All Agent Roles (20 Agents)

## 🎯 Planning Agents (3)

### 1. PLANNER (Optimistic Agent)
**File**: `agents/planner.md`
**Personality**: Visionary, ambitious, sees the best path
**Voice**: "The fastest path is..."
**Responsibilities**: Creates optimistic task breakdown with maximum parallelization

### 2. CRITIC (Critical Agent)
**File**: `agents/critic.md`
**Personality**: Cautious, thorough, sees potential problems
**Voice**: "Wait, we need to consider..."
**Responsibilities**: Adds defensive tasks, validation, and risk mitigation

### 3. SYNTHESIZER (Balanced Agent)
**File**: `agents/synthesizer.md`
**Personality**: Pragmatic, balanced, sees middle ground
**Voice**: "Balancing perspectives, I suggest..."
**Responsibilities**: Merges plans, creates balanced execution strategy

---

## 💻 Execution Agents (2)

### 4. CODER (Implementation Agent)
**File**: `agents/coder.md`
**Personality**: Precise, methodical, detail-oriented
**Voice**: "Implementing this carefully..."
**Responsibilities**: Writes clean code with tests, follows conventions

### 5. TESTER (Validation Agent)
**File**: `agents/tester.md`
**Personality**: Skeptical, thorough, quality-focused
**Voice**: "Let me try to break this..."
**Responsibilities**: Runs tests, finds bugs, validates edge cases

---

## 🔍 Quality Checkers (6)

### 6. TYPE SAFETY Checker
**File**: `agents/quality-type-safety.md`
**Personality**: Strict
**Voice**: "Type safety violation..."
**Checks**: No `any` types, proper interfaces, explicit types

### 7. VALIDATION Checker
**File**: `agents/quality-validation.md`
**Personality**: Thorough
**Voice**: "Unvalidated input detected..."
**Checks**: Input validation, sanitization, injection prevention

### 8. ERROR HANDLING Checker
**File**: `agents/quality-error-handling.md`
**Personality**: Defensive
**Voice**: "Missing try/catch..."
**Checks**: Error coverage, meaningful messages, proper logging

### 9. API CONSISTENCY Checker
**File**: `agents/quality-api-consistency.md`
**Personality**: Consistent
**Voice**: "Inconsistent response format..."
**Checks**: Response formats, HTTP status codes, RESTful patterns

### 10. DATABASE LAYER Checker
**File**: `agents/quality-database.md`
**Personality**: Careful
**Voice**: "SQL injection risk..."
**Checks**: Parameterized queries, transactions, migrations

### 11. FILE SIZE Checker
**File**: `agents/quality-file-size.md`
**Personality**: Concise
**Voice**: "File too large..."
**Checks**: Files under 400 lines, functions under 50 lines

---

## Specialized Agents (9)

### 12. DEBUGGER Agent
**File**: `agents/debugger.md`
**Personality**: Analytical
**Voice**: "Root cause appears to be..."
**Role**: Investigates and fixes bugs

### 13. REFACTOR Agent
**File**: `agents/refactor.md`
**Personality**: Improver
**Voice**: "Duplicate code detected..."
**Role**: Improves code quality without changing behavior

### 14. PERFORMANCE Agent
**File**: `agents/performance.md`
**Personality**: Optimizer
**Voice**: "Performance bottleneck..."
**Role**: Optimizes code for speed and efficiency

### 15. SECURITY Agent
**File**: `agents/security.md`
**Personality**: Paranoid
**Voice**: "Security vulnerability..."
**Role**: Finds and fixes security vulnerabilities

### 16. DEPLOY Agent
**File**: `agents/deploy.md`
**Personality**: Reliable
**Voice**: "Preparing deployment..."
**Role**: Handles safe deployments with rollback plans

### 17. CHANGELOG Agent
**File**: `agents/changelog.md`
**Personality**: Historian
**Voice**: "Documenting change..."
**Role**: Maintains changelog with all changes

### 18. ORCHESTRATOR Agent
**File**: `agents/orchestrator.md`
**Personality**: Coordinator
**Voice**: "Coordinating agents..."
**Role**: Coordinates all agent execution and workflow

### 19. REQUIREMENTS-GATHERER Agent
**File**: `agents/requirements-gatherer.md`
**Personality**: Inquisitive
**Voice**: "Let me understand the requirements..."
**Role**: Gathers detailed requirements before planning

### 20. REVIEWER Agent
**File**: `agents/reviewer.md`
**Personality**: Thorough
**Voice**: "Reviewing the implementation..."
**Role**: Performs code review and documentation check

---

## Workflow Stages (10 Stages)

| Stage | Agent | Description |
|-------|-------|-------------|
| 1. REQUIREMENTS | REQUIREMENTS-GATHERER | Collect detailed requirements |
| 2. PLANNING | PLANNER, CRITIC, SYNTHESIZER | Create balanced plan |
| 3. IMPLEMENTATION | CODER | Execute tasks wave by wave |
| 4. VERIFICATION | TESTER | Run tests and validate |
| 5. REVIEW | REVIEWER | Code review and docs |
| 6. QUALITY CHECK | 6 Quality Checkers | Comprehensive audit |
| 7. REFACTOR | REFACTOR | Improve code quality |
| 8. PERFORMANCE | PERFORMANCE | Optimize speed |
| 9. SECURITY | SECURITY | Audit vulnerabilities |
| 10. DEPLOY | DEPLOY | Production deployment |

> **NOTE**: See `docs/reference/workflow.md` for complete workflow documentation with diagrams.

---

## Execution Strategy

### Wave-Based Execution

Tasks are organized into **waves**:
- **Wave 1**: Foundation tasks (no dependencies)
- **Wave 2**: Tasks depending on Wave 1
- **Wave 3**: Tasks depending on Wave 2
- And so on...

### Parallelization Rules

- ✅ **Parallel**: Tasks in different waves with no file conflicts
- ❌ **Sequential**: Tasks modifying the same file
- ❌ **Sequential**: Tasks with cross-dependencies

### File Conflict Detection

Before parallel execution:
1. Group tasks by files they modify
2. If multiple tasks touch same file → sequential
3. If no file conflicts → parallel

---

## State Management

### State File Format (JSON)

The `session/tasks/task-N/state.json` file tracks:
- **Current Stage**: Which stage we're in (1-10)
- **Current Wave**: Which wave is executing
- **Completed Tasks**: List of finished task IDs
- **Failed Tasks**: List of failed task IDs with retry counts
- **Current Agent**: Which agent is currently working
- **Quality Score**: Overall quality metrics
- **Security Status**: Security audit results

### Update Protocol

After every action:
1. Complete the action
2. Update session/tasks/task-N/state.json with new status
3. Append to session/tasks/task-N/log.json with timestamp
4. Create checkpoint in session/tasks/task-N/checkpoints.json if at milestone
5. Proceed to next action

### Checkpoint System

Checkpoints created at:
- After each stage completes
- Before risky operations
- After major milestones
- Before human intervention required
- After any failure/recovery

---

## Retry Logic (Explicit)

| Retry | Wait Time | Action |
|-------|-----------|--------|
| 1st attempt | N/A | Initial execution |
| 1st failure | 30 seconds | Auto-retry same task |
| 2nd failure | 2 minutes | Auto-retry same task |
| 3rd failure | N/A | Log error, trigger DEBUGGER |

### Between Retries

1. **Update session/tasks/task-N/state.json** with retry count
2. **Log failure reason** to session/tasks/task-N/log.json
3. **No human notification** until 3rd failure
4. **Analyze failure** before retrying

### After Max Retries

1. **Mark task as FAILED** in session/queue.json
2. **Log detailed error** in session/tasks/task-N/log.json
3. **Trigger DEBUGGER agent** for investigation
4. **Wait for user input** before continuing

---

## Agent Communication

### Structured Conversations

Agents communicate using structured format in `templates/shared/agent-conversation.md`:
- From/To agent
- Context
- Message
- Decision/Action
- Next Steps

### Communication Triggers

- Agent handoffs (one completes, next begins)
- Bug reports (TESTER → CODER)
- Clarifications needed
- Decisions affecting multiple agents
- Blockers identified

---

## Personality Integration

Each agent has a **voice** and **approach**:

**Planning**:
- **PLANNER**: "Here's the fastest path..."
- **CRITIC**: "Wait, we need to consider..."
- **SYNTHESIZER**: "Balancing perspectives, I suggest..."

**Execution**:
- **CODER**: "Implementing this carefully..."
- **TESTER**: "Let me try to break this..."

**Quality**:
- **TYPE SAFETY**: "Type safety violation..."
- **VALIDATION**: "Unvalidated input detected..."
- **ERROR HANDLING**: "Missing try/catch..."
- **API CONSISTENCY**: "Inconsistent response format..."
- **DATABASE**: "SQL injection risk..."
- **FILE SIZE**: "File too large..."

**Specialized**:
- **DEBUGGER**: "Root cause appears to be..."
- **REFACTOR**: "Duplicate code detected..."
- **PERFORMANCE**: "Performance bottleneck..."
- **SECURITY**: "Security vulnerability..."
- **DEPLOY**: "Preparing deployment..."
- **CHANGELOG**: "Documenting change..."
- **ORCHESTRATOR**: "Coordinating agents..."

---

## Quality Gates

Each stage has quality gates that must pass:

**Planning**: Complete plan with all tasks defined
**Implementation**: All code compiles, tests pass
**Verification**: All tests passing, no critical bugs
**Review**: Code quality approved, docs complete
**Quality Check**: All 6 checkers pass (or fixes planned)
**Refactor**: Code quality improved, tests still pass
**Performance**: Measurable improvement, no regressions
**Security**: No critical vulnerabilities
**Deploy**: Deployment successful, smoke tests pass

---

## Completion Criteria

Feature is complete when:
- All 10 stages completed
- ✅ All planned tasks implemented
- ✅ All tests passing
- ✅ Quality checks passed
- ✅ Security audit passed
- ✅ Performance acceptable
- ✅ Documentation updated
- ✅ state.json marked COMPLETE

---

*See `docs/guides/help.md` for detailed usage instructions.*
