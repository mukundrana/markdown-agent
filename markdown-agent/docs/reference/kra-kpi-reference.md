# KRA/KPI Quick Reference

> **Version**: 1.0.0
> **Purpose**: Quick reference for all Key Responsibility Areas and Key Performance Indicators

## KRAs by Agent

| Agent | Primary KRA | Category |
|-------|-------------|----------|
| PLANNER | Task Breakdown & Parallelization | Planning |
| CRITIC | Risk Assessment & Mitigation | Planning |
| SYNTHESIZER | Plan Consolidation | Planning |
| CODER | Clean Code Implementation | Execution |
| TESTER | Validation & Quality Assurance | Execution |
| ORCHESTRATOR | Workflow Management | Coordination |
| REQUIREMENTS-GATHERER | Requirements Elicitation | Coordination |
| REVIEWER | Code Review | Coordination |
| QUALITY_TYPE_SAFETY | Type System Integrity | Quality |
| QUALITY_VALIDATION | Input Security | Quality |
| QUALITY_ERROR_HANDLING | Exception Coverage | Quality |
| QUALITY_API_CONSISTENCY | Interface Standards | Quality |
| QUALITY_DATABASE | Data Safety | Quality |
| QUALITY_FILE_SIZE | Code Organization | Quality |
| DEBUGGER | Root Cause Analysis | Specialized |
| REFACTOR | Code Quality Improvement | Specialized |
| PERFORMANCE | Optimization | Specialized |
| SECURITY | Vulnerability Prevention | Specialized |
| DEPLOY | Release Management | Specialized |
| CHANGELOG | Documentation | Specialized |

---

## KPIs with Targets

### Efficiency KPIs

| KPI | Target | Unit | Category |
|-----|--------|------|----------|
| agentExecutionTime | 5-30 (varies) | minutes | Stage-specific |
| stageCompletionRate | 95% | percentage | Overall |
| contextTokenEfficiency | > 0.8 | score/1000tokens | Overall |

**Stage-specific execution time targets:**
- REQUIREMENTS: 5-10 minutes
- PLANNING: 5-10 minutes
- IMPLEMENTATION: 10-30 minutes
- VERIFICATION: 5-10 minutes
- REVIEW: 5-10 minutes
- QUALITY_CHECK: 5-15 minutes
- REFACTOR: 5-10 minutes
- PERFORMANCE: 5-15 minutes
- SECURITY: 5-10 minutes
- DEPLOY: 5-10 minutes

### Quality KPIs

| KPI | Target | Unit | Status |
|-----|--------|------|--------|
| codeQualityScore | 8.0 | score (0-10) | pass if >= 8.0 |
| testPassRate | 95% | percentage | pass if >= 95% |
| securityScore | 80 | score (0-100) | pass if >= 80 |

### Reliability KPIs

| KPI | Target | Unit | Status |
|-----|--------|------|--------|
| retryRate | < 5% | percentage | pass if <= 5% |
| bugEscapeRate | 0 | count | pass if 0 |
| stageSuccessRate | 95% | percentage | pass if >= 95% |

### Process KPIs

| KPI | Target | Unit | Status |
|-----|--------|------|--------|
| waveParallelization | > 2 | tasks/wave | pass if > 2 |
| checkpointUtilization | >= 7 | count | pass if >= 7 |
| documentationCoverage | 80% | percentage | pass if >= 80% |

---

## KPI by Agent

| Agent | Primary KPIs |
|-------|--------------|
| PLANNER | agentExecutionTime, waveParallelization |
| CRITIC | stageSuccessRate, agentExecutionTime |
| SYNTHESIZER | stageCompletionRate, agentExecutionTime |
| CODER | codeQualityScore, agentExecutionTime |
| TESTER | testPassRate, bugEscapeRate |
| ORCHESTRATOR | stageCompletionRate, contextTokenEfficiency |
| REQUIREMENTS-GATHERER | stageCompletionRate, documentationCoverage |
| REVIEWER | codeQualityScore, documentationCoverage |
| QUALITY_TYPE_SAFETY | codeQualityScore, stageSuccessRate |
| QUALITY_VALIDATION | securityScore, bugEscapeRate |
| QUALITY_ERROR_HANDLING | stageSuccessRate, retryRate |
| QUALITY_API_CONSISTENCY | codeQualityScore, stageSuccessRate |
| QUALITY_DATABASE | securityScore, stageSuccessRate |
| QUALITY_FILE_SIZE | codeQualityScore, stageSuccessRate |
| DEBUGGER | retryRate, stageSuccessRate |
| REFACTOR | codeQualityScore, stageSuccessRate |
| PERFORMANCE | contextTokenEfficiency, stageCompletionRate |
| SECURITY | securityScore, bugEscapeRate |
| DEPLOY | stageSuccessRate, bugEscapeRate |
| CHANGELOG | documentationCoverage, stageCompletionRate |

---

## Scoring Algorithm

```
Overall Score = (
  Efficiency Score × 0.25 +
  Quality Score × 0.35 +
  Reliability Score × 0.25 +
  Process Score × 0.15
) × 100
```

### Verdict Levels

| Score Range | Verdict |
|-------------|---------|
| 95-100 | EXCELLENT |
| 85-94 | GOOD |
| 70-84 | ACCEPTABLE |
| 0-69 | NEEDS IMPROVEMENT |

---

## Alert Thresholds

### Warning Conditions
- Any KPI status is "warn"
- Overall score < 85%
- 2+ KPIs below target

### Critical Conditions
- Any KPI status is "fail"
- Overall score < 70%
- 3+ KPIs below target
- bugEscapeRate > 0

---

**Version**: 1.0.0
**Last Updated**: 2026-03-08
