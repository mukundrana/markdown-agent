# Stage 1: REQUIREMENTS GATHERING

## Objective
Collect detailed requirements for the task before any planning or implementation.

## Agent
- **READ**: `agents/requirements-gatherer.md`

## Process

### Step 1: Read Requirements Gatherer Agent
```
READ: agents/requirements-gatherer.md
```

### Step 2: Gather Requirements
Ask clarifying questions to understand:
- What needs to be built?
- Who are the users?
- What are the acceptance criteria?
- What are the constraints?
- What is the expected output?

### Step 3: Document Requirements
Create a requirements document including:
- Functional requirements
- Non-functional requirements
- Constraints
- Assumptions
- Acceptance criteria

### Step 4: Update State
```json
{
  "currentStage": {
    "name": "REQUIREMENTS",
    "number": 1,
    "progress": 100
  },
  "requirements": {
    "functional": ["..."],
    "nonFunctional": ["..."],
    "constraints": ["..."],
    "assumptions": ["..."],
    "acceptanceCriteria": ["..."]
  }
}
```

### Step 5: Create Checkpoint
```json
{
  "id": "cp-1",
  "name": "REQUIREMENTS-COMPLETE",
  "timestamp": "ISO-TIMESTAMP",
  "stage": "REQUIREMENTS",
  "stageNumber": 1,
  "description": "Requirements gathered and documented"
}
```

### Step 6: Log Entry
```json
{
  "id": "log-N",
  "timestamp": "ISO-TIMESTAMP",
  "agent": "REQUIREMENTS-GATHERER",
  "stage": "REQUIREMENTS",
  "action": "Requirements gathering complete",
  "status": "success"
}
```

## Output
- Requirements document in `session/tasks/task-N/requirements.md`
- Updated `state.json` with requirements
- Checkpoint created
- Log entries added

## Next Stage
Proceed to **PLANNING** stage.

## Checklist Before Proceeding
- [ ] All functional requirements documented
- [ ] All non-functional requirements documented
- [ ] Constraints identified
- [ ] Acceptance criteria defined
- [ ] State updated
- [ ] Checkpoint created
- [ ] Log updated
