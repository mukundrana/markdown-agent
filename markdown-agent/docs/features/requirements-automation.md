---
requirements_automation_version: "1.0.0"
---

# 🤖 Automated Requirements Generator

This system generates questions automatically based on task type.

---

## Question Templates by Task Type

### 1. Authentication Tasks

**Trigger Words**: authentication, login, signup, logout, auth, user management

**Auto-Generated Questions**:
```
Question 1: What authentication method should I use?
Options:
  a) JWT (JSON Web Tokens) - Stateless, scalable
  b) Session-based - Traditional, server-stored
  c) OAuth/Social login - Google, GitHub, etc.
  d) Basic auth - Simple, less secure
  e) Custom/Other

Question 2: What user information needs to be collected and stored?
Minimum: [Email, Password]

Question 3: Which pages/routes need authentication protection?
Common: Dashboard, Profile, Settings, Admin panel

Question 4: What should happen when a user's session/token expires?
Options: Redirect to login, Show modal, Auto-refresh, Other

Question 5: Do you need social login (Google, GitHub, Facebook, etc.)?
Options: Yes (specify which), No, Maybe later
```

---

### 2. Form/Input Tasks

**Trigger Words**: form, input, field, dialog, modal, capture data

**Auto-Generated Questions**:
```
Question 1: What fields should this form have?
Common: Name, Email, Password, Confirm Password, Phone, Address

Question 2: What validation is required for each field?
Options: Email format, Password strength, Required fields, Character limits

Question 3: Where should the form submit to?
Options: API endpoint, Database, External service, Email

Question 4: What should happen on successful submission?
Options: Show success message, Redirect to dashboard, Send confirmation email, Other

Question 5: How should errors be displayed?
Options: Inline, Top of form, Modal, Toast notification
```

---

### 3. API Endpoint Tasks

**Trigger Words**: API, endpoint, route, server, backend

**Auto-Generated Questions**:
```
Question 1: What HTTP method? (GET, POST, PUT, PATCH, DELETE)

Question 2: What should this endpoint do? (Describe functionality)

Question 3: What parameters should it accept? (Query params, body, headers)

Question 4: Does this endpoint require authentication?
Options: Public, Protected (user), Protected (admin), Role-based

Question 5: What should the response format be?
Options: JSON, HTML, File, Stream, Other
```

---

### 4. Database Tasks

**Trigger Words**: database, model, schema, table, migration, data

**Auto-Generated Questions**:
```
Question 1: What type of database operation?
Options: Create table, Add column, Create index, Migration, Query optimization

Question 2: What data needs to be stored? (Describe fields)

Question 3: What are the data types? (String, Number, Boolean, Date, etc.)

Question 4: Are there any relationships to other tables?
Options: One-to-one, One-to-many, Many-to-many, No relationships

Question 5: Any constraints needed? (Unique, Not null, Foreign key, Index)
```

---

### 5. UI Component Tasks

**Trigger Words**: component, page, view, UI, interface, screen

**Auto-Generated Questions**:
```
Question 1: What type of component? (Form, List, Card, Modal, Navigation, Other)

Question 2: What should this component display/do? (Describe functionality)

Question 3: What data does it need to receive? (Props, API data, State)

Question 4: Any specific styling requirements?
Options: Match existing design, Dark mode support, Responsive (mobile/desktop), Custom styles

Question 5: What interactions should it support? (Click, Hover, Drag, Form submit, etc.)
```

---

### 6. Bug Fix Tasks

**Trigger Words**: bug, fix, error, issue, problem, broken, not working

**Auto-Generated Questions**:
```
Question 1: How do I reproduce this bug? (Steps to trigger the issue)

Question 2: What is the expected behavior? (What should happen)

Question 3: What is actually happening? (The bug/error)

Question 4: When does this occur? (Always, Sometimes, Specific conditions)

Question 5: What browser/environment are you using? (For debugging context)

Question 6: Any error messages or console output? (Paste errors if any)
```

---

### 7. Refactoring Tasks

**Trigger Words**: refactor, improve, optimize, clean up, reorganize

**Auto-Generated Questions**:
```
Question 1: What is the current problem? (Why do we need to refactor)

Question 2: What are we trying to improve? (Performance, Readability, Maintainability, All)

Question 3: Any specific patterns or approaches to use? (Design patterns, Best practices)

Question 4: Must we maintain backward compatibility? (Yes/No/Partial)

Question 5: How will we verify the refactor worked? (Tests, Benchmarks, Code review)
```

---

### 8. Deployment Tasks

**Trigger Words**: deploy, release, publish, ship, production

**Auto-Generated Questions**:
```
Question 1: Where to deploy? (Vercel, Netlify, AWS, Heroku, Custom server, Other)

Question 2: What environment variables are needed? (API keys, Database URLs, etc.)

Question 3: Is there a build process? (What command to build)

Question 4: Are there any pre-deployment checks? (Tests, Linting, Type check)

Question 5: What's the rollback plan if something goes wrong?
```

---

### 9. Testing Tasks

**Trigger Words**: test, testing, tests, coverage, verify, validate

**Auto-Generated Questions**:
```
Question 1: What type of testing? (Unit, Integration, E2E, Performance, Security)

Question 2: What should be tested? (Specific functionality, Edge cases, Error handling)

Question 3: What's the test coverage target? (80%, 90%, 100%)

Question 4: Any specific test scenarios? (User flows, Critical paths)

Question 5: What testing framework? (Jest, Cypress, Playwright, Mocha, Other)
```

