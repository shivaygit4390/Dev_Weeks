# ASYNC JAVASCRIPT — 0 → HERO (INTERVIEW + PRODUCTION READY)

---

# 0. CORE MINDSET (READ THIS FIRST)

JavaScript async is NOT about syntax.
It is about **handling values that arrive later**.

> “I don’t have the data now, but I will get it in the future.”

Everything (callbacks, promises, async/await) is just **different ways to manage that delay**.

---
# 1. CALLBACKS (WHERE PROBLEM STARTS)

## What is a callback?

A function you pass so it runs **later**.

```js
function fetchData(callback) {
  setTimeout(() => {
    callback("data");
  }, 1000);
}
```

Usage:

```js
fetchData((data) => {
  console.log(data);
});
```

---

## WHY CALLBACKS BECOME A PROBLEM

### Scenario: Real app flow

You need:

1. login
2. get user
3. get orders

---

### Callback version (PAIN)

```js
login((user) => {
  getUser(user, (details) => {
    getOrders(details, (orders) => {
      console.log(orders);
    });
  });
});
```

---

## PROBLEMS YOU MUST UNDERSTAND

1. ❌ Nested (hard to read)
2. ❌ Error handling scattered
3. ❌ Control lost (callback decides flow)

---

## WHY PROMISES WERE INTRODUCED

> To make async flow **linear, predictable, and controllable**

---

## TASK 1 (MANDATORY — PROPERLY FRAMED)

Create 3 async functions using `setTimeout`:

* `login(cb)`
* `getUser(user, cb)`
* `getOrders(user, cb)`

Then call them in nested form exactly like above.

Goal:

* Feel difficulty in reading and scaling

# 🧠 Callback Parameter Mapping (Quick Notes)

## 🔥 Core Idea

```text
cb(value) → callback ka parameter us value ko receive karta hai
```

---

## 📌 Example

```js
login((user) => {
  console.log(user);
});
```

Inside login:

```js
cb("uid");
```

👉 Mapping:

```text
"user" = "uid"
```

---

## 🧩 General Rule

```text
cb(data) → (param) => {}  → param = data
```

---

## 🔁 Same for all

```js
cb({ id: user, name: "aman" })
→ userdata = { id: "uid", name: "aman" }

cb(["a","b"])
→ orders = ["a","b"]
```

---

## ⚠️ Important

* Parameter name kuch bhi ho sakta hai
* Mapping position se hoti hai, naam se nahi

```js
cb("uid")

(x) => {}  → x = "uid"
(user) => {} → user = "uid"
```

---

## 🧠 One-line memory

```text
Callback me jo pass karte ho, wahi next function ka input ban jata hai
```


---

# 2. PROMISES (SOLUTION LAYER)

## What is a Promise?

An object representing a **future value**.

---

## PROMISE STATES (INTERVIEW MUST)

1. **pending** → initial
2. **fulfilled** → success → `resolve(value)`
3. **rejected** → failure → `reject(error)`

---

## Create Promise

```js
function login() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("user123");
    }, 1000);
  });
}
```

---

## Consume Promise

```js
login()
  .then(user => console.log(user))
  .catch(err => console.log(err));
```

---

## WHY THIS FIXES CALLBACK HELL

Instead of nesting:
👉 You **chain**

---

## CHAINING (VERY IMPORTANT)

```js
login()
  .then(user => getUser(user))
  .then(details => getOrders(details))
  .then(orders => console.log(orders))
  .catch(err => console.log(err));
```

---

## WHAT IS HAPPENING INTERNALLY

* `.then()` returns a **new promise**
* If you return:

  * value → next `.then` gets it
  * promise → waits automatically

---

## TASK 2 (PROPER QUESTION)

Convert Task 1 (callback version) into:

* Functions must return Promises
* Use `.then()` chaining
* Final output → orders

---

# 3. ERROR HANDLING (CRITICAL CONCEPT)

## Promise Error Propagation

```js
login()
  .then(() => {
    throw new Error("failed");
  })
  .then(() => {
    console.log("will not run");
  })
  .catch(err => console.log(err.message));
```

---

## RULE

> Error anywhere → jumps to nearest `.catch()`

---

## TASK 3

Create:

* 3 chained promises
* Force error in 2nd step
* Confirm:

  * 3rd step is skipped
  * catch handles error

---

# 4. ASYNC / AWAIT (SYNTAX UPGRADE)

Async/await = cleaner way to write promises

---

## BASIC

```js
async function run() {
  const user = await login();
  console.log(user);
}
```

---

## CRITICAL RULES (INTERVIEW)

### 1. async ALWAYS returns a promise

```js
async function test() {
  return 10;
}
```

Same as:

```js
Promise.resolve(10);
```

---

### 2. await pauses execution

```js
const data = await fetchData();
```

---

### 3. await only inside async

---

## TASK 4

Rewrite your Promise chain into:

* async function
* use await
* no `.then()`

---

# 5. TRY / CATCH (ERROR HANDLING IN ASYNC)

```js
async function run() {
  try {
    const user = await login();
    const orders = await getOrders(user);
  } catch (err) {
    console.log(err);
  }
}
```

---

## MAPPING

