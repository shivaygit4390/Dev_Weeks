# 📘 JavaScript Interview Master Notes (Deep Core Topics)

---

# 1) VARIABLES (Interview Depth)

## 🔹 What interviewers actually test

* Memory model (stack vs heap)
* Mutability vs immutability
* Reference vs value behavior
* Temporal Dead Zone (TDZ)
* Real bugs understanding

---

## 🔸 Key Concepts

### Primitive vs Reference

* Primitive → copied by value
* Objects/arrays → copied by reference

---

### 🧪 Interview Trap

```js id="varref1"
let a = { x: 1 };
let b = a;
b.x = 2;
```

👉 Output:

```js id="varrefout1"
a.x = 2
b.x = 2
```

---

### 🧠 Answer line:

👉 “Objects are stored in heap and variables hold references, so mutation reflects across copies.”

---

## 🔸 var vs let vs const (real difference)

| Feature   | var             | let       | const     |
| --------- | --------------- | --------- | --------- |
| Scope     | Function        | Block     | Block     |
| Hoisting  | Yes (undefined) | Yes (TDZ) | Yes (TDZ) |
| Reassign  | Yes             | Yes       | No        |
| Redeclare | Yes             | No        | No        |

---

## 🔥 Temporal Dead Zone (VERY IMPORTANT)

```js id="tdz1"
console.log(a);
let a = 10;
```

👉 Output:

```js id="tdzout1"
ReferenceError
```

---

### 🧠 Answer line:

👉 “Variables declared with let/const exist in TDZ until initialization, preventing accidental access.”

---

## 🔸 Const misunderstanding

```js id="const1"
const obj = { a: 1 };
obj.a = 2; // valid
```

👉 const ≠ immutable
👉 only reference is fixed

---

## 🔸 Interview Questions

* Why let preferred over var?
* Explain TDZ with example
* Difference between shallow & deep copy
* Predict output questions

---

# 2) SCOPE (Critical for interviews)

## 🔸 Types of Scope

### 1. Global Scope

Accessible everywhere

---

### 2. Function Scope

```js id="funcscope1"
function test() {
  var a = 10;
}
```

---

### 3. Block Scope (IMPORTANT)

```js id="blockscope1"
if (true) {
  let a = 10;
}
```

---

## 🔸 Lexical Scope (VERY IMPORTANT)

👉 Scope is decided where code is written, not where it runs

```js id="lex1"
function outer() {
  let a = 10;

  function inner() {
    console.log(a);
  }

  return inner;
}
```

👉 inner “remembers” outer scope

---

## 🔸 Scope Chain

JS looks for variable:

1. current scope
2. parent scope
3. global scope

---

## 🔥 Interview Trap

```js id="loopt1"
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

👉 Output:

```js id="looptout1"
3
3
3
```

---

### Fix:

```js id="looptfix1"
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

👉 Output:

```js id="looptout2"
0
1
2
```
## 📘 Interview Trap: var vs let in setTimeout (Execution + Example)

---

## 🔴 Code (var)

```js id="v1"
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

### 👉 Output:

```
3
3
3
```

---

## 🧠 Execution (step-by-step)

### ⚙️ Loop runs instantly:

```
i = 0 → setTimeout scheduled
i = 1 → setTimeout scheduled
i = 2 → setTimeout scheduled
i = 3 → loop ends
```

### ⚠️ Important point:

* `var` → only **one shared i (function scoped)**
* By the time timeout runs → `i = 3`

### ⏰ After 100ms:

```
console.log(i) → 3
console.log(i) → 3
console.log(i) → 3
```

---

## 🟢 Code (let)

```js id="l1"
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

### 👉 Output:

```
0
1
2
```

---

## 🧠 Execution (step-by-step)

### ⚙️ Loop runs:

```
Iteration 1 → i = 0 (new block)
Iteration 2 → i = 1 (new block)
Iteration 3 → i = 2 (new block)
```

### ⚠️ Important point:

* `let` → **new i for every iteration**
* Each timeout captures its own value

### ⏰ After 100ms:

```
console.log(0)
console.log(1)
console.log(2)
```

---

## 🎯 One-line Final Logic

* `var` → single shared variable → final value (3) prints
* `let` → new variable each loop → correct sequence (0,1,2)



---

### 🧠 Answer line:

👉 “var is function scoped so same reference is used; let creates new binding per iteration.”

---

# 3) CLOSURES (MOST IMPORTANT)

## 🔸 Definition (interview-ready)

👉 “A closure is a function that retains access to its lexical scope even after the outer function has executed.”

---

## 🔸 Core Example

```js id="cl1"
function outer() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}
```

👉 count persists → closure

---

## 🔸 Why closures matter

### 1. Data Encapsulation (PRIVATE VARIABLES)

```js id="enc1"
function createCounter() {
  let count = 0;

  return {
    increment: () => ++count,
    get: () => count
  };
}
```

👉 cannot access count directly
//outer var count isnt garbaged in any case either used by inner function or not if inner fn is there it might use it js think that way so it doesnt destroy or auto garbage collect the outer var count.

---

## 🔸 Real-world Use Cases

* React hooks
* Event handlers
* setTimeout / async callbacks
* Memoization
* Module pattern
* Authentication state

