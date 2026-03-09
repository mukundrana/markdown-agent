---
protocol_version: "3.0.0"
purpose: "Define autonomous execution rules for all stages"
critical: "READ THIS BEFORE EXECUTING ANY STAGE"
enforcement: "MANDATORY - VIOLATION CAUSES WORKFLOW FAILURE"
---

# ⚡ Autonomous Workflow Protocol

## 🚨 CRITICAL: This System is AUTONOMOUS

**What "Autonomous" Means**:
- ✅ **Complete stages end-to-end** without stopping
- ✅ **Complete sub-steps within stages** without stopping
- ✅ **Never ask for permission** between stages/steps
- ✅ **Only ask for help** on critical errors or ambiguous requirements
- ✅ **Never combine multiple stages into one**
- ✅ **Never skip stages regardless of complexity**

---

## 🚨 MANDATORY RULES

### RULE 0: START TRIGGER (EXCEPTION TO AUTONOMY)

**Workflow start requires user trigger. Once started, never stop.**

**Step 1: User queues tasks**
- Add one or more tasks to queue
- System outputs: "Say 'go baby go' to start"
- **🛑 SYSTEM STOPS AND WAITS**

**Step 2: User triggers start**
- User says: "go baby go" or "execute"
- System starts first task
- **From here: NEVER STOP until all tasks complete**

**Step 3: Autonomous execution**
- Tasks execute one after another
- Stages execute without stopping
- Only stop when queue is empty OR critical error

**❌ FORBIDDEN:**
- Starting execution immediately when first task is added
- Asking "Should I start?" when workflow already running
- Asking "Should I continue?" between stages/tasks
- Stopping between tasks

**✅ REQUIRED:**
- Queue tasks → STOP and wait for "go baby go"
- User says "go baby go" → Start and NEVER stop until done

---

### RULE 1: ONE STAGE AT A TIME

### RULE 1: ONE STAGE AT A TIME

**❌ FORBIDDEN:**
- Combining PLANNING + IMPLEMENTATION into one action
- Creating all files in one "burst"
- Completing VERIFICATION + REVIEW + SECURITY in same second
- Skipping stages because "task is simple"

**✅ REQUIRED:**
- Complete ONE stage fully before starting next
- Each stage must have its OWN log entry
- Each stage must have its OWN checkpoint
- Each stage must take reasonable time

### RULE 2: MINIMUM TIME PER STAGE

**❌ FORBIDDEN:**
- Completing a stage in 0 seconds
- Multiple stages completing in same timestamp
- Finishing "simple" tasks instantly

**✅ REQUIRED MINIMUM TIMES:**

| Stage | Minimum Time | Reason |
|-------|--------------|--------|
| PLANNING (3 agents) | 2+ minutes | Need to read requirements, create plan, review, synthesize |
| IMPLEMENTATION | 3+ minutes | Need to create/modify files properly |
| VERIFICATION | 1+ minute | Need to write and run tests |
| REVIEW | 1+ minute | Need to actually review code |
| SECURITY | 1+ minute | Need to scan for vulnerabilities |
| DEPLOY | 1+ minute | Need pre-deployment checks |
| **Minimum total** | **10+ minutes** | For even the simplest task |

**If you complete a "simple" task in under 5 minutes, YOU HAVE SHORTCUT.**

### RULE 3: CHECKPOINT AFTER EVERY STAGE

**❌ FORBIDDEN:**
- Creating only one checkpoint at the end
- Skipping intermediate checkpoints
- Combining checkpoints

**✅ REQUIRED CHECKPOINTS:**

For **standard** workflow (6 stages):
```json
{
  "checkpoints": [
    {"name": "PLANNING-COMPLETE", "stage": "PLANNING"},
    {"name": "IMPLEMENTATION-COMPLETE", "stage": "IMPLEMENTATION"},
    {"name": "VERIFICATION-COMPLETE", "stage": "VERIFICATION"},
    {"name": "REVIEW-COMPLETE", "stage": "REVIEW"},
    {"name": "SECURITY-COMPLETE", "stage": "SECURITY"},
    {"name": "DEPLOY-COMPLETE", "stage": "DEPLOY"},
    {"name": "WORKFLOW-COMPLETE", "stage": "COMPLETE"}
  ]
}
```

