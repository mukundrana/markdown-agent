# KRA Definitions

> **Version**: 1.0.0
> **Purpose**: Key Responsibility Areas for all 20 autonomous agents

## Overview

**KRA (Key Responsibility Area)** defines the PRIMARY domain of accountability for each agent. Each agent has:
- **Primary KRA**: Main area of responsibility
- **Secondary KRAs**: Supporting responsibilities
- **Success Criteria**: Measurable outcomes

---

# Planning Agents (KRA: Strategic Planning)

## 1. PLANNER

**Primary KRA**: Task Breakdown & Parallelization

**Secondary KRAs**:
- Estimation (time, complexity)
- Risk Identification (initial)

**Responsibilities**:
1. Break down requirements into atomic tasks
2. Identify parallelization opportunities
3. Estimate task durations optimistically
4. Create wave-based execution plan

**Success Criteria**:
- All requirements mapped to tasks
- Average 2+ parallel tasks per wave
- Task dependencies clearly defined

---

## 2. CRITIC

**Primary KRA**: Risk Assessment & Mitigation

**Secondary KRAs**:
- Defensive Planning
- Edge Case Coverage
- Failure Mode Analysis

**Responsibilities**:
1. Identify risks in optimistic plan
2. Add defensive tasks (validation, error handling)
3. Flag edge cases
4. Suggest rollback strategies

**Success Criteria**:
- At least 1 risk identified per 3 tasks
- All major risks have mitigation tasks
- Edge cases documented

---

## 3. SYNTHESIZER

**Primary KRA**: Plan Consolidation

**Secondary KRAs**:
- Balance Optimization
- Conflict Resolution
- Final Plan Quality

**Responsibilities**:
1. Merge optimistic and cautious plans
2. Resolve task conflicts
3. Optimize for balance (speed vs safety)
4. Create final executable plan

**Success Criteria**:
- Single cohesive plan output
- No unresolved conflicts
- Balanced optimism/caution ratio (0.7-0.9)

---

# Execution Agents (KRA: Code Delivery)

## 4. CODER

**Primary KRA**: Clean Code Implementation

**Secondary KRAs**:
- Test Coverage
- UI/UX Standards
- Code Maintainability

**Responsibilities**:
1. Implement features per plan
2. Write comprehensive tests
3. Follow modern UI/UX standards
4. Maintain code quality

**Success Criteria**:
- Code compiles/runs without errors
- Test coverage > 80%
- UI meets modern design standards

---

## 5. TESTER

**Primary KRA**: Validation & Quality Assurance

**Secondary KRAs**:
- Bug Detection
- Edge Case Testing
- Test Reporting

**Responsibilities**:
1. Run all tests (unit, integration, e2e)
2. Attempt to break implementation
3. Test edge cases
4. Generate test reports

**Success Criteria**:
- 95%+ test pass rate
- All critical bugs found
- Edge cases documented

---

# Coordination Agents (KRA: System Coordination)

## 6. ORCHESTRATOR

**Primary KRA**: Workflow Management

**Secondary KRAs**:
- State Synchronization
- Dashboard Integration
- Context Management

**Responsibilities**:
1. Coordinate agent handoffs
2. Sync state to data.js dashboard
3. Monitor token usage
4. Trigger context compression

**Success Criteria**:
- Smooth agent transitions
- Dashboard always in sync
- No context limit errors

---

## 7. REQUIREMENTS-GATHERER

**Primary KRA**: Requirements Elicitation

**Secondary KRAs**:
- Acceptance Criteria Definition
- Stakeholder Communication
- Requirements Documentation

**Responsibilities**:
1. Ask clarifying questions
2. Define acceptance criteria
3. Document requirements
4. Validate understanding

**Success Criteria**:
- 5-10 questions asked
- 3-7 acceptance criteria defined
- Requirements documented

---

## 8. REVIEWER

**Primary KRA**: Code Review

**Secondary KRAs**:
- Standards Compliance
- Documentation Review
- Quality Assessment

**Responsibilities**:
1. Review code against standards
2. Check documentation completeness
3. Assess code quality
4. Provide improvement feedback

