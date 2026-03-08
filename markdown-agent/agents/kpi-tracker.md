---
agent_type: "KPI_TRACKER"
personality: "analytical"
focus: "performance_monitoring"
state_format: "json"
---

# KPI TRACKER Module

> **Version**: 1.0.0
> **Purpose**: KPI collection, aggregation, and reporting for autonomous agent system

## Overview

The KPI TRACKER collects metrics from each agent's log entries, calculates aggregate KPIs at task completion, generates performance reports, and alerts on threshold breaches.

---

# KPI Collection Protocol

## During Agent Execution

Each agent appends KPI data to log.json when completing:

```json
{
  "id": "log-{{NEXT_NUMBER}}",
  "timestamp": "{{ISO_TIMESTAMP}}",
  "agent": "{{AGENT_NAME}}",
  "stage": "{{STAGE_NAME}}",
  "action": "{{ACTION_DESCRIPTION}}",
  "status": "success",
  "details": {
    // Standard details
  },
  "kpi": {
    "{{KPI_NAME}}": {
      "actual": {{VALUE}},
      "target": {{TARGET}},
      "unit": "{{UNIT}}",
      "status": "pass|warn|fail"
    }
  }
}
```

## KPI Collection by Agent

### PLANNER KPIs

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

### CODER KPIs

```json
{
  "kpi": {
    "agentExecutionTime": {
      "actual": 15,
      "target": 20,
      "unit": "minutes",
      "status": "pass"
    },
    "filesCreated": {
      "actual": 5,
      "target": 0,
      "unit": "count",
      "status": "pass"
    }
  }
}
```

### TESTER KPIs

```json
{
  "kpi": {
    "agentExecutionTime": {
      "actual": 7,
      "target": 10,
      "unit": "minutes",
      "status": "pass"
    },
    "testPassRate": {
      "actual": 100,
      "target": 95,
      "unit": "percentage",
      "status": "pass"
    }
  }
}
```

### REVIEWER KPIs

```json
{
  "kpi": {
    "agentExecutionTime": {
      "actual": 6,
      "target": 10,
      "unit": "minutes",
      "status": "pass"
    },
    "codeQualityScore": {
      "actual": 9.0,
      "target": 8.0,
      "unit": "score",
      "status": "pass"
    }
  }
}
```

### SECURITY KPIs

```json
{
  "kpi": {
    "agentExecutionTime": {
      "actual": 8,
      "target": 10,
      "unit": "minutes",
      "status": "pass"
    },
    "securityScore": {
      "actual": 95,
      "target": 80,
      "unit": "score",
      "status": "pass"
    }
  }
}
```

---

# KPI Aggregation

## At Task Completion

ORCHESTRATOR collects all KPIs from log.json and generates aggregate report:

```javascript
// Pseudo-code for KPI aggregation
function aggregateKPIs(logEntries) {
  const kpis = {
    efficiency: {},
    quality: {},
    reliability: {},
    process: {}
  };

  for (const entry of logEntries) {
    if (entry.kpi) {
      for (const [name, metric] of Object.entries(entry.kpi)) {
        const category = getKPICategory(name);
        kpis[category][name] = metric;
      }
    }
  }

  return calculateAggregateScores(kpis);
}
```

---

# KPI Report Generation

## Report Structure

Generated at `reports/kpi-report.json`:

```json
{
  "taskId": "task-N",
  "generatedAt": "2026-03-08T12:00:00.000Z",
  "agent": "ORCHESTRATOR",
  "reportPeriod": {
    "startedAt": "2026-03-08T11:00:00.000Z",
    "completedAt": "2026-03-08T12:00:00.000Z",
    "duration": "60 minutes"
  },
  "kpis": {
    "efficiency": {
      "agentExecutionTime": {
        "actual": 16,
        "target": 20,
        "unit": "minutes",
        "status": "pass"
      },
      "stageCompletionRate": {
        "actual": 100,
        "target": 95,
        "unit": "percentage",
        "status": "pass"
      },
      "contextTokenEfficiency": {
        "actual": 0.95,
        "target": 0.8,
        "unit": "score/1000tokens",
        "status": "pass"
      },
      "summary": {
        "pass": 3,
        "warn": 0,
        "fail": 0,
        "score": 100
      }
    },
    "quality": {
      "codeQualityScore": {
        "actual": 9.0,
        "target": 8.0,
        "unit": "score",
        "status": "pass"
      },
      "testPassRate": {
        "actual": 100,
        "target": 95,
        "unit": "percentage",
        "status": "pass"
      },
      "securityScore": {
        "actual": 95,
        "target": 80,
        "unit": "score",
        "status": "pass"
      },
      "summary": {
        "pass": 3,
        "warn": 0,
        "fail": 0,
        "score": 100
      }
    },
    "reliability": {
      "retryRate": {
        "actual": 0,
        "target": 5,
        "unit": "percentage",
        "status": "pass"
      },
      "stageSuccessRate": {
        "actual": 100,
        "target": 95,
        "unit": "percentage",
        "status": "pass"
      },
      "bugEscapeRate": {
        "actual": 0,
        "target": 0,
        "unit": "count",
        "status": "pass"
      },
      "summary": {
        "pass": 3,
        "warn": 0,
        "fail": 0,
        "score": 100
      }
    },
    "process": {
      "waveParallelization": {
        "actual": 3.5,
        "target": 2.0,
        "unit": "tasks/wave",
        "status": "pass"
      },
      "checkpointUtilization": {
        "actual": 10,
        "target": 7,
        "unit": "count",
        "status": "pass"
      },
      "documentationCoverage": {
        "actual": 90,
        "target": 80,
        "unit": "percentage",
        "status": "pass"
      },
      "summary": {
        "pass": 3,
        "warn": 0,
        "fail": 0,
        "score": 100
      }
    }
  },
  "overall": {
    "score": 100,
    "verdict": "EXCELLENT",
    "breakdown": {
      "efficiency": 100,
      "quality": 100,
      "reliability": 100,
      "process": 100
    }
  },
  "alerts": [],
  "recommendations": []
}
```