| Promise  | Async/Await |
| -------- | ----------- |
| .catch() | try/catch   |

---

## ERROR PROPAGATION RULE

* If awaited promise fails → throws error
* goes directly to catch block

---

## TASK 5

* Make `getOrders()` fail
* Handle it using try/catch
* Ensure no crash

---

# 6. SEQUENTIAL vs PARALLEL (VERY IMPORTANT)

---

## SEQUENTIAL (SLOW)

```js
const a = await task1();
const b = await task2();
```

Runs one after another

---

## PARALLEL (FAST)

```js
const [a, b] = await Promise.all([
  task1(),
  task2()
]);
```

Runs together

---

## WHY PARALLEL IS FASTER

Because both start at same time instead of waiting

---

## PROMISE.ALL

* Runs all together
* ❌ Fails fast (one fails → all fail)

---

## PROMISE.ALLSETTLED

```js
const results = await Promise.allSettled([p1, p2]);
```

* Always returns results
* Does not fail entire batch

---

## TASK 6 (REAL INTERVIEW LEVEL)

Create:

3 functions:

* `api1()` → 1 sec
* `api2()` → 2 sec
* `api3()` → 3 sec

Do:

1. Sequential execution → measure time
2. Parallel execution → measure time

Goal:

* See real difference

---

# 7. COMMON MISTAKES (IMPORTANT)

---

## ❌ WRONG

```js
await Promise.all([
  await task1(),
  await task2()
]);
```

---

## WHY WRONG

You already waited → no parallelism

---

## ✅ CORRECT

```js
await Promise.all([
  task1(),
  task2()
]);
```

---

# 8. INTERVIEW MASTER CHECKLIST

You must be able to answer:

### Concepts

* What problem do promises solve?
* Promise states?
* Why async/await is better?
* Difference: sequential vs parallel?

---

### Behavior

* What does async return?
* What happens if await fails?
* How errors propagate?

---

### Practical

* When to use Promise.all vs allSettled?
* How to optimize API calls?
* How to handle failures gracefully?

---

# FINAL EXECUTION PLAN (STRICT)

Do in order:

1. Callback hell (feel pain)
2. Convert → Promises
3. Break → error handling
4. Convert → async/await
5. Handle errors → try/catch
6. Sequential vs parallel (measure time)

---

If completed properly:

You will:

* Stop memorizing
* Start reasoning
* Handle real APIs confidently
* Clear 5–6 LPA interviews comfortably

---


MINI DEV TASK 3 — API REQUEST WRAPPER (PROBLEM STATEMENT)
Objective

Design a reusable function that standardizes how your application makes HTTP API requests.

You must ensure:

consistent response format
proper error handling
production-level reliability features (timeout + retry)
PART 1 — CORE REQUIREMENT
Implement a function:
apiRequest(url, options?)
Behavior:

This function should:

Make an HTTP request using fetch
Handle all success and failure cases
Always return a consistent object shape
REQUIRED RETURN FORMAT

Regardless of success or failure, the function must return:

{
  ok: boolean,
  data: any,
  error: string | null,
  status: number
}
RULES (MANDATORY)
1. Handle successful responses

If response status is 2xx:

ok: true
data: parsed JSON
error: null
2. Handle non-2xx responses (VERY IMPORTANT)

If response status is NOT 2xx:

Do NOT treat as success
Extract error message (if possible)
Return:
{
  ok: false,
  data: null,
  error: "error message",
  status: response.status
}
3. Handle network failures

Examples:

no internet
DNS failure
request blocked

Return:

{
  ok: false,
  data: null,
  error: "Network Error",
  status: 0
}


# 🧠 AbortController — Quick Notes

## 📌 What it is

```text
AbortController lets you cancel async operations (mainly fetch requests)
```

---

## 🧩 Why we need it

* User navigates away → cancel request
* Typing search → cancel previous API call
* Avoid unnecessary work / memory leaks

---

## 🔧 Core parts

### 1. controller

```js
const controller = new AbortController();
```

### 2. signal

```js
controller.signal
```

👉 passed into async operation

---

## 🚀 Basic Usage

```js
const controller = new AbortController();

fetch("https://api.example.com/data", {
  signal: controller.signal
})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => {
    if (err.name === "AbortError") {
      console.log("Request cancelled");
    }
  });

// cancel request
controller.abort();
```

---

## 🧠 How it works (internally idea)

```text
controller → creates a signal
signal → attached to fetch
abort() → tells signal to stop
fetch listens → throws AbortError
```

---

## ⚡ Flow

```text
start fetch
   ↓
attach signal
   ↓
call abort()
   ↓
fetch stops
   ↓
catch → AbortError
```

---

## 🔥 Important Points

* `abort()` immediately stops request
* fetch throws error → must handle in `.catch`
* same controller can cancel multiple requests (if reused)

---

## 🧠 Real Example (Search typing)

```js
let controller;

function search(query) {
  if (controller) controller.abort(); // cancel previous

  controller = new AbortController();

  fetch(`/api?q=${query}`, {
    signal: controller.signal
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => {
      if (err.name === "AbortError") return;
      console.error(err);
    });
}
```

---

## 🎯 One-line memory

```text
AbortController = “start request + ability to cancel it anytime”
```