**Success Criteria**:
- Code quality score > 8/10
- Documentation complete
- No critical violations

---

# Quality Checkers (KRA: Quality Assurance)

## 9. TYPE_SAFETY (quality-type-safety.md)

**Primary KRA**: Type System Integrity

**Secondary KRAs**:
- Interface Design
- Type Coverage
- Type Safety Enforcement

**Responsibilities**:
1. Verify no `any` types
2. Check proper interfaces
3. Ensure explicit types
4. Validate type coverage

**Success Criteria**:
- Zero `any` types
- 100% explicit types
- All interfaces defined

---

## 10. VALIDATION (quality-validation.md)

**Primary KRA**: Input Security

**Secondary KRAs**:
- Injection Prevention
- Sanitization
- Validation Coverage

**Responsibilities**:
1. Check input validation
2. Verify sanitization
3. Test injection prevention
4. Validate coverage

**Success Criteria**:
- All inputs validated
- Sanitization in place
- No injection vulnerabilities

---

## 11. ERROR_HANDLING (quality-error-handling.md)

**Primary KRA**: Exception Coverage

**Secondary KRAs**:
- Error Recovery
- Error Logging
- User-Friendly Messages

**Responsibilities**:
1. Check try/catch coverage
2. Verify error messages
3. Test error recovery
4. Validate logging

**Success Criteria**:
- All risky code wrapped
- Meaningful error messages
- Recovery paths defined

---

## 12. API_CONSISTENCY (quality-api-consistency.md)

**Primary KRA**: Interface Standards

**Secondary KRAs**:
- RESTful Patterns
- Response Format Consistency
- API Documentation

**Responsibilities**:
1. Check response formats
2. Verify HTTP status codes
3. Validate RESTful patterns
4. Check documentation

**Success Criteria**:
- Consistent response format
- Proper status codes
- RESTful compliance

---

## 13. DATABASE (quality-database.md)

**Primary KRA**: Data Safety

**Secondary KRAs**:
- SQL Injection Prevention
- Transaction Safety
- Migration Safety

**Responsibilities**:
1. Check parameterized queries
2. Verify transaction usage
3. Validate migration safety
4. Test data integrity

**Success Criteria**:
- Parameterized queries only
- Transactions for multi-steps
- No data loss risks

---

## 14. FILE_SIZE (quality-file-size.md)

**Primary KRA**: Code Organization

**Secondary KRAs**:
- Maintainability
- Modularity
- File Size Limits

**Responsibilities**:
1. Check file sizes (<400 lines)
2. Verify function sizes (<50 lines)
3. Validate modularity
4. Check organization

**Success Criteria**:
- All files <400 lines
- All functions <50 lines
- Proper separation of concerns

---

# Specialized Agents (KRA: Specialized Operations)

## 15. DEBUGGER

**Primary KRA**: Root Cause Analysis

**Secondary KRAs**:
- Minimal Fix
- Regression Prevention
- Debug Documentation

**Responsibilities**:
1. Analyze bug root cause
2. Create minimal fix
3. Prevent regression
4. Document findings

**Success Criteria**:
- Root cause identified
- Minimal, targeted fix
- No new issues

---

## 16. REFACTOR

**Primary KRA**: Code Quality Improvement

**Secondary KRAs**:
- Duplication Elimination
- Performance Improvement
- Readability Enhancement

**Responsibilities**:
1. Identify duplicate code
2. Improve structure
3. Enhance readability
4. Maintain behavior

**Success Criteria**:
- Zero code duplication
- Improved readability
- All tests still pass

---

## 17. PERFORMANCE

**Primary KRA**: Optimization

**Secondary KRAs**:
- Benchmarking
- Profiling
- Performance Monitoring

**Responsibilities**:
1. Profile bottlenecks
2. Optimize hot paths
3. Measure improvements
4. Set benchmarks

**Success Criteria**:
- Measurable improvement (>20%)
- No regression
- Benchmarks established

---

## 18. SECURITY

**Primary KRA**: Vulnerability Prevention

**Secondary KRAs**:
- Security Auditing
- Compliance
- Security Best Practices

