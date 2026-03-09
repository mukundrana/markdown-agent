---
protocol_version: "2.0.0"
enforcement_level: "MANDATORY"
created: "2026-03-07"
updated: "2026-03-09"
purpose: "Ensure all agents are properly activated during workflow execution"
---

# 🔄 Agent Activation Protocol

## ⚠️ CRITICAL: This Protocol is MANDATORY

**This document enforces proper agent activation throughout the workflow.**

---

## The Problem This Solves

During workflow execution, AI models tend to:
- Skip reading agent files and simulate agent behavior
- Shortcut stages by doing work directly
- Miss logging agent activations
- Not follow agent-specific instructions
- Skip checkpoints or create them all at once
- Complete stages unrealistically fast
- Skip DEPLOY stage

**This protocol prevents all of the above.**

---

## MANDATORY RULES

### RULE: CHECKPOINT AFTER EVERY STAGE

**When an agent completes their stage, they MUST:**

1. ✅ CREATE checkpoint in `checkpoints.json`
2. ✅ APPEND completion log entry to `log.json`
3. ✅ UPDATE `state.json` with next stage
4. ✅ Use DIFFERENT timestamp than previous stage
5. ✅ READ next agent file
6. ✅ TRIGGER next agent

**❌ FORBIDDEN:**
- Saying "Stage complete" without creating checkpoint
- Creating all checkpoints at the end
- Using same timestamp for multiple stages

### RULE: MINIMUM TIME PER STAGE

**Each stage MUST take minimum time:**

| Stage | Min Time | What Happens During This Time |
|-------|----------|-------------------------------|
| PLANNING | 2+ min | Read requirements, create plan, review, synthesize |
| IMPLEMENTATION | 3+ min | Create/modify files properly |
| VERIFICATION | 1+ min | Write and run tests |
| REVIEW | 1+ min | Review code quality |
| SECURITY | 1+ min | Scan for vulnerabilities |
| DEPLOY | 1+ min | Pre-deployment checks, deployment |

**If you complete a stage in 0 seconds, YOU SHORTCUT.**

---

## MANDATORY ACTIVATION SEQUENCE

### Before ANY Stage Execution

```
┌─────────────────────────────────────────────────────────────┐
│  STEP 1: READ AGENT FILE (MANDATORY)                        │
│  ─────────────────────────────────────────────────────────  │
│  You MUST read the agent file for the current stage:        │
│  - Read: agents/[AGENT_NAME].md                             │
│  - This is NOT optional                                     │
│  - Skipping this = Protocol violation                       │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 2: LOG ACTIVATION (MANDATORY)                         │
│  ─────────────────────────────────────────────────────────  │
│  Add entry to session/tasks/task-N/log.md:                   │
│  {                                                         │
│    "id": "log-{{NEXT_NUMBER}}",                             │
│    "timestamp": "{{ISO_TIMESTAMP}}",                        │
│    "agent": "[AGENT_NAME]",                                   │
│    "stage": "[STAGE_NAME]",                                 │
│    "action": "[STAGE] started",                              │
│    "status": "in_progress"                                  │
│  }                                                         │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 3: ADOPT AGENT PERSONALITY (MANDATORY)                │
│  ─────────────────────────────────────────────────────────  │
│  - Use agent's voice and style                              │
│  - Follow agent's specific instructions                     │
│  - Apply agent's perspective (optimistic/cautious/balanced) │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 4: EXECUTE AGENT'S TASKS                              │
│  ─────────────────────────────────────────────────────────  │
│  - Follow the agent's process step by step                  │
│  - Create outputs as specified by agent                     │
│  - Use agent's output format                                │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 5: LOG COMPLETION (MANDATORY)                         │
│  ─────────────────────────────────────────────────────────  │
│  Add entry to session/tasks/task-N/log.md:                   │
│  {                                                         │
│    "id": "log-{{NEXT_NUMBER}}",                             │
│    "timestamp": "{{ISO_TIMESTAMP}}",                        │
│    "agent": "[AGENT_NAME]",                                   │
│    "stage": "[STAGE_NAME]",                                 │
│    "action": "[STAGE] complete",                             │
│    "status": "success",                                     │
│    "nextAgent": "[NEXT_AGENT_NAME]"                         │
│  }                                                         │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 6: CREATE CHECKPOINT (MANDATORY)                       │
│  ─────────────────────────────────────────────────────────  │
│  Add entry to session/tasks/task-N/checkpoints.md:           │
│  {                                                         │
│    "id": "cp-{{NEXT_NUMBER}}",                             │
│    "name": "[STAGE]-COMPLETE",                               │
│    "stage": "[STAGE_NAME]",                                 │
│    "stageNumber": {{STAGE_NUMBER}},                          │
│    "timestamp": "{{ISO_TIMESTAMP}}"                          │
│  }                                                         │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 7: TRIGGER NEXT AGENT (MANDATORY)                     │
│  ─────────────────────────────────────────────────────────  │
│  - Read next agent file IMMEDIATELY                         │
│  - Do NOT ask "Should I continue?"                          │
│  - Do NOT wait for user input                               │
│  - AUTOMATICALLY start next agent                           │
└─────────────────────────────────────────────────────────────┘
```

---

## Stage-to-Agent Mapping

