# Stage 2: Planning Template

## Instructions for AI

You are in the **PLANNING** stage. **Execute autonomously without stopping.**

### AUTONOMOUS EXECUTION - NO STOPPING

**Complete ALL steps automatically without asking for permission:**

1. READ `session/tasks/task-N/state.json` for current task info
2. **IMMEDIATELY activate PLANNER agent** (read `agents/planner.md`)
   - PLANNER creates optimistic plan → saves to `session/tasks/task-N/plan.json`
   - PLANNER automatically triggers CRITIC (no asking)
3. **CRITIC activates automatically** (read `agents/critic.md`)
   - CRITIC adds defensive tasks → updates `session/tasks/task-N/plan.json`
   - CRITIC automatically triggers SYNTHESIZER (no asking)
4. **SYNTHESIZER activates automatically** (read `agents/synthesizer.md`)
   - SYNTHESIZER creates final plan → saves to `session/tasks/task-N/plan.json`
   - SYNTHESIZER updates `state.json` to "IMPLEMENTATION" stage
   - SYNTHESIZER logs completion to `log.json`
5. **PLANNING STAGE COMPLETE - IMMEDIATELY start IMPLEMENTATION**
   - Read `templates/stages/stage-implement.md` automatically
   - No "Should I start implementation?" - just do it!

## State Management (JSON)

### Update state.json on completion:
```json
{
  "currentStage": {
    "name": "IMPLEMENTATION",
    "number": 3,
    "progress": 20
  },
  "updatedAt": "{{ISO_TIMESTAMP}}"
}
```

## Success Criteria

- `session/tasks/task-N/plan.json` exists with complete task list
- Tasks organized into waves
- All 3 planning agents completed (PLANNER → CRITIC → SYNTHESIZER)
- `state.json` updated to IMPLEMENTATION stage
- `log.json` updated with planning completion
- **Automatically transitioned to IMPLEMENTATION stage (no stopping)**
- Dependencies documented
- Risk assessment included

## Next Stage

Proceed to IMPLEMENTATION stage.
