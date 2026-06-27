# JS1 Practice Revision Guide

## Goal

This folder turns the `JS1` theory into examples and small developer-style tasks.

---

## Recommended Practice Order

1. `closureEx-1.js`
2. `ClosureEx2.js`
3. `shallowCopyEx.js`
4. `DeepCopy.js`
5. `memoizeFn.js`
6. `MiniTasks.js`
7. `DevTask1-TokenManager.js`
8. `DevTask2-SafeUpdateFunction.js`
9. `suggestedTasks.js`

---

## Why This Order

- first understand closure basics
- then understand copying behavior
- then move to reusable closure patterns like memoization
- then solve real-world flavored tasks

---

## What Each Important File Helps With

- `closureEx-1.js`, `ClosureEx2.js`:
  closure behavior and lexical scope memory.
- `shallowCopyEx.js`, `DeepCopy.js`:
  mutation bugs and cloning behavior.
- `memoizeFn.js`:
  closure-based caching idea.
- `MiniTasks.js`:
  small concept checks.
- `DevTask1-TokenManager.js`:
  private state using closure in a real-world auth-style pattern.
- `DevTask2-SafeUpdateFunction.js`:
  safe state update thinking with data protection mindset.
- `suggestedTasks.js`:
  extra practice only after the above feels stable.

---

## Revision Method

For each file:

1. read function signature
2. guess what private data or copied data is being protected
3. trace the flow
4. close the file and rebuild the idea in `test.js`

---

## Done When

- you can write a simple closure from memory
- you can explain why a nested object still mutates after a shallow copy
- you can describe why the token manager pattern is useful in real apps
