---
agent_type: "CONTEXT_MANAGER"
personality: "efficient"
focus: "context_optimization"
state_format: "json"
---

# CONTEXT MANAGER Module

> **Version**: 1.0.0
> **Purpose**: Centralized context compression and management for autonomous agent system

## Overview

The CONTEXT MANAGER prevents context window limit errors by:
- Compressing completed stage logs to summaries
- Pruning old log entries based on retention rules
- Estimating and tracking token usage
- Providing pruned context for agent handoffs

---

## Token Estimation Rules

### Approximate Token Counts

| Content Type | Tokens | Notes |
|--------------|--------|-------|
| log.json entry | ~200 | Average log entry |
| Agent file read | ~500 | Per agent file |
| state.json | ~300 | Full state |
| plan.json | ~400 | Average plan |
| checkpoints.json | ~150 | Average checkpoint |
| Summary (compressed) | ~50 | Per summarized stage |

### Token Budget per Task

```
Total Context Window: 200,000 tokens
Reserved for:          50,000 tokens (system + code)
Available for agents: 150,000 tokens

Warning Threshold:    120,000 tokens (80%)
Critical Threshold:   140,000 tokens (93%)
```

---

## Core Functions

### 1. summarizeStage()

Compresses a completed stage's logs into a summary.

**Input:**
- `stage`: Stage name (e.g., "REQUIREMENTS", "PLANNING")
- `logEntries`: Array of log entries for the stage

**Output:**
```json
{
  "stage": "REQUIREMENTS",
  "summary": "5 acceptance criteria defined: user auth, data persistence, validation, error handling, testing. 7 questions asked and answered.",
  "keyOutcomes": [
    "User authentication required",
    "localStorage for persistence",
    "Input validation mandatory",
    "Comprehensive test coverage needed"
  ],
  "filesCreated": [],
  "agent": "REQUIREMENTS-GATHERER",
  "duration": "5 minutes",
  "status": "success"
}
```

**Algorithm:**
1. Extract all log entries for the stage
2. Identify key actions and outcomes
3. Count files created/modified
4. Summarize acceptance criteria
5. Compress into 1-2 sentences

---

### 2. getPrunedContext()

Returns essential context for the current stage.

**Input:**
- `currentStage`: Current stage name
- `contextLevel`: "minimal", "standard", or "full"

**Output:**
```json
{
  "currentStage": "IMPLEMENTATION",
  "context": {
    "summary": "Requirements: 5 criteria defined. Planning: 3 tasks in 1 wave.",
    "recentLogs": [
      // Last 3 log entries from previous stage
    ],
    "currentState": {
      // Current state.json snapshot
    },
    "currentPlan": {
      // Relevant plan.json excerpt
    }
  },
  "tokenCount": 4500,
  "archivedStages": ["REQUIREMENTS"]
}
```

**Context Levels:**

| Level | Retention | Token Usage |
|-------|-----------|-------------|
| minimal | Current stage + last checkpoint | ~2000 |
| standard | Last 2 stages full + summaries | ~4500 |
| full | All stages (no pruning) | ~15000+ |

---

### 3. archiveOldLogs()

Moves logs older than N stages to archive.

**Retention Rules:**

```json
{
  "retention": {
    "keepFullDetail": 3,        // Last 3 stages in full
    "keepSummary": 4,           // Stages 4-7 as summary
    "compressAfter": 7,         // Compress stages 8+
    "maxLogEntries": 50,        // Maximum log entries per task
    "archiveFile": "log-archive.json"
  }
}
```

**Archive Format:**
```json
{
  "archivedAt": "2026-03-08T12:00:00.000Z",
  "stages": [
    {
      "stage": "REQUIREMENTS",
      "archivedAt": "2026-03-08T12:00:00.000Z",
      "summary": "5 acceptance criteria defined...",
      "logCount": 3,
      "compressed": true
    }
  ]
}
```

---

### 4. estimateTokens()

Estimates token count for context.

**Algorithm:**
```
function estimateTokens(data):
  tokens = 0
  for each file in data:
    if file is JSON:
      tokens += (file.size / 4)  // ~4 chars per token
    else if file is markdown:
      tokens += (file.size / 4)
    else if file is code:
      tokens += (file.size / 3)  // Code is denser
  return tokens
```