**⚠️ CRITICAL: DEPLOY-COMPLETE checkpoint is MANDATORY.**
**Cannot skip from SECURITY directly to COMPLETE.**

### RULE 4: SEQUENTIAL TIMESTAMPS

**❌ FORBIDDEN:**
- Multiple log entries with SAME timestamp
- Checkpoints with SAME timestamp
- Completing stages in 0 seconds

**✅ REQUIRED:**
```json
// WRONG - All same timestamp!
{"timestamp": "2026-03-09T00:00:23.000Z", "agent": "PLANNER"}
{"timestamp": "2026-03-09T00:00:23.000Z", "agent": "CODER"}
{"timestamp": "2026-03-09T00:00:23.000Z", "agent": "TESTER"}

// RIGHT - Different timestamps!
{"timestamp": "2026-03-09T00:00:22.000Z", "agent": "PLANNER"}
{"timestamp": "2026-03-09T00:00:24.500Z", "agent": "CODER"}
{"timestamp": "2026-03-09T00:00:27.000Z", "agent": "TESTER"}
```

**Each stage MUST have a DIFFERENT timestamp that is LATER than the previous.**

---

## MANDATORY AGENT COMPLETION PATTERN

Every agent MUST complete their stage by following this exact pattern:

```javascript
// ═════════════════════════════════════════════════════════════════
// MANDATORY AGENT COMPLETION PATTERN
// ═════════════════════════════════════════════════════════════════

// STEP 1: Complete your work
// [Do what your agent is supposed to do]

// STEP 2: Update your state files
UPDATE session/tasks/task-N/state.json
APPEND to session/tasks/task-N/log.json

// STEP 3: CREATE checkpoint
CREATE checkpoint in session/tasks/task-N/checkpoints.json

// STEP 4: SYNC to dashboard
UPDATE session/data.js

// STEP 5: MANDATORY HANDOFF CHECKLIST
// Before stopping, VERIFY you have done ALL of these:
// □ Stage work is COMPLETE
// □ state.json updated with next stage
// □ log.json has completion entry
// □ checkpoint created
// □ data.js synced with latest data
// □ NEXT AGENT IDENTIFIED

// STEP 6: TRIGGER NEXT AGENT
// DO NOT ASK "Should I continue?"
// DO NOT WAIT FOR USER INPUT
// READ THE NEXT AGENT FILE IMMEDIATELY

OUTPUT: "[STAGE] complete. Starting [NEXT_STAGE]..."
READ: agents/[NEXT_AGENT].md
[FOLLOW NEXT AGENT'S INSTRUCTIONS]

// ═════════════════════════════════════════════════════════════════
// IF YOU ASK "SHOULD I CONTINUE?", YOU HAVE FAILED
// ═════════════════════════════════════════════════════════════════
```

---

## STAGE COMPLETION REQUIREMENTS

**Before declaring ANY stage complete, you MUST:**

1. Complete all work for the stage
2. CREATE checkpoint for this stage in checkpoints.json
3. APPEND log entry with completion status
4. UPDATE state.json with next stage number
5. Use DIFFERENT timestamp than previous stage
6. READ next agent file
7. TRIGGER next agent

**❌ FORBIDDEN:**
- Saying "Stage X complete" without creating checkpoint
- Creating checkpoint only at the end
- Using same timestamp as previous stage
- Skipping from SECURITY to COMPLETE (must go through DEPLOY)

---

## STAGE EXECUTION PROTOCOL

### CHECKPOINT REQUIREMENT FOR STANDARD WORKFLOW

**For standard workflow (6 stages), you MUST create these checkpoints:**

```json
{
  "checkpoints": [
    {"id": "cp-1", "name": "PLANNING-COMPLETE", "stage": "PLANNING", "stageNumber": 1},
    {"id": "cp-2", "name": "IMPLEMENTATION-COMPLETE", "stage": "IMPLEMENTATION", "stageNumber": 2},
    {"id": "cp-3", "name": "VERIFICATION-COMPLETE", "stage": "VERIFICATION", "stageNumber": 3},
    {"id": "cp-4", "name": "REVIEW-COMPLETE", "stage": "REVIEW", "stageNumber": 4},
    {"id": "cp-5", "name": "SECURITY-COMPLETE", "stage": "SECURITY", "stageNumber": 5},
    {"id": "cp-6", "name": "DEPLOY-COMPLETE", "stage": "DEPLOY", "stageNumber": 6},
    {"id": "cp-7", "name": "WORKFLOW-COMPLETE", "stage": "COMPLETE", "stageNumber": 7}
  ]
}
```

