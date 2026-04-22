# ⚡ TypeScript — Practical Basics (Interview + Real Usage)

> Goal: Convert JS → TS confidently + explain usage in interviews (5–6 LPA level)

---

# 1. WHAT IS TYPESCRIPT (REAL UNDERSTANDING)

TypeScript = **JavaScript + Static Type Checking**

* Runs as JavaScript (after compilation)
* Adds **type safety before execution**

### Core Idea:

```js
// JS (no safety)
let age = "20"; // mistake, but no error

// TS (error before running)
let age: number = "20"; // ❌ Type error
```

👉 TS catches bugs **before runtime**

---

# 2. BASIC SYNTAX (YOU MUST KNOW THIS)

## (A) Variables

```ts
let count: number = 10;
const name: string = "Impakable";
let isLoggedIn: boolean = false;
```

### Arrays

```ts
let nums: number[] = [1, 2, 3];
let users: string[] = ["A", "B"];
```

---

## (B) Objects

```ts
let user: { name: string; age: number } = {
  name: "John",
  age: 25
};
```

---

## (C) Functions

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

### Arrow Function

```ts
const greet = (name: string): string => {
  return `Hello ${name}`;
};
```

---

## (D) Optional Parameters

```ts
function log(msg: string, userId?: number) {
  console.log(msg);
}
```

👉 `?` = optional

---

## (E) Default Values

```ts
function greet(name: string = "User"): string {
  return `Hello ${name}`;
}
```

---

# 3. INTERFACES (MOST IMPORTANT)

Used to define **structure of objects**

```ts
interface User {
  name: string;
  age: number;
  email?: string; // optional
}
```

Usage:

```ts
const user: User = {
  name: "Impakable",
  age: 22
};
```

---

## Nested Interface

```ts
interface Address {
  city: string;
  pincode: number;
}

interface User {
  name: string;
  address: Address;
}
```

---

# 4. TYPE vs INTERFACE (INTERVIEW)

```ts
type ID = string | number;
```

👉 Use:

* `interface` → objects
* `type` → unions, flexibility

---

# 5. GENERICS (IMPORTANT FOR API)

### Problem:

Different APIs return different data

### Solution:

```ts
async function apiRequest<T>(url: string): Promise<T> {
  const res = await fetch(url);
  return res.json();
}
```

Usage:

```ts
const user = await apiRequest<User>("/api/user");
```

👉 `T` = dynamic type

---

# 6. JS → TS CONVERSION (CRITICAL SKILL)

## Example JS:

```js
function multiply(a, b) {
  return a * b;
}
```

## Convert to TS:

```ts
function multiply(a: number, b: number): number {
  return a * b;
}
```

---

## Example Object Conversion

JS:

```js
const user = { name: "A", age: 20 };
```

TS:

```ts
interface User {
  name: string;
  age: number;
}

const user: User = { name: "A", age: 20 };
```

---

# 7. REAL PROJECT USE (IMPORTANT)

## (A) API Response Typing

```ts
interface ApiResponse {
  success: boolean;
  data: any;
}
```

Better:

```ts
interface ApiResponse<T> {
  success: boolean;
  data: T;
}
```

---

## (B) React Props

```ts
interface Props {
  name: string;
}

const Comp = ({ name }: Props) => {
  return <div>{name}</div>;
};
```

---

# 8. COMMON KEYWORDS

* `any` → avoid (no safety)
* `unknown` → safer alternative
* `void` → no return
* `Promise<T>` → async return

---

# 9. YOUR INTERVIEW POSITIONING

Say this clearly:

> “I primarily work in JavaScript, but I use TypeScript where needed—mainly for API typing, object structure, and preventing runtime errors.”

---

# 10. DEV TASKS (AS PER ROADMAP)

## 🔧 Task 1 — Convert `tokenManager` to TypeScript

### What to apply:

* token → `string`
* isLoggedIn → `boolean`
* Methods typed

### Expected Thinking:

* Token cannot be number/null randomly
* Only controlled access allowed

---

## 🔧 Task 2 — Type `apiRequest` Return Shape

### What to apply:

* Use `Promise<T>`
* Use generics for flexibility
* Define response structure

### Example Thinking:

* `/user` → returns `User`
* `/products` → returns `Product[]`

👉 Same wrapper, different types

---

# FINAL UNDERSTANDING

You should now be able to:

* Convert JS → TS
* Type functions, objects, APIs
* Use interfaces confidently
* Explain TS in interviews

---

# DONE LEVEL (FOR YOU)

✔ JS strong
✔ TS basics covered
✔ Real use-case understanding

👉 This is enough for 5–6 LPA roles.
