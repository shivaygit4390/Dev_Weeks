# Async Practice Revision Guide

## Recommended Practice Order

1. `Js1CallBack-Task.js`
2. `Js2CallBack-to-Primise.js`
3. `Js3-Err-Propogation.js`
4. `Js4-PromiseToAsynchAwait.js`
5. `Js5-SequentialVsParallel.js`
6. `Js6-DevTask1-API-REQ-Wrapper.js`
7. `Js7-DevTask2-API-REQ-Wrapper2.js`

---

## Why This Order

- first feel callback nesting
- then convert that pain into promises
- then see how errors travel
- then rewrite into async/await
- then compare performance behavior
- then move to production-style wrapper tasks

---

## What To Focus On In Each File

- `Js1CallBack-Task.js`:
  control flow and nested callbacks.
- `Js2CallBack-to-Primise.js`:
  promise conversion and chaining.
- `Js3-Err-Propogation.js`:
  nearest catch behavior and skipped steps.
- `Js4-PromiseToAsynchAwait.js`:
  readability upgrade using `await`.
- `Js5-SequentialVsParallel.js`:
  performance mindset.
- `Js6-DevTask1-API-REQ-Wrapper.js`, `Js7-DevTask2-API-REQ-Wrapper2.js`:
  reusable request design, error handling, timeout/retry style thinking.

---

## Must Be Able To Say Without Looking

- callback hell is about readability and control
- promise chaining is cleaner because each step returns a new promise
- `await` pauses inside an async function, not the whole JavaScript engine
- `Promise.all` is for parallel success-or-fail-together behavior
- request wrappers exist to keep API handling consistent

---

## Done When

- you can convert one async style into another
- you can explain where the error will land
- you can compare sequential vs parallel without confusion
