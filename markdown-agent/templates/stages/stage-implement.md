# Stage 3: Implementation Template

> **MANDATORY**: This stage requires strict logging and state management.
> Failure to log will break session resumption.

---

## Instructions for AI

You are in the **IMPLEMENTATION** stage. Follow these steps:

### Pre-Stage Requirements

Before starting:
1. [ ] READ `session/tasks/task-N/state.json` for current state
2. [ ] READ `session/tasks/task-N/plan.json` for wave breakdown
3. [ ] APPEND to `log.json`: implementation stage started

---

## Implementation Loop

For each wave in `plan.json`:

### Step 1: Check File Conflicts
- Group tasks by files they modify
- Determine if parallel execution possible

### Step 2: Activate CODER Agent
- Read `agents/coder.md`
- For each task in wave:
  - Implement the code
  - Write tests
  - Handle failures (retry 3x)

### Step 3: Log Wave Completion (MANDATORY)

After each wave, APPEND to `session/tasks/task-N/log.json`:

```json
{
  "id": "log-{{NEXT_NUMBER}}",
  "timestamp": "{{ISO_TIMESTAMP}}",
  "agent": "CODER",
  "stage": "IMPLEMENTATION",
  "action": "Wave {{N}} complete",
  "status": "success",
  "details": {
    "wave": {{N}},
    "totalWaves": {{TOTAL}},
    "tasksCompleted": ["{{TASK_ID_1}}"],
    "filesCreated": ["{{FILE_1}}"],
    "filesModified": ["{{FILE_2}}"]
  },
  "nextAgent": "CODER"
}
```

### Step 4: Update State (MANDATORY)

UPDATE `session/tasks/task-N/state.json`:

```json
{
  "workflow": {
    "currentWave": {{N}},
    "totalWaves": {{TOTAL}}
  },
  "updatedAt": "{{ISO_TIMESTAMP}}"
}
```

---

## Stage Completion

When all waves complete:

### ADD Checkpoint to checkpoints.json:
```json
{
  "id": "cp-{{NEXT_NUMBER}}",
  "name": "IMPLEMENTATION-COMPLETE",
  "timestamp": "{{ISO_TIMESTAMP}}",
  "stage": "IMPLEMENTATION",
  "stageNumber": 3,
  "filesModified": ["{{FILE_LIST}}"],
  "stateSnapshot": {
    "wavesCompleted": {{TOTAL}},
    "filesCreated": {{COUNT}},
    "testsWritten": {{COUNT}}
  },
  "resumeInstruction": "Begin VERIFICATION stage with TESTER agent"
}
```

### UPDATE state.json:
```json
{
  "currentStage": {
    "name": "VERIFICATION",
    "number": 4,
    "progress": 35
  },
  "updatedAt": "{{ISO_TIMESTAMP}}"
}
```

## Success Criteria

- [ ] All tasks in all waves completed
- [ ] Each wave logged to `log.json`
- [ ] `state.json` updated after each wave
- [ ] Checkpoint created for stage completion
- [ ] Code compiles/runs
- [ ] Tests written

## Next Stage

Proceed to **VERIFICATION** stage (read `agents/tester.md`).
