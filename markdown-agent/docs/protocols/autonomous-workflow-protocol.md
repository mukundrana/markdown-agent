---
protocol_version: "1.0.0"
purpose: "Define autonomous execution rules for all stages"
critical: "READ THIS BEFORE EXECUTING ANY STAGE"
---

# ⚡ Autonomous Workflow Protocol

## 🚨 CRITICAL: This System is AUTONOMOUS

**What "Autonomous" Means**:
- ✅ **Complete stages end-to-end** without stopping
- ✅ **Complete sub-steps within stages** without stopping
- ✅ **Never ask for permission** between stages/steps
- ✅ **Only ask for help** on critical errors or ambiguous requirements

---

## 🔄 Stage Execution Protocol

### Stage 1: PLANNING (3 Agents)

**Execution Flow**:
```
User confirms task
    ↓ [NO STOP]
Read context.md
    ↓ [NO STOP]
Activate PLANNER
    ↓ [NO STOP]
PLANNER creates optimistic plan
    ↓ [NO STOP - PLANNER auto-triggers CRITIC]
Activate CRITIC
    ↓ [NO STOP]
CRITIC creates defensive plan
    ↓ [NO STOP - CRITIC auto-triggers SYNTHESIZER]
Activate SYNTHESIZER
    ↓ [NO STOP]
SYNTHESIZER creates final plan.md
    ↓ [NO STOP - SYNTHESIZER auto-triggers IMPLEMENTATION]
Update state.md to "IMPLEMENTATION"
    ↓ [NO STOP]
Start IMPLEMENTATION stage
```

**❌ NEVER**:
- "Should I create the plan?"
- "Should I activate CRITIC?"
- "Should I start implementation?"
- Stop between PLANNER → CRITIC → SYNTHESIZER

**✅ ALWAYS**:
- Complete all 3 planning agents without stopping
- Automatically transition to IMPLEMENTATION
- Log completion but don't ask for permission

---

### Stage 2: IMPLEMENTATION (Multiple Waves)

**Execution Flow**:
```
Read plan.md
    ↓ [NO STOP]
Wave 0: Pre-flight & Setup
    ↓ [NO STOP - Check for more waves]
Wave 1: Foundation
    ↓ [NO STOP - Check for more waves]
Wave 2: UI Components
    ↓ [NO STOP - Check for more waves]
Wave 3: Advanced Features
    ↓ [NO STOP - Check for more waves]
[... all remaining waves ...]
    ↓ [NO STOP]
All waves complete
    ↓ [NO STOP - CODER auto-triggers VERIFICATION]
Update state.md to "VERIFICATION"
    ↓ [NO STOP]
Start VERIFICATION stage
```

**❌ NEVER**:
- "Should I continue with Wave X?"
- "Should I start the next wave?"
- "Ready for next wave?"
- Stop between waves

**✅ ALWAYS**:
- Complete ALL waves without stopping
- Check plan.md for remaining waves
- Automatically transition to VERIFICATION after all waves
- Log wave completion but don't ask for permission

---

### Stage 3: VERIFICATION

**Execution Flow**:
```
Read plan.md and requirements
    ↓ [NO STOP]
Activate TESTER agent
    ↓ [NO STOP]
Run test suite
    ↓ [NO STOP]
Test edge cases
    ↓ [NO STOP]
If bugs found:
    ↓ [NO STOP]
Return to IMPLEMENTATION (fix bugs)
    ↓ [NO STOP - Continue verification]
If no bugs:
    ↓ [NO STOP - TESTER auto-triggers REVIEW]
Update state.md to "REVIEW"
    ↓ [NO STOP]
Start REVIEW stage
```

**❌ NEVER**:
- "Should I run tests?"
- "Should I fix this bug?"
- "Should I continue testing?"

**✅ ALWAYS**:
- Run all tests without stopping
- Fix bugs found and re-test
- Automatically transition to REVIEW when all tests pass

