# 🧠 EVENT LOOP — 0 → HERO (FULL MASTER NOTES)

---

# 🔰 0. WHY EVENT LOOP EXISTS

JavaScript is **single-threaded** → executes one task at a time.

### ❌ Problem

- API calls take time
- Timers take time
- Async operations delay execution
- If JS waits → UI freezes

### ✅ Solution

👉 **Event Loop enables non-blocking async execution**

### 🎯 Interview Line

> “JavaScript uses the Event Loop to handle asynchronous operations without blocking the main thread.”

---

# 🧩 1. CORE SYSTEM (MENTAL MODEL)

```
[ CALL STACK ]   → Executes sync code
[ WEB APIs ]     → Handles async work
[ QUEUES ]       → Stores completed async callbacks
[ EVENT LOOP ]   → Manages execution flow
```

---

# 🔄 2. COMPLETE EXECUTION FLOW

```
1. Code starts → goes to CALL STACK

2. Async operation detected:
   - setTimeout
   - fetch
   - event listeners

→ moved to WEB APIs

3. After completion:
→ pushed to QUEUES:
   - Microtask Queue (Promises)
   - Macrotask Queue (Timers)

4. Event Loop checks:
   "Is Call Stack empty?"

YES →
   Execute ALL Microtasks
   Execute ONE Macrotask

Repeat 🔁
```

## Note Important to know

# 🧠 PROMISE, FETCH, TIMERS & EVENT LISTENERS — QUICK NOTES

---

## ⚡ CORE IDEA

- JavaScript uses:
  - **Microtask Queue → Promises**
  - **Macrotask Queue → Timers & Events**

---

## 🔹 PROMISE (Direct)

```js
Promise.resolve().then(() => console.log("A"));
```

- No Web API involved
- `.then()` → **Microtask Queue**

✔ Rule:

> Promise callbacks → Microtask Queue

---

## 🌐 FETCH (API CALL)

```js
fetch(url).then((res) => console.log(res));
```

### Flow:

```
fetch() →
  Web API (network request) →
    Promise resolved →
      .then() → Microtask Queue
```

✔ Rule:

> fetch uses Web API, but its `.then()` runs in Microtask Queue

---

## 🕒 TIMER (setTimeout)

```js
setTimeout(() => console.log("B"), 0);
```

### Flow:

```
setTimeout →
  Web API (timer) →
    callback → Macrotask Queue
```

✔ Rule:

> Timers → Macrotask Queue

---

## 🖱️ EVENT LISTENER (User Events)

```js
button.addEventListener("click", () => console.log("Click"));
```

### Flow:

```
Event happens (click) →
  Web API →
    callback → Macrotask Queue →
      Event Loop → Call Stack
```

✔ Rule:

> Event listeners → Macrotask Queue (when triggered)

---

## ⚖️ COMPARISON

| Case            | Web API | Queue Type        |
| --------------- | ------- | ----------------- |
| Promise.resolve | ❌ No   | Microtask         |
| fetch           | ✔ Yes   | Microtask (.then) |
| setTimeout      | ✔ Yes   | Macrotask         |
| Event Listener  | ✔ Yes   | Macrotask         |

---

## 🧠 FINAL RULE

```
Promise → Microtaskmtlb
fetch   → Web API → Microtask
Timer   → Web API → Macrotask
Event   → Web API → Macrotask
```

---

## 🎯 INTERVIEW LINE

> Promises (including fetch) run in the microtask queue, while timers and event listeners run in the macrotask queue via Web APIs.

---

---

# 📊 3. FULL VISUAL DIAGRAM

```
        ┌───────────────┐
        │   CALL STACK  │
        └──────┬────────┘
               │
       (async detected)
               ↓
        ┌───────────────┐
        │    WEB APIs   │
        └──────┬────────┘
               ↓
     ┌──────────────────────┐
     │       QUEUES         │
     │  ┌───────────────┐   │
     │  │ Microtask Q   │   │ ← Promises (High Priority) - run all task once started executing
     │  └───────────────┘   │
     │  ┌───────────────┐   │
     │  │ Macrotask Q   │   │ ← Timers  (Low Priority) run only one task per cycle 
     │  └───────────────┘   │
     └─────────┬────────────┘
               ↓
        EVENT LOOP
```

---

# ⚙️ 4. COMPONENTS (DETAILED)

## 🧱 CALL STACK

- Executes synchronous code
- Follows **LIFO (Last In First Out)**

### Example

```
main()
 ├── console.log("A")
 ├── fn1()
 │    └── fn2()
```

### Key Insight

- Runs **all sync code first**
- Nothing async executes until stack is empty

---

## 🌐 WEB APIs

- Provided by browser (or Node runtime)
- Handles:
  - setTimeout
  - fetch
  - DOM events

### Key Insight

> Async work is handled outside JS engine

//means fetch, settimeout, events goes to web api / node api and run by browser or node env then the callback goes to callback queue and then stacl

---

## ⚡ MICROTASK QUEUE (HIGH PRIORITY)

### Contains:

- Promise.then / catch / finally
- queueMicrotask 
👉 A function that schedules a callback in the microtask queue, so it runs after current code finishes but before setTimeout/macrotasks.

- MutationObserver ( browser APIs)
👉 A browser API used to watch DOM changes (add/remove/update elements) and run a callback when changes happen.

### Rules:

- Runs **after stack becomes empty**
- Executes **ALL items completely**

### Key Insight

> Microtasks always run before macrotasks

---

## 🕒 MACROTASK QUEUE (LOW PRIORITY)

### Contains:

- setTimeout
- setInterval
- DOM events

### Rules:

- Executes **after microtasks**
- Only **ONE per cycle**

---

# 🧠 5. CORE EXECUTION RULE (MOST IMPORTANT)

```
CALL STACK EMPTY →
   RUN ALL MICROTASKS →
      RUN ONE MACROTASK →
         REPEAT
```

---

# 🧠 6. MEMORY SHORTCUT

```
SYNC → MICRO (ALL) → MACRO (ONE) → LOOP
```

---

# 🔍 7. EXECUTION SIMULATION (BASIC)

## Example 1

```js
console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve().then(() => console.log("C"));

console.log("D");
```

### Step-by-step

```
STACK:
A → print
setTimeout → Web API
Promise → Microtask Queue
D → print
```

```
Stack empty
```

```
Microtask:
C → print
```

```
Macrotask:
B → print
```

### ✅ OUTPUT

```
A
D
C
B
```

---

# 🔥 8. ADVANCED EXECUTION

## Example 2

```js
setTimeout(() => console.log("A"), 0);

Promise.resolve().then(() => {
  console.log("B");
  setTimeout(() => console.log("C"), 0);
});

console.log("D");
```

### Flow

```
STACK:
D → print
setTimeout(A) → Web API
Promise → Microtask Queue
```

```
Microtask:
B → print
setTimeout(C) → queued AFTER A
```

```
Macrotask:
A → print
C → print
```

### ✅ OUTPUT

```
D
B
A
C
```

---

# 🔥 9. INTERVIEW-LEVEL CASES

## Case 1

```js
console.log(1);

setTimeout(() => console.log(2));

Promise.resolve().then(() => console.log(3));

Promise.resolve().then(() => {
  console.log(4);
  setTimeout(() => console.log(5));
});

console.log(6);
```

### ✅ OUTPUT

```
1
6
3
4
2
5
```

---

## Case 2

```js
setTimeout(() => console.log("A"));

Promise.resolve().then(() => {
  console.log("B");
  Promise.resolve().then(() => console.log("C"));
});

console.log("D");
```

### ✅ OUTPUT

```
D
B
C
A
```

# 🧠 EVENT LOOP — ADVANCED CASES (WITH REASONING)

---

## ⚠️ Q1 — Microtask inside Macrotask

```js
setTimeout(() => {
  console.log("A");
  Promise.resolve().then(() => console.log("B"));
}, 0);

setTimeout(() => console.log("C"), 0);

console.log("D");
```

---

## 🧩 Execution

### Step 1 — Sync code

```
console.log("D") → D
```

Timers go to **Macrotask Queue**:

```
setTimeout(A) → queued
setTimeout(C) → queued
```

---

### Step 2 — Event Loop starts

#### 🕒 First Macrotask → A

```
A → print
Promise → goes to Microtask Queue
```

---

### Step 3 — Microtask runs immediately

```
B → print
```

---

### Step 4 — Next Macrotask

```
C → print
```

---

## ✅ FINAL OUTPUT

```
D
A
B
C
```

---

## 🔥 KEY LEARNING

```text
Microtasks inside a macrotask run BEFORE the next macrotask
```

---

---

# ⚠️ Q2 — Nested Async (Macro → Micro → Macro)

```js
setTimeout(() => {
  console.log("A");
  Promise.resolve().then(() => {
    console.log("B");
    setTimeout(() => console.log("C"), 0);
  });
}, 0);

console.log("D");
```

---

## 🧩 Execution

### Step 1 — Sync

```
D → print
```

Macrotask queue:

```
setTimeout(A)
```

---

### Step 2 — First Macrotask

```
A → print
Promise → Microtask Queue
```

---

### Step 3 — Microtask

```
B → print
setTimeout(C) → goes to Macrotask Queue
```

---

### Step 4 — Next Macrotask

```
C → print
```

---

## ✅ FINAL OUTPUT

```
D
A
B
C
```

---

## 🔥 KEY LEARNING

```text
New macrotasks added inside microtasks go to the END of macrotask queue
```

---

# 🧠 FINAL SUMMARY

```text
Macrotask runs → then ALL microtasks → then next macrotask
```

```text
Microtasks always get priority over macrotasks
```

---
# 🧠 Q3 — Promise Chaining vs setTimeout

```js
Promise.resolve().then(() => {
  console.log("A");
  return Promise.resolve();
}).then(() => {
  console.log("B");
  return Promise.resolve();
}).then(() => {
  console.log("C");
});

setTimeout(() => console.log("D"), 0);

console.log("E");
```

