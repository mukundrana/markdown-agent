# Stage 5: Review Template

## MANDATORY FIRST STEP - DO NOT SKIP

```
STEP 1: READ agents/reviewer.md (MANDATORY)
        → Use Read tool on agents/reviewer.md
        → This is REQUIRED, not optional

STEP 2: LOG activation (MANDATORY)
        → APPEND to session/tasks/task-N/log.json:
        {
          "id": "log-{{NEXT_NUMBER}}",
          "timestamp": "{{ISO_TIMESTAMP}}",
          "agent": "REVIEWER",
          "stage": "REVIEW",
          "action": "Reviewer activated",
          "status": "in_progress"
        }

STEP 3: ADOPT REVIEWER's personality
        → Use REVIEWER's voice and perspective
        → Follow REVIEWER's specific instructions
```

---

## Instructions for AI

You are in the **REVIEW** stage. You have already:
- Read `agents/reviewer.md`
- Logged REVIEWER activation
- Adopted REVIEWER personality

Now follow REVIEWER's process:

### 1. Code Review
- Review all code changes
- Check quality and conventions
- Verify best practices
- Check against requirements

### 2. Documentation Review
- Verify docs updated
- Check clarity
- Verify examples

### 3. Acceptance Criteria Check
- Verify all criteria met
- Create checklist in review report

### 4. Security Check
- No vulnerabilities
- Input sanitization
- No secrets

### 5. Create Review Report

CREATE `session/tasks/task-N/reports/review-report.json`:

```json
{
  "taskId": "task-N",
  "generatedAt": "{{ISO_TIMESTAMP}}",
  "agent": "REVIEWER",
  "verdict": "APPROVED",
  "filesReviewed": ["{{FILE_1}}"],
  "issues": [],
  "acceptanceCriteria": [
    {
      "id": "ac-1",
      "description": "{{CRITERION}}",
      "met": true
    }
  ],
  "recommendations": []
}
```

## Success Criteria

- Code review passed
- Documentation complete
- Security review passed
- All acceptance criteria met

## MANDATORY COMPLETION STEPS

```
STEP 1: LOG completion
        → APPEND to log.json: REVIEWER complete entry
        → Include verdict: APPROVED/NEEDS_CHANGES

STEP 2: UPDATE state.json
        → Set currentStage to QUALITY_CHECK
        → Set progress to 50

STEP 3: TRIGGER NEXT STAGE (AUTOMATIC)
        → READ templates/stages/stage-quality-check.md IMMEDIATELY
        → Do NOT ask "Should I continue?"
        → AUTOMATICALLY start QUALITY_CHECK stage
```

## Next Stage

Proceed to QUALITY_CHECK stage by reading `templates/stages/stage-quality-check.md`.