---

### Stage 4: REVIEW

**Execution Flow**:
```
Activate ORCHESTRATOR agent
    ↓ [NO STOP]
Code review
    ↓ [NO STOP]
Documentation check
    ↓ [NO STOP]
Create review summary
    ↓ [NO STOP - ORCHESTRATOR auto-triggers QUALITY_CHECK]
Update state.md to "QUALITY_CHECK"
    ↓ [NO STOP]
Start QUALITY_CHECK stage
```

---

### Stage 5: QUALITY_CHECK (6 Checkers)

**Execution Flow**:
```
Activate all 6 quality checkers
    ↓ [NO STOP - Can run in parallel]
TYPE_SAFETY checker
    ↓ [NO STOP]
VALIDATION checker
    ↓ [NO STOP]
ERROR_HANDLING checker
    ↓ [NO STOP]
API_CONSISTENCY checker
    ↓ [NO STOP]
DATABASE checker
    ↓ [NO STOP]
FILE_SIZE checker
    ↓ [NO STOP]
Collect all results
    ↓ [NO STOP]
If issues found:
    ↓ [NO STOP]
Return to IMPLEMENTATION (fix issues)
    ↓ [NO STOP - Continue quality check]
If no issues:
    ↓ [NO STOP - Quality checkers auto-trigger REFACTOR]
Update state.md to "REFACTOR"
    ↓ [NO STOP]
Start REFACTOR stage
```

**❌ NEVER**:
- "Should I run quality checks?"
- "Should I fix this issue?"
- Stop between quality checkers

**✅ ALWAYS**:
- Run all 6 checkers without stopping
- Fix issues found and re-check
- Automatically transition to REFACTOR when all checks pass

---

### Stage 6: REFACTOR

**Execution Flow**:
```
Activate REFACTOR agent
    ↓ [NO STOP]
Identify improvement opportunities
    ↓ [NO STOP]
Apply refactorings
    ↓ [NO STOP]
Run tests (verify behavior unchanged)
    ↓ [NO STOP - REFACTOR auto-triggers PERFORMANCE]
Update state.md to "PERFORMANCE"
    ↓ [NO STOP]
Start PERFORMANCE stage
```

---

### Stage 7: PERFORMANCE

**Execution Flow**:
```
Activate PERFORMANCE agent
    ↓ [NO STOP]
Identify bottlenecks
    ↓ [NO STOP]
Apply optimizations
    ↓ [NO STOP]
Measure improvements
    ↓ [NO STOP - PERFORMANCE auto-triggers SECURITY]
Update state.md to "SECURITY"
    ↓ [NO STOP]
Start SECURITY stage
```

---

### Stage 8: SECURITY

**Execution Flow**:
```
Activate SECURITY agent
    ↓ [NO STOP]
Scan for vulnerabilities
    ↓ [NO STOP]
Fix security issues
    ↓ [NO STOP]
Validate security measures
    ↓ [NO STOP - SECURITY auto-triggers DEPLOY]
Update state.md to "DEPLOY"
    ↓ [NO STOP]
Start DEPLOY stage
```

---

### Stage 9: DEPLOY

**Execution Flow**:
```
Activate DEPLOY agent
    ↓ [NO STOP]
Pre-deployment checks
    ↓ [NO STOP]
Execute deployment
    ↓ [NO STOP]
Run smoke tests
    ↓ [NO STOP - DEPLOY auto-triggers COMPLETE]
Update state.md to "COMPLETE"
    ↓ [NO STOP]
Start COMPLETE stage
```

---

### Stage 10: COMPLETE

**Execution Flow**:
```
Activate CHANGELOG agent
    ↓ [NO STOP]
Update CHANGElog.md
    ↓ [NO STOP]
Create task completion report in task-report.md
    ↓ [NO STOP]
Update state.md to "IDLE"
    ↓ [NO STOP]
Update log.md with final summary
    ↓ [NO STOP]
Notify user: "✅ TASK COMPLETE"
    ↓ [STOP - Wait for new task]
```