---

## 🧩 Execution (short)

### 1️⃣ Sync

```text
E → print
```

---

### 2️⃣ Microtasks (Promise chain)

Each `.then()` runs **one by one** as microtasks:

```text
A → print
B → print
C → print
```

👉 because:

```text
each .then schedules the next microtask
```

---

### 3️⃣ Macrotask

```text
D → print
```

---

## ✅ FINAL OUTPUT

```text
E
A
B
C
D
```

---

## 🔥 Key Idea

```text
Promise chain = continuous microtasks
→ all finish before any setTimeout
```
# 🧠 Q4 — Mixed Microtasks & Macrotasks

```js
setTimeout(() => console.log("A"), 0);

Promise.resolve().then(() => {
  console.log("B");
  setTimeout(() => console.log("C"), 0);
});

setTimeout(() => console.log("D"), 0);

Promise.resolve().then(() => console.log("E"));

console.log("F");
```

---

## 🧠 STEP 1 — Sync phase

```text
F
```

Queues now:

```text
Microtask: B, E
Macrotask: A, D
```

---

## 🧠 STEP 2 — Microtasks (ALL)

First:

```text
B
```

👉 Inside B:

```js
setTimeout(() => console.log("C"), 0);
```

❗ Goes to macrotask queue **after existing tasks**

```text
Macrotask: A, D, C
```

Next microtask:

```text
E
```

---

## 🧠 STEP 3 — Macrotasks

```text
A
D
C
```

---

## ✅ FINAL OUTPUT

```text
F
B
E
A
D
C
```

---

# 🧠 Q5 — Event Loop with Event-style Macrotask

```js
console.log("Start");

setTimeout(() => {
  console.log("Click Handler");
  Promise.resolve().then(() => console.log("Micro inside Event"));
}, 0);

Promise.resolve().then(() => console.log("Global Micro"));

console.log("End");
```

---

## 🧠 STEP 1 — Sync phase

```text
Start
End
```

Queues:

```text
Microtask: Global Micro
Macrotask: Click Handler
```

---

## 🧠 STEP 2 — Microtasks

```text
Global Micro
```

---

## 🧠 STEP 3 — Macrotask

```text
Click Handler
```

👉 Inside it:

```js
Promise.resolve().then(...)
```

➡ goes to **Microtask queue**

---

## 🧠 STEP 4 — Microtask (after macrotask)

```text
Micro inside Event
```

---

## ✅ FINAL OUTPUT

```text
Start
End
Global Micro
Click Handler
Micro inside Event
```

---

# 🔥 FINAL LEARNING

```text
After every macrotask → ALL microtasks run before next macrotask
```


---

# ⚠️ 10. CRITICAL CONCEPTS (IMPORTANT)

## ❗ setTimeout(0) ≠ Immediate

- Still goes to macrotask queue
- Must wait for microtasks

---

## ❗ Microtask Starvation

```js
function loop() {
  Promise.resolve().then(loop);
}
loop();
```

### Result:

- Infinite microtasks
- Macrotasks never run
- UI freeze

---

## ❗ Promise Chaining

```js
Promise.resolve()
  .then(() => console.log(1))
  .then(() => console.log(2));
```

### Insight:

- Entire chain stays in microtask queue
- Executes continuously before macrotasks

---

# 🌍 11. REAL-WORLD CONNECTION

| Feature       | Uses Queue                  |
| ------------- | --------------------------- |
| Debounce      | Macrotask                   |
| API `.then()` | Microtask                   |
| UI updates    | Blocked by heavy microtasks |  (Run JS → Clear Microtasks → Render UI → Next cycle) browser uopdate cycle

---

# 🎯 12. INTERVIEW QUESTIONS

## Q1: Why Promise runs before setTimeout?

→ Because **Microtask > Macrotask**

---

## Q2: Both delay = 0?

→ Promise executes first

---

## Q3: Can Event Loop block?

→ Yes:

- Infinite loop
- Microtask starvation

---

## Q4: Difference

| Feature  | Microtask | Macrotask  |
| -------- | --------- | ---------- |
| Priority | High      | Low        |
| Runs     | Immediate | Later      |
| Example  | Promise   | setTimeout |

---

# 🧪 13. PRACTICE TASKS

## Task 1

- 2 Promises
- 2 setTimeout
- 2 console logs
  → Predict output

---

## Task 2

```
Promise → setTimeout → Promise
```

→ Track movement across queues

---

## Task 3

Explain clearly:
”
> “How JavaScript handles async despite being single-threaded?

---

# 🏁 14. FINAL INTERVIEW ANSWER

> “JavaScript is single-threaded and uses the event loop to manage asynchronous operations. It executes synchronous code using the call stack, while async operations are handled by Web APIs. Once completed, callbacks are placed into microtask or macrotask queues. The event loop processes all microtasks first, then one macrotask, and continues this cycle.”

---

# ✅ 15. FINAL LEVEL CHECK

You are interview-ready if you can:

- Predict output of any async code
- Explain execution step-by-step
- Handle nested async scenarios confidently

---
