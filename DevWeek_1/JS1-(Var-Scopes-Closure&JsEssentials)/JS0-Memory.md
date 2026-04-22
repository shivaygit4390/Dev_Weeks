## 📘 JavaScript Memory (Stack vs Heap) — Quick Notes

### 🔹 Basic Concept

* JavaScript uses two main memory areas: **Stack** and **Heap**
* Both exist because they serve different purposes

---

### 🧱 Stack (Call Stack)

* Fast memory ⚡
* Stores **primitive values directly**
* Stores **references (addresses)** for non-primitives
* Manages **function calls / execution context**
* Automatically managed (push & pop)

---

### 🧠 Heap

* Large and flexible memory
* Stores **actual data**:

  * Objects
  * Arrays
  * Functions (their code)

---

### 🔸 Primitive vs Non-Primitive

#### ✅ Primitive (Stored in Stack)

* Stored directly
* Copied by value

```js
let a = 10;
let b = a;
b = 20;

console.log(a); // 10
console.log(b); // 20
```

---

#### ✅ Non-Primitive (Stored in Heap)

* Actual data stored in heap
* Stack holds only the **reference (address)**
* Copied by reference

```js
let obj1 = { name: "Aman" };
let obj2 = obj1;

obj2.name = "Rahul";

console.log(obj1.name); // Rahul
```

---

### 🔁 Object Memory Flow

* Object’s **actual data → Heap**
* Object variable **→ Stack (stores reference)**
* Multiple variables can point to the same object

---

### ⚙️ Function Memory Flow

```js
function greet() {
  console.log("Hello");
}

greet();
```

* Function **code → Heap**
* When function is called:

  * An **execution context → pushed to Stack**
  * Removed after execution

---

### 🔸 Function as Variable

```js
let fn = function() {
  console.log("Hi");
};

fn();
```

* Function code → Heap
* Variable `fn` → Stack (stores reference)

---

### ❓ Why Stack and Heap are Separate?

1. **Performance**

   * Stack is fast (for simple data)
   * Heap is flexible (for complex data)

2. **Memory Flexibility**

   * Stack has fixed size
   * Heap is dynamically allocated

3. **Memory Management**

   * Stack is automatically cleaned
   * Heap uses garbage collection

---

### 🎯 Final Summary

* **Stack = primitive values + references + function execution**
* **Heap = actual complex data (objects, arrays, functions)**
* **Rule:** *Stack holds addresses, Heap holds actual data*

---

### 🧠 Final Understanding (Your Line ✔️)

* **Object data → Heap**
* **Object variable (reference) → Stack**
* **Function definition/code → Heap**
* **Function call / execution context → Stack**



## 📘 Garbage Collection in JavaScript — Quick Notes

---

### 🔹 What is Garbage Collection?

* Garbage Collection (GC) is an **automatic memory cleanup process**
* It removes **unused objects from Heap memory**
* Helps prevent memory leaks and keeps apps efficient

---

### 🧠 Why it is needed?

* Heap stores objects, arrays, functions
* If unused objects are not removed → memory keeps increasing 💥
* GC prevents memory overflow by cleaning unused data

---

### 🧱 Example

```js id="gc1"
let obj = { name: "Aman" };

obj = null;
```

---

### ⚙️ Execution Flow

* `{ name: "Aman" }` is stored in Heap
* `obj` was pointing to it
* Then `obj = null`

👉 Now object has **no reference pointing to it**

---

### 🧹 Garbage Collection Rule

* If an object is **unreachable (no references)**
  👉 It becomes garbage
  👉 JS automatically removes it from Heap

---

### 🧠 Simple Logic

* Reachable → keep in memory
* Unreachable → delete from memory

---

### 🏠 Real-life analogy

* Heap = room full of items
* Variables = keys to those items
* No key = useless item → cleaner removes it

---

### ⚙️ Important Points

* GC runs automatically (developer has no control)
* Works only on **Heap memory**
* Stack memory is auto-cleared after function execution
* Uses **reachability algorithm**

---

### 🎯 Final Summary

* Garbage Collection = automatic cleanup of unused Heap memory
* It removes objects that are no longer referenced
* Keeps JavaScript memory efficient and safe

---

### 🧠 One-line memory

👉 “If nothing can reach it, JavaScript deletes it automatically from Heap.”



