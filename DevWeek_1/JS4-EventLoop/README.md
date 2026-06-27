# Event Loop Revision Guide

## Covers

- call stack
- Web APIs or host environment waiting area
- callback queue
- microtasks vs macrotasks
- why output order can feel surprising

---

## Read Order

1. `EventLoop.md`

Revise this before deep async practice.

---

## Must Be Able To Explain

- what goes to the call stack
- what waits outside the stack
- why promises usually run before timers after the current stack clears
- why event loop knowledge helps debug async UI behavior

---

## Done When

- you can explain output order for common event loop questions
- async notes feel less magical and more logical
