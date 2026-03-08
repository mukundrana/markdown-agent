# Task Queue System

## Overview

The Task Queue System allows users to:
1. **Queue multiple tasks** without blocking execution
2. **Execute tasks sequentially** when ready
3. **Monitor progress** in real-time via dashboard
4. **Control execution** with simple commands

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        USER                                 │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    TASK_MANAGER                             │
│  - Accepts tasks                                            │
│  - Validates metadata                                       │
│  - Manages queue state                                      │
│  - Controls execution order                                 │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    Queue State                              │
│  - session/queue.json (persistent storage)                  │
│  - session/data.js (dashboard sync)                         │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                  Task Execution                             │
│  REQUIREMENTS → PLANNING → IMPLEMENTATION → ... → DEPLOY    │
│                     (ORCHESTRATOR coordinates)              │
└─────────────────────────────────────────────────────────────┘
```

---

## User Commands

### Queue Management

| Command | Description | Example |
|---------|-------------|---------|
| `Add task: [desc]` | Add a new task to queue | `Add task: build login page` |
| `Queue: [desc]` | Alias for Add task | `Queue: create user profile` |
| `execute` | Start executing queued tasks | `execute` |
| `start` | Alias for execute | `start` |
| `status` | Show queue status | `status` |
| `queue` | Alias for status | `queue` |
| `cancel task-N` | Cancel a specific task | `cancel task-3` |
| `clear queue` | Clear all pending tasks | `clear queue` |

### Task Metadata

When adding a task, you can specify:

| Field | Values | Default |
|-------|--------|---------|
| Priority | critical, high, medium, low | medium |
| Complexity | trivial, simple, moderate, complex | moderate |

---

## Queue Priority Order

Tasks execute in this order:
1. **critical** - Highest priority, executes first
2. **high** - Second priority
3. **medium** - Third priority (default)
4. **low** - Lowest priority

Within same priority level: **FIFO** (first queued, first executed)

---

## Workflow by Complexity

| Complexity | Workflow | Description |
|------------|----------|-------------|
| trivial | quick | REQUIREMENTS → IMPLEMENTATION → DEPLOY (3 stages) |
| simple | standard | All 10 stages, simplified checks |
| moderate | standard | All 10 stages, full checks |
| complex | full | All 10 stages, thorough analysis |

---

## State Transitions

```
pending → in_progress → completed
    ↓           ↓
cancelled    failed
```

### Status Meanings

| Status | Description |
|--------|-------------|
| `pending` | Task is queued, waiting to execute |
| `in_progress` | Task is currently executing |
| `paused` | Task execution paused by user |
| `completed` | Task finished successfully |
| `failed` | Task failed after max retries |
| `cancelled` | Task cancelled by user |

---

## File Structure

```
session/
├── data.js              # Dashboard data (combined)
├── queue.json           # Queue state (CRUD)
├── config.json          # Session config
└── tasks/
    ├── task-1/
    │   ├── state.json       # Task state
    │   ├── log.json         # Task log
    │   ├── plan.json        # Execution plan
    │   └── checkpoints.json # Resume points
    └── task-2/
        └── ...
```

---

## Dashboard Data Structure

```javascript
window.DASHBOARD_DATA = {
  queue: {
    updatedAt: "2026-03-08T12:00:00Z",
    tasks: [
      {
        id: "task-1",
        name: "Build login page",
        description: "Create authentication UI",
        status: "completed",
        priority: "high",
        complexity: "moderate",
        workflow: "standard",
        createdAt: "2026-03-08T10:00:00Z",
        startedAt: "2026-03-08T10:05:00Z",
        completedAt: "2026-03-08T10:30:00Z",
        currentStage: "COMPLETE",
        progress: 100,
        error: null
      },
      {
        id: "task-2",
        name: "Add user profile",
        description: "Create profile management",
        status: "in_progress",
        priority: "medium",
        complexity: "simple",
        workflow: "standard",
        createdAt: "2026-03-08T10:15:00Z",
        startedAt: "2026-03-08T10:30:00Z",
        completedAt: null,
        currentStage: "IMPLEMENTATION",
        progress: 45,
        error: null
      }
    ],
    statistics: {
      total: 3,
      pending: 1,
      inProgress: 1,
      completed: 1,
      failed: 0,
      cancelled: 0
    },
    nextTaskId: "task-3"
  },
  tasks: {
    "task-1": {
      state: { /* from tasks/task-1/state.json */ },
      log: { /* from tasks/task-1/log.json */ },
      checkpoints: { /* from tasks/task-1/checkpoints.json */ }
    },
    "task-2": {
      state: { /* from tasks/task-2/state.json */ },
      log: { /* from tasks/task-2/log.json */ },
      checkpoints: { /* from tasks/task-2/checkpoints.json */ }
    }
  }
};
```

---

## Execution Flow

### Single Task Flow

```
USER: "Add task: build a calculator"
       ↓
TASK_MANAGER validates and queues
       ↓
USER: "execute"
       ↓
TASK_MANAGER marks task in_progress
       ↓
REQUIREMENTS-GATHERER starts
       ↓
[All 10 stages execute]
       ↓
ORCHESTRATOR marks task complete
       ↓
TASK_MANAGER checks for next task → None found
       ↓
Notify: "All tasks complete! 🎉"
```

### Multiple Tasks Flow

```
USER: "Add task: build login page"
USER: "Add task: add user profile"
USER: "Add task: create dashboard"
       ↓
TASK_MANAGER queues all 3 tasks
       ↓
USER: "execute"
       ↓
TASK_MANAGER starts task-1
       ↓
[All 10 stages for task-1]
       ↓
ORCHESTRATOR: task-1 complete
       ↓
TASK_MANAGER auto-starts task-2 (if autoExecuteNext=true)
       ↓
[All 10 stages for task-2]
       ↓
TASK_MANAGER auto-starts task-3
       ↓
[All 10 stages for task-3]
       ↓
Notify: "All tasks complete! 🎉"
```

---

## Logging

Every queue operation is logged:

```json
{
  "id": "log-1",
  "timestamp": "2026-03-08T10:00:00Z",
  "agent": "TASK_MANAGER",
  "stage": "QUEUE",
  "action": "Task added to queue",
  "status": "queued",
  "details": {
    "taskId": "task-1",
    "taskName": "Build login page",
    "priority": "high",
    "complexity": "moderate",
    "queuePosition": 1
  }
}
```

---

## Configuration

In `session/config.json`:

```json
{
  "settings": {
    "workflow": "full",
    "complexity": "auto",
    "autoContinue": true,
    "autoExecuteNext": true  // Auto-start next task after completion
  }
}
```

---

## Error Handling

### Task Fails

1. Mark task as `failed` in state.json
2. Update statistics in queue.json
3. Log error with retry count
4. Continue to next task (if any)
5. Notify user about failed task

### User Cancels

1. Mark task as `cancelled`
2. Update queue.json
3. Sync dashboard
4. If cancelling current task, pause execution

---

## KPIs Tracked

| KPI | Target | Unit |
|-----|--------|------|
| queueThroughput | 5+ | tasks/hour |
| averageTaskTime | varies | minutes |
| taskSuccessRate | 95% | percentage |
| queueEfficiency | 90% | percentage |

---

*See `agents/task-manager.md` for implementation details.*