**⚠️ CRITICAL: DEPLOY-COMPLETE checkpoint is MANDATORY.**
**Cannot skip from SECURITY directly to COMPLETE.**

---

### Stage 1: PLANNING (3 Agents)

**Execution Flow:**
```
User confirms task
    ↓ [NO STOP]
Activate PLANNER
    ↓ [NO STOP]
PLANNER creates optimistic plan
    ↓ [NO STOP]
Activate CRITIC
    ↓ [NO STOP]
CRITIC creates defensive plan
    ↓ [NO STOP]
Activate SYNTHESIZER
    ↓ [NO STOP]
SYNTHESIZER creates final plan.md
    ↓ [NO STOP]
CREATE checkpoint: PLANNING-COMPLETE
    ↓ [NO STOP]
UPDATE state.json: currentStage = {name: "IMPLEMENTATION", number: 2}
    ↓ [NO STOP]
SYNC data.js
    ↓ [NO STOP]
OUTPUT: "Planning complete. Starting IMPLEMENTATION..."
    ↓ [NO STOP]
READ: agents/coder.md
    ↓ [NO STOP]
Start IMPLEMENTATION stage
```

---

### Stage 2: IMPLEMENTATION (Multiple Waves)

**Execution Flow:**
```
Read plan.md
    ↓ [NO STOP]
Wave 0: Pre-flight & Setup
    ↓ [NO STOP]
Wave 1: Foundation
    ↓ [NO STOP]
Wave 2: UI Components
    ↓ [NO STOP]
[... all remaining waves ...]
    ↓ [NO STOP]
All waves complete
    ↓ [NO STOP]
CREATE checkpoint: IMPLEMENTATION-COMPLETE
    ↓ [NO STOP]
UPDATE state.json: currentStage = {name: "VERIFICATION", number: 3}
    ↓ [NO STOP]
SYNC data.js
    ↓ [NO STOP]
OUTPUT: "Implementation complete. Starting VERIFICATION..."
    ↓ [NO STOP]
READ: agents/tester.md
    ↓ [NO STOP]
Start VERIFICATION stage
```

---

### Stage 3: VERIFICATION

**Execution Flow:**
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
If no bugs:
    ↓ [NO STOP]
CREATE checkpoint: VERIFICATION-COMPLETE
    ↓ [NO STOP]
UPDATE state.json: currentStage = {name: "REVIEW", number: 4}
    ↓ [NO STOP]
SYNC data.js
    ↓ [NO STOP]
OUTPUT: "Verification complete. Starting REVIEW..."
    ↓ [NO STOP]
READ: agents/reviewer.md
    ↓ [NO STOP]
Start REVIEW stage
```

---

### Stage 4: REVIEW

**Execution Flow:**
```
Activate REVIEWER agent
    ↓ [NO STOP]
Code review
    ↓ [NO STOP]
Documentation check
    ↓ [NO STOP]
Create review summary
    ↓ [NO STOP]
CREATE checkpoint: REVIEW-COMPLETE
    ↓ [NO STOP]
UPDATE state.json: currentStage = {name: "SECURITY", number: 5}
    ↓ [NO STOP]
SYNC data.js
    ↓ [NO STOP]
OUTPUT: "Review complete. Starting SECURITY..."
    ↓ [NO STOP]
READ: agents/security.md
    ↓ [NO STOP]
Start SECURITY stage
```

---

### Stage 5: SECURITY

**⚠️ CRITICAL: DEPLOY stage is MANDATORY after SECURITY**

**Execution Flow:**
```
Activate SECURITY agent
    ↓ [NO STOP]
Scan for vulnerabilities
    ↓ [NO STOP]
Fix security issues
    ↓ [NO STOP]
Validate security measures
    ↓ [NO STOP]
CREATE checkpoint: SECURITY-COMPLETE
    ↓ [NO STOP]
UPDATE state.json: currentStage = {name: "DEPLOY", number: 6}
    ↓ [NO STOP]
SYNC data.js
    ↓ [NO STOP]
OUTPUT: "Security complete. Starting DEPLOY..."
    ↓ [NO STOP]
