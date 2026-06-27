# 03 Architecture, Performance, and Scalability

This file is for sounding more structured in interviews.

You do not need senior-level architecture.
You need enough maturity to avoid sounding like a tutorial-only candidate.

---

## 1. Basic React Architecture

A decent small-to-medium React app usually separates:

- UI components
- pages/screens
- API layer
- hooks
- helpers

Basic structure:

```txt
src/
  components/
  pages/
  hooks/
  services/
  utils/
```

Why:

- cleaner code
- easier maintenance
- easier testing
- less duplication

---

## 2. How to Decide State Ownership

Ask:

```txt
Who needs this data?
```

### If one component needs it

Keep it local.

### If parent and child or siblings need it

Lift state up.

### If many distant components need it

Consider Context or external state management.

Good interview line:

```txt
I try to keep state as close as possible to where it is used. I only lift it higher when multiple components need to share or coordinate on that data.
```

---

## 3. Local State vs Context vs External State

### Local state

Best for:

- form inputs
- toggles
- modal visibility
- local filtering

### Context

Best for:

- theme
- auth user
- app language

### External state tools

Examples:

- Redux
- Zustand

Use when:

- shared state is complex
- many unrelated components depend on it
- update patterns need stronger structure

Do not say:

```txt
I use global state for everything.
```

That sounds immature.

---

## 4. API Layer Separation

Instead of writing fetch logic directly in many components, move it to a service layer when the app grows.

Example:

```txt
services/userService.js
```

Why:

- cleaner components
- easier reuse
- easier testing
- less duplicate fetch code

Component should focus on:

- when to fetch
- how to display loading/error/data

Service should focus on:

- endpoint calling
- response handling

---

## 5. UI States That Make You Sound Better

Whenever data comes from backend, think in 4 states:

- loading
- error
- empty
- success

This is one of the easiest ways to sound more production-aware.

Example line:

```txt
I try not to build only the success state. I also handle loading, error, and empty states because real users see all of them.
```

---

## 6. Performance Basics

Performance in React is not:

```txt
add useMemo everywhere
```

Performance thinking should be:

1. identify unnecessary work
2. understand why re-render happens
3. optimize only where needed

### Common performance concerns

- large list rendering
- expensive calculations during render
- unnecessary child re-renders
- too much global state causing wide updates

### Tools

- `React.memo`
- `useMemo`
- `useCallback`
- list virtualization for huge lists

### Good answer

```txt
I optimize only after identifying a real issue, such as unnecessary child renders or expensive computations. Premature memoization can make code harder to maintain without real benefit.
```

---

## 7. Why Re-renders Happen

Re-renders happen because of:

- state update
- prop change
- context change
- parent re-render

Not every re-render is a problem.

A problem starts when:

- rendering becomes visibly slow
- expensive child trees keep recalculating
- many unrelated components update together

---

## 8. Memoization Basics

### `React.memo`

Use when:

- child component is pure
- props usually stay same
- re-rendering the child is wasteful

### `useMemo`

Use when:

- computation is expensive
- value should not be recalculated on every render unnecessarily

### `useCallback`

Use when:

- a stable function reference matters, usually with memoized children

But remember:

```txt
These are optimization tools, not default coding style.
```

---

## 9. Scalability Thinking

At your level, scalability does not mean designing Facebook.

It means:

- code remains understandable as features grow
- components do not become huge
- API logic is reusable
- state placement stays sensible
- changes do not break everything

Good scalable habits:

- small focused components
- clear naming
- standard patterns
- service extraction
- form and list patterns reused consistently

---

## 10. Common Real-World Frontend Concerns

Know these at awareness level:

- debouncing search input
- pagination
- client-side filtering
- optimistic UI basics
- auth token handling basics
- route protection basics
- accessibility basics
- error boundaries awareness

You do not need deep implementation of all of them right now, but you should not sound unaware.

---

## 11. Accessibility Basics

You do not need expert accessibility depth, but know:

- semantic HTML matters
- buttons should be buttons, not clickable divs
- form labels matter
- keyboard users exist
- focus states matter

Simple interview line:

```txt
I try to keep semantic elements, labeled inputs, and keyboard-friendly interactions because accessibility is part of usable UI, not an optional extra.
```

---

## 12. Error Handling Basics

In frontend, error handling means:

- readable error UI
- not crashing whole page
- showing feedback to user
- logging or surfacing error safely

For API tasks:

- `try/catch`
- error state
- retry awareness if needed

---

## 13. Testing Awareness

Even if you are not strong in testing yet, know the basics:

- test critical user flows
- test forms
- test rendering based on state
- test async loading/error/success

At `5-7 LPA`, even awareness is useful.

Good line:

```txt
I would prioritize testing critical user-facing behavior such as form submission, conditional UI states, and data fetching flows.
```

---

## 14. React Router Awareness

Know the basics:

- routes
- layout
- protected route idea
- nested route awareness

You do not need deep router mastery right now.

---

## 15. React Query / Server State Awareness

If asked about data fetching at slightly better companies:

Know that tools like React Query help with:

- caching
- refetching
- loading state management
- request deduplication

Simple line:

```txt
For simple apps I can use useEffect and local state, but for larger apps with repeated server-state needs, a data-fetching library like React Query improves consistency and caching.
```

---

## 16. 2-Year Experience-Level Project Explanation Framework

When asked to explain a React project, use this order:

1. problem
2. features
3. component structure
4. state strategy
5. API integration
6. key challenges
7. edge cases
8. improvements

Example:

```txt
I built a user management frontend with reusable cards, controlled forms, and a fetch-based list view. I kept local UI state inside components, lifted shared state when siblings needed coordination, and separated fetch logic conceptually from presentation. I handled loading and error states and would further improve it by adding validation, route-based structure, and stronger data caching.
```

---

## 17. Final Scalability Summary

If you need one short answer:

```txt
Scalable React is less about using many libraries and more about clear component boundaries, correct state ownership, reusable patterns, and predictable data flow. For performance, I first identify unnecessary work and then optimize intentionally rather than adding memoization everywhere.
```

