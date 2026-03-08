---
config_exec_version: "1.0.0"
---

# ⚙️ Execution Configuration

This file controls HOW agents execute - in parallel or sequentially.

---

## Configuration Options

### Execution Modes

| Mode | Description | When to Use |
|------|-----------|-------------|
| **parallel** | Run agents simultaneously when safe | Fast development, confident in system |
| **sequential** | Run agents one at a time | Careful work, debugging, limited context |

---

## Stage-by-Stage Configuration

### 🎯 Default Configuration (Recommended)

```yaml
execution_modes:
  planning: "sequential"              # Always sequential (agents depend on each other)
  implementation: "smart"            # Auto-detect parallel vs sequential
  verification: "sequential"            # Single agent (TESTER)
  review: "sequential"                 # Single agent (ORCHESTRATOR)
  quality_check: "smart"             # Auto-detect based on task complexity
  refactor: "sequential"              # Single agent (REFACTOR)
  performance: "sequential"           # Single agent (PERFORMANCE)
  security: "sequential"              # Single agent (SECURITY)
  deploy: "sequential"                 # Single agent (DEPLOY)
```

### ⚡ Performance Configuration (Fast)

```yaml
execution_modes:
  planning: "sequential"
  implementation: "parallel"           # Always parallel (max speed)
  verification: "sequential"
  review: "sequential"
  quality_check: "parallel"          # All 6 checkers at once
  refactor: "sequential"
  performance: "sequential"
  security: "sequential"
  deploy: "sequential"
```

### 🐢 Safe Configuration (Careful)

```yaml
execution_modes:
  planning: "sequential"
  implementation: "sequential"         # Everything sequential
  verification: "sequential"
  review: "sequential"
  quality_check: "sequential"         # One checker at a time
  refactor: "sequential"
  performance: "sequential"
  security: "sequential"
  deploy: "sequential"
```

---

## Smart Mode Logic

### Implementation Stage (Smart Mode)

```yaml
smart_implementation_rules:
  # Check file conflicts
  - IF tasks in wave modify DIFFERENT files → PARALLEL ⚡
  - IF tasks in wave modify SAME file → SEQUENTIAL 📏
  - IF high-risk operation (migration, deploy) → SEQUENTIAL 📏
  - IF test coverage < 80% → SEQUENTIAL 📏 (safer)

  # Check task count
  - IF 1 task in wave → SEQUENTIAL 📏 (no benefit to parallel)
  - IF 2-3 tasks in wave → PARALLEL ⚡ (sweet spot)
  - IF 4+ tasks in wave → PARALLEL ⚡ (significant benefit)
```

### Quality Check Stage (Smart Mode)

```yaml
smart_quality_rules:
  # Check project size
  - IF project < 50 files → PARALLEL ⚡ (fast enough)
  - IF project 50-200 files → PARALLEL ⚡ (manageable)
  - IF project 200+ files → SEQUENTIAL 📏 (avoid token issues)

  # Check complexity
  - IF low complexity → PARALLEL ⚡
  - IF high complexity → SEQUENTIAL 📏 (more thorough)

  # Check stage context
  - IF previous stage had issues → SEQUENTIAL 📏 (be careful)
  - IF previous stage clean → PARALLEL ⚡ (can be fast)
```

---

## How to Configure

### Option 1: Use Default (Recommended)
```markdown
Just use the system as-is. Smart mode will make good decisions.
```

### Option 2: Set in config-exec.md
```markdown
Edit the `execution_modes` section in config-exec.md
```

### Option 3: Per-Task Override
```markdown
You: "add user authentication, use sequential mode"

Agent: Will use sequential implementation for this task.
```

---

## File Conflict Detection Rules

### How PARALLEL Mode Detects Conflicts

```python
# Pseudo-code for conflict detection
for wave in plan.md:
    tasks = get_tasks_in_wave(wave)

    # Group tasks by files they modify
    file_groups = group_by_files(tasks)

    for group in file_groups:
        if len(group) == 1:
            # Single task → Can run parallel
            mark_as_parallel_safe(group)
        else:
            # Multiple tasks touching same file → Sequential
            mark_as_sequential_required(group)

    # Execution order
    parallel_groups.execute_simultaneously()
    sequential_groups.execute_one_by_one()
```

