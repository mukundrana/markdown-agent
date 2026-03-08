---
workflow_version: "2.2.0"
total_stages: 10
restartable: true
requirements_phase: true
---

# 🔄 Master Workflow (v2.2 - With Requirements Gathering)

## Overview

This workflow includes a **requirements gathering phase** after task confirmation to ensure we build exactly what you need.

## Complete Workflow (10 Stages)

```
┌─────────────────────────────────────────────────────────────┐
│  REQUEST: User provides task request                         │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│  CONFIRMATION: User confirms task                            │
│  Agent: "Should I add this to the queue?"                   │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│  REQUIREMENTS: Gather detailed requirements                  │
│  ├─ Ask clarifying questions OR skip                        │
│  ├─ Capture user answers                                    │
│  └─ Create requirements document                            │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│  STAGE 1: PLANNING                                          │
│  ├─ PLANNER creates optimistic plan                         │
│  ├─ CRITIC creates defensive plan                           │
│  └─ SYNTHESIZER merges into final plan                      │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│  STAGE 2: IMPLEMENTATION                                    │
│  └─ CODER implements tasks wave by wave                     │
│     └─ CONTINUOUS execution (all waves, no stopping)        │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│  STAGE 3: VERIFICATION                                     │
│  └─ TESTER runs tests and validation                        │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│  STAGE 4: REVIEW                                           │
│  └─ Code review and documentation check                     │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│  STAGE 5: QUALITY CHECK                                    │
│  └─ 6 quality checkers run audit                           │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│  STAGE 6: REFACTOR                                         │
│  └─ REFACTOR improves code quality                         │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│  STAGE 7: PERFORMANCE                                      │
│  └─ PERFORMANCE optimizes speed                            │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│  STAGE 8: SECURITY                                         │
│  └─ SECURITY audits for vulnerabilities                    │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│  STAGE 9: DEPLOY                                           │
│  └─ DEPLOY safely deploys to production                    │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│  STAGE 10: COMPLETE                                        │
│  └─ Feature delivered and documented                       │
└─────────────────────────────────────────────────────────────┘
```

---

## Requirements Gathering Phase (NEW)

### Trigger
After user confirms "yes" to add task to queue

### Process

1. **Activate REQUIREMENTS_GATHERER Agent**
   - Read task description
   - Analyze task type
   - Select appropriate question template

2. **Ask User Choice**
   ```
   Should I ask a few questions first, or use standard implementation?
   Reply "questions" → Ask 3-5 targeted questions
   Reply "skip" → Generate requirements from template
   ```

3. **If "questions" - Gather Requirements**
   - Ask 3-5 targeted questions based on task type
   - Capture user answers
   - Ask follow-ups if needed
   - Confirm understanding

4. **If "skip" - Auto-Generate**
   - Use question template to generate requirements
   - Fill in common patterns
   - Use project context and conventions
   - Mark as "auto-generated"

5. **Create Requirements Document**
   - Save to `task-requirements/task-N-requirements.md`
   - Include all Q&A (if questions asked)
   - Include functional requirements
   - Include acceptance criteria
   - Include technical context

6. **Proceed to Planning**
   - PLANNER uses requirements document
   - All subsequent stages reference requirements

### Output

**File**: `task-requirements/task-N-requirements.md`

**Contains**:
- Task overview
- All Q&A from requirements gathering
- Functional requirements
- Non-functional requirements
- Acceptance criteria
- Technical context
- Edge cases
- Out of scope items

### Question Templates by Task Type

| Task Type | Questions Focus | Source |
|-----------|-----------------|--------|
| Authentication | Auth method, user data, protected routes, token expiry | `docs/features/requirements-automation.md` |
| Forms | Fields, validation, submission, success action | `docs/features/requirements-automation.md` |
| API | HTTP method, parameters, auth, response format | `docs/features/requirements-automation.md` |
| Database | Operation, data types, relationships, constraints | `docs/features/requirements-automation.md` |
| UI Component | Type, data, styling, responsiveness, interactions | `docs/features/requirements-automation.md` |
| Bug Fix | Reproduction, expected, actual, frequency, environment | `docs/features/requirements-automation.md` |
| Refactor | Current problem, goals, constraints, compatibility, verification | `docs/features/requirements-automation.md` |
| Deployment | Target, environment variables, build, pre-checks, rollback | `docs/features/requirements-automation.md` |

