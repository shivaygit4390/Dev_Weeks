# Async JS Revision Guide

## Covers

- callbacks
- callback nesting problems
- promises
- chaining
- error propagation
- async/await
- try/catch with async
- sequential vs parallel execution
- practical API wrapper thinking

---

## Read Order

Before this section, revise:

1. `../JS4-EventLoop/EventLoop.md`

Then do:

1. `AsynchJs.md`

---

## Practice Companion

Open:

- `Practice/README.md`

That file gives the correct execution order for async practice.

---

## Must Be Able To Explain

- why callbacks become hard to scale
- what problem promises solve
- promise states
- what `.then()` returns
- why `async` always returns a promise
- difference between sequential and parallel execution
- how errors travel to `.catch()` or `try/catch`

---

## Done When

- you can tell the story from callback to promise to async/await
- you can explain why one async style feels cleaner than another
- you can read a small API utility without panic
