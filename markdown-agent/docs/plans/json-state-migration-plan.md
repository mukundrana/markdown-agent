# JSON State Management Migration Plan

> **Created**: 2026-03-07
> **Status**: PLANNING COMPLETE
> **Priority**: Critical Infrastructure

---

## Overview

Migrate from markdown-based state files to structured JSON files for better:
- Programmatic access and updates
- Data integrity and validation
- Per-task isolation
- Real-time dashboard updates

---

## Current State (Problem)

```
session/
├── state.md           (markdown, unstructured)
├── log.md             (markdown, append-only)
├── checkpoints.md     (markdown, unstructured)
├── task-queue.md      (markdown, unstructured)
├── context.md         (markdown, unstructured)
└── visualizer.html    (JSON embedded in HTML - FRAGILE)
```

**Issues**:
- No schema validation
- Hard to parse programmatically
- All tasks share same files (collision risk)
- JSON inside HTML is fragile
- No atomic operations

---

## Proposed State (Solution)

```
session/
├── tasks/                          # Per-task data
│   ├── task-1/
│   │   ├── state.json          # Task state
│   │   ├── log.json             # Task log entries
│   │   ├── plan.json           # Execution plan
│   │   ├── reports/            # Generated reports
│   │   │   ├── test-report.json
│   │   │   ├── quality-report.json
│   │   │   ├── security-report.json
│   │   │   └── performance-report.json
│   │   └── checkpoints.json      # Task checkpoints
│   ├── task-2/
│   │   └── ...
│   └── ...
├── queue.json                      # Global task queue
├── config.json                      # Session configuration
└── visualizer.html                  # Fetches from JSON files
```

---

## File Specifications

### 1. Task State (`tasks/task-N/state.json`)

```json
{
  "taskId": "task-1",
  "name": "Add user authentication",
  "status": "in_progress",
  "complexity": "moderate",
  "workflow": "standard",
  "currentStage": {
    "name": "IMPLEMENTATION",
    "number": 3,
    "progress": 35
  },
  "currentWave": 1,
  "totalWaves": 3,
  "createdAt": "2026-03-07T10:30:00Z",
  "updatedAt": "2026-03-07T10:45:00Z",
  "startedAt": "2026-03-07T10:31:00Z",
  "estimatedCompletion": "2026-03-07T12:00:00Z",
  "agents": {
    "completed": ["REQUIREMENTS-GATHERER", "PLANNER", "CRITIC", "SYNTHESIZER"],
    "current": "CODER",
    "pending": ["TESTER", "REVIEWER", "QUALITY", "SECURITY", "DEPLOY"]
  },
  "metrics": {
    "filesCreated": 2,
    "filesModified": 3,
    "testsWritten": 4,
    "testsPassing": 3,
    "testsFailing": 0
  }
}
```

### 2. Task Log (`tasks/task-N/log.json`)

```json
{
  "taskId": "task-1",
  "entries": [
    {
      "id": "log-001",
      "timestamp": "2026-03-07T10:30:00Z",
      "agent": "ORCHESTRATOR",
      "stage": "INIT",
      "action": "Task created and queued",
      "status": "success",
      "details": {
        "complexity": "moderate",
        "workflow": "standard"
      }
    },
    {
      "id": "log-002",
      "timestamp": "2026-03-07T10:31:00Z",
      "agent": "REQUIREMENTS-GATHERER",
      "stage": "REQUIREMENTS",
      "action": "Gathered requirements",
      "status": "success",
      "details": {
        "questionsAsked": 3,
        "answersReceived": 3
      }
    },
    {
      "id": "log-003",
      "timestamp": "2026-03-07T10:35:00Z",
      "agent": "PLANNER",
      "stage": "PLANNING",
      "action": "Created optimistic plan",
      "status": "success",
      "details": {
        "tasksPlanned": 5,
        "wavesPlanned": 3,
        "outputFile": "plan.json"
      }
    }
  ]
}
```

