---
protocol_version: "1.0.0"
enforcement_level: "MANDATORY"
created: "2026-03-07"
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

**This protocol prevents all of the above.**

---

## Mandatory Activation Sequence

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
│  Add entry to session/log.md:                               │
│  "### [TIMESTAMP] [AGENT_NAME] Agent Activated"             │
│  "**Action**: Starting [STAGE_NAME] stage"                  │
│  "**Status**: ACTIVE"                                       │
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
│  Add entry to session/log.md:                               │
│  "### [TIMESTAMP] [AGENT_NAME] Agent Complete"              │
│  "**Action**: [What was accomplished]"                      │
│  "**Status**: SUCCESS"                                      │
│  "**Files**: [List of files created/modified]"              │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 6: TRIGGER NEXT AGENT (MANDATORY)                     │
│  ─────────────────────────────────────────────────────────  │
│  - Read next agent file IMMEDIATELY                         │
│  - Do NOT ask "Should I continue?"                          │
│  - Do NOT wait for user input                               │
│  - AUTOMATICALLY start next agent                           │
└─────────────────────────────────────────────────────────────┘
```

---

## Stage-to-Agent Mapping

| Stage | Agent File | Must Read | Must Log |
|-------|------------|-----------|----------|
| Activation | `agents/orchestrator.md` | ✅ YES | ✅ YES |
| Requirements | `agents/requirements-gatherer.md` | ✅ YES | ✅ YES |
| Planning | `agents/planner.md` | ✅ YES | ✅ YES |
| Planning | `agents/critic.md` | ✅ YES | ✅ YES |
| Planning | `agents/synthesizer.md` | ✅ YES | ✅ YES |
| Implementation | `agents/coder.md` | ✅ YES | ✅ YES |
| Verification | `agents/tester.md` | ✅ YES | ✅ YES |
| Review | `agents/reviewer.md` | ✅ YES | ✅ YES |
| Quality Check | `agents/quality-*.md` (6 files) | ✅ YES | ✅ YES |
| Refactor | `agents/refactor.md` | ✅ YES | ✅ YES |
| Performance | `agents/performance.md` | ✅ YES | ✅ YES |
| Security | `agents/security.md` | ✅ YES | ✅ YES |
| Deploy | `agents/deploy.md` | ✅ YES | ✅ YES |
| Complete | `agents/changelog.md` | ✅ YES | ✅ YES |

---

## Verification Checklist

After each stage, verify:

```
□ Did I READ the agent file? (Check: file was read using Read tool)
□ Did I LOG the activation? (Check: log.md has entry)
□ Did I ADOPT the agent's personality? (Check: used agent's voice)
□ Did I FOLLOW agent's instructions? (Check: output matches agent format)
□ Did I LOG completion? (Check: log.md has completion entry)
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

### ❌ Violation: Not Logging Activations

```
BAD: log.md only has task start and end entries

GOOD: log.md has entries for EVERY agent activation:
      - ORCHESTRATOR activated
      - REQUIREMENTS_GATHERER activated
      - PLANNER activated
      - CRITIC activated
      - etc.
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
```

### In Each Stage Template

Add at the top:
```
## ⚠️ MANDATORY FIRST STEP

1. READ: agents/[AGENT_NAME].md
2. LOG: "[AGENT_NAME] activated" in session/log.md
3. THEN: Proceed with stage execution
```

### In Each Agent File

Add section:
```
## Activation Verification ⚠️ REQUIRED

Before executing, you MUST:
1. Have READ this file (not simulated)
2. Have LOGGED activation in session/log.md
3. FOLLOW all instructions in this file
4. USE this agent's voice and format
```

---

## Audit Trail

Every execution should produce:

1. **log.md entries** for each agent activation
2. **Agent file reads** in conversation history
3. **Outputs matching** agent-specified formats

---

## Failure Protocol

If you realize you violated this protocol:

1. **STOP** - Don't continue
2. **ACKNOWLEDGE** - "Protocol violation: I did not read [AGENT_NAME].md"
3. **CORRECT** - Read the agent file now
4. **RE-EXECUTE** - Follow the agent's instructions properly
5. **LOG** - Add proper activation and completion entries

---

*This protocol ensures the agent system works as designed - with each agent properly activated and followed.*
