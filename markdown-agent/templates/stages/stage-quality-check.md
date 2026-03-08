# Stage 6: Quality Check Template

## MANDATORY FIRST STEP - DO NOT SKIP

**You MUST read ALL 6 quality checker agent files. This is NOT optional.**

```
CHECKER 1: READ agents/quality-type-safety.md (MANDATORY)
           → APPEND to session/tasks/task-N/log.json: "QUALITY_TYPE_SAFETY activated"
           → Run TYPE_SAFETY's specific checks
           → UPDATE session/tasks/task-N/reports/quality-report.json
           → APPEND to session/tasks/task-N/log.json: "QUALITY_TYPE_SAFETY complete"

CHECKER 2: READ agents/quality-validation.md (MANDATORY)
           → APPEND to session/tasks/task-N/log.json: "QUALITY_VALIDATION activated"
           → Run VALIDATION's specific checks
           → UPDATE session/tasks/task-N/reports/quality-report.json
           → APPEND to session/tasks/task-N/log.json: "QUALITY_VALIDATION complete"

CHECKER 3: READ agents/quality-error-handling.md (MANDATORY)
           → APPEND to session/tasks/task-N/log.json: "QUALITY_ERROR_HANDLING activated"
           → Run ERROR_HANDLING's specific checks
           → UPDATE session/tasks/task-N/reports/quality-report.json
           → APPEND to session/tasks/task-N/log.json: "QUALITY_ERROR_HANDLING complete"

CHECKER 4: READ agents/quality-api-consistency.md (MANDATORY)
           → APPEND to session/tasks/task-N/log.json: "QUALITY_API_CONSISTENCY activated"
           → Run API_CONSISTENCY's specific checks
           → UPDATE session/tasks/task-N/reports/quality-report.json
           → APPEND to session/tasks/task-N/log.json: "QUALITY_API_CONSISTENCY complete"

CHECKER 5: READ agents/quality-database.md (MANDATORY)
           → APPEND to session/tasks/task-N/log.json: "QUALITY_DATABASE activated"
           → Run DATABASE's specific checks
           → UPDATE session/tasks/task-N/reports/quality-report.json
           → APPEND to session/tasks/task-N/log.json: "QUALITY_DATABASE complete"

CHECKER 6: READ agents/quality-file-size.md (MANDATORY)
           → APPEND to session/tasks/task-N/log.json: "QUALITY_FILE_SIZE activated"
           → Run FILE_SIZE's specific checks
           → UPDATE session/tasks/task-N/reports/quality-report.json with overall score
           → APPEND to session/tasks/task-N/log.json: "QUALITY_FILE_SIZE complete"
```

---

## Process

```
FOR EACH checker (1-6):
  1. READ agents/quality-[NAME].md
  2. APPEND to session/tasks/task-N/log.json: "[NAME] activated"
  3. EXECUTE checker's checks
  4. UPDATE session/tasks/task-N/reports/quality-report.json
  5. APPEND to session/tasks/task-N/log.json: "[NAME] complete - Score: X/10"

AFTER ALL checkers:
  1. session/tasks/task-N/reports/quality-report.json has overall score
  2. IF critical issues: Return to IMPLEMENTATION
  3. IF all pass: Continue to REFACTOR
```

## Output

All checkers UPDATE `session/tasks/task-N/reports/quality-report.json`:

```json
{
  "taskId": "task-N",
  "generatedAt": "{{ISO_TIMESTAMP}}",
  "checks": {
    "typeSafety": { "score": {{SCORE}}, "weight": 20, "status": "pass" },
    "validation": { "score": {{SCORE}}, "weight": 20, "status": "pass" },
    "errorHandling": { "score": {{SCORE}}, "weight": 15, "status": "pass" },
    "apiConsistency": { "score": {{SCORE}}, "weight": 15, "status": "pass" },
    "database": { "score": {{SCORE}}, "weight": 15, "status": "pass" },
    "fileSize": { "score": {{SCORE}}, "weight": 15, "status": "pass" }
  },
  "overall": {
    "score": {{TOTAL}},
    "maxScore": 100,
    "passThreshold": 70,
    "verdict": "pass"
  }
}
```

## Success Criteria

- ALL 6 checker files READ (not simulated)
- ALL 6 activations LOGGED to `session/tasks/task-N/log.json`
- No critical issues
- `session/tasks/task-N/reports/quality-report.json` generated with overall score

## MANDATORY COMPLETION STEPS

```
STEP 1: LOG completion
        → APPEND to session/tasks/task-N/log.json: "Quality Check Complete - Score: X/100"

STEP 2: UPDATE session/tasks/task-N/state.json
        → Set currentStage to REFACTOR
        → Set progress to 65

STEP 3: TRIGGER NEXT STAGE (AUTOMATIC)
        → READ agents/refactor.md IMMEDIATELY
        → Do NOT ask "Should I continue?"
        → AUTOMATICALLY start REFACTOR stage
```

## Next Stage

Proceed to REFACTOR stage by reading `agents/refactor.md`.
