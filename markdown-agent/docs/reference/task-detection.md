---
task_detection_version: "1.0.0"
---

# 🧠 Task Detection Logic

This document explains how the agent intelligently classifies messages as tasks or conversation.

---

## Detection Algorithm

### Step 1: Message Analysis

When a message is received, analyze:

1. **First word** - Is it a question word?
2. **Sentence structure** - Is it a command or question?
3. **Keywords** - Does it contain task/conversation indicators?
4. **Context** - What was the previous message?

### Step 2: Classification

Score the message on two scales:

**Task Score (0-100)**
- Action verb present: +30
- Feature/component word: +25
- Bug/error word: +20
- Implementation context: +15
- Clear deliverable: +10

**Conversation Score (0-100)**
- Question word at start: +40
- "can/could/would/would/should": +30
- Status check word: +25
- Explanation request: +20
- Uncertainty indicator: +15

### Step 3: Decision

```
IF Task Score >= 60 AND Task Score > Conversation Score + 20:
    → CLASSIFY AS TASK
    → Ask for confirmation

ELSE IF Conversation Score >= 60 AND Conversation Score > Task Score + 20:
    → CLASSIFY AS CONVERSATION
    → Respond normally

ELSE:
    → AMBIGUOUS
    → Ask for clarification
```

---

## Task Indicators

### Action Verbs (+30 each)
```
add, create, build, make, implement, develop
fix, resolve, debug, solve, repair
update, change, modify, refactor, improve
remove, delete, deprecate, eliminate
deploy, release, publish, ship
test, verify, validate, check
```

### Feature/Component Words (+25 each)
```
authentication, login, signup, logout, user
profile, settings, dashboard
API, endpoint, route, controller, service
database, model, schema, migration, query
UI, component, page, view, screen
form, input, button, modal, dialog
feature, functionality, system, module
```

### Bug Words (+20 each)
```
bug, error, issue, problem, broken
not working, doesn't work, failing, crash
fix, repair, resolve, solve
```

### Implementation Context (+15)
```
need to, should, have to
for the [component], in the [module]
new [thing], [feature] for [purpose]
```

### Clear Deliverable (+10)
```
that [does X], with [Y]
including [A], [B], [C]
```

---

## Conversation Indicators

### Question Words (+40 if first word)
```
what, how, why, when, where, who, which
can, could, would, should, is, does, will
```

### Modifiers (+30 each)
```
can you, could you, would you, should you
is it possible, is there a way
```

### Status Check Words (+25 each)
```
status, progress, queue, report
what's up, how's it going, what's happening
```

### Explanation Requests (+20 each)
```
explain, describe, show me, tell me
help me understand, clarify
how does, what is, why is
```

### Uncertainty Indicators (+15)
```
maybe, possibly, might be
not sure, wondering, thinking about
```

---

## Examples

### Example 1: Clear Task
```
Message: "add user authentication"

Analysis:
- "add" (action verb): +30
- "user authentication" (feature): +25
- Clear deliverable: +10
- Task Score: 65

Result: CLASSIFY AS TASK
Response: "Should I add this to the task queue?"
```

### Example 2: Clear Conversation
```
Message: "how does authentication work?"

Analysis:
- "how" (question word first): +40
- "does" (question word): +40
- Explanation request: +20
- Conversation Score: 100

Result: CLASSIFY AS CONVERSATION
Response: [Explains authentication]
```

### Example 3: Ambiguous
```
Message: "authentication"

Analysis:
- No action verb: 0
- Single feature word: +25
- Task Score: 25

No conversation indicators: 0

Result: AMBIGUOUS
Response: "Did you mean 'add authentication' (task) or
          'how does authentication work' (conversation)?"
```

### Example 4: Task with Question
```
Message: "can you add user authentication?"

Analysis:
- "can you" (conversation modifier): +30
- "add" (action verb): +30
- "user authentication" (feature): +25
- Task Score: 55
- Conversation Score: 30

Result: Task Score (55) > Conversation Score (30) + 20
Response: "Should I add this to the task queue?"
```

---

## Special Cases

### "No" as Response
```
Context: Agent asked "Should I add this to the task queue?"
Message: "no"

Classification: CONVERSATION (response to question)
Action: Cancel the pending task
```

### "Yes" as Response
```
Context: Agent asked "Should I add this to the task queue?"
Message: "yes"

Classification: CONVERSATION (response to question)
Action: Add the task to queue
```

### "Details" as Response
```
Context: Agent asked "Should I add this to the task queue?"
Message: "details"

Classification: CONVERSATION (request for information)
Action: Show implementation plan
```

### Multi-Sentence Messages
```
Message: "Hey, how's it going? Also, can you add a login form?"

Analysis: Two parts detected
Part 1: "Hey, how's it going?" → Conversation
Part 2: "can you add a login form?" → Task

Response: Handle both
  - Respond to greeting
  - Ask about task confirmation
```

---

## Context-Aware Detection

### Previous Message Context

If previous message was about a task:
```
Previous: "add user authentication"
Current:  "with OAuth support"

Classification: PART OF PREVIOUS TASK
Action: Update task-1 description to include OAuth
```

If previous message was conversational:
```
Previous: "how does authentication work?"
Current:  "what about tokens?"

Classification: CONVERSATION (continuation)
Action: Continue explaining
```

---

## Fallback Rules

When uncertain:

1. **If contains "please"** → Likely polite request, classify as task potential
2. **If contains "thanks/thank you"** → Likely conversation response
3. **If starts with "and"/ "also"** → Check context
4. **If very short (< 5 words)** → Ask for clarification

---

## Force Commands

These bypass detection entirely:

```
"add task: [description]"  → Force add as task
"chat: [message]"          → Force treat as conversation
"status"                   → Show status (special command)
"queue"                    → Show queue (special command)
```

---

## Detection Accuracy Improvement

The system learns from patterns:

### Pattern 1: User's Style
If user frequently says "add X" for tasks, the system becomes more confident.

### Pattern 2: Project Context
In technical discussions, single words like "auth" might mean task.
In general chat, same word means conversation.

### Pattern 3: Time of Day
Early in session: More conversational (learning phase)
Later in session: More task-focused (execution phase)

---

## Testing Detection

To test if your message will be detected as a task:

```
You: "test detection: [your message]"

Agent: Will analyze [your message] and tell you:
  - How it classified it
  - Task score: X
  - Conversation score: Y
  - Why it made that decision
```

---

## Summary

- **Clear tasks** → Ask for confirmation
- **Clear conversation** → Respond normally
- **Ambiguous** → Ask for clarification
- **Force commands** → Bypass detection

The system is **conservative** - when in doubt, it asks rather than assumes.

---

*This detection logic runs on every message to provide intelligent, context-aware classification.*
