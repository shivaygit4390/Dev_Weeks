# 📘 CALL / APPLY / BIND (Interview Notes)

---

## 🔹 CORE CONCEPT

All three are used to control:

* what `this` refers to
* how a function is executed

---

## 🔹 CALL

* Runs function **immediately**
* Arguments passed **one by one**

---

### ✅ Example:

```js
function greet(city) {
  return this.name + " from " + city;
}

const user = { name: "Nirmal" };

console.log(greet.call(user, "Lucknow"));
```

### 👉 Output:

```
Nirmal from Lucknow
```

---

### 🔥 Use cases:

* Borrowing methods
* Manually setting `this`

---

### 🧠 Interview line:

👉 “call invokes the function immediately with a specified `this` and arguments passed individually”

---

## 🔹 APPLY

* Same as call
* Difference → arguments passed as **array**

---

### ✅ Example:

```js
function greet(city, country) {
  return this.name + " from " + city + ", " + country;
}

const user = { name: "Nirmal" };

console.log(greet.apply(user, ["Lucknow", "India"]));
```

---

### 🧠 Interview line:

👉 “apply is same as call but takes arguments as an array”

---

### 🔥 When to use:

* When arguments are already in array form

---

## 🔹 BIND

* Does **NOT execute immediately**
* Returns a **new function**

---

### ✅ Example:

```js
function greet(city) {
  return this.name + " from " + city;
}

const user = { name: "Nirmal" };

const fn = greet.bind(user);

console.log(fn("Lucknow"));
```

---

### 🧠 Interview line:

👉 “bind returns a new function with permanently bound `this`”

---

### 🔥 Use cases:

* Event handlers
* Delayed execution
* Partial application

---

## 🔥 IMPORTANT DIFFERENCE

* call → runs immediately
* apply → runs immediately
* bind → returns function

---

## 🔥 COMMON INTERVIEW QUESTION

### ❓ Why use bind?

👉 “To create a new function with fixed `this` context without executing it immediately”

---

## ⚠️ IMPORTANT ADD-ON (MUST KNOW)

### 🔴 Losing `this` (very common bug)

```js
const user = {
  name: "Nirmal",
  greet() {
    console.log(this.name);
  }
};

const fn = user.greet;

fn(); // ❌ undefined
```

---

### ✅ Fix using bind:

```js
const fn = user.greet.bind(user);
fn(); // Nirmal ✅
```

---

## 🎯 FINAL SUMMARY

* call → immediate execution + manual `this`
* apply → same as call but args in array
* bind → returns new function with fixed `this`

---

## 🧠 ONE-LINE MEMORY

👉 “call/apply run now, bind prepares for later”



