# Context Management System

> **Version**: 1.0.0
> **Purpose**: Prevent context window limit errors through intelligent compression

## Overview

The Context Management System prevents the autonomous agent system from hitting context window limits by:
- Compressing completed stage logs to summaries
- Pruning old log entries based on retention rules
- Estimating and tracking token usage
- Providing pruned context for agent handoffs

---

## Problem Statement

Without context management:
- `log.json` files grow indefinitely (~200 tokens per entry)
- 18+ entries per task × 10 stages = 36,000+ tokens
- Full agent file re-reads (~20 agents × 500 tokens = 10,000 tokens)
- Total: ~46,000+ tokens for logs alone
- Context window limit errors occur after ~3-4 stages

---

## Solution

### Token Budget

```
Total Context Window:  200,000 tokens
Reserved for System:    50,000 tokens
Available for Agents:  150,000 tokens

Warning Threshold:     120,000 tokens (80%)
Critical Threshold:    140,000 tokens (93%)
```

### Retention Rules

| Stage Age | Retention | Est. Tokens |
|-----------|-----------|-------------|
| Last 3 stages | Full detail | 6,000 |
| Stages 4-7 | Summary only | 200 |
| Stages 8+ | Compressed | 50 |

**Per-entry token estimates:**
- Full log entry: ~200 tokens
- Summary: ~50 tokens
- Compressed: ~20 tokens

---

## Context Compression Functions

### summarizeStage()

Compresses a completed stage's logs into a summary.

**Example Output:**
```json
{
  "stage": "REQUIREMENTS",
  "summary": "5 acceptance criteria defined: user auth, data persistence, validation, error handling, testing.",
  "keyOutcomes": [
    "User authentication required",
    "localStorage for persistence",
    "Input validation mandatory"
  ],
  "filesCreated": [],
  "duration": "5 minutes",
  "status": "success"
}
```

### getPrunedContext()

Returns essential context for the current stage.

**Context Levels:**

| Level | Description | Tokens |
|-------|-------------|--------|
| minimal | Current stage + last checkpoint | ~2,000 |
| standard | Last 2 stages full + summaries | ~4,500 |
| full | All stages (no pruning) | ~15,000+ |

### archiveOldLogs()

Moves logs older than N stages to archive.

```json
{
  "archivedAt": "2026-03-08T12:00:00.000Z",
  "stages": [
    {
      "stage": "REQUIREMENTS",
      "summary": "5 acceptance criteria defined...",
      "compressed": true
    }
  ]
}
```

---

## State Extension

Add to `state.json`:

```json
{
  "context": {
    "tokenCount": 4500,
    "compressionLevel": "standard",
    "archivedStages": ["REQUIREMENTS"],
    "summaries": {
      "REQUIREMENTS": {
        "summary": "5 acceptance criteria defined",
        "keyOutcomes": ["User auth", "localStorage"],
        "duration": "5 minutes"
      }
    },
    "lastCompressedAt": "2026-03-08T12:00:00.000Z"
  }
}
```

---

## ORCHESTRATOR Integration

### Stage Transition Protocol

```
After stage completes:
1. CALL summarizeStage(currentStage)
2. UPDATE state.json.context.summaries
3. CHECK tokenCount vs thresholds
4. IF > 80%: Reduce to "minimal" level
5. IF > 93%: Archive all but current stage
6. IF > 97%: PAUSE and alert user
7. CONTINUE to next agent
```

### Monitoring

```json
{
  "alertThresholds": {
    "warning": 120000,
    "critical": 140000,
    "maximum": 150000
  }
}
```

---

## Usage Example

### Before Context Management

```
Stage 1: 18 log entries × 200 tokens = 3,600 tokens
Stage 2: 18 log entries × 200 tokens = 3,600 tokens
Stage 3: 18 log entries × 200 tokens = 3,600 tokens
...
Stage 10: 18 log entries × 200 tokens = 3,600 tokens
Total logs: 36,000 tokens
Plus agents: 10,000 tokens
Total: 46,000 tokens
```

### After Context Management

```
Stage 10 (current): Full detail = 3,600 tokens
Stage 9: Full detail = 3,600 tokens
Stage 8: Summary = 50 tokens
Stage 7: Summary = 50 tokens
Stage 6: Summary = 50 tokens
Stage 5: Compressed = 20 tokens
Stage 4: Compressed = 20 tokens
Stage 3: Compressed = 20 tokens
Stage 2: Compressed = 20 tokens
Stage 1: Compressed = 20 tokens
Total logs: 7,450 tokens
Plus agents: 10,000 tokens
Total: 17,450 tokens
Reduction: 62% fewer tokens
```

---

## Best Practices

1. **Compress Between Stages**: Always compress after a stage completes, never during
2. **Monitor Token Count**: Check token count after every stage transition
3. **Use Standard Level**: Use "standard" compression level for most tasks
4. **Archive Early**: Archive when approaching 80% capacity, not after hitting limit
5. **Keep Key Outcomes**: Always preserve key outcomes in summaries

---

## Configuration

See `templates/json/context-logs.template.json` for full configuration options.

```json
{
  "retention": {
    "keepFullDetail": 3,
    "keepSummary": 4,
    "compressAfter": 7,
    "maxLogEntries": 50
  },
  "compression": {
    "enabled": true,
    "triggerThreshold": 80,
    "compressionLevel": "standard"
  }
}
```

---

**Version**: 1.0.0
**Last Updated**: 2026-03-08