READ: agents/deploy.md
    ↓ [NO STOP]
Start DEPLOY stage
```

**❌ FORBIDDEN:**
- Skipping DEPLOY stage
- Going from SECURITY directly to COMPLETE

**✅ REQUIRED:**
- CREATE checkpoint: SECURITY-COMPLETE
- ALWAYS trigger DEPLOY agent after SECURITY

---

### Stage 6: DEPLOY

**⚠️ CRITICAL: DEPLOY is the LAST stage before COMPLETE**

**Execution Flow:**
```
Activate DEPLOY agent
    ↓ [NO STOP]
Pre-deployment checks
    ↓ [NO STOP]
Execute deployment
    ↓ [NO STOP]
Run smoke tests
    ↓ [NO STOP]
CREATE checkpoint: DEPLOY-COMPLETE
    ↓ [NO STOP]
UPDATE state.json: currentStage = {name: "COMPLETE", number: 7}
    ↓ [NO STOP]
SYNC data.js
    ↓ [NO STOP]
OUTPUT: "Deploy complete. Task finished!"
    ↓ [NO STOP]
CREATE checkpoint: WORKFLOW-COMPLETE
    ↓ [STOP - Only stop here!]
```

**❌ FORBIDDEN:**
- Skipping DEPLOY stage
- Not creating DEPLOY-COMPLETE checkpoint

**✅ REQUIRED:**
- CREATE checkpoint: DEPLOY-COMPLETE
- CREATE checkpoint: WORKFLOW-COMPLETE

---

### Stage 7: COMPLETE

**This is the ONLY place to stop** - after DEPLOY is complete!

---

## COMPLETE WORKFLOW FLOW

```
User confirms task
    ↓ [NO STOPS]
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
│ STAGE 5: SECURITY                   │
│ - Audit and fix vulnerabilities     │
└────────────┬────────────────────────┘
             ↓ [NO STOP]
┌─────────────────────────────────────┐
│ STAGE 6: DEPLOY                     │
│ - Deploy to production              │
└────────────┬────────────────────────┘
             ↓ [NO STOP]
┌─────────────────────────────────────┐
│ STAGE 7: COMPLETE                  │
│ - Task finished                    │
└────────────┬────────────────────────┘
             ↓ [STOP HERE]
