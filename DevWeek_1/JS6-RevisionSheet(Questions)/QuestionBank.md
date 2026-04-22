# 🧠 FULL JAVASCRIPT INTERVIEW QUESTION BANK (0 → 6 LPA+ LEVEL) — SUPERSET UPGRADE

**(No solutions — only high-quality, real interview questions, scenarios, traps)**
**(Base preserved from your sheet )**
**(Only: redundancy reduced + missing areas added — nothing removed unnecessarily)**

---

# 🔹 1. EXECUTION CONTEXT, SCOPE, HOISTING

### Core + Trap Questions

* Explain how execution context is created step-by-step.
* What happens in memory phase vs execution phase?
* Output:

```js
console.log(a);
var a = 10;
```

```js
console.log(a);
let a = 10;
```

* Why does `let/const` cause TDZ error but `var` does not?
* What is Temporal Dead Zone? Real scenario where it breaks code.
* Difference between global scope, function scope, block scope.

### Scenario

* You declared a variable in a loop using `var` and got unexpected output. Why?
* Fix closure issue in loops (classic interview trap).

---

# 🔹 2. FUNCTIONS + CLOSURES (MERGED — REDUNDANCY REMOVED)

### Core

* What is closure? Explain with memory reference (not definition).
* Where are closures stored internally?
* When does closure cause memory leak?

### Practical

* Create a function that remembers previous values (closure-based cache).
* Build a private variable using closure.
* Token manager (real-world mapping)

### Traps

```js
function x() {
  var a = 10;
  return function y() {
    console.log(a);
  };
}
x()();
```

* Modify above so value changes dynamically.

### Scenario

* Where did you use closures in your project? (auth/token encapsulation)

---

# 🔹 3. `this` KEYWORD (HIGHLY ASKED)

### Core

* What determines value of `this`?
* Difference between arrow vs normal function for `this`.

### Output

```js
const obj = {
  name: "A",
  getName: function() {
    return this.name;
  }
};
console.log(obj.getName());
```

```js
const obj = {
  name: "A",
  getName: () => {
    return this.name;
  }
};
console.log(obj.getName());
```

### Advanced

* What happens to `this` inside nested functions?
* How to fix `this` loss?

### Scenario

* Explain real bug caused due to wrong `this` in React/JS.

---

# 🔹 4. PROTOTYPES & INHERITANCE

### Core

* What is prototype chain?
* Difference between `__proto__` and `prototype`.

### Practical

* Create inheritance using prototype.
* What happens when property is not found on object?

### Trap

```js
function Person(name) {
  this.name = name;
}
Person.prototype.say = function() {
  return this.name;
};

const p1 = new Person("A");
```

* Where is `say` stored?

### Scenario

* Why JS is prototype-based, not class-based?

---

# 🔹 5. OBJECTS (UPGRADED — NO REMOVAL, ONLY ADDITIONS)

### Core

* Difference: shallow vs deep copy
* How does spread operator behave with nested objects?

### Practical

* Clone deeply nested object.

### Trap

```js
const a = { x: 1 };
const b = a;
b.x = 2;
console.log(a.x);
```

### 🔥 Added (Missing Area Implemented)

* `structuredClone` vs `JSON.parse(JSON.stringify())`
* Circular reference issue
* Functions & Date objects behavior in deep copy

### Scenario

* Prevent mutation in large-scale apps.

---

# 🔹 6. ARRAYS (CRITICAL)

### Core

* Difference between `map`, `filter`, `reduce`.

### Practical

* Convert array → object using `reduce`
* Flatten nested array

### Chaining

```js
[1,2,3,4]
  .filter(...)
  .map(...)
  .reduce(...)
```

### Trap

* Write `reduce` equivalent of `map`
* Write `reduce` equivalent of `filter`

### Scenario

* Optimize large dataset transformation

---

# 🔹 7. EVENT LOOP (UNCHANGED — PERFECT)

### Core

* Explain call stack, microtask queue, macrotask queue.

---

# 🔹 8. PROMISES & ASYNC/AWAIT (UPGRADED)

### Core

* States of promise
* Difference between `.then()` vs `async/await`

### Practical