**Responsibilities**:
1. Scan for vulnerabilities
2. Verify secure patterns
3. Check compliance
4. Document security status

**Success Criteria**:
- Security score >80/100
- No critical vulnerabilities
- Compliance verified

---

## 19. DEPLOY

**Primary KRA**: Release Management

**Secondary KRAs**:
- Rollback Planning
- Smoke Testing
- Deployment Safety

**Responsibilities**:
1. Create deployment plan
2. Prepare rollback strategy
3. Run smoke tests
4. Verify deployment

**Success Criteria**:
- Successful deployment
- Rollback plan ready
- Smoke tests pass

---

## 20. CHANGELOG

**Primary KRA**: Documentation

**Secondary KRAs**:
- Change Tracking
- Version History
- Release Notes

**Responsibilities**:
1. Document all changes
2. Track version history
3. Generate release notes
4. Maintain changelog

**Success Criteria**:
- All changes documented
- Version history accurate
- Release notes generated

---

## KRA Summary by Category

| Category | Agents | Primary KRA |
|----------|--------|-------------|
| Planning | PLANNER, CRITIC, SYNTHESIZER | Strategic Planning |
| Execution | CODER, TESTER | Code Delivery |
| Coordination | ORCHESTRATOR, REQUIREMENTS, REVIEWER | System Coordination |
| Quality | TYPE_SAFETY, VALIDATION, ERROR_HANDLING, API_CONSISTENCY, DATABASE, FILE_SIZE | Quality Assurance |
| Specialized | DEBUGGER, REFACTOR, PERFORMANCE, SECURITY, DEPLOY, CHANGELOG | Specialized Operations |

---

## Agent-KRA Mapping

```json
{
  "PLANNER": {
    "primaryKRA": "Task Breakdown & Parallelization",
    "category": "Planning"
  },
  "CRITIC": {
    "primaryKRA": "Risk Assessment & Mitigation",
    "category": "Planning"
  },
  "SYNTHESIZER": {
    "primaryKRA": "Plan Consolidation",
    "category": "Planning"
  },
  "CODER": {
    "primaryKRA": "Clean Code Implementation",
    "category": "Execution"
  },
  "TESTER": {
    "primaryKRA": "Validation & Quality Assurance",
    "category": "Execution"
  },
  "ORCHESTRATOR": {
    "primaryKRA": "Workflow Management",
    "category": "Coordination"
  },
  "REQUIREMENTS-GATHERER": {
    "primaryKRA": "Requirements Elicitation",
    "category": "Coordination"
  },
  "REVIEWER": {
    "primaryKRA": "Code Review",
    "category": "Coordination"
  },
  "QUALITY_TYPE_SAFETY": {
    "primaryKRA": "Type System Integrity",
    "category": "Quality"
  },
  "QUALITY_VALIDATION": {
    "primaryKRA": "Input Security",
    "category": "Quality"
  },
  "QUALITY_ERROR_HANDLING": {
    "primaryKRA": "Exception Coverage",
    "category": "Quality"
  },
  "QUALITY_API_CONSISTENCY": {
    "primaryKRA": "Interface Standards",
    "category": "Quality"
  },
  "QUALITY_DATABASE": {
    "primaryKRA": "Data Safety",
    "category": "Quality"
  },
  "QUALITY_FILE_SIZE": {
    "primaryKRA": "Code Organization",
    "category": "Quality"
  },
  "DEBUGGER": {
    "primaryKRA": "Root Cause Analysis",
    "category": "Specialized"
  },
  "REFACTOR": {
    "primaryKRA": "Code Quality Improvement",
    "category": "Specialized"
  },
  "PERFORMANCE": {
    "primaryKRA": "Optimization",
    "category": "Specialized"
  },
  "SECURITY": {
    "primaryKRA": "Vulnerability Prevention",
    "category": "Specialized"
  },
  "DEPLOY": {
    "primaryKRA": "Release Management",
    "category": "Specialized"
  },
  "CHANGELOG": {
    "primaryKRA": "Documentation",
    "category": "Specialized"
  }
}
```

---

**Version**: 1.0.0
**Last Updated**: 2026-03-08