✅ TASK COMPLETE
```

---

## FORBIDDEN PATTERNS

### ❌ NEVER ASK PERMISSION
```
❌ "Should I continue?"
❌ "Ready for next stage?"
❌ "Should I start X?"
❌ "Should I proceed?"
```

### ❌ NEVER REPORT COMPLETION WITHOUT CONTINUING
```
❌ "Planning complete." [stops]
❌ "Tests passing." [stops]
❌ "All checks passed." [stops]
```

### ❌ NEVER COMBINE STAGES
```
❌ Creating all files in one action
❌ Completing multiple stages in same timestamp
❌ Skipping checkpoints
❌ Going from SECURITY to COMPLETE directly
```

---

## REQUIRED PATTERNS

### ✅ ALWAYS REPORT AND CONTINUE
```
✅ "Planning complete. Starting IMPLEMENTATION..."
✅ "Tests passing. Moving to REVIEW..."
✅ "Review complete. Starting SECURITY..."
✅ "Security complete. Starting DEPLOY..."
```

### ✅ ALWAYS CREATE CHECKPOINTS
```
✅ One checkpoint per stage
✅ Different timestamps for each checkpoint
✅ DEPLOY-COMPLETE checkpoint is MANDATORY
```

### ✅ ALWAYS TRIGGER NEXT AGENT
```
✅ [Complete stage work]
✅ [Create checkpoint]
✅ [Update state files]
✅ [Sync data.js]
✅ OUTPUT: "Stage X complete. Starting Stage Y..."
✅ READ: agents/[NEXT_AGENT].md
✅ [Follow next agent's instructions]
```

---

## AGENT HANDOFF CHECKLIST

**Before completing your stage, verify you have:**

- [ ] Completed ALL work for your stage
- [ ] Updated `session/tasks/task-N/state.json`
- [ ] Appended to `session/tasks/task-N/log.json`
- [ ] Created checkpoint in `session/tasks/task-N/checkpoints.json`
- [ ] Synced to `session/data.js`
- [ ] Identified the NEXT agent to trigger
- [ ] Read the next agent's file

---

## WHEN TO ASK FOR HELP

**Only ask for help when:**
1. Critical error that blocks progress (can't continue without user input)
2. Ambiguous requirements (during requirements phase only)
3. Multiple failures on same task (retry exhausted)
4. User explicitly asked for status update

**Never ask:**
- "Should I continue?"
- "Should I proceed?"

---

## SUCCESS CRITERIA

**Workflow is successful if:**
- All stages completed without stopping
- Each stage has its OWN checkpoint
- Each stage has DIFFERENT timestamp
- DEPLOY stage was NOT skipped
- No "Should I continue?" messages
- Complete execution from task confirmation to task completion
- All logs updated correctly
- Minimum time met (10+ minutes for standard workflow)

---

## COMMON VIOLATIONS

### Violation 1: Skipping DEPLOY Stage

**Symptoms:**
```json
// Checkpoints show:
{"name": "SECURITY-COMPLETE", "stage": "SECURITY"}
{"name": "WORKFLOW-COMPLETE", "stage": "COMPLETE"}
// Missing: DEPLOY-COMPLETE!
```

**Fix:** DEPLOY stage is MANDATORY. Cannot jump from SECURITY to COMPLETE.

### Violation 2: Same Timestamp for Multiple Stages

**Symptoms:**
```json
{"timestamp": "2026-03-09T00:00:23.000Z", "agent": "PLANNER"}
{"timestamp": "2026-03-09T00:00:23.000Z", "agent": "CODER"}
// All same timestamp!
```

**Fix:** Each stage MUST have a different, later timestamp.

### Violation 3: Task Completed in Under 5 Minutes

**Symptoms:**
```
task-1: 00:00:02 → 00:00:17 (15 seconds) ❌
task-2: 00:00:22 → 00:00:23 (1 second) ❌
```

**Fix:** Standard workflow requires minimum 10+ minutes.

### Violation 4: Only One Checkpoint at End

**Symptoms:**
```json
{
  "checkpoints": [
    {"name": "WORKFLOW-COMPLETE", "stage": "COMPLETE"}
  ]
}
// Missing: PLANNING, IMPLEMENTATION, VERIFICATION, etc.
```

**Fix:** Each stage MUST create its own checkpoint.

### Violation 5: Agents Listed But Not Executed

**Symptoms:**
```json
// state.json shows:
"agents": {
  "completed": ["PLANNER", "CODER", "TESTER"]
  // CRITIC, SYNTHESIZER missing!
}
```

**Fix:** Follow exact workflow - PLANNER → CRITIC → SYNTHESIZER → CODER.

### Violation 6: Asking to Start Next Task

**Symptoms:**
```
✅ task-1 complete!

Type "execute" to start task-2 or "status" to see queue details.
```

**Fix:** When a task completes and there are pending tasks, AUTO-START the next task WITHOUT asking:

```
✅ task-1 complete! 🚀 Starting task-2...
[IMMEDIATELY read agents/requirements-gatherer.md for task-2]
```

**Root Cause:** Using a template message instead of checking the queue and auto-starting.

**Required Behavior:**
1. READ session/queue.json
2. IF pending task exists → AUTO-START (no asking)
3. ONLY stop when queue is empty

**Exception (NOT a violation):** Asking "Say 'go baby go' to start" on FIRST task in empty queue

---

## WORKFLOW COMPLETION CHECKLIST

**Before declaring task complete, verify:**

**For Standard Workflow (6 stages):**
- [ ] PLANNING-COMPLETE checkpoint exists
- [ ] IMPLEMENTATION-COMPLETE checkpoint exists
- [ ] VERIFICATION-COMPLETE checkpoint exists
- [ ] REVIEW-COMPLETE checkpoint exists
- [ ] SECURITY-COMPLETE checkpoint exists
- [ ] DEPLOY-COMPLETE checkpoint exists (MANDATORY!)
- [ ] WORKFLOW-COMPLETE checkpoint exists
- [ ] All checkpoints have DIFFERENT timestamps
- [ ] Total time ≥ 10 minutes
- [ ] All agents in "completed" array match workflow

**If ANY checkbox is unchecked, the workflow is INCOMPLETE.**

---

*This protocol ensures the markdown-agent system operates autonomously as designed.*
