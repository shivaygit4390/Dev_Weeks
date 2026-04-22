## ⚡ Debounce vs Throttle — Interview Notes

---

### 🧠 Core Theory

Debounce and Throttle are performance optimization techniques used to control how frequently a function executes when triggered multiple times.

Used in events like:

* Typing (input fields)
* Scrolling
* Resizing

---

## 🔵 Debounce

### 📖 Definition

Debounce delays execution of a function until a specified time has passed after the last trigger.

---

### ⚙️ How it Works

* Every call resets the timer
* Function runs only when calls stop

Behavior:

```
call → cancel
call → cancel
call → cancel
(stop) → RUN once
```

---

### 🎯 Purpose

* Avoid unnecessary repeated execution
* Run function only after user finishes action

---

### 💡 Use Case — Search Bar

User types:

```
a → ab → abc → abcd
```

Problem:

* API call on every keystroke

Solution:

* Wait until user stops typing → then call API

---

### 🧾 Interview Line

Debounce delays execution until the user stops triggering the event, making it ideal for search inputs and reducing unnecessary API calls.

---

## 🟠 Throttle

### 📖 Definition

Throttle ensures a function executes at most once within a fixed time interval.

---

### ⚙️ How it Works

* First call runs immediately
* Further calls are ignored during delay
* After delay, next call is allowed

Behavior:

```
call → RUN
call → ignored
call → ignored
(after delay)
call → RUN
```

---

### 🎯 Purpose

* Limit execution frequency
* Prevent performance issues in continuous events

---

### 💡 Use Case — Scroll Event

User scrolls continuously

Problem:

* Function runs hundreds of times

Solution:

* Execute function at fixed intervals

---

### 🧾 Interview Line

Throttle limits how often a function runs by allowing execution only once per interval, making it useful for scroll and resize events.

---

## 🔥 Key Difference

| Feature   | Debounce       | Throttle               |
| --------- | -------------- | ---------------------- |
| Execution | After stop     | At intervals           |
| Behavior  | Only last call | First call in interval |
| Use Case  | Search input   | Scroll/resize          |

---

## 🧠 Quick Memory

* Debounce → run after user stops
* Throttle → run at intervals while user continues

---

## 🎯 Final Interview Answer

Debounce delays execution until the user stops triggering the event, which is useful for search inputs and form handling. Throttle limits execution to once per interval, which is useful for continuous events like scrolling and resizing.

---

## 🚀 Backend Perspective (Important)

Even in backend systems, these concepts are used indirectly:

* Debounce concept → batching requests (e.g., wait before hitting DB)
* Throttle concept → rate limiting (e.g., allow X requests per second)

Examples:

* API rate limiter (Throttle)
* Job queue batching (Debounce-like behavior)
* Preventing spam requests from client

Interview Line:
“On backend, throttle is similar to rate limiting where we restrict request frequency, while debounce-like logic can be used in batching or delaying operations to reduce load.”

---

## ✅ Your Level Check

You are ready if you can:

* Explain both clearly
* Give real-world + backend examples
* Write both implementations

---

Done — Interview Ready