**This is the ONLY place to stop** - after complete task is done!

---

## 🎯 Summary: Complete Flow

```
User confirms task
    ↓ [NO STOPS]
┌─────────────────────────────────────┐
│ REQUIREMENTS (optional)             │
│ - Ask questions OR skip             │
└────────────┬────────────────────────┘
             ↓ [NO STOP]
┌─────────────────────────────────────┐
│ STAGE 1: PLANNING                   │
│ - PLANNER → CRITIC → SYNTHESIZER    │
└────────────┬────────────────────────┘
             ↓ [NO STOP]
┌─────────────────────────────────────┐
│ STAGE 2: IMPLEMENTATION             │
│ - Wave 0 → Wave 1 → ... → Wave N    │
└────────────┬────────────────────────┘
             ↓ [NO STOP]
┌─────────────────────────────────────┐
│ STAGE 3: VERIFICATION               │
│ - Run all tests, fix bugs if needed │
└────────────┬────────────────────────┘
             ↓ [NO STOP]
┌─────────────────────────────────────┐
│ STAGE 4: REVIEW                     │
│ - Code review, documentation check  │
└────────────┬────────────────────────┘
             ↓ [NO STOP]
┌─────────────────────────────────────┐
│ STAGE 5: QUALITY_CHECK              │
│ - All 6 checkers, fix issues        │
└────────────┬────────────────────────┘
             ↓ [NO STOP]
┌─────────────────────────────────────┐
│ STAGE 6: REFACTOR                   │
│ - Improve code quality              │
└────────────┬────────────────────────┘
             ↓ [NO STOP]
┌─────────────────────────────────────┐
│ STAGE 7: PERFORMANCE                │
│ - Optimize speed                    │
└────────────┬────────────────────────┘
             ↓ [NO STOP]
┌─────────────────────────────────────┐
│ STAGE 8: SECURITY                   │
│ - Audit and fix vulnerabilities     │
└────────────┬────────────────────────┘
             ↓ [NO STOP]
┌─────────────────────────────────────┐
│ STAGE 9: DEPLOY                     │
│ - Deploy to production              │
└────────────┬────────────────────────┘
             ↓ [NO STOP]
┌─────────────────────────────────────┐
│ STAGE 10: COMPLETE                  │
│ - Update changelog, create report   │
└────────────┬────────────────────────┘
             ↓ [STOP HERE]
✅ TASK COMPLETE
```

**Total stops: 0** (except after complete task)

---

## ⚠️ When to Ask for Help

**Only ask for help when**:
1. ❌ Critical error that blocks progress (can't continue without user input)
2. ❌ Ambiguous requirements (during requirements phase only)
3. ❌ Multiple failures on same task (retry exhausted)
4. ❌ User explicitly asked for status update

**Never ask**:
- ❌ "Should I continue?"
- ❌ "Ready for next stage?"
- ❌ "Should I start X?"
- ❌ "Should I proceed?"

---

## 📝 Logging vs Asking

**DO log**:
- ✅ "Stage X complete, starting Stage Y"
- ✅ "Wave N complete, starting Wave N+1"
- ✅ "All tests passing, moving to review"
- ✅ "Deployment successful"

**DON'T ask**:
- ❌ "Should I continue to Stage Y?"
- ❌ "Should I start Wave N+1?"
- ❌ "Should I move to review?"
- ❌ "Should I deploy?"

---

## ✅ Success Criteria

**Workflow is successful if**:
- ✅ All 10 stages completed without stopping
- ✅ No "Should I continue?" messages
- ✅ Complete execution from task confirmation to task completion
- ✅ All logs updated correctly
- ✅ Task report created at the end

---

*This protocol ensures the markdown-agent system operates autonomously as designed.*