### Skip Triggers

User can skip questions by saying:
- "skip"
- "just do it"
- "you know the project"
- "use standard"
- "use your best judgment"
- "keep it simple"
- "like task-N"

When skipped:
- Generate requirements from template
- Fill with common patterns
- Use project context
- Mark as "auto-generated, user approved"

### Requirements Document Format

See `templates/shared/requirements.md` for complete template.

---

## Stage 1: PLANNING (Uses Requirements)

### Input
- Requirements document from requirements phase
- Task context from conversation
- Project context from `session/context.md`

### Process

1. **PLANNER Agent** (Optimistic)
   - Read requirements document
   - Create optimistic task breakdown based on requirements
   - Maximize parallelization
   - Save to `session/planner_plan.md`

2. **CRITIC Agent** (Critical)
   - Read requirements document
   - Read PLANNER's plan
   - Add defensive tasks based on requirements
   - Identify risks from requirements
   - Save to `session/critic_plan.md`

3. **SYNTHESIZER Agent** (Balanced)
   - Read requirements document
   - Read both plans
   - Merge into balanced plan
   - Organize into waves
   - Generate final `plan.md`

### Output
- `plan.md` aligned with requirements

---

## Complete Example Flow

```
You: add user authentication

Agent: 🤔 [Detected: TASK REQUEST]
       Task: "add user authentication"
       Type: Authentication Feature

       Should I add this to the task queue?

You: yes

Agent: ✅ TASK ADDED: task-1 "add user authentication"

       ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

       Now gathering requirements to ensure I build exactly what you need.

       Should I ask a few questions first, or use standard JWT implementation?
       Reply "questions" to provide details
       Reply "skip" to use standard implementation

You: questions

Agent: Question 1/5: What authentication method should I use?
       a) JWT (recommended)
       b) Session-based
       c) OAuth/Social login
       d) Other

You: a

Agent: Question 2/5: What user information needs to be stored?

You: email, password (hashed), name, created_at

Agent: Question 3/5: Which pages need authentication protection?

You: dashboard, profile, settings

Agent: Question 4/5: What should happen when token expires?

You: redirect to login with session expired message

Agent: Question 5/5: Do you need social login (Google, GitHub)?

You: not now, maybe later

Agent: ✅ Requirements gathering complete!

       Creating requirements document...
       ✅ Saved to: task-requirements/task-1-requirements.md

       Ready to proceed to PLANNING stage?

You: yes

Agent: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 5%

       📋 Stage 1: PLANNING
       Reading requirements from task-1-requirements.md...
       PLANNER: Creating plan based on requirements...
       [... continues through all stages ...]
```

---

## Requirements Phase Integration

### Before Requirements
```
task-queue.md: task-1 → QUEUED
```

### During Requirements
```
task-queue.md: task-1 → GATHERING_REQUIREMENTS
```

### After Requirements
```
task-queue.md: task-1 → PLANNING
task-requirements/task-1-requirements.md: Created
```

---

## Requirements as Source of Truth

All stages reference requirements document:

- **PLANNING**: Plan aligns with requirements
- **IMPLEMENTATION**: Code fulfills requirements
- **VERIFICATION**: Tests verify requirements met
- **REVIEW**: Requirements checklist verified
- **COMPLETE**: All requirements satisfied

---

## File Structure Addition

```
markdown-agent/
├── task-requirements/          ← NEW FOLDER
│   ├── task-1-requirements.md
│   ├── task-2-requirements.md
│   └── ...
├── agents/
│   └── requirements-gatherer.md  ← NEW AGENT
├── templates/
│   └── requirements.md          ← NEW TEMPLATE
└── docs/features/requirements-automation.md   ← NEW AUTOMATION GUIDE
```

---

## Quality Gates

### Requirements Phase Quality Gate

- ✅ Questions asked OR user skipped
- ✅ All critical information gathered
- ✅ Requirements document created
- ✅ User confirms to proceed to planning

### Planning Quality Gate

- ✅ Plan aligns with requirements
- ✅ All requirements addressed in plan

### Completion Quality Gate

- ✅ All requirements satisfied
- ✅ Acceptance criteria met

---

*Requirements gathering ensures we build the RIGHT thing before we build it WELL!*