### 3. Task Plan (`tasks/task-N/plan.json`)

```json
{
  "taskId": "task-1",
  "version": "1.0.0",
  "createdAt": "2026-03-07T10:35:00Z",
  "synthesizedAt": "2026-03-07T10:40:00Z",
  "perspectives": {
    "optimistic": {
      "agent": "PLANNER",
      "estimatedTime": "2 hours",
      "parallelizable": true,
      "riskLevel": "low"
    },
    "cautious": {
      "agent": "CRITIC",
      "estimatedTime": "4 hours",
      "parallelizable": false,
      "riskLevel": "medium",
      "concerns": ["Error handling needed", "Edge cases missed"]
    }
  },
  "final": {
    "agent": "SYNTHESIZER",
    "estimatedTime": "3 hours",
    "approach": "balanced"
  },
  "waves": [
    {
      "wave": 0,
      "name": "Setup",
      "tasks": [
        {
          "id": "t1",
          "description": "Create user model",
          "file": "models/user.py",
          "status": "completed",
          "completedAt": "2026-03-07T10:42:00Z"
        }
      ]
    },
    {
      "wave": 1,
      "name": "Core Implementation",
      "tasks": [
        {
          "id": "t2",
          "description": "Implement authentication logic",
          "file": "auth/login.py",
          "status": "in_progress",
          "dependencies": ["t1"]
        }
      ]
    }
  ]
}
```

### 4. Task Checkpoints (`tasks/task-N/checkpoints.json`)

```json
{
  "taskId": "task-1",
  "checkpoints": [
    {
      "id": "cp-001",
      "name": "REQUIREMENTS-COMPLETE",
      "timestamp": "2026-03-07T10:31:00Z",
      "stage": "REQUIREMENTS",
      "stageNumber": 1,
      "filesModified": ["tasks/task-1/state.json", "tasks/task-1/log.json"],
      "resumeInstruction": "Read agents/planner.md"
    },
    {
      "id": "cp-002",
      "name": "PLANNING-COMPLETE",
      "timestamp": "2026-03-07T10:40:00Z",
      "stage": "PLANNING",
      "stageNumber": 2,
      "filesModified": ["tasks/task-1/plan.json"],
      "resumeInstruction": "Read agents/coder.md"
    }
  ]
}
```

### 5. Task Reports (`tasks/task-N/reports/`)

#### Test Report (`reports/test-report.json`)
```json
{
  "taskId": "task-1",
  "generatedAt": "2026-03-07T11:00:00Z",
  "agent": "TESTER",
  "summary": {
    "total": 10,
    "passed": 9,
    "failed": 1,
    "skipped": 0
  },
  "tests": [
    {
      "id": "test-001",
      "name": "User can login with valid credentials",
      "status": "passed",
      "duration": "0.5s"
    },
    {
      "id": "test-002",
      "name": "User cannot login with invalid credentials",
      "status": "passed",
      "duration": "0.3s"
    }
  ],
  "verdict": "pass_with_issues",
  "blockingIssues": ["Test test-005: Session timeout not handled"]
}
```

#### Quality Report (`reports/quality-report.json`)
```json
{
  "taskId": "task-1",
  "generatedAt": "2026-03-07T11:15:00Z",
  "agent": "QUALITY",
  "scores": {
    "typeSafety": 8,
    "validation": 9,
    "errorHandling": 7,
    "apiConsistency": 8,
    "database": 9,
    "fileSize": 10
  },
  "overallScore": 8.5,
  "verdict": "pass",
  "issues": [
    {
      "severity": "minor",
      "type": "error_handling",
      "file": "auth/login.py",
      "line": 45,
      "description": "Missing error handling for network timeout",
      "suggestion": "Add try/catch around fetch call"
    }
  ]
}
```

