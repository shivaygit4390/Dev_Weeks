# 📘 JavaScript Prototype — Clear Notes

---

## 🔹 Core Concept

* Every function in JavaScript has a property → `prototype`
* This is used when creating objects using `new`

---

## 🔹 Example

```js
function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = function () {
  return "Hi " + this.name;
};

const p1 = new Person("Nirmal");

console.log(p1.sayHi());
```

---

## 🧠 What actually happens (STEP-BY-STEP)

### 🥇 Step 1: `new Person("Nirmal")`

👉 JavaScript internally does:

1. Creates a new empty object:

```js
{}
```

2. Assigns value:

```js
p1 = {
  name: "Nirmal"
}
```

3. Links this object to prototype:

```js
p1.__proto__ = Person.prototype
```

---

👉 So final structure:

```
p1 = {
  name: "Nirmal"
}
↓
Person.prototype = {
  sayHi: function()
}
```

---

## 🔍 Step 2: Calling method

```js
p1.sayHi();
```

👉 JS checks:

1. Does `p1` have `sayHi`? ❌
2. Then checks `p1.__proto__` (Person.prototype) ✅
3. Finds it and executes

---

## 🎯 Important Understanding

* `p1` object only has:

```js
name: "Nirmal"
```

* `sayHi` is NOT inside `p1`

* It comes from **Person.prototype via prototype link**

---

## 🔥 Key Concept

👉 Object inherits from prototype (through linking, not copying)

👉 That’s why:

```js
p1.sayHi();
```

works even though method is not directly inside object

---

## ⚠️ Check yourself

```js
console.log(p1.hasOwnProperty("sayHi")); // false
```

👉 Because:

* `sayHi` belongs to prototype
* not the object itself

---

## 🎯 Final Summary

* `new` creates object
* Object gets its own properties (`name`)
* Object is linked to `Person.prototype`
* Missing properties are searched in prototype chain

---

## 🧠 One-line memory

👉 “Object me nahi mila to prototype chain me dhundo”


# 🧠 PROTOTYPE CHAIN (JavaScript) — Clean Interview Notes

---

## 🔗 Prototype Chain Flow

When a property is not found on an object:

```
object → prototype → parent prototype → ... → null
```

---

## 📌 Example

```js id="ex1"
const obj = {};

console.log(obj.toString());
```

### 👉 Why it works?

```
obj → Object.prototype → toString found ✔
```

---

## 🔄 CHAIN FLOW (IMPORTANT)

```
p1 → Person.prototype → Object.prototype → null
```

---

## ⚙️ FUNCTIONS & PROTOTYPES

* Functions have → `prototype` property
* Objects have → `__proto__` (internal link)

```js id="ex2"
function A() {}

const a = new A();

console.log(a.__proto__ === A.prototype); // true
```

---

## 🧱 ADDING METHODS

### ❌ Bad Way (memory issue)

```js id="bad1"
function Person(name) {
  this.name = name;
  this.sayHi = function () {};
}
```

👉 Every object gets new copy ❌

---

### ✅ Good Way (Prototype)

```js id="good1"
function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = function () {};
```

👉 Shared across all instances ✔

---

## 🧪 PROPERTY CHECKS

### 1. hasOwnProperty

```js id="chk1"
p1.hasOwnProperty("name");   // true
p1.hasOwnProperty("sayHi");  // false
```

👉 Meaning:

* name → own property
* sayHi → inherited

---

### 2. `in` operator (checks full chain)

```js id="chk2"
"name" in p1;   // true
"sayHi" in p1;  // true
```

---

### 3. Object.keys (only own enumerable)

```js id="chk3"
Object.keys(p1);
// ["name"]
```

---

### 4. Object.getOwnPropertyNames

```js id="chk4"
Object.getOwnPropertyNames(p1);
// ["name"]
```

---

### 5. Prototype check

```js id="chk5"
p1.__proto__ === Person.prototype; // true
```

---

### 6. Method identity

```js id="chk6"
p1.sayHi === Person.prototype.sayHi; // true
```

---

## 🏗️ MODERN CLASS SYNTAX

```js id="class1"
class Person {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    return "Hi " + this.name;
  }
}
```

### 👉 Behind the scenes:

* Still uses prototype system ✔

---

## ⚡ CALL / APPLY / BIND

* call → immediate execution
* apply → same as call but array args
* bind → returns new function

---

## 🧠 INTERVIEW SUMMARY

* prototype → shared methods
* prototype chain → lookup mechanism
* own property → defined in object
* inherited property → from prototype

---

## 🧠 ONE-LINE MEMORY

👉 “Object me nahi mila to prototype chain me dhundo”
