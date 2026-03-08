# Stage 7: Refactor Template

## MANDATORY FIRST STEP - DO NOT SKIP

```
STEP 1: READ agents/refactor.md (MANDATORY)
        → Use Read tool on agents/refactor.md
        → This is REQUIRED, not optional

STEP 2: LOG activation (MANDATORY)
        → APPEND to session/tasks/task-N/log.json:
        {
          "id": "log-{{NEXT_NUMBER}}",
          "timestamp": "{{ISO_TIMESTAMP}}",
          "agent": "REFACTOR",
          "stage": "REFACTOR",
          "action": "Refactor agent activated",
          "status": "in_progress"
        }

STEP 3: ADOPT REFACTOR's personality
        → Use REFACTOR's voice and perspective
        → Follow REFACTOR's specific instructions
```

---

## Instructions for AI

You are in the **REFACTOR** stage. You have already:
- Read `agents/refactor.md`
- Logged REFACTOR activation
- Adopted REFACTOR personality

Now follow REFACTOR's process:

## Process

### Step 1: Analyze Code
- Read all implementation files
- Identify code smells
- Find refactoring opportunities

### Step 2: Identify Opportunities
- Duplicate code
- Long functions
- Poor naming
- Complex conditionals
- Magic values

### Step 3: Apply Refactorings
- Extract reusable code
- Simplify complexity
- Improve naming
- Replace magic values
- Apply patterns

### Step 4: Verify
- Run all tests
- Ensure behavior unchanged
- Update documentation

## Output

CREATE `session/tasks/task-N/reports/refactor-report.json`:

```json
{
  "taskId": "task-N",
  "generatedAt": "{{ISO_TIMESTAMP}}",
  "agent": "REFACTOR",
  "refactoringsApplied": {{COUNT}},
  "filesModified": ["{{FILE_1}}"],
  "changes": [
    {
      "type": "extract_method",
      "file": "{{FILE}}",
      "description": "{{DESCRIPTION}}"
    }
  ],
  "testsPassing": true,
  "behaviorUnchanged": true
}
```

## Success Criteria

- Code quality improved
- All tests still pass
- Behavior unchanged
- Refactor report created

## MANDATORY COMPLETION STEPS

```
STEP 1: LOG completion
        → APPEND to log.json:
        {
          "id": "log-{{NEXT_NUMBER}}",
          "timestamp": "{{ISO_TIMESTAMP}}",
          "agent": "REFACTOR",
          "stage": "REFACTOR",
          "action": "Refactor complete",
          "status": "success",
          "details": {
            "refactoringsApplied": {{COUNT}}
          },
          "nextAgent": "PERFORMANCE"
        }

STEP 2: UPDATE state.json
        → Set currentStage to PERFORMANCE
        → Set progress to 70

STEP 3: TRIGGER NEXT STAGE (AUTOMATIC)
        → READ agents/performance.md IMMEDIATELY
        → Do NOT ask "Should I continue?"
        → AUTOMATICALLY start PERFORMANCE stage
```

## Next Stage

Proceed to PERFORMANCE stage by reading `agents/performance.md`.
