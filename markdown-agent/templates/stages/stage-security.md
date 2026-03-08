# Stage 9: Security Template

## MANDATORY FIRST STEP - DO NOT SKIP

```
STEP 1: READ agents/security.md (MANDATORY)
        → Use Read tool on agents/security.md
        → This is REQUIRED, not optional

STEP 2: LOG activation (MANDATORY)
        → APPEND to session/tasks/task-N/log.json:
        {
          "id": "log-{{NEXT_NUMBER}}",
          "timestamp": "{{ISO_TIMESTAMP}}",
          "agent": "SECURITY",
          "stage": "SECURITY",
          "action": "Security agent activated",
          "status": "in_progress"
        }

STEP 3: ADOPT SECURITY's personality
        → Use SECURITY's voice and perspective
        → Follow SECURITY's specific instructions
```

---

## Instructions for AI

You are in the **SECURITY** stage. You have already:
- Read `agents/security.md`
- Logged SECURITY activation
- Adopted SECURITY personality

Now follow SECURITY's process:

## Process

### Step 1: Security Scan
- SQL injection checks
- XSS vulnerabilities
- CSRF protection
- Authentication/authorization
- Sensitive data exposure
- Hardcoded secrets

### Step 2: Validate Security Measures
- Input sanitization
- Output encoding
- Secure headers
- Encryption
- Error messages

### Step 3: Fix Issues
- Document all vulnerabilities
- Classify by severity
- Implement fixes
- Add security tests

### Step 4: Verify
- Re-scan for vulnerabilities
- Run security tests
- Verify fixes work

## Output

CREATE `session/tasks/task-N/reports/security-report.json`:

```json
{
  "taskId": "task-N",
  "generatedAt": "{{ISO_TIMESTAMP}}",
  "agent": "SECURITY",
  "score": {{SCORE}},
  "maxScore": 100,
  "verdict": "pass",
  "vulnerabilities": {
    "critical": 0,
    "high": 0,
    "medium": {{COUNT}},
    "low": {{COUNT}}
  },
  "issues": [
    {
      "severity": "{{LEVEL}}",
      "type": "{{TYPE}}",
      "file": "{{FILE}}",
      "description": "{{DESCRIPTION}}",
      "fix": "{{FIX}}",
      "status": "fixed"
    }
  ],
  "checksPassed": [
    "no_sql_injection",
    "no_xss",
    "no_hardcoded_secrets",
    "input_sanitization"
  ]
}
```

## Success Criteria

- No critical vulnerabilities
- No hardcoded secrets
- Proper security measures
- Security tests added
- Security report created

## MANDATORY COMPLETION STEPS

```
STEP 1: LOG completion
        → APPEND to log.json:
        {
          "id": "log-{{NEXT_NUMBER}}",
          "timestamp": "{{ISO_TIMESTAMP}}",
          "agent": "SECURITY",
          "stage": "SECURITY",
          "action": "Security audit complete",
          "status": "success",
          "details": {
            "score": {{SCORE}},
            "vulnerabilitiesFound": {{COUNT}},
            "allFixed": true
          },
          "nextAgent": "DEPLOY"
        }

STEP 2: UPDATE state.json
        → Set currentStage to DEPLOY
        → Set progress to 90

STEP 3: TRIGGER NEXT STAGE (AUTOMATIC)
        → READ agents/deploy.md IMMEDIATELY
        → Do NOT ask "Should I continue?"
        → AUTOMATICALLY start DEPLOY stage
```

## Next Stage

Proceed to DEPLOY stage by reading `agents/deploy.md`.
