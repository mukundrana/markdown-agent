# Usage Example - Complete Walkthrough

This example shows exactly how the Markdown Autonomous Agent System works from start to finish.

## Scenario

You want to add a simple API endpoint to your project.

## Step 1: Copy the Agent System

```bash
# Copy the markdown-agent folder to your project
cp -r markdown-agent /path/to/your/project/
```

## Step 2: Define Your Feature

Edit `markdown-agent/session/context.md`:

```markdown
---
session_id: "example-001"
created: "2025-01-01"
feature: "health-check-endpoint"
---

# Session Context

## Feature Request

**Title**: Add Health Check API Endpoint

**Description**:
Create a simple health check endpoint that returns the API status.

**Requirements**:
- GET /health endpoint
- Returns JSON with status: "ok"
- Returns 200 status code

**Acceptance Criteria**:
- Endpoint responds to GET requests
- Response includes status field
- Works without authentication

---

## Technical Context

**Tech Stack**:
- Language: TypeScript
- Framework: Express.js
- Existing structure: /src/api/

**Conventions**:
- Use async/await
- Return proper HTTP status codes
- Include error handling

---

## Architecture Notes

This is a new feature, adding to existing API structure.

---

## Dependencies

- Express.js already installed
- TypeScript already configured

---

## Design Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2025-01-01 | Add to /src/api/health.ts | Follows existing structure |

---

## Open Questions

None - this is a straightforward feature.
```

## Step 3: Trigger the Agent

In your AI CLI (Claude Code, Cursor, etc.), say:

```
go baby go
```

## Step 4: Watch the Agent Work

### What Happens Behind the Scenes

#### 1. Detection (AI reads root.md)

The AI:
1. Scans for `.agents/` or `markdown-agent/` folder
2. Reads `root.md`
3. Detects: `agent_system: "markdown-autonomous-v1"`
4. **ACTIVATION SEQUENCE INITIATED** ✅

#### 2. Planning Stage

**PLANNER Agent (Optimistic)** says:
```
The fastest path is:
Wave 1:
- t1: Create health endpoint file (5m)
- t2: Add route to app.ts (2m)
[Can run in parallel!]

Total: 7 minutes (best case)
```

**CRITIC Agent (Critical)** adds:
```
Wait, we should consider:
- t0: Check if /health path already exists (1m)
- t1a: Add error handling to endpoint (3m)
- t3: Write unit tests (10m)

Total: +14 minutes for safety
```

**SYNTHESIZER Agent (Balanced)** merges:
```
Balancing perspectives, I suggest:

Wave 1:
- t1: Create health endpoint with error handling (8m)

Wave 2:
- t2: Add route to app.ts (2m)
- t3: Write unit tests (10m)

Total: 20 minutes (realistic estimate)
```

**Result**: `plan.md` is created with 2 waves, 3 tasks

#### 3. Implementation Stage

**CODER Agent** executes:

**Wave 1:**
- Reads task t1 from plan.md
- Creates `/src/api/health.ts`:
  ```typescript
  import { Request, Response } from 'express';

  export async function healthCheck(req: Request, res: Response): Promise<void> {
    try {
      res.status(200).json({ status: 'ok' });
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Health check failed' });
    }
  }
  ```
- Updates state.md: "t1: COMPLETE"
- Logs to log.md

**Wave 2:**
- Reads task t2 from plan.md
- Edits `/src/app.ts`:
  ```typescript
  import { healthCheck } from './api/health';
  app.get('/health', healthCheck);
  ```
- Updates state.md: "t2: COMPLETE"
- Reads task t3 from plan.md
- Creates `/src/api/health.test.ts`:
  ```typescript
  import { healthCheck } from './health';
  // ... test code
  ```
- Updates state.md: "t3: COMPLETE"

#### 4. Verification Stage

**TESTER Agent**:
- Runs tests: ✅ All passing
- Manual testing: Calls GET /health → ✅ Returns `{status: "ok"}`
- Edge cases: ✅ Handles errors gracefully
- Integration: ✅ Works with existing app
- Security: ✅ No vulnerabilities

**Result**: All tests pass, no issues found

#### 5. Review Stage

**Code Review**:
- Code quality: ✅ Clean, readable
- Conventions: ✅ Follows existing patterns
- Documentation: ✅ Code is self-documenting

**Security Review**:
- No secrets: ✅ Pass
- Input validation: ✅ N/A for this endpoint
- Error handling: ✅ Proper try/catch

#### 6. Complete!

**state.md** updated to:
```markdown
## Current Status
**Stage**: COMPLETE
**Status**: DELIVERED
```

**log.md** summary:
```
Session completed successfully.
- 3 tasks completed
- 2 waves executed
- 0 failures
- Total time: ~18 minutes
```

## Step 5: Verify the Result

```bash
curl http://localhost:3000/health
# Response: {"status":"ok"}
```

## Key Points

1. **Zero Code Execution**: The agent never ran code - it guided the AI to write code
2. **State Persistence**: Every step was tracked in markdown files
3. **Interruptible**: You could stop at any point and resume later
4. **Transparent**: Check state.md or log.md anytime to see progress
5. **Portable**: The same markdown files work in ANY AI CLI

## What If Something Went Wrong?

### Scenario: Test fails

**TESTER Agent** discovers test failure:
1. Logs failure in log.md
2. Creates fix task in plan.md: "t4-fix: Fix failing test"
3. Returns to IMPLEMENTATION stage
4. CODER fixes the issue
5. Returns to VERIFICATION
6. Tests now pass ✅

### Scenario: You need to stop

**You say**: "Stop for now"

**Agent**:
1. Updates state.md with current position
2. Logs interruption in log.md
3. Saves all progress

**Later, you say**: "go baby go"

**Agent**:
1. Reads state.md
2. Sees: "Current Wave: 2, Current Task: t2"
3. Resumes from t2
4. Completes the feature

## Summary

The markdown agent system provides:

- **Autonomous execution** from planning to completion
- **Multi-perspective planning** (optimist + critic)
- **Wave-based implementation** (parallel when safe)
- **Comprehensive testing** and verification
- **State persistence** across sessions
- **Universal compatibility** with any AI CLI

All through simple markdown files! 🎉