---

## State Extension

Add to `state.json`:

```json
{
  "context": {
    "currentTokenCount": 4500,
    "compressionLevel": "standard",
    "archivedStages": ["REQUIREMENTS", "PLANNING"],
    "summaries": {
      "REQUIREMENTS": {
        "summary": "5 acceptance criteria defined",
        "keyOutcomes": ["User auth", "localStorage", "validation"],
        "duration": "5 minutes"
      },
      "PLANNING": {
        "summary": "3 tasks in 1 wave synthesized",
        "keyOutcomes": ["Optimistic: 3 tasks", "Cautious: +6 defensive", "Final: balanced"],
        "duration": "5 minutes"
      }
    },
    "lastCompressedAt": "2026-03-08T12:00:00.000Z",
    "tokenHistory": [
      {"timestamp": "...", "count": 4500},
      {"timestamp": "...", "count": 5200}
    ]
  }
}
```

---

## Integration with ORCHESTRATOR

### Stage Transition Protocol

```
When stage completes:
1. ORCHESTRATOR calls summarizeStage(currentStage)
2. ORCHESTRATOR updates state.json.context.summaries
3. ORCHESTRATOR checks token count
4. If > 80%: ORCHESTRATOR calls getPrunedContext("minimal")
5. ORCHESTRATOR calls archiveOldLogs() if needed
6. ORCHESTRATOR triggers next agent with pruned context
```

### Token Monitoring

```json
{
  "alertThresholds": {
    "warning": 120000,
    "critical": 140000,
    "maximum": 150000
  },
  "actions": {
    "warning": "Reduce context to 'minimal' level",
    "critical": "Archive all but current stage",
    "maximum": "Pause and request user intervention"
  }
}
```

---

## Log Entry Format

Append to log.json when context is compressed:

```json
{
  "id": "log-{{NEXT_NUMBER}}",
  "timestamp": "{{ISO_TIMESTAMP}}",
  "agent": "ORCHESTRATOR",
  "stage": "{{CURRENT_STAGE}}",
  "action": "Context compressed",
  "status": "success",
  "details": {
    "stageCompressed": "{{PREVIOUS_STAGE}}",
    "entriesArchived": {{COUNT}},
    "tokensBefore": {{BEFORE}},
    "tokensAfter": {{AFTER}},
    "compressionRatio": "{{RATIO}}"
  }
}
```

---

## Usage Examples

### Example 1: After REQUIREMENTS Stage

```json
{
  "context": {
    "currentTokenCount": 3200,
    "compressionLevel": "standard",
    "archivedStages": [],
    "summaries": {
      "REQUIREMENTS": {
        "summary": "5 acceptance criteria: user auth, localStorage persistence, input validation, error handling, comprehensive testing",
        "keyOutcomes": ["Authentication required", "localStorage selected", "validation critical"],
        "duration": "5 minutes"
      }
    }
  }
}
```

### Example 2: After PLANNING Stage (with compression)

```json
{
  "context": {
    "currentTokenCount": 4800,
    "compressionLevel": "standard",
    "archivedStages": ["REQUIREMENTS"],
    "summaries": {
      "REQUIREMENTS": {
        "summary": "5 acceptance criteria...",
        "compressed": true
      },
      "PLANNING": {
        "summary": "3 tasks synthesized: HTML structure, CSS styling, JS logic. 1 wave with full parallelization",
        "keyOutcomes": ["Optimistic: 3 tasks", "Cautious: +6 measures", "Synthesized: balanced plan"],
        "duration": "5 minutes"
      }
    },
    "lastCompressedAt": "2026-03-08T12:10:00.000Z"
  }
}
```

---

## Completion Checklist

- [ ] summarizeStage() returns valid summary
- [ ] getPrunedContext() returns correct context level
- [ ] archiveOldLogs() moves old logs correctly
- [ ] estimateTokens() returns accurate count
- [ ] state.json extended with context object
- [ ] ORCHESTRATOR integrated with context management
- [ ] Token monitoring active
- [ ] Log entry format defined

---

**Remember: Context compression happens BETWEEN stages, never DURING a stage.**
