# Stage 11: Task Completion & Reporting

## MANDATORY FIRST STEP - DO NOT SKIP

```
STEP 1: READ agents/changelog.md (MANDATORY)
        → Use Read tool on agents/changelog.md
        → This is REQUIRED, not optional

STEP 2: LOG activation (MANDATORY)
        → APPEND to session/tasks/task-N/log.json:
        {
          "id": "log-{{NEXT_NUMBER}}",
          "timestamp": "{{ISO_TIMESTAMP}}",
          "agent": "CHANGELOG",
          "stage": "COMPLETE",
          "action": "Changelog agent activated",
          "status": "in_progress"
        }

STEP 3: ADOPT CHANGELOG's personality
        → Use CHANGELOG's voice and perspective
        → Follow CHANGELOG's specific instructions
```

---

## Instructions for AI

You are in the **TASK COMPLETION** stage. You have already:
- Read `agents/changelog.md`
- Logged CHANGELOG activation
- Adopted CHANGELOG personality

All work is done! Now create comprehensive reports for the completed task.

---

## Completion Actions

### 1. Create Task Report

CREATE `session/tasks/task-N/reports/task-report.json`:

```json
{
  "taskId": "task-N",
  "taskName": "{{TASK_NAME}}",
  "generatedAt": "{{ISO_TIMESTAMP}}",
  "agent": "CHANGELOG",
  "status": "COMPLETED",
  "duration": {
    "started": "{{START_TIMESTAMP}}",
    "completed": "{{END_TIMESTAMP}}",
    "totalMinutes": {{MINUTES}}
  },
  "stages": {
    "total": 10,
    "completed": 10,
    "list": [
      { "name": "REQUIREMENTS", "status": "complete" },
      { "name": "PLANNING", "status": "complete" },
      { "name": "IMPLEMENTATION", "status": "complete" },
      { "name": "VERIFICATION", "status": "complete" },
      { "name": "REVIEW", "status": "complete" },
      { "name": "QUALITY_CHECK", "status": "complete" },
      { "name": "REFACTOR", "status": "complete" },
      { "name": "PERFORMANCE", "status": "complete" },
      { "name": "SECURITY", "status": "complete" },
      { "name": "DEPLOY", "status": "complete" }
    ]
  },
  "metrics": {
    "qualityScore": {{SCORE}},
    "filesCreated": {{COUNT}},
    "filesModified": {{COUNT}},
    "testsWritten": {{COUNT}},
    "testsPassing": true
  },
  "files": {
    "created": ["{{FILE_1}}"],
    "modified": ["{{FILE_2}}"]
  },
  "outcome": "Feature delivered successfully"
}
```

### 2. Create Changelog

CREATE `session/tasks/task-N/reports/changelog.md`:

```markdown
# Changelog - Task {{TASK_ID}}

## [{{VERSION}}] - {{DATE}}

### Added
- New feature descriptions

### Changed
- Modified behavior descriptions

### Fixed
- Bug fix descriptions

### Security
- Security improvements

### Performance
- Performance improvements
```

### 3. Update Final State

UPDATE `session/tasks/task-N/state.json`:

```json
{
  "status": "COMPLETED",
  "completedAt": "{{ISO_TIMESTAMP}}",
  "currentStage": {
    "name": "COMPLETE",
    "number": 11,
    "progress": 100
  },
  "updatedAt": "{{ISO_TIMESTAMP}}"
}
```

### 4. Update Global Queue

UPDATE `session/queue.json`:
- Mark task as COMPLETE
- Update statistics

---

## Success Criteria

- `state.json` shows COMPLETED status
- `reports/task-report.json` has complete task entry
- `reports/changelog.md` has changes documented
- `log.json` has completion summary
- `queue.json` shows COMPLETE

---

## MANDATORY COMPLETION STEPS

```
STEP 1: LOG completion
        → APPEND to log.json:
        {
          "id": "log-{{NEXT_NUMBER}}",
          "timestamp": "{{ISO_TIMESTAMP}}",
          "agent": "CHANGELOG",
          "stage": "COMPLETE",
          "action": "Task complete",
          "status": "success",
          "details": {
            "duration": "{{MINUTES}} minutes",
            "qualityScore": {{SCORE}}
          },
          "nextAgent": null
        }

STEP 2: ANNOUNCE completion
        → Display: "TASK COMPLETE: task-N [Task Name]"
        → Display: "Duration: X minutes"
        → Display: "Quality Score: X/100"

STEP 3: WAIT for new task
        → System is now IDLE
        → Ready for next user request
```

---

## Task is Complete!

System is now IDLE and ready for new tasks.

**User Commands Available**:
- Send new task request
- "report" - View task report
- "status" - View current state
