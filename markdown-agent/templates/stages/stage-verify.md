# Stage 4: Verification Template

## MANDATORY FIRST STEP - DO NOT SKIP

```
STEP 1: READ agents/tester.md (MANDATORY)
        → Use Read tool on agents/tester.md
        → This is REQUIRED, not optional

STEP 2: LOG activation (MANDATORY)
        → APPEND to session/tasks/task-N/log.json:
        {
          "id": "log-{{NEXT_NUMBER}}",
          "timestamp": "{{ISO_TIMESTAMP}}",
          "agent": "TESTER",
          "stage": "VERIFICATION",
          "action": "Tester activated",
          "status": "in_progress"
        }

STEP 3: ADOPT TESTER's personality
        → Use TESTER's voice and perspective
        → Follow TESTER's specific instructions
```

---

## Instructions for AI

You are in the **VERIFICATION** stage. You have already:
- Read `agents/tester.md`
- Logged TESTER activation
- Adopted TESTER personality

Now follow TESTER's process:

### 1. Run Tests
- Execute automated test suite
- Perform manual testing
- Test edge cases
- Check integration points

### 2. Handle Failures
- If tests fail:
  - Document failures in `reports/test-report.json`
  - Create fix tasks in `plan.json`
  - Return to IMPLEMENTATION stage

### 3. Security Check
- Scan for vulnerabilities
- Check input validation
- Check for hardcoded secrets

### 4. Complete Verification
- If all pass: Update `state.json` to "REVIEW"
- If failures: Fix and re-verify

## Output

CREATE `session/tasks/task-N/reports/test-report.json`:

```json
{
  "taskId": "task-N",
  "generatedAt": "{{ISO_TIMESTAMP}}",
  "agent": "TESTER",
  "summary": {
    "totalTests": {{COUNT}},
    "passed": {{COUNT}},
    "failed": {{COUNT}},
    "skipped": {{COUNT}}
  },
  "coverage": {{PERCENT}},
  "verdict": "pass",
  "failures": [],
  "manualTests": []
}
```

## Success Criteria

- All tests passing
- Manual testing successful
- No critical security issues
- Integration points verified

## MANDATORY COMPLETION STEPS

```
STEP 1: LOG completion
        → APPEND to log.json: TESTER complete entry

STEP 2: UPDATE state.json
        → Set currentStage to REVIEW
        → Set progress to 45

STEP 3: TRIGGER NEXT STAGE (AUTOMATIC)
        → READ agents/reviewer.md IMMEDIATELY
        → Do NOT ask "Should I continue?"
        → AUTOMATICALLY start REVIEW stage
```

## Next Stage

Proceed to REVIEW stage by reading `agents/reviewer.md`.
