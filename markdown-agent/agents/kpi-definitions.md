# KPI Definitions

> **Version**: 1.0.0
> **Purpose**: Key Performance Indicators for measuring autonomous agent system performance

## Overview

**KPI (Key Performance Indicator)** defines measurable metrics for tracking agent and system performance. KPIs are grouped into four categories:
- **Efficiency**: Time and resource usage
- **Quality**: Output quality measures
- **Reliability**: Consistency and success rates
- **Process**: Workflow effectiveness

---

# Efficiency KPIs

## 1. agentExecutionTime

**Description**: Time agent takes to complete its assigned stage

**Target by Stage**:
| Stage | Target Time |
|-------|-------------|
| REQUIREMENTS | 5-10 minutes |
| PLANNING | 5-10 minutes |
| IMPLEMENTATION | 10-30 minutes (varies) |
| VERIFICATION | 5-10 minutes |
| REVIEW | 5-10 minutes |
| QUALITY_CHECK | 5-15 minutes |
| REFACTOR | 5-10 minutes |
| PERFORMANCE | 5-15 minutes |
| SECURITY | 5-10 minutes |
| DEPLOY | 5-10 minutes |

**Unit**: minutes
**Status**: pass/fail based on target range

---

## 2. stageCompletionRate

**Description**: Percentage of stages completed within target time

**Target**: 95%
**Calculation**: `(stagesOnTime / totalStages) * 100`
**Unit**: percentage
**Status**: pass if >= 95%, warn if >= 85%, fail if < 85%

---

## 3. contextTokenEfficiency

**Description**: Output quality per token used

**Target**: > 0.8 quality score per 1000 tokens
**Calculation**: `codeQualityScore / (tokensUsed / 1000)`
**Unit**: score per 1000 tokens
**Status**: pass if > 0.8, warn if > 0.6, fail if <= 0.6

---

# Quality KPIs

## 4. codeQualityScore

**Description**: Overall code quality assessment by REVIEWER

**Target**: 8.0 / 10.0
**Source**: REVIEWER agent report
**Unit**: score (0-10)
**Status**: pass if >= 8.0, warn if >= 7.0, fail if < 7.0

**Scoring Criteria**:
- 9-10: Excellent (exceeds standards)
- 8-9: Good (meets all standards)
- 7-8: Acceptable (minor issues)
- < 7: Needs improvement

---

## 5. testPassRate

**Description**: Percentage of tests passing

**Target**: 95%
**Source**: TESTER agent report
**Calculation**: `(testsPassing / totalTests) * 100`
**Unit**: percentage
**Status**: pass if >= 95%, warn if >= 85%, fail if < 85%

---

## 6. securityScore

**Description**: Security audit score

**Target**: 80 / 100
**Source**: SECURITY agent report
**Unit**: score (0-100)
**Status**: pass if >= 80, warn if >= 60, fail if < 60

---

# Reliability KPIs

## 7. retryRate

**Description**: Percentage of tasks requiring retries

**Target**: < 5%
**Calculation**: `(tasksRetried / totalTasks) * 100`
**Unit**: percentage
**Status**: pass if <= 5%, warn if <= 15%, fail if > 15%

---

## 8. bugEscapeRate

**Description**: Bugs found after deployment

**Target**: 0
**Source**: Post-deployment monitoring
**Unit**: count
**Status**: pass if 0, fail if > 0

---

## 9. stageSuccessRate

**Description**: Percentage of stages passing on first attempt

**Target**: 95%
**Calculation**: `(stagesPassedFirstTry / totalStages) * 100`
**Unit**: percentage
**Status**: pass if >= 95%, warn if >= 85%, fail if < 85%

---

# Process KPIs

## 10. waveParallelization

**Description**: Average number of parallel tasks per wave

**Target**: > 2
**Source**: Plan analysis
**Calculation**: `totalTasks / totalWaves`
**Unit**: tasks per wave
**Status**: pass if > 2, warn if > 1.5, fail if <= 1.5

---

## 11. checkpointUtilization

**Description**: Number of checkpoints created per task