#### Security Report (`reports/security-report.json`)
```json
{
  "taskId": "task-1",
  "generatedAt": "2026-03-07T11:30:00Z",
  "agent": "SECURITY",
  "vulnerabilities": [],
  "checks": {
    "sqlInjection": "pass",
    "xss": "pass",
    "csrf": "pass",
    "authentication": "pass",
    "authorization": "pass",
    "secrets": "pass"
  },
  "score": 95,
  "verdict": "secure"
}
```

### 6. Global Queue (`session/queue.json`)

```json
{
  "version": "1.0.0",
  "updatedAt": "2026-03-07T10:45:00Z",
  "tasks": [
    {
      "id": "task-1",
      "name": "Add user authentication",
      "status": "in_progress",
      "priority": "high",
      "createdAt": "2026-03-07T10:30:00Z"
    },
    {
      "id": "task-2",
      "name": "Add password reset",
      "status": "pending",
      "priority": "medium",
      "createdAt": "2026-03-07T11:00:00Z"
    }
  ],
  "statistics": {
    "total": 2,
    "pending": 1,
    "inProgress": 1,
    "completed": 0,
    "failed": 0
  }
}
```

### 7. Session Config (`session/config.json`)

```json
{
  "version": "3.1.0",
  "sessionStarted": "2026-03-07T10:30:00Z",
  "project": {
    "name": "my-project",
    "type": "web-application",
    "language": "typescript"
  },
  "settings": {
    "maxParallelWaves": 3,
    "retryAttempts": 3,
    "defaultWorkflow": "standard"
  },
  "workflows": {
    "quick": ["IMPLEMENTATION", "VERIFICATION"],
    "standard": ["PLANNING", "IMPLEMENTATION", "VERIFICATION", "REVIEW", "SECURITY", "DEPLOY"],
    "full": ["REQUIREMENTS", "PLANNING", "IMPLEMENTATION", "VERIFICATION", "REVIEW", "QUALITY_CHECK", "REFACTOR", "PERFORMANCE", "SECURITY", "DEPLOY"]
  }
}
```

---

## Agent Update Patterns

### Adding Log Entry

**Before** (markdown):
```markdown
## 2026-03-07T10:30:00 - CODER Wave 1 Complete

**Agent**: CODER
**Action**: Implemented authentication
...
```

**After** (JSON):
```json
// Read tasks/task-1/log.json
// Append entry:
{
  "id": "log-004",
  "timestamp": "2026-03-07T10:45:00Z",
  "agent": "CODER",
  "stage": "IMPLEMENTATION",
  "action": "Wave 1 complete",
  "status": "success",
  "details": {
    "tasksCompleted": ["t2"],
    "filesCreated": ["auth/login.py"],
    "filesModified": ["models/user.py"],
    "nextWave": 2
  }
}
// Write back to tasks/task-1/log.json
```

### Updating State

**Before** (markdown):
```markdown
**Current Stage**: IMPLEMENTATION
**Current Wave**: 1
```

**After** (JSON):
```json
// Read tasks/task-1/state.json
// Update:
{
  "currentStage": {
    "name": "IMPLEMENTATION",
    "number": 3,
    "progress": 45
  },
  "currentWave": 2,
  "updatedAt": "2026-03-07T10:45:00Z",
  "agents": {
    "completed": ["REQUIREMENTS-GATHERER", "PLANNER", "CRITIC", "SYNTHESIZER"],
    "current": "CODER",
    "pending": ["TESTER", "REVIEWER", "QUALITY", "SECURITY", "DEPLOY"]
  }
}
// Write back to tasks/task-1/state.json
```

### Adding Checkpoint

**After** (JSON):
```json
// Read tasks/task-1/checkpoints.json
// Append:
{
  "id": "cp-003",
  "name": "IMPLEMENTATION-WAVE-1-COMPLETE",
  "timestamp": "2026-03-07T10:45:00Z",
  "stage": "IMPLEMENTATION",
  "stageNumber": 3,
  "waveNumber": 1,
  "filesModified": ["auth/login.py", "models/user.py"],
  "resumeInstruction": "Continue with Wave 2"
}
// Write back to tasks/task-1/checkpoints.json
```