### Example

```
Wave 1 tasks:
  w1-t1: Modify src/models/User.ts
  w1-t2: Modify src/services/auth.ts
  w1-t3: Create tests/auth.test.ts

Analysis:
  - w1-t1: User.ts → Group 1
  - w1-t2: auth.ts → Group 2
  - w1-t3: auth.test.ts → Group 3

Result: All 3 groups → PARALLEL ⚡
```

```
Wave 2 tasks:
  w2-t1: Modify src/services/auth.ts
  w2-t2: Modify src/services/auth.ts
  w2-t3: Create docs/api/auth.md

Analysis:
  - w2-t1: auth.ts → Group 1
  - w2-t2: auth.ts → Group 1 (SAME FILE!)
  - w2-t3: auth.md → Group 2

Result:
  - Group 1 (w2-t1, w2-t2) → SEQUENTIAL 📏 (conflict!)
  - Group 2 (w2-t3) → PARALLEL ⚡ (independent)
```

---

## Configuration Priority

```
1. Task-specific override (highest priority)
   "use sequential mode for this"

2. config-exec.md settings
   Global configuration file

3. Smart mode defaults (fallback)
   Auto-detection based on context
```

---

## Performance Impact

| Mode | Speed | Token Usage | Safety |
|------|------|-------------|--------|
| **Sequential** | Slower | Lower | Safer |
| **Parallel** | Faster | Higher | Riskier |
| **Smart** | Adaptive | Balanced | Balanced |

---

## Token Budget Management

When using PARALLEL mode:

```yaml
token_budget:
  max_parallel_agents: 6        # Max agents running at once
  max_parallel_quality: 6       # All quality checkers
  reserved_for_context: 40%      # Keep 40% for context
```

**If token budget exceeded:**
- Auto-switch to SEQUENTIAL mode
- Or batch the parallel agents

---

## Error Handling in Parallel Mode

```yaml
parallel_error_handling:
  if one_agent_fails:
    - Stop all parallel agents
    - Log error from failed agent
    - Ask user: "Continue with successful agents?"
    - If yes: Save partial results
    - If no: Rollback all changes
```

---

## Examples

### Example 1: Smart Mode (Default)

```
You: add user authentication

Agent: [Planning - Sequential]
       PLANNER → CRITIC → SYNTHESIZER ✅

       [Implementation - Smart]
       Wave 1: 3 tasks, 3 different files
       → All PARALLEL ⚡ (safe to run together)

       Wave 2: 2 tasks, same file
       → SEQUENTIAL 📏 (avoid conflicts)

       [Quality Check - Smart]
       Project size: Small (30 files)
       → All 6 checkers PARALLEL ⚡
```

### Example 2: Sequential Mode

```
config-exec.md: implementation: "sequential"

You: add user authentication

Agent: [Planning - Sequential]
       PLANNER → CRITIC → SYNTHESIZER ✅

       [Implementation - Sequential]
       Wave 1: w1-t1 → w1-t2 → w1-t3 (one by one)
       Wave 2: w2-t1 → w2-t2 → w2-t3 (one by one)

       [Quality Check - Sequential]
       TYPE SAFETY → VALIDATION → ERROR HANDLING → ...
```

---

## Quick Reference

| Stage | Default Mode | Can Parallelize? | How Many? |
|-------|--------------|----------------|----------|
| Planning | Sequential | ❌ | N/A |
| Implementation | Smart | ✅ | 2-3 tasks |
| Verification | Sequential | ❌ | N/A |
| Review | Sequential | ❌ | N/A |
| Quality Check | Smart | ✅ | 6 agents |
| Refactor | Sequential | ❌ | N/A |
| Performance | Sequential | ❌ | N/A |
| Security | Sequential | ❌ | N/A |
| Deploy | Sequential | ❌ | N/A |

---

*Use config-exec.md to customize execution behavior for your needs.*
