---
orchestration_version: "1.0.0"
---

# 🎭 Agent Orchestration Flowchart

This flowchart shows exactly which agents run when, and in what order.

---

## Complete Workflow Flowchart (All 10 Stages)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           ACTIVATION                                    │
│                   "go baby go" → Check for pending work                     │
│                   ↓ No pending work → Wait for tasks                      │
│                   ↓ Pending work → Ask to resume                          │
└────────────────────────────┬────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      TASK CONFIRMATION                               │
│                   Task detected → "Should I add to queue?"              │
│                   ↓ Yes → Added to task-queue.md                          │
│                   ↓ No → Conversation response                            │
└────────────────────────────┬────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                   REQUIREMENTS GATHERING                             │
│                   ↓ CONFIG check: "Ask questions?" OR "Skip?"              │
│                   ↓ "questions" → REQUIREMENTS_GATHERER asks 3-5 Qs       │
│                   ↓ "skip" → Generate from template                     │
│                   ↓ Creates: task-requirements/task-N.md                  │
└────────────────────────────┬────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      STAGE 1: PLANNING (Sequential) ⬇️                   │
│                                                                           │
│                   ┌───────────────────────────────────────┐               │
│                   │ 1. PLANNER Agent (Optimistic)     │               │
│                   │    ↓ Creates optimistic plan        │               │
│                   │    ↓ markdown-agent/session/tasks/task-N/planner_plan.json │               │
│                   └───────────────────────────────────────┘               │
│                         ↓                                         │               │
│                   ┌───────────────────────────────────────┐               │
│                   │ 2. CRITIC Agent (Critical)        │               │
│                   │    ↓ Reads PLANNER's plan          │               │
│                   │    ↓ Adds defensive tasks         │               │
│                   │    ↓ markdown-agent/session/tasks/task-N/critic_plan.json  │               │
│                   └───────────────────────────────────────┘               │
│                         ↓                                         │               │
│                   ┌───────────────────────────────────────┐               │
│                   │ 3. SYNTHESIZER Agent (Balanced)  │               │
│                   │    ↓ Reads both plans               │               │
│                   │    ↓ Merges and organizes       │               │
│                   │    ↓ Creates plan.md               │               │
│                   └───────────────────────────────────────┘               │
│                         ↓                                         │
│                   ✅ plan.md created                                      │
└────────────────────────────┬────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                   STAGE 2: IMPLEMENTATION (Wave-Based) 🌊️                │
│                                                                           │
│                   CONFIG: Check execution mode (see config-exec.md)       │
│                   ↓                                                   │
│                   IF MODE: "PARALLEL"                                 │
│                   ├─ Read wave from plan.md                             │
│                   ├─ Group tasks by file conflicts                       │
│                   ├─ Tasks with no conflicts → PARALLEL ⚡                 │
│                   └─ Tasks with conflicts → SEQUENTIAL 📏                     │
│                   ↓                                                   │
│                   IF MODE: "SEQUENTIAL"                               │
│                   └─ All tasks → SEQUENTIAL 📏                              │
│                   ↓                                                   │
│                   CODER Agent executes tasks:                             │
│                   ├─ Wave 1: [w1-t1, w1-t2, w1-t3]                          │
│                   ├─ Wave 2: [w2-t1, w2-t2, w2-t3]                          │
│                   └─ Wave 3: [w3-t1, w3-t2, w3-t3]                          │
│                   ↓                                                   │
│                   ✅ All implementation complete                       │
└────────────────────────────┬────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                   STAGE 3: VERIFICATION (Sequential) ⬇️                   │
│                                                                           │
│                   ┌───────────────────────────────────────┐               │
│                   │ TESTER Agent                          │               │
│                   │    ↓ Runs test suite                   │               │
│                   │    ↓ Manual testing                   │               │
│                   │    ↓ Edge case testing                │               │
│                   │    ↓ Creates bug tasks if needed     │               │
│                   └───────────────────────────────────────┘               │
│                         ↓                                         │               │
│                   IF bugs found → Return to STAGE 2                       │
│                   ELSE → Continue to next stage                           │
└────────────────────────────┬────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                   STAGE 4: REVIEW (Sequential) ⬇️                          │
│                                                                           │
│                   ┌───────────────────────────────────────┐               │
│                   │ ORCHESTRATOR Agent                     │               │
│                   │    ↓ Code review                     │               │
│                   │    ↓ Documentation check               │               │
│                   │    ↓ Creates review summary           │               │
│                   └───────────────────────────────────────┘               │
│                         ↓                                         │               │
│                   ✅ Review complete                                      │
└────────────────────────────┬────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                   STAGE 5: QUALITY CHECK (Parallelizable) 🔄              │
│                                                                           │
│                   CONFIG: Check quality mode                              │
│                   ↓                                                   │
│                   IF MODE: "PARALLEL" ⚡                                 │
│                   ├─ All 6 checkers start at once:                        │
│                   │  ├─ TYPE SAFETY ─┐                              │
│                   │  ├─ VALIDATION ─┤                              │
│                   │  ├─ ERROR HANDLING ─┤ (All run              │
│                   │  ├─ API CONSISTENCY ─┤  simultaneously)       │
                   │  ├─ DATABASE ─┘                               │
                   │  └─ FILE SIZE                                     │