---

## Visualizer Architecture

### New `visualizer.html` Structure

```html
<!DOCTYPE html>
<html>
<head>
  <title>Agent System Dashboard</title>
  <style>
    /* Styles here */
  </style>
</head>
<body>
  <div id="dashboard">
    <!-- Dashboard UI -->
  </div>

  <script>
    // Configuration
    const SESSION_PATH = 'session/';
    const TASKS_PATH = 'session/tasks/';

    // Load session data
    async function loadSessionData() {
      const queue = await fetchJSON(`${SESSION_PATH}queue.json`);
      const config = await fetchJSON(`${SESSION_PATH}config.json`);
      return { queue, config };
    }

    // Load task data
    async function loadTaskData(taskId) {
      const taskPath = `${TASKS_PATH}${taskId}/`;
      const [state, log, checkpoints] = await Promise.all([
        fetchJSON(`${taskPath}state.json`),
        fetchJSON(`${taskPath}log.json`),
        fetchJSON(`${taskPath}checkpoints.json`)
      ]);
      return { state, log, checkpoints };
    }

    // Fetch helper
    async function fetchJSON(path) {
      try {
        const response = await fetch(path);
        return await response.json();
      } catch (error) {
        console.error(`Failed to load ${path}:`, error);
        return null;
      }
    }

    // Refresh dashboard
    async function refreshDashboard() {
      const sessionData = await loadSessionData();
      const activeTask = sessionData.queue.tasks.find(t => t.status === 'in_progress');

      if (activeTask) {
        const taskData = await loadTaskData(activeTask.id);
        renderDashboard(sessionData, taskData);
      } else {
        renderDashboard(sessionData, null);
      }
    }

    // Auto-refresh every 5 seconds
    setInterval(refreshDashboard, 5000);

    // Initial load
    refreshDashboard();
  </script>
</body>
</html>
```

---

## Migration Steps

### Phase 1: Create JSON Schema Templates
1. Create `templates/json/` directory
2. Add JSON template files for each data type
3. Document schema with examples

### Phase 2: Update Agent Files
1. Update all agents to write JSON instead of markdown
2. Add JSON update instructions
3. Update logging format specification

4. Files to update:
   - `agents/*.md` (all 20 agents)
   - `root.md` (update state management rules)

### Phase 3: Create Migration Utility
1. Create `scripts/migrate-to-json.md`
2. Document how to convert existing markdown state to JSON
3. Add validation for JSON integrity

### Phase 4: Update Visualizer
1. Create new `templates/session/visualizer.template.html`
2. Implement JSON fetching logic
3. Add auto-refresh capability

### Phase 5: Update Stage Templates
1. Update `templates/stages/*.md` to use JSON
2. Add JSON file references
3. Update completion checks

### Phase 6: Create Helper Utilities
1. Create `templates/shared/json-helpers.md`
2. Document common JSON operations:
   - `appendLogEntry(taskId, entry)`
   - `updateState(taskId, updates)`
   - `addCheckpoint(taskId, checkpoint)`
   - `updateQueue(updates)`

---

## JSON Helper Functions Reference

### For Agents to Use