---

# KPI Scoring Algorithm

```javascript
function scoreKPI(metric) {
  // Normalize to 0-100 scale based on status
  const statusScores = {
    "pass": 100,
    "warn": 70,
    "fail": 0
  };

  return statusScores[metric.status] || 0;
}

function calculateCategoryScore(kpis) {
  const values = Object.values(kpis).map(scoreKPI);
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function calculateOverallScore(kpis) {
  const weights = {
    efficiency: 0.25,
    quality: 0.35,
    reliability: 0.25,
    process: 0.15
  };

  const scores = {
    efficiency: calculateCategoryScore(kpis.efficiency),
    quality: calculateCategoryScore(kpis.quality),
    reliability: calculateCategoryScore(kpis.reliability),
    process: calculateCategoryScore(kpis.process)
  };

  const overall = (
    scores.efficiency * weights.efficiency +
    scores.quality * weights.quality +
    scores.reliability * weights.reliability +
    scores.process * weights.process
  );

  return {
    overall: Math.round(overall),
    breakdown: scores,
    verdict: getVerdict(overall)
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

# Alert Generation

## Warning Conditions

Generate warning when:

```json
{
  "level": "warning",
  "message": "KPI below target: codeQualityScore (7.5 < 8.0)",
  "kpi": "codeQualityScore",
  "actual": 7.5,
  "target": 8.0,
  "recommendation": "Review code for improvement opportunities"
}
```

## Critical Conditions

Generate critical alert when:

```json
{
  "level": "critical",
  "message": "Multiple KPIs failing: securityScore, testPassRate",
  "kpis": ["securityScore", "testPassRate"],
  "recommendation": "Pause workflow and address quality issues"
}
```

---

# State Extension

Add KPI tracking to state.json:

```json
{
  "kpis": {
    "current": {
      "efficiency": {
        "agentExecutionTime": {"actual": 8, "target": 10, "status": "pass"}
      },
      "quality": {},
      "reliability": {},
      "process": {}
    },
    "history": [
      {
        "timestamp": "2026-03-08T11:00:00.000Z",
        "overall": 95,
        "verdict": "EXCELLENT"
      }
    ],
    "alerts": []
  }
}
```

---

# Integration with ORCHESTRATOR

## Stage Completion KPI Check

```
After each stage completes:
1. ORCHESTRATOR reads log.json for KPI data
2. ORCHESTRATOR updates state.json.kpis.current
3. ORCHESTRATOR checks for alerts
4. If critical alert: PAUSE and notify user
5. If warning alert: LOG and continue
```

## Task Completion KPI Report

```
After task completes:
1. ORCHESTRATOR aggregates all KPIs from log.json
2. ORCHESTRATOR calculates overall score
3. ORCHESTRATOR generates reports/kpi-report.json
4. ORCHESTRATOR appends KPI summary to log.json
5. ORCHESTRATOR syncs to dashboard
```

---

# KPI Dashboard Integration

Add to data.js for dashboard:

```javascript
window.DASHBOARD_DATA = {
  // ... existing data
  kpis: {
    "task-N": {
      overall: 98,
      verdict: "EXCELLENT",
      efficiency: 100,
      quality: 100,
      reliability: 95,
      process: 95,
      alerts: []
    }
  }
};
```

---

# Completion Checklist

- [ ] KPI collection protocol defined
- [ ] All agents have KPI reporting template
- [ ] KPI aggregation algorithm defined
- [ ] KPI report template created
- [ ] Alert generation rules defined
- [ ] State extension for KPIs added
- [ ] ORCHESTRATOR integration defined
- [ ] Dashboard integration defined

---

**Remember: KPIs are collected PER STAGE, aggregated at task completion.**
