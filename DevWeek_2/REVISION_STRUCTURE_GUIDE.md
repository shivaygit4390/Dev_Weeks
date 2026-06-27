# Week 2 Revision Structure Guide

This file explains how to keep future tasks in the same easy-revision structure.

---

## Goal of This Structure

Every task should become easy to revise in two ways:

1. by reading the code
2. by reading the task note

That means each task should have:

- a clear file location
- a clear name
- clear comments
- a small `README.md`

---

## Folder Pattern for Future Tasks

Create future tasks like this:

```txt
src/
  tasks/
    07-task-name/
      TaskName.jsx
      README.md
```

Examples:

```txt
src/tasks/07-controlled-form/ControlledForm.jsx
src/tasks/07-controlled-form/README.md
```

---

## Code File Pattern

At the top of every task file, add a short comment block like this:

```jsx
/*
  Why this task exists:
  - concept 1
  - concept 2
  - concept 3

  Keep in mind:
  - important rule 1
  - important rule 2
*/
```

Then inside important handlers, add small comments only where needed:

- before add logic
- before edit logic
- before delete logic
- before validation logic

Do not comment every line.
Comment the thinking, not the obvious syntax.

---

## README Pattern for Each Task

Each task `README.md` should contain:

1. roadmap mapping
2. what this task revises
3. why this approach is used
4. what to keep in mind
5. done when
6. revision questions

This makes each task self-explanatory later.

---

## Naming Rule

Use:

- numbered folder
- clean component name

Good:

```txt
01-user-card/UserCard.jsx
06-user-list/UserList.jsx
```

Avoid:

- random names
- too many temporary suffixes
- unclear abbreviations

---

## Shared Component Rule

If a small helper is reused by more than one task, move it to:

```txt
src/components/shared/
```

Examples:

- `Button.jsx`
- `Form.jsx`

If it belongs to only one task, keep it inside that task folder instead.

---

## App Integration Rule

Whenever you complete a task:

1. create task folder
2. create component file
3. create `README.md`
4. import task in `App.jsx`
5. add one visible section heading in `App.jsx`

That way the playground also becomes a revision dashboard.

---

## How To Revise Using This Structure

For each task:

1. open `README.md`
2. answer the revision questions aloud
3. open the component file
4. trace the state and handlers
5. close file and rewrite from memory later

---

## Future Task Workflow

When starting a new task, do this:

1. read roadmap line
2. create task folder
3. write short goal comment in component
4. build minimum working version
5. add only meaningful comments
6. create `README.md`
7. add "done when" points

This keeps the task useful for both learning and future revision.
