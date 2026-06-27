# Single Shot React

This folder is an emergency React interview-prep pack.

Purpose:

- separate from your normal Week 2 flow
- usable when time is very less
- enough to revise React for `3-5 days`
- aimed at `5-7 LPA` and especially useful if you need to sound like a developer with around `2 years` practical exposure

This is not a deep React mastery track.

This is a:

```txt
minimum-time, maximum-signal, interview-survival pack
```

---

## What This Pack Covers

- React mental model
- JSX, components, props
- state and rendering
- events
- conditional rendering
- lists and keys
- controlled forms
- `useEffect`
- API calling basics
- component communication
- folder structure
- performance basics
- scalability basics
- interview Q&A
- task list for fast hands-on revision

---

## Files

1. [01-react-core-theory.md](C:/Others/Drive_Next/Dev-DSA/Dev_Weeks/DevWeek_2/singleshotreact/01-react-core-theory.md)
2. [02-practical-tasks.md](C:/Others/Drive_Next/Dev-DSA/Dev_Weeks/DevWeek_2/singleshotreact/02-practical-tasks.md)
3. [03-architecture-performance-scalability.md](C:/Others/Drive_Next/Dev-DSA/Dev_Weeks/DevWeek_2/singleshotreact/03-architecture-performance-scalability.md)
4. [04-interview-qa.md](C:/Others/Drive_Next/Dev-DSA/Dev_Weeks/DevWeek_2/singleshotreact/04-interview-qa.md)
5. [05-last-48-hours-checklist.md](C:/Others/Drive_Next/Dev-DSA/Dev_Weeks/DevWeek_2/singleshotreact/05-last-48-hours-checklist.md)

---

## How to Use It

### If you have 5 days

Day 1:

- read `01-react-core-theory.md`
- build tasks 1-3 from `02-practical-tasks.md`

Day 2:

- finish tasks 4-6
- revise `useEffect`, forms, lists, keys

Day 3:

- read `03-architecture-performance-scalability.md`
- improve earlier tasks with better structure

Day 4:

- read `04-interview-qa.md`
- answer the questions aloud
- explain one small React project end to end

Day 5:

- use `05-last-48-hours-checklist.md`
- do revision only
- no heavy new learning

### If you have 3 days

Day 1:

- read core theory
- build minimum tasks 1-4

Day 2:

- build form task and API task
- read architecture + performance notes

Day 3:

- only Q&A, revision, explanation practice

### If you have only 1-2 days

- read `01`
- read `04`
- use `05`
- revise only what you can explain clearly

---

## Minimum Must-Know Set

If you remember only a minimum set, remember this:

- UI is a function of state and props
- state update causes re-render
- props are read-only
- use `map` for lists and stable keys
- controlled forms use `value` and `onChange`
- `useEffect` is for syncing with external systems like API calls
- keep components small and reusable
- do not overuse global state
- performance is mostly about reducing unnecessary work, not blindly using `memo`
- explain trade-offs, not only syntax

---

## Minimum Must-Build Set

If time is very less, build these:

1. reusable `UserCard`
2. counter or theme changer with `useState`
3. login toggle for conditional rendering
4. user list with stable keys
5. signup form with controlled inputs
6. one fetch-and-display API component with loading and error states

If you can build and explain these 6 properly, you are already in a much better position than many rushed candidates.

---

## How to Sound More Experienced

Do these while revising:

- explain why you chose a pattern
- mention trade-offs
- mention edge cases
- mention reusability
- mention user experience states: loading, error, empty, success

Weak answer:

```txt
I used useEffect because it runs after render.
```

Better answer:

```txt
I used useEffect to fetch data because API calling is a side effect. I also kept loading and error states so the UI remains predictable during async work.
```

---

## Final Goal of This Folder

After finishing this folder, you should be able to:

- revise React fast
- build a small app quickly
- answer common React questions
- sound more structured in interviews
- survive emergency preparation without getting scattered