* Convert promise chain → async/await

### Trap

```js
async function test() {
  return Promise.resolve(10);
}
test().then(console.log);
```

### Error Handling

* Difference between `throw` and `reject`

### 🔥 Added (Async Edge Cases)

* `Promise.all` vs `Promise.allSettled` vs `Promise.race`
* What happens if one promise fails in `Promise.all`
* Sequential vs parallel execution mistake

### Scenario

* Retry failed API call
* Handle multiple API calls efficiently

---

# 🔹 9. API HANDLING (REAL PROJECT LEVEL — UPGRADED)

### Practical Task

* Build API wrapper with:

  * retry
  * timeout
  * abort

### Scenario

* Handle slow API response
* Prevent duplicate API calls

### Trap

* What happens if timeout + retry both trigger?

### 🔥 Added (Auth + Real-world Layer)

* Token expiry handling
* Refresh token flow (high-level)
* Race condition in multiple API calls
* Request cancellation vs ignoring response

---

# 🔹 10. EVENT HANDLING + BROWSER APIs (NEW — ADDED)

### Core

* Difference: `addEventListener` vs `onclick`
* Event bubbling vs capturing

### 🔥 Added

* Passive event listeners
* `once` option
* capture flag usage
* Event listener cleanup (important in React)

### Scenario

* Memory leak due to event listeners

---

# 🔹 11. DEBOUNCE / THROTTLE (KEPT SINGLE — NO DUPLICATION)

### Questions

* Difference between debounce and throttle
* When to use each?

### Practical

* Implement debounce
* Implement throttle

### Scenario

* Search bar optimization
* Scroll performance

---

# 🔹 12. ERROR HANDLING

### Core

* try/catch/finally flow

### Async Trap

```js
try {
  await fetchData();
} catch(e) {
  console.log(e);
}
```

* When will this fail?

### Scenario

* Centralized error handling system

---

# 🔹 13. MODULES

### Core

* Default vs named export

### Scenario

* Central utility file

### Trap

* Import mismatch errors

---

# 🔹 14. MEMORY & PERFORMANCE (TRIMMED THEORY)

### Core

* Garbage collection basics (awareness level)

### Scenario

* Memory leak due to closure

### Optimization

* Avoid unnecessary re-renders / heavy loops

---

# 🔹 15. POLYFILLS (TRIMMED — AS PER ANALYSIS)

### Tasks

* Write polyfill for:

  * `map`
  * `filter`
  * `reduce`
  * `bind`

---

# 🔹 16. CURRYING & FUNCTIONAL JS

### Questions

* What is currying?
* Convert function to curried version

---

# 🔹 17. ES6+ PRACTICAL USAGE (NEW GROUPED)

* Template literals
* Optional chaining
* Nullish coalescing
* Destructuring pitfalls
* Dynamic object keys

---

# 🔹 18. FUNCTION EDGE CASES (NEW)

* `arguments` object
* rest vs arguments
* default params behavior
* function.length property

---

# 🔹 19. DEBUGGING SCENARIOS (UPGRADED)

* API working in Postman but not frontend — why?
* Event not triggering — possible reasons?
* State not updating — why?

### 🔥 Added

* console.table usage
* console.time debugging
* Network tab basics
* async not awaited → undefined UI bug

---

# 🔹 20. REAL PROJECT SCENARIOS (VERY IMPORTANT)

* How did you handle authentication securely?
* How did you prevent token misuse?
* How did you handle payment success/failure (Razorpay)?
* How did you manage API errors in production?
* How did you structure frontend utilities?

---

# 🔹 21. NUMBERS & MATH EDGE CASES (NEW)

* Why `0.1 + 0.2 !== 0.3`
* `parseInt` vs `Number`
* `isNaN` vs `Number.isNaN`

---

# 🔹 22. RAPID FIRE (QUICK FILTER)

* `==` vs `===`
* `null` vs `undefined`
* `NaN === NaN` ?
* typeof null?
* is array?

---

# 🔹 FINAL NOTE

If you can:

* Solve 70% of above
* Explain clearly
* Handle 2–3 scenarios confidently

👉 You are **interview ready for 5–6+ LPA JS rounds**

---
