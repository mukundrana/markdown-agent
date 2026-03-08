# Checkpoint Template

## Instructions for AI

Create checkpoints at key points to enable safe resumption.

## When to Create Checkpoints

1. **After each stage completes**
2. **Before risky operations**
3. **After major milestones**
4. **Before human intervention required**
5. **After any failure/recovery**

## Checkpoint Format

```markdown
## Checkpoint: [CHECKPOINT_NAME]

**Created**: [Timestamp]
**Stage**: [Current stage]
**Wave**: [Current wave]
**Task**: [Current task or LAST_COMPLETED]

### State Summary
- Completed: [list of completed items]
- In Progress: [current item]
- Failed: [any failures]
- Next: [what to do next]

### Context
- [Relevant context for resumption]

### Files Modified
- [List of files changed since last checkpoint]

### Decisions Made
- [Important decisions to remember]

### Known Issues
- [Any issues or concerns]

### Resume Instructions
1. [First step to resume]
2. [Second step]
3. [etc.]
```

## Example Checkpoint

```markdown
## Checkpoint: Wave 2 Complete

**Created**: 2025-01-01 10:30:00
**Stage**: IMPLEMENTATION
**Wave**: 2
**Task**: w2-t3 (COMPLETED)

### State Summary
- Completed: Wave 1 (all tasks), Wave 2 (all tasks)
- In Progress: Moving to Wave 3
- Failed: None
- Next: Start Wave 3 implementation

### Context
Feature: User Authentication
Progress: 67% complete (2/3 waves done)

### Files Modified
- src/auth/controller.ts (added login/register endpoints)
- src/auth/service.ts (implemented auth logic)
- src/auth/routes.ts (configured routes)
- src/auth/middleware.ts (added auth middleware)
- src/auth/types.ts (added TypeScript interfaces)

### Decisions Made
- Using JWT for tokens
- bcrypt for password hashing
- Token expiry: 24 hours

### Known Issues
- None currently

### Resume Instructions
1. Read plan.md to see Wave 3 tasks
2. Activate CODER agent
3. Implement Wave 3 tasks
4. Update state.md after each task
```

## Checkpoint Storage

Append checkpoints to `session/checkpoints.md` in reverse chronological order (newest first).