```markdown
## JSON Helper Functions

### Append Log Entry
```javascript
// Read tasks/{{TASK_ID}}/log.json
// Append to entries array:
{
  "id": "log-{{NEXT_NUMBER}}",
  "timestamp": "{{ISO_TIMESTAMP}}",
  "agent": "{{AGENT_NAME}}",
  "stage": "{{STAGE_NAME}}",
  "action": "{{ACTION_DESCRIPTION}}",
  "status": "success|failed|in_progress",
  "details": {
    // Agent-specific details
  }
}
// Write back to tasks/{{TASK_ID}}/log.json
```

### Update State
```javascript
// Read tasks/{{TASK_ID}}/state.json
// Update fields:
{
  "currentStage": { ... },
  "currentWave": {{WAVE}},
  "updatedAt": "{{ISO_TIMESTAMP}}",
  "agents": {
    "current": "{{AGENT_NAME}}",
    ...
  }
}
// Write back to tasks/{{TASK_ID}}/state.json
```

### Add Checkpoint
```javascript
// Read tasks/{{TASK_ID}}/checkpoints.json
// Append to checkpoints array:
{
  "id": "cp-{{NEXT_NUMBER}}",
  "name": "{{STAGE}}-{{SUFFIX}}",
  "timestamp": "{{ISO_TIMESTAMP}}",
  "stage": "{{STAGE_NAME}}",
  "stageNumber": {{N}},
  "filesModified": ["{{FILE_1}}", "{{FILE_2}}"],
  "resumeInstruction": "{{INSTRUCTION}}"
}
// Write back to tasks/{{TASK_ID}}/checkpoints.json
```

### Update Queue
```javascript
// Read session/queue.json
// Update task status:
{
  "tasks": [
    {
      "id": "{{TASK_ID}}",
      "status": "{{NEW_STATUS}}",
      ...
    }
  ],
  "updatedAt": "{{ISO_TIMESTAMP}}"
}
// Write back to session/queue.json
```
```

---

## Directory Structure Summary

```
markdown-agent/
├── session/
│   ├── tasks/                    # Per-task data (NEW)
│   │   ├── task-1/
│   │   │   ├── state.json
│   │   │   ├── log.json
│   │   │   ├── plan.json
│   │   │   ├── checkpoints.json
│   │   │   └── reports/
│   │   │       ├── test-report.json
│   │   │       ├── quality-report.json
│   │   │       ├── security-report.json
│   │   │       └── performance-report.json
│   │   └── task-2/
│   │       └── ...
│   ├── queue.json               # Global queue (NEW)
│   ├── config.json              # Session config (NEW)
│   └── visualizer.html           # Fetches JSON (UPDATED)
├── templates/
│   ├── json/                    # JSON templates (NEW)
│   │   ├── state.template.json
│   │   ├── log.template.json
│   │   ├── plan.template.json
│   │   ├── checkpoints.template.json
│   │   ├── queue.template.json
│   │   └── reports/
│   │       ├── test-report.template.json
│   │       ├── quality-report.template.json
│   │       ├── security-report.template.json
│   │       └── performance-report.template.json
│   └── session/
│       └── visualizer.template.html  # Updated template
└── docs/
    └── plans/
        └── json-state-migration-plan.md  # This file
```

---

## Benefits of JSON Migration

| Aspect | Before (Markdown) | After (JSON) |
|--------|-------------------|---------------|
| **Parsing** | Error-prone regex | Native JSON.parse() |
| **Validation** | None | JSON schema possible |
| **Queries** | Manual grep | Filter/map operations |
| **Task Isolation** | Shared files | Per-task directories |
| **Visualizer** | Fragile HTML parsing | Clean JSON fetch |
| **Atomic Updates** | Manual | Structured approach |
| **Programmatic Access** | Difficult | Straightforward |
| **Error Recovery** | Hard | Can validate JSON |

---

## Implementation Checklist

- [ ] Create `templates/json/` directory with all templates
- [ ] Update `root.md` with JSON state management rules
- [ ] Update all 20 agent files with JSON instructions
- [ ] Update all 10 stage templates with JSON references
- [ ] Create new visualizer template
- [ ] Create migration utility documentation
- [ ] Update .gitignore for new directory structure
- [ ] Test JSON validation on all file types
- [ ] Verify visualizer fetches from correct paths

---

## Next Steps

1. **Review this plan** - Confirm structure meets needs
2. **Create JSON templates** - Start with `templates/json/`
3. **Update root.md** - New state management protocol
4. **Update agents** - JSON writing instructions
5. **Test with sample task** - Verify JSON structure works

6. **Update visualizer** - Implement JSON fetching

---

*Ready for review. Please confirm structure and approach before implementation.*
