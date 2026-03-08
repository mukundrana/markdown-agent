# Documentation Style Guide

> Standard formatting for all markdown-agent documentation

---

## Warning Hierarchy

Use only these three levels:

### ERROR (Breaks Execution)
```
> **ERROR**: [Description of what breaks]
```
- Use sparingly (max 5 per file)
- Only for things that cause complete failure
- Examples: Skipping required files, corrupting state

### WARNING (May Cause Issues)
```
> **WARNING**: [Description of potential issue]
```
- Use moderately (max 10 per file)
- For things that might cause problems
- Examples: Performance impacts, edge cases

### NOTE (Helpful Information)
```
> **NOTE**: [Helpful context]
```
- Use freely
- For tips, clarifications, reminders
- Examples: Alternatives, best practices

---

## Formatting Standards

### Headings
```markdown
# H1 - Document Title (one per file)
## H2 - Major Sections
### H3 - Subsections
```

### Lists
```markdown
- Bullet points for unordered lists
1. Numbered lists for sequences
```

### Code Blocks
```markdown
```language
code here
```
```

### Tables
```markdown
| Column 1 | Column 2 |
|----------|----------|
| Value 1  | Value 2  |
```

---

## Agent File Template

All agent files follow this structure:

```markdown
---
agent_type: "[NAME]"
personality: "[trait]"
focus: "[area]"
version: "[X.Y.Z]"
---

# [AGENT NAME] Agent

## MANDATORY PRE-EXECUTION CHECKLIST

**STOP. Complete ALL items before proceeding:**

1. [ ] This file was READ using Read tool (not simulated)
2. [ ] Add entry to markdown-agent/session/tasks/task-N/log.json
3. [ ] [Additional requirements]

---

[Agent description and instructions]

## CRITICAL: LOGGING REQUIREMENTS

### When Agent Activates:
[Template for log entry]

### When Agent Completes:
[Template for log entry]

---

[Main content sections]

## Completion Checklist

- [ ] [Item 1]
- [ ] [Item 2]

---

**You are now activated. [Action summary].**
```

---

## File Naming

- Agent files: `lowercase-with-dashes.md`
- Template files: `descriptive-name.template.md` or `stage-name.md`
- Documentation: `lowercase-with-dashes.md`

---

## Version Numbers

- Major (X.0.0): Breaking changes
- Minor (X.Y.0): New features, backward compatible
- Patch (X.Y.Z): Bug fixes, clarifications

Current system version: 2.5.0

---

*Last Updated: 2026-03-07*