**Target**: >= 7 (one per stage)
**Source**: checkpoints.json
**Unit**: count
**Status**: pass if >= 7, warn if >= 5, fail if < 5

---

## 12. documentationCoverage

**Description**: Percentage of code documented

**Target**: 80%
**Source**: REVIEWER agent assessment
**Calculation**: `(documentedItems / totalItems) * 100`
**Unit**: percentage
**Status**: pass if >= 80%, warn if >= 60%, fail if < 60%

---

# KPI by Agent

## Planning Agents

| Agent | Primary KPIs |
|-------|--------------|
| PLANNER | waveParallelization, agentExecutionTime |
| CRITIC | stageSuccessRate, agentExecutionTime |
| SYNTHESIZER | stageCompletionRate, agentExecutionTime |

## Execution Agents

| Agent | Primary KPIs |
|-------|--------------|
| CODER | codeQualityScore, agentExecutionTime |
| TESTER | testPassRate, bugEscapeRate |

## Coordination Agents

| Agent | Primary KPIs |
|-------|--------------|
| ORCHESTRATOR | stageCompletionRate, contextTokenEfficiency |
| REQUIREMENTS-GATHERER | stageCompletionRate, documentationCoverage |
| REVIEWER | codeQualityScore, documentationCoverage |

## Quality Checkers

| Agent | Primary KPIs |
|-------|--------------|
| TYPE_SAFETY | codeQualityScore, stageSuccessRate |
| VALIDATION | securityScore, bugEscapeRate |
| ERROR_HANDLING | stageSuccessRate, retryRate |
| API_CONSISTENCY | codeQualityScore, stageSuccessRate |
| DATABASE | securityScore, stageSuccessRate |
| FILE_SIZE | codeQualityScore, stageSuccessRate |

## Specialized Agents

| Agent | Primary KPIs |
|-------|--------------|
| DEBUGGER | retryRate, stageSuccessRate |
| REFACTOR | codeQualityScore, stageSuccessRate |
| PERFORMANCE | contextTokenEfficiency, stageCompletionRate |
| SECURITY | securityScore, bugEscapeRate |
| DEPLOY | stageSuccessRate, bugEscapeRate |
| CHANGELOG | documentationCoverage, stageCompletionRate |

---

# KPI Thresholds

## Overall Score Calculation

```javascript
function calculateOverallKPI(kpis) {
  const weights = {
    efficiency: 0.25,
    quality: 0.35,
    reliability: 0.25,
    process: 0.15
  };

  const scores = {
    efficiency: average(kpis.efficiency.map(normalize)),
    quality: average(kpis.quality.map(normalize)),
    reliability: average(kpis.reliability.map(normalize)),
    process: average(kpis.process.map(normalize))
  };

  return {
    overall: (
      scores.efficiency * weights.efficiency +
      scores.quality * weights.quality +
      scores.reliability * weights.reliability +
      scores.process * weights.process
    ) * 100,
    breakdown: scores,
    verdict: getVerdict(score)
  };
}

function getVerdict(score) {
  if (score >= 95) return "EXCELLENT";
  if (score >= 85) return "GOOD";
  if (score >= 70) return "ACCEPTABLE";
  return "NEEDS IMPROVEMENT";
}
```

---

# KPI Alert Rules

## Warning Conditions

Trigger warning when:
- Any KPI status is "warn"
- Overall score < 85%
- 2+ KPIs below target

## Critical Conditions

Trigger alert when:
- Any KPI status is "fail"
- Overall score < 70%
- 3+ KPIs below target
- bugEscapeRate > 0

---

# KPI Reporting Template

Each agent reports KPIs in log.json:

```json
{
  "kpi": {
    "agentExecutionTime": {
      "actual": 8,
      "target": 10,
      "unit": "minutes",
      "status": "pass"
    },
    "waveParallelization": {
      "actual": 3.5,
      "target": 2.0,
      "unit": "tasks/wave",
      "status": "pass"
    }
  }
}
```

---

**Version**: 1.0.0
**Last Updated**: 2026-03-08
