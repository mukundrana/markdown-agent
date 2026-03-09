---
protocol_version: "1.0.0"
purpose: "Resume workflow when it stops unexpectedly"
critical: "USE THIS WHEN AGENT SYSTEM STOPS"
---

# 🔄 Resume Protocol

## When to Use This Protocol

Use this protocol when:
1. The agent system stopped mid-workflow
2. AI asked "Should I continue?" (violation)
3. Task was interrupted
4. Context was lost and workflow needs to resume
5. User wants to check current progress

---

## 🚨 RESUME COMMANDS

Users can trigger resume with any of these commands:

| Command | Action |
|---------|--------|
| "resume" | Resume from current state |
| "continue" | Resume from current state |
| "check queue" | Show queue state |
| "status" | Show current task progress |
| "resume agents" | Force agent system activation |

---

## 📋 MANDATORY RESUME SEQUENCE

**When user says "resume" or "continue":**

### Step 1: READ SESSION STATE

```
READ: markdown-agent/session/data.js
READ: markdown-agent/session/queue.json
```

### Step 2: IDENTIFY CURRENT STATE

**Check queue.json for:**
- Any task with `status: "in_progress"` → Resume this task
- Any task with `status: "pending"` → These are queued
- All tasks `status: "completed"` → All done

**If in_progress task exists:**
```
READ: session/tasks/task-N/state.json
Find: currentStage.name and currentStage.number
```

### Step 3: RESPOND WITH CURRENT STATE

```
🔄 RESUMING WORKFLOW

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 CURRENT STATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Task: [name]
ID: task-N
Stage: [stage name]
Progress: [X]%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Reading agent file for [STAGE]...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Step 4: READ CURRENT AGENT FILE

```
READ: agents/[AGENT_NAME].md
```

### Step 5: CONTINUE FROM WHERE IT STOPPED

- Read the agent's instructions
- Complete the current stage
- **DO NOT restart the entire workflow**
- **DO NOT ask "Should I continue?"**

---

## 📊 STATUS COMMAND

**When user says "status" or "check queue":**

```
📊 QUEUE STATUS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CURRENT TASK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[IF in_progress task exists]
Task: [name]
ID: task-N
Stage: [stage]
Progress: [X]%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PENDING TASKS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[LIST all pending tasks]
1. task-N - [name] - [priority]
2. task-N+1 - [name] - [priority]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COMPLETED TASKS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[COUNT] tasks completed

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STATISTICS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total: [X] | Pending: [Y] | In Progress: [Z] | Completed: [W]

🚀 Next task will auto-start. Type "resume" if workflow stopped unexpectedly.
```

---

## 🚨 RECOVERY FROM VIOLATION

**If AI asked "Should I continue?" (a violation):**

1. **User says:** "resume" or "continue"
2. **AI responds:**
   ```
   🔄 RESUMING

   [Stage name] was in progress. Continuing...

   [Complete the stage work]
   [Trigger next agent]
   ```
3. **DO NOT:** Ask again, wait for confirmation, or restart

---

## 🎯 STAGE RESUMPTION REFERENCE

| Stage (if stopped here) | Agent File | Continue With |
|-------------------------|------------|---------------|
| REQUIREMENTS | requirements-gatherer.md | Complete questions → PLANNER |
| PLANNING | planner.md | Complete plan → CRITIC |
| CRITIC | critic.md | Complete review → SYNTHESIZER |
| SYNTHESIZER | synthesizer.md | Complete synthesis → CODER |
| IMPLEMENTATION | coder.md | Complete current wave → next wave |
| VERIFICATION | tester.md | Complete tests → REVIEWER |
| REVIEW | reviewer.md | Complete review → QUALITY |
| QUALITY_CHECK | quality-*.md | Complete checks → REFACTOR |
| REFACTOR | refactor.md | Complete refactor → PERFORMANCE |
| PERFORMANCE | performance.md | Complete optimization → SECURITY |
| SECURITY | security.md | Complete security scan → DEPLOY |
| DEPLOY | deploy.md | Complete deploy → Check queue |

---

## ✅ SUCCESSFUL RESUME EXAMPLE

```
User: "resume"

AI: 🔄 RESUMING WORKFLOW

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 CURRENT STATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Task: Build login page
ID: task-2
Stage: IMPLEMENTATION
Progress: 45%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Reading agent file for IMPLEMENTATION...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[READ agents/coder.md]
[Continue from wave 2]
[Complete remaining waves]
[Trigger TESTER agent]
```

---

## ⚠️ COMMON RESUME PITFALLS

❌ **WRONG:**
```
User: "resume"
AI: "Should I continue from the IMPLEMENTATION stage?"
```

✅ **RIGHT:**
```
User: "resume"
AI: "🔄 RESUMING WORKFLOW
     Task: Build login page (task-2)
     Stage: IMPLEMENTATION (45%)
     Reading CODER agent...
     Continuing from Wave 2..."
```

---

**Remember: Resume means continue, not restart.**
