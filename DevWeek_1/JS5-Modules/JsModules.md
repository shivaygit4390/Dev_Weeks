# JS MODULES — COMPLETE NOTES (0 → INTERVIEW READY)

---

# 1. WHY JS MODULES EXIST (REAL PURPOSE)

Without modules:

* Everything lives in one file
* All variables/functions share same global scope
* Any part of code can modify anything
* Code becomes tightly coupled

Problems:

* ❌ Global scope pollution
* ❌ Hard debugging
* ❌ No scalability
* ❌ Low reusability

With modules:

* Each file has its own scope
* Only selected things are exposed
* Code becomes predictable and maintainable

👉 Core idea:
**“Control what is visible and what is hidden”**

👉 Mini Example:

```js
// user.js
let user = "Impakable"; // private

export function getUser() {
  return user;
}
```

Outside world **cannot directly modify `user`**

---

# 2. CORE MENTAL MODEL (MOST IMPORTANT)

Every module answers 2 questions:

1. What should this file expose?
2. What should remain private?

👉 Think like this:

> “What does the outside world NEED from this file?”

NOT:

> “What does this file have?”

👉 Example Thinking:

```js
// WRONG thinking
export everything

// RIGHT thinking
export only what is needed
```

---

# 3. MODULE = ENCAPSULATION (CRITICAL CONCEPT)

Modules are not just file splitting.

They give:

* Data hiding
* Controlled access
* Separation of concerns

Example concept:

* token should NOT be directly accessible
* only functions should control it

👉 Example:

```js
let token = null; // private

export function setToken(t) {
  token = t;
}

export function getToken() {
  return token;
}
```

👉 This is:
**Encapsulation using modules + closures**

---

# 4. TYPES OF EXPORTS (WHAT YOU MUST KNOW)

## Named Export

👉 Example:

```js
// math.js
export const add = (a, b) => a + b;
export const sub = (a, b) => a - b;
```

Import:

```js
import { add, sub } from "./math.js";
```

---

## Default Export

👉 Example:

```js
// logger.js
export default function log(msg) {
  console.log(msg);
}
```

Import:

```js
import log from "./logger.js";
```

---

## Mixed Export

👉 Example:

```js
export default function main() {}
export const helper = () => {};
```

---

## Rename Import

```js
import { add as sum } from "./math.js";
```

---

## Import All

```js
import * as math from "./math.js";

math.add(2, 3);
```

---

# 5. WHEN TO USE WHAT (IMPORTANT DECISION SKILL)

Use **Named Export** when:

* file has multiple utilities
* functions are independent

👉 Example:

```js
export function formatDate() {}
export function formatCurrency() {}
```

---

Use **Default Export** when:

* file represents one main thing

👉 Example:

```js
export default function apiService() {}
```

---

👉 Interview line:

> “I use named exports for utility collections and default export when a module represents a single responsibility.”

---

# 6. MODULE DESIGN PRINCIPLES (HIGH VALUE)

## Principle 1: Single Responsibility

Each module should do ONE thing only

👉 Example:

```js
// ❌ bad
auth + api + UI in one file

// ✅ good
auth.js
api.js
ui.js
```

---

## Principle 2: Minimal Exposure

👉 Example:

```js
// ❌ bad
export let token;

// ✅ good
export function getToken() {}
```

---

## Principle 3: Private by Default

```js
let data = {}; // private
```

Only exported things are public

---

## Principle 4: Predictable API

```js
// clear naming
export function fetchUser() {}
```

---

## Principle 5: Reusability

```js
// reusable anywhere
export function formatDate() {}
```

---

# 7. FOLDER STRUCTURE THINKING (VERY IMPORTANT)

Basic:

```
/utils
/services
/components
```

For your level:

```
/utils
  debounce.js
  throttle.js
  api.js
  token.js
```

👉 Example usage:

```js
import { debounce } from "./utils/debounce.js";
```

---

# 8. RE-EXPORT PATTERN (CLEAN ARCHITECTURE)

👉 Example:

```js
// utils/index.js
export { debounce } from "./debounce.js";
export { throttle } from "./throttle.js";
```

Now:

```js
import { debounce, throttle } from "./utils/index.js";
```

👉 Cleaner imports

---

# 9. COMMON MISTAKES (MUST AVOID)

## 1. Wrong import/export type

```js
// ❌ wrong
import { log } from "./logger.js";

// ✅ correct
import log from "./logger.js";
```

---

## 2. Forgetting file extensions

```js
// ❌ wrong
import { add } from "./math";

// ✅ correct
import { add } from "./math.js";
```

---

## 3. Over-exporting

```js
// ❌ exposing everything
export let data;
```

---

## 4. Mixing responsibilities

```js
// ❌ one file doing everything
```

---

## 5. Circular dependency

```js
// A → B → A (avoid)
```

---

# 10. BROWSER VS NODE (INTERVIEW TRAP)

## Browser

```html
<script type="module" src="index.js"></script>
```

---

## Node

```json
{
  "type": "module"
}
```

---

# 11. MODULES + REAL PROJECTS (IMPORTANT)

Where modules are used:

* API layer
* utilities
* services
* configs

👉 Example:

```js
import api from "./services/api.js";
import { debounce } from "./utils/debounce.js";
```

---

# 12. JSDOC (CLEAN CODE PRACTICE)

👉 Example:

```js
/**
 * Formats a number into currency
 * @param {number} amount
 * @returns {string}
 */
export function formatCurrency(amount) {}
```

---

# 13. HOW INTERVIEWERS TEST THIS

They don’t ask syntax.

They ask:

* “How did you structure your project?”
* “How do you keep things private?”

👉 You answer with examples from your project

---

# 14. WHAT YOU SHOULD BE ABLE TO EXPLAIN

You must clearly say:

1. Why modules are used
2. Difference between named and default export
3. How you structured your utilities
4. How you ensured encapsulation
5. How you avoided global scope issues

---

# 15. ADVANCED AWARENESS (ENOUGH FOR 6 LPA)

You should know:

```js
// imports are hoisted
import { x } from "./file.js";
```

```js
// module runs once (cached)
```

---

# 16. FINAL LEVEL CHECK (SELF TEST)

Q1: Why not expose token directly?
→ uncontrolled mutation

Q2: When to use default export?
→ single responsibility

Q3: Why re-export?
→ cleaner imports

Q4: What problem modules solve?
→ scope + structure

---

# 17. YOUR TASK (MANDATORY IMPLEMENTATION)

1. Create proper module structure
2. Separate utilities into files
3. Export only required functions
4. Import cleanly
5. Add JSDoc
6. Create central export file

---

# FINAL VERDICT

If you understand:

* structure
* encapsulation
* export/import patterns
* real usage

👉 You are **fully sufficient for 5–6 LPA level (for modules)**

---