| Stage | Agent File | Must Read | Must Log | Must Create Checkpoint |
|-------|------------|-----------|----------|---------------------|
| Activation | `agents/orchestrator.md` | ✅ YES | ✅ YES | ✅ YES |
| Requirements | `agents/requirements-gatherer.md` | ✅ YES | ✅ YES | ✅ YES |
| Planning | `agents/planner.md` | ✅ YES | ✅ YES | ✅ YES |
| Planning | `agents/critic.md` | ✅ YES | ✅ YES | - |
| Planning | `agents/synthesizer.md` | ✅ YES | ✅ YES | - |
| Planning Complete | - | - | - | ✅ YES (PLANNING-COMPLETE) |
| Implementation | `agents/coder.md` | ✅ YES | ✅ YES | ✅ YES |
| Implementation Complete | - | - | - | ✅ YES (IMPLEMENTATION-COMPLETE) |
| Verification | `agents/tester.md` | ✅ YES | ✅ YES | ✅ YES |
| Verification Complete | - | - | - | ✅ YES (VERIFICATION-COMPLETE) |
| Review | `agents/reviewer.md` | ✅ YES | ✅ YES | ✅ YES |
| Review Complete | - | - | - | ✅ YES (REVIEW-COMPLETE) |
| Security | `agents/security.md` | ✅ YES | ✅ YES | ✅ YES |
| Security Complete | - | - | - | ✅ YES (SECURITY-COMPLETE) |
| Deploy | `agents/deploy.md` | ✅ YES | ✅ YES | ✅ YES |
| Deploy Complete | - | - | - | ✅ YES (DEPLOY-COMPLETE) |
| Complete | - | - | - | ✅ YES (WORKFLOW-COMPLETE) |

---

## Verification Checklist

After each stage, verify:

```
□ Did I READ the agent file? (Check: file was read using Read tool)
□ Did I LOG the activation? (Check: log.md has entry)
□ Did I ADOPT the agent's personality? (Check: used agent's voice)
□ Did I FOLLOW agent's instructions? (Check: output matches agent format)
□ Did I LOG completion? (Check: log.md has completion entry)
□ Did I CREATE checkpoint? (Check: checkpoints.md has entry)
□ Did I TRIGGER next agent? (Check: read next agent file)
```

If ANY checkbox is unchecked, the protocol was violated.

---

## Common Violations

### ❌ Violation: Simulating Without Reading

```
BAD: "I'll act as the CODER agent now and implement..."
     (Never read agents/coder.md)

GOOD: [Read agents/coder.md]
      "💻 CODER Agent Activated"
      [Follow CODER's specific instructions]
```

### ❌ Violation: Skipping Agent-Specific Behavior

```
BAD: Running quality checks without reading QUALITY_*.md files

GOOD: [Read agents/quality-type-safety.md]
      [Execute TYPE_SAFETY's specific checks]
      [Read agents/quality-validation.md]
      [Execute VALIDATION's specific checks]
      ... (repeat for all 6 checkers)
```

### ❌ Violation: Not Creating Checkpoints

```
BAD: log.md only has task start and end entries

GOOD: log.md has entries for EVERY agent activation:
      - PLANNING activated
      - CRITIC activated
      - SYNTHESIZER activated
      - etc.

AND checkpoints.md has entry for EACH stage:
      - PLANNING-COMPLETE
      - IMPLEMENTATION-COMPLETE
      - VERIFICATION-COMPLETE
      - etc.
```

### ❌ Violation: Same Timestamp for Stages

```
BAD: log-1: "2026-03-09T13:26:00.000Z" (PLANNER)
     log-2: "2026-03-09T13:26:00.000Z" (CODER)
     log-3: "2026-03-09T13:26:00.000Z" (TESTER)

GOOD: log-1: "2026-03-09T13:26:00.000Z" (PLANNER)
     log-2: "2026-03-09T13:26:30.000Z" (CRITIC)
     log-3: "2026-03-09T13:27:00.000Z" (SYNTHESIZER)
     log-4: "2026-03-09T13:27:45.000Z" (CODER)
```

---

## Enforcement Mechanism

### In root.md

Add to activation sequence:
```
⚠️ MANDATORY: Before ANY stage, you MUST:
1. Read the agent file for that stage
2. Log activation to session/log.md
3. Follow agent's instructions exactly
4. CREATE checkpoint after stage completes
```

### In Each Stage Template

Add at the top:
```
## ⚠️ MANDATORY FIRST STEP

1. READ: agents/[AGENT_NAME].md
2. LOG: "[AGENT_NAME] activated" in session/log.md
3. THEN: Proceed with stage execution
4. AFTER COMPLETION: CREATE checkpoint in checkpoints.md
```

### In Each Agent File

Add section:
```
## Completion Verification

Before executing, you MUST:
1. Have READ this file (not simulated)
2. Have LOGGED activation in session/log.md
3. FOLLOW all instructions in this file
4. USE this agent's voice and format
5. CREATE checkpoint when complete
```

---

## Audit Trail

Every execution should produce:

1. **log.json entries** for each agent activation
2. **checkpoints.json entries** for each stage completion
3. **Agent file reads** in conversation history
4. **Outputs matching** agent-specified formats
5. **Different timestamps** for each stage

---

## Failure Protocol

If you realize you violated this protocol:

1. **STOP** - Don't continue
2. **ACKNOWLEDGE** - "Protocol violation: I did not read [AGENT_NAME].md"
3. **CORRECT** - Read the agent file now
4. **RE-EXECUTE** - Follow the agent's instructions properly
5. **LOG** - Add proper activation and completion entries
6. **CREATE CHECKPOINT** - Add missing checkpoint

---

*This protocol ensures the agent system works as designed - with each agent properly activated and followed.*
