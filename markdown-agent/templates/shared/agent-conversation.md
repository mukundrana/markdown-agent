# Agent Conversation Template

## Instructions for AI

When agents need to communicate, use this structured format.

## Conversation Structure

```markdown
## Agent Conversation

### From: [AGENT_NAME]
### To: [AGENT_NAME]
### Context: [Current task/wave]

**Message**: [What needs to be communicated]

**Context/Data**: [Relevant information passed]

**Decision/Action**: [What was decided or what action to take]

**Next Steps**: [What the receiving agent should do]
```

## Example Conversations

### PLANNER → SYNTHESIZER

```markdown
## Agent Conversation

### From: PLANNER
### To: SYNTHESIZER
### Context: Planning Stage

**Message**: I've created the optimistic plan for the authentication feature.

**Context/Data**:
- 3 waves identified
- 12 tasks total
- Estimated 4 hours (best case)
- High parallelization in Wave 1

**Key Assumptions**:
- All dependencies available
- No blocking issues expected
- Database schema compatible

**Decision/Action**: Please review and merge with CRITIC's plan.

**Next Steps**: Read `session/planner-plan.md` and create balanced final plan.
```

### CODER → TESTER

```markdown
## Agent Conversation

### From: CODER
### To: TESTER
### Context: Wave 2 Complete

**Message**: Implementation tasks for Wave 2 are complete.

**Context/Data**:
- Completed: w2-t1, w2-t2, w2-t3
- Files modified:
  - src/auth/controller.ts
  - src/auth/service.ts
  - src/auth/routes.ts
- Tests added for all new code

**Known Issues**: None

**Decision/Action**: Ready for verification testing.

**Next Steps**: Please run test suite and verify the implementation.
```

### TESTER → CODER (Bug Found)

```markdown
## Agent Conversation

### From: TESTER
### To: CODER
### Context: Bug Found During Testing

**Message**: Critical bug found in authentication logic.

**Context/Data**:
- **Bug**: Token validation fails for expired tokens
- **Location**: src/auth/service.ts:45
- **Reproduction**: Login with expired token
- **Expected**: Return 401 Unauthorized
- **Actual**: Returns 500 Internal Server Error

**Severity**: Critical

**Decision/Action**: Fix required before proceeding.

**Next Steps**: Please fix this bug and add test case for expired token validation.
```

## When to Use Conversations

- **Agent Handoff**: When one agent completes and another begins
- **Bug Reports**: When TESTER finds issues for CODER to fix
- **Clarification**: When an agent needs more context
- **Decisions**: When a decision affects multiple agents
- **Blockers**: When something blocks progress

## Conversation Log

All agent conversations should be appended to `session/log.md` for traceability.
