# Stage 10: Deploy Template

## MANDATORY FIRST STEP - DO NOT SKIP

```
STEP 1: READ agents/deploy.md (MANDATORY)
        → Use Read tool on agents/deploy.md
        → This is REQUIRED, not optional

STEP 2: LOG activation (MANDATORY)
        → APPEND to session/tasks/task-N/log.json:
        {
          "id": "log-{{NEXT_NUMBER}}",
          "timestamp": "{{ISO_TIMESTAMP}}",
          "agent": "DEPLOY",
          "stage": "DEPLOY",
          "action": "Deploy agent activated",
          "status": "in_progress"
        }

STEP 3: ADOPT DEPLOY's personality
        → Use DEPLOY's voice and perspective
        → Follow DEPLOY's specific instructions
```

---

## Instructions for AI

You are in the **DEPLOY** stage. You have already:
- Read `agents/deploy.md`
- Logged DEPLOY activation
- Adopted DEPLOY personality

Now follow DEPLOY's process:

## Process

### Step 1: Pre-Deployment Checks
- [ ] All tests passing
- [ ] Security audit complete
- [ ] No obvious bugs
- [ ] Environment variables configured
- [ ] Database migrations prepared
- [ ] Rollback plan documented

### Step 2: Create Deployment Plan
- List deployment steps
- Identify dependencies
- Prepare rollback procedure
- Set monitoring alerts

### Step 3: Execute Deployment
- Run deployment checklist
- Execute deployment steps
- Verify each step
- Run smoke tests

### Step 4: Post-Deployment
- Monitor for issues
- Verify services running
- Document deployment

## Output

CREATE `session/tasks/task-N/reports/deploy-report.json`:

```json
{
  "taskId": "task-N",
  "generatedAt": "{{ISO_TIMESTAMP}}",
  "agent": "DEPLOY",
  "environment": "{{ENV}}",
  "url": "{{URL}}",
  "status": "success",
  "steps": [
    {
      "order": 1,
      "action": "{{ACTION}}",
      "status": "success",
      "timestamp": "{{ISO_TIMESTAMP}}"
    }
  ],
  "smokeTests": {
    "total": {{COUNT}},
    "passed": {{COUNT}},
    "failed": 0
  },
  "rollbackPlan": "{{PLAN}}",
  "monitoring": {
    "alerts": "configured",
    "healthCheck": "{{URL}}"
  }
}
```

## Success Criteria

- Deployment successful
- Smoke tests pass
- No critical issues
- Monitoring shows healthy

## MANDATORY COMPLETION STEPS

```
STEP 1: LOG completion
        → APPEND to log.json:
        {
          "id": "log-{{NEXT_NUMBER}}",
          "timestamp": "{{ISO_TIMESTAMP}}",
          "agent": "DEPLOY",
          "stage": "DEPLOY",
          "action": "Deployment complete",
          "status": "success",
          "details": {
            "environment": "{{ENV}}",
            "url": "{{URL}}"
          },
          "nextAgent": "CHANGELOG"
        }

STEP 2: UPDATE state.json
        → Set currentStage to COMPLETE
        → Set progress to 100

STEP 3: TRIGGER NEXT STAGE (AUTOMATIC)
        → READ agents/changelog.md IMMEDIATELY
        → Do NOT ask "Should I continue?"
        → AUTOMATICALLY start COMPLETE stage
```

## Next Stage

Proceed to COMPLETE stage by reading `agents/changelog.md`.