---

### 10. Documentation Tasks

**Trigger Words**: document, docs, readme, guide, comment, explain

**Auto-Generated Questions**:
```
Question 1: What type of documentation? (API docs, User guide, README, Code comments)

Question 2: Who is the audience? (Developers, Users, Both)

Question 3: What should be documented? (Usage, Installation, API, Architecture)

Question 4: Any examples or code snippets needed? (Yes/No)

Question 5: Where should this be published? (README.md, Docs folder, Wiki, GitHub Pages)
```

---

## Generic Fallback Questions

If task type doesn't match any template:

```
Question 1: What is the main goal of this task?

Question 2: What does "done" look like for this task?
(Acceptance criteria)

Question 3: Are there any technical constraints or requirements?

Question 4: What should I avoid or NOT do?
(Out of scope)

Question 5: Do you have any preferences for how this should be implemented?
```

---

## Smart Question Selection

### Priority System

**High Priority Questions** (Always ask):
- What is the main goal?
- What does "done" look like?
- Any specific requirements?

**Medium Priority Questions** (Ask if relevant):
- Technical details
- Edge cases
- Preferences

**Low Priority Questions** (Optional):
- Nice-to-have features
- Future considerations

### Dynamic Question Count

Start with 3 questions.
- If task is complex → Add 1-2 more
- If task is simple → Stay at 3
- If user is brief → Ask follow-ups
- If user is detailed → Skip obvious questions

### Context Awareness

Check project context first:
```
IF project has existing auth:
  Question: "Should I integrate with existing auth?"
ELSE:
  Question: "What authentication method?"
```

---

## Skip Logic

**Auto-Skip Questions If:**

User says:
- "just do it"
- "use standard"
- "you decide"
- "keep it simple"
- "like the last one"
- "same as task-N"

**Then Generate Requirements Based On:**
- Common patterns
- Best practices
- Previous tasks in project
- Industry standards

---

## Requirements Generation Flow

```
┌─────────────────────────────────────────────────────────────┐
│  Task confirmed by user                                    │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│  Analyze task type and context                              │
│  ├─ Detect task type (auth, form, API, etc.)               │
│  ├─ Check project context                                  │
│  └─ Check previous tasks                                    │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│  Select question template                                   │
│  ├─ Match task type to template                            │
│  ├─ Adjust for project context                              │
│  └─ Generate 3-5 targeted questions                        │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│  Ask user: "Questions or Skip?"                             │
│  User replies: "questions" → Ask all                       │
│  User replies: "skip" → Generate from template              │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│  Gather requirements                                        │
│  ├─ Ask questions (or skip)                                 │
│  ├─ Capture answers                                        │
│  └─ Generate requirements document                         │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│  Create requirements file                                  │
│  └─ Save to: task-requirements/task-N-requirements.md       │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│  Proceed to PLANNING stage                                  │
└─────────────────────────────────────────────────────────────┘
```

---

## Examples

### Example 1: Authentication (With Questions)

```
Agent: 🤔 [Detected: TASK REQUEST]
       Task: "add user authentication"
       Type: Authentication Feature

       Should I add this to the task queue?

User: yes

Agent: ✅ TASK ADDED: task-1
       Now gathering requirements to ensure I build exactly what you need.

       ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

       Should I ask a few questions first, or use standard JWT authentication?
       Reply "questions" to provide details
       Reply "skip" to use standard implementation

User: questions

Agent: Question 1/5: What authentication method should I use?
       a) JWT (recommended - stateless, scalable)
       b) Session-based (traditional, server-stored)
       c) OAuth/Social login (Google, GitHub, etc.)
       d) Other

User: a

Agent: Question 2/5: What user information needs to be stored?

User: email, password (hashed), name, and created_at timestamp

Agent: Question 3/5: Which pages need authentication protection?

User: dashboard, profile, and settings. Home page is public.

Agent: Question 4/5: What should happen when token expires?

User: Redirect to login with "session expired" message

Agent: Question 5/5: Do you need social login (Google, GitHub, etc.)?

User: not now, maybe later

Agent: ✅ Requirements gathering complete!

       Creating requirements document...
       ✅ Saved to: task-requirements/task-1-requirements.md

       Ready to proceed to PLANNING stage?

User: yes

Agent: Starting PLANNING stage...
```

### Example 2: Form (Skip Questions)

```
Agent: 🤔 [Detected: TASK REQUEST]
       Task: "create login form"
       Type: UI Component

       Should I add this to the task queue?

User: yes

Agent: ✅ TASK ADDED: task-2
       Should I ask questions or use standard form?

User: skip, you know the project

Agent: Got it! Using standard login form pattern.
       ✅ Requirements document created from template
       ✅ Saved to: task-requirements/task-2-requirements.md

       Starting PLANNING stage...
```

---

## Requirements File Structure

All requirements saved to:
```
task-requirements/
├── task-1-requirements.md
├── task-2-requirements.md
├── task-3-requirements.md
└── ...
```

Each file contains:
- Task overview
- All Q&A
- Functional requirements
- Acceptance criteria
- Technical context
- Edge cases
- Out of scope items

---

*Smart questions = Better requirements = Right result!*