│                   └─ Collect all results → Create combined report           │
│                   ↓                                                   │
│                   IF MODE: "SEQUENTIAL" 📏                              │
│                   └─ Run checkers one by one in sequence                    │
│                   ↓                                                   │
│                   ✅ Quality report created                             │
│                   ↓                                                   │
│                   IF issues found → Return to STAGE 2                       │
└────────────────────────────┬────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                   STAGE 6: REFACTOR (Sequential) ⬇️                          │
│                                                                           │
│                   ┌───────────────────────────────────────┐               │
│                   │ REFACTOR Agent                        │               │
│                   │    ↓ Identifies opportunities           │               │
│                   │    ↓ Apply improvements              │               │
│                   │    ↓ Runs tests (verify)             │               │
│                   └───────────────────────────────────────┘               │
│                         ↓                                         │               │
│                   ✅ Code refactored, tests passing                     │
└────────────────────────────┬────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                   STAGE 7: PERFORMANCE (Sequential) ⬇️                      │
│                                                                           │
│                   ┌───────────────────────────────────────┐               │
│                   │ PERFORMANCE Agent                     │               │
│                   │    ↓ Identifies bottlenecks            │               │
│                   │    ↓ Apply optimizations            │               │
│                   │    ↓ Measure improvements            │               │
│                   └───────────────────────────────────────┘               │
│                         ↓                                         │               │
│                   ✅ Performance improved                                │
└────────────────────────────┬────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                   STAGE 8: SECURITY (Sequential) ⬇️                           │
│                                                                           │
│                   ┌───────────────────────────────────────┐               │
│                   │ SECURITY Agent                        │               │
│                   │    ↓ Scans for vulnerabilities        │               │
│                   │    ↓ Validates security measures      │               │
│                   │    ↓ Fixes issues if found           │               │
│                   └───────────────────────────────────────┘               │
│                         ↓                                         │               │
│                   ✅ Security audit complete                             │
│                   ↓                                                   │
│                   IF critical issues → Return to STAGE 2                     │
└────────────────────────────┬────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                   STAGE 9: DEPLOY (Sequential) ⬇️                            │
│                                                                           │
│                   ┌───────────────────────────────────────┐               │
│                   │ DEPLOY Agent                          │               │
│                   │    ↓ Pre-deployment checks          │               │
│                   │    ↓ Execute deployment            │               │
│                   │    ↓ Run smoke tests                 │               │
│                   │    ↓ Monitor for issues               │               │
│                   └───────────────────────────────────────┘               │
│                         ↓                                         │               │
│                   ✅ Deployed to production                             │
└────────────────────────────┬────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                   STAGE 10: COMPLETE                                       │
│                                                                           │
│                   ✅ TASK MARKED COMPLETE                                 │
│                   ✅ task-report.md updated                              │
│                   ✅ log.md updated with summary                          │
│                   ↓                                                   │
│                   ┌───────────────────────────────────────┐               │
│                   │ CHANGELOG Agent                        │               │
│                   │    ↓ Updates changelog with changes    │               │
│                   └───────────────────────────────────────┘               │
│                         ↓                                         │               │
│                   ✅ FULL WORKFLOW COMPLETE                               │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Agent Execution Legend

| Symbol | Meaning |
|--------|---------|
| ⬇️ | Sequential - Must run in order |
| 🌊️ | Wave-based - Can be parallel (file-conflict aware) |
| 🔄 | Parallelizable - Can run simultaneously |
| ⚡ | Parallel mode - Multiple agents at once |
| 📏 | Sequential mode - One at a time |

---

## Key Decision Points

### 1. Planning Stage (Always Sequential)
```
PLANNER → CRITIC → SYNTHESIZER

Why: Each agent depends on previous agent's output
Cannot parallelize: CRITIC needs PLANNER's plan
```

### 2. Implementation Stage (Configurable)
```
config-exec.md setting: "parallel" OR "sequential"

PARALLEL mode:
- Group tasks by file conflicts
- Tasks with no conflicts → Run together
- Tasks with conflicts → Run sequentially

SEQUENTIAL mode:
- All tasks run one by one
- Safer, slower
```

### 3. Quality Check Stage (Configurable)
```
config-exec.md setting: "parallel" OR "sequential"

PARALLEL mode:
- All 6 quality checkers run at once
- Faster, but uses more context
- May have "token budget" concerns

SEQUENTIAL mode:
- Checkers run one by one
- More methodical
- Easier to debug
```

### 4. All Other Stages (Sequential)
```
Verification, Review, Refactor, Performance, Security, Deploy

Why: Each stage has dependencies on previous stages
Or: Single agent does comprehensive check
```

---

## Agent Orchestration Summary

| Stage | Agents | Mode | Can Parallelize? |
|-------|--------|------|----------------|
| Planning | PLANNER → CRITIC → SYNTHESIZER | Sequential | ❌ No |
| Implementation | CODER | Configurable | ✅ Yes (waves) |
| Verification | TESTER | Sequential | ❌ No |
| Review | ORCHESTRATOR | Sequential | ❌ No |
| Quality Check | 6 Quality Checkers | Configurable | ✅ Yes |
| Refactor | REFACTOR | Sequential | ❌ No |
| Performance | PERFORMANCE | Sequential | ❌ No |
| Security | SECURITY | Sequential | ❌ No |
| Deploy | DEPLOY | Sequential | ❌ No |
| Complete | CHANGELOG | Sequential | ❌ No |

---

## Total Parallel Potential

**Maximum Parallelization:**
- Stage 2 (Implementation): Up to 3 tasks in parallel (same wave)
- Stage 5 (Quality Check): 6 agents in parallel

**Minimum Parallelization:**
- All stages sequential (if configured)

**Realistic Use:**
- Most users: Mixed mode (parallel where safe, sequential where needed)

---

*This flowchart ensures every agent knows exactly when to run and how to coordinate with others.*