---

## 🧠 Interview line

👉 “I used closures to encapsulate state in my AOS Member Portal, for example to manage auth token securely so it cannot be mutated directly.”

---

## 🔥 Advanced Closure Question

```js id="memleak1"
function heavy() {
  let largeData = new Array(1000000);

  return function () {
    console.log("hello");
  };
}
```

👉 largeData never garbage collected as inner function is getting returned by outer fn it might use the outer var array so js think i shouldnt delete it

### 🧠 Explanation:

* returned function keeps lexical scope alive
* so largeData remains in memory
* causes memory leak if repeated

---

## 🔥 Loop + Closure Problem

```js id="loopcl1"
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i));
}
```

---

### Fix using closure:

```js id="loopfix1"
for (var i = 0; i < 3; i++) {
  (function(i) {
    setTimeout(() => console.log(i));
  })(i);
}
```

---

## 🧠 Interview answer

👉 “A closure is formed when a function retains access to variables from its lexical scope even after parent execution completes.”

---

# 4) FUNCTION HOISTING (Complete Coverage)

## 🔸 Definition

👉 “Hoisting is JavaScript’s behavior of moving declarations to the top of scope during creation phase.”

---

## 🔸 Rule

* Declarations hoisted
* Initializations NOT hoisted

---

## 🔸 Function Declaration (Fully Hoisted)

```js id="fd1"
sayHello();

function sayHello() {
  console.log("Hello");
}
```

---

## 🔸 Function Expression (Not fully hoisted)

```js id="fe1"
sayHello();

var sayHello = function () {
  console.log("Hello");
};
```

👉 Error: not a function

---

## 🔸 let/const Function Expression (TDZ)

```js id="fe2"
sayHello();

let sayHello = function () {};
```

👉 ReferenceError

---

## 🔸 Arrow Function

```js id="af1"
sayHello();

const sayHello = () => {};
```

👉 TDZ error

---

## 🔸 Named Function Expression

```js id="nfe1"
const fn = function test() {
  console.log("hello");
};
```

```js id="nfe2"
test(); // ❌ not defined
```

---

## 🔸 Function inside block

```js id="blockfn1"
if (true) {
  function test() {
    console.log("hi");
  }
}
```

---

## 🔸 Hoisting Priority

```js id="prio1"
var a = 1;

function a() {}
console.log(a);
```

👉 Output:

```js id="prioout1"
// 1    here first a = function a(){} hoisted then var a = 1 is overridden
```
# 🔸 Function vs Var (Hoisting Priority) – Quick Notes

## 🔹 Code

```js
var a = 1;

function a() {}

console.log(a);
```

---

## 🔹 What happens internally?

### 🧠 Memory Phase (before execution)

```js
a = function a() {}
```

* Function declaration gets highest priority
* `var a` ignored (already declared)

---

### ⚙️ Execution Phase

```js
a = 1
```

* Variable assignment overwrites function

---

### 🖨️ Output

```text
1
```

---

## 🔹 Key Concept

👉 Function declaration behaves like:

```js
a = function() {}
```

BUT happens in **memory phase (before execution)**

---

## 🔹 Important Rule

```text
function > var (during hoisting)
but
var assignment > function (during execution)
```

---

## 🔹 One-line Summary

👉 Function hoists first, but `var` value overwrites it later.

---

---

## 🔸 REAL INTERVIEW TRAPS

### Trap 1

```js id="t1"
console.log(foo);

var foo = 10;

console.log(foo); //here 10 is printed

function foo() {}

// here fn is printed coz it was not overridden by var s fn hoisted first then var is ignored as fn have the same variable but we have consoled the foo before var foo overrides the foo function 
```

---

### Trap 2

```js id="t2"
foo();

var foo = function () {
  console.log("Hello");
};

function foo() {
  console.log("Hi");
}
```

👉 Output: Hi

---

## 🧠 FINAL SUMMARY

👉 Function declarations are fully hoisted
👉 Function expressions behave like variables
👉 let/const stay in TDZ

---

## 🔥 QUICK COMPARISON

| Type                            | Hoisted | Call Before |
| ------------------------------- | ------- | ----------- |
| Function Declaration            | Full    | Yes         |
| Function Expression (var)       | Partial | No          |
| Function Expression (let/const) | TDZ     | No          |
| Arrow Function                  | TDZ     | No          |

---

## 🎯 FINAL PRACTICE LIST

* Predict outputs:

```js
foo();
function foo() {}
//op -> foo runs as it is fully hoisted

foo();
var foo = function() {};
//  type error as its an expresion and var so only var declaration as undefined and is not a function

foo();
const foo = () => {};
console.log(foo); //never executed
//reference err ayega as const h to tdz me chla gya so cant scess foo befiore initialization


//fn 

function foo() {}
var foo = 10;
console.log(foo);
// op = 10
```

---

# 🧠 FINAL LINE

👉 “JavaScript execution depends on hoisting, scope chain, closures, and memory model (stack + heap).”


# Mini Tasks
1.Create counter (increment/decrement)
2.Token manager (your task)
3.Fix loop timeout issue
4.Write memoization function
5.Private variable using closure