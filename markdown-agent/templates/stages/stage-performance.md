# Stage 8: Performance Template

## MANDATORY FIRST STEP - DO NOT SKIP

```
STEP 1: READ agents/performance.md (MANDATORY)
        → Use Read tool on agents/performance.md
        → This is REQUIRED, not optional

STEP 2: LOG activation (MANDATORY)
        → APPEND to session/tasks/task-N/log.json:
        {
          "id": "log-{{NEXT_NUMBER}}",
          "timestamp": "{{ISO_TIMESTAMP}}",
          "agent": "PERFORMANCE",
          "stage": "PERFORMANCE",
          "action": "Performance agent activated",
          "status": "in_progress"
        }

STEP 3: ADOPT PERFORMANCE's personality
        → Use PERFORMANCE's voice and perspective
        → Follow PERFORMANCE's specific instructions
```

---

## Instructions for AI

You are in the **PERFORMANCE** stage. You have already:
- Read `agents/performance.md`
- Logged PERFORMANCE activation
- Adopted PERFORMANCE personality

Now follow PERFORMANCE's process:

## Process

### Step 1: Profile Current State
- Identify performance metrics
- Measure baseline performance
- Note any obvious bottlenecks

### Step 2: Identify Bottlenecks
- Slow algorithms
- Database queries
- Memory leaks
- Blocking operations
- Bundle size

### Step 3: Apply Optimizations
- Improve algorithms
- Add caching
- Optimize queries
- Lazy loading
- Code splitting

### Step 4: Measure Results
- Before/after benchmarks
- Profile results
- Verify improvements

## Output

CREATE `session/tasks/task-N/reports/performance-report.json`:

```json
{
  "taskId": "task-N",
  "generatedAt": "{{ISO_TIMESTAMP}}",
  "agent": "PERFORMANCE",
  "baseline": {
    "loadTime": {{MS}},
    "memoryUsage": {{MB}},
    "bundleSize": {{KB}}
  },
  "optimized": {
    "loadTime": {{MS}},
    "memoryUsage": {{MB}},
    "bundleSize": {{KB}}
  },
  "improvement": "{{PERCENT}}%",
  "optimizationsApplied": [
    {
      "type": "{{TYPE}}",
      "description": "{{DESCRIPTION}}",
      "impact": "{{IMPACT}}"
    }
  ],
  "verdict": "pass"
}
```

## Success Criteria

- Measurable performance improvement
- No regressions
- Tests pass
- Performance report created

## MANDATORY COMPLETION STEPS

```
STEP 1: LOG completion
        → APPEND to log.json:
        {
          "id": "log-{{NEXT_NUMBER}}",
          "timestamp": "{{ISO_TIMESTAMP}}",
          "agent": "PERFORMANCE",
          "stage": "PERFORMANCE",
          "action": "Performance optimization complete",
          "status": "success",
          "details": {
            "improvement": "{{PERCENT}}%"
          },
          "nextAgent": "SECURITY"
        }

STEP 2: UPDATE state.json
        → Set currentStage to SECURITY
        → Set progress to 80

STEP 3: TRIGGER NEXT STAGE (AUTOMATIC)
        → READ agents/security.md IMMEDIATELY
        → Do NOT ask "Should I continue?"
        → AUTOMATICALLY start SECURITY stage
```

## Next Stage

Proceed to SECURITY stage by reading `agents/security.md`.
