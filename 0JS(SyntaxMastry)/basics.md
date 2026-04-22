# 🚀 JavaScript (ES6+) — Practical Guide (0 → Interview Ready)

---

## 1. Variables

```js id="v1"
let count = 0;
const PI = 3.14;
var x = 10; // avoid
```

### 🧠 Explanation

* `const` → default (safe, no accidental changes)
* `let` → when value needs to change
* `var` → avoid (function-scoped, causes bugs in loops/closures)

### 📍 Where used

* API data → const
* counters / toggles → let

### 🧪 Tasks

* Create a counter variable and increment it
* Try reassigning a const → observe error
* Create a loop using let and var → see difference

---

## 2. Functions

```js id="f1"
const add = (a, b) => a + b;

const process = (data) => {
  const result = data * 2;
  return result;
};

const greet = (name = "User") => `Hello ${name}`;

const sum = (...nums) => nums.reduce((a, b) => a + b, 0);
```

### 🧠 Explanation

* Arrow functions → cleaner + widely used
* Default params → avoid undefined errors
* Rest → handle dynamic arguments

### 📍 Where used

* Utility functions
* API helpers
* React handlers

### 🧪 Tasks

* Create a function that returns square of a number
* Create a function that accepts unknown number of args and returns max
* Write a function with default parameter

---

## 3. Objects

```js id="o1"
const user = {
  name: "Impakable",
  age: 22,
  isLoggedIn: true
};

user.name;
user["age"];

user.age = 23;

const key = "email";
user[key] = "test@mail.com";
```

### 🧠 Explanation

* Objects store structured data (real-world entities)
* Stored in heap → accessed via reference

### 📍 Where used

* API responses
* User data
* Configs

### 🧪 Tasks

* Create a product object
* Add a new key dynamically
* Update a value
* Loop over object keys

---

## 4. Destructuring

```js id="d1"
const { name, age } = user;

const { name: userName } = user;

const arr = [1, 2, 3];
const [a, b] = arr;
```

### 🧠 Explanation

* Extract values directly → cleaner code

### 📍 Where used

* React props
* API responses

### 🧪 Tasks

* Extract 3 values from object
* Rename one key
* Destructure nested object

---

## 5. Spread & Rest

```js id="s1"
const arr2 = [...arr1, 3];

const obj2 = { ...obj1, b: 2 };
```

### 🧠 Explanation

* Spread → clone / merge
* Rest → collect values

### 📍 Where used

* React state updates
* Immutable operations

### 🧪 Tasks

* Clone array and add new item
* Merge 2 objects
* Create function using rest params

---

## 6. Array Methods

```js id="a1"
const doubled = nums.map(n => n * 2);
const even = nums.filter(n => n % 2 === 0);
const sum = nums.reduce((acc, curr) => acc + curr, 0);
const found = nums.find(n => n > 1);
nums.some(n => n > 2);
nums.every(n => n > 0);
nums.includes(2);
```

### 🧠 Explanation

* Core tools for handling data

### 📍 Where used

* API data transformation
* UI rendering
* Filtering lists

### 🧪 Tasks

* Double all numbers
* Filter numbers > 10
* Find first odd number
* Check if any value is negative
* Sum all numbers
* Convert array of objects → names array

---

## 7. String Methods

```js id="str1"
str.trim();
str.toUpperCase();
str.includes("he");
str.split(" ");
str.replace("hello", "hi");
```

### 🧠 Explanation

* Used for cleaning and processing text input

### 🧪 Tasks

* Remove spaces from string
* Convert sentence to array of words
* Replace a word in sentence
* Check if string contains keyword

---

## 8. Optional Chaining

```js id="oc1"
user?.address?.city;
```

### 🧠 Explanation

* Prevents crashes if data is missing

### 🧪 Tasks

* Access nested object safely
* Try accessing missing property with and without `?.`

---

## 9. Nullish Coalescing

```js id="nc1"
const value = input ?? "default";
```

### 🧠 Explanation

* Only replaces `null` or `undefined` (better than `||`)

### 🧪 Tasks

* Test with `0`, `false`, `null`
* Compare `||` vs `??`

---

## 10. Ternary

```js id="t1"
const result = age > 18 ? "Adult" : "Minor";
```

### 🧠 Explanation

* Short if-else for UI conditions

### 🧪 Tasks

* Check even/odd using ternary
* Show login/logout text based on boolean

---

## 11. Short-Circuiting

```js id="sc1"
isLoggedIn && doSomething();
const name = input || "Guest";
```

### 🧠 Explanation

* Used for quick conditions and defaults

### 🧪 Tasks

* Execute function only if true
* Assign default username

---

## 12. Async JavaScript

```js id="async1"
const getData = async () => {
  try {
    const res = await fetch("/api");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
```

### 🧠 Explanation

* Handles async operations like APIs

### 🧪 Tasks

* Fetch data from public API
* Add try/catch
* Log error properly

---

## 13. Real Patterns

```js id="rp1"
const filtered = arr.filter(item => item.id !== 1);

const updated = arr.map(item =>
  item.id === 1 ? { ...item, name: "New" } : item
);
```

### 🧠 Explanation

* Common interview patterns

### 🧪 Tasks

* Remove item by id
* Update item in array
* Add new field to all objects

---

## 14. Common Utilities

```js id="u1"
Number("10");
String(10);
Array.isArray(arr);
```

### 🧪 Tasks

* Convert string to number
* Validate if input is array
* Convert number to string

---

## 15. Event Handling

```js id="ev1"
button.addEventListener("click", () => {
  console.log("clicked");
});
```

### 🧪 Tasks

* Create button click event
* Log input value on submit

---

## 16. this Keyword

```js id="this1"
const obj = {
  name: "A",
  print() {
    console.log(this.name);
  }
};
```

### 🧠 Explanation

* `this` refers to current object (depends on how function is called)

### 🧪 Tasks

* Create object with method using `this`
* Compare arrow vs normal function

---

# 🔥 Final Practice (Must Do)

* Build cart system (add/remove/update total)
* Filter users by role
* Group users by category
* Fetch API and render list
* Search filter on array

---

# 🎯 Final Focus

### Master:

* map / filter / reduce
* async/await
* spread / destructuring
* closures + event loop

---

## 🧠 Final Note

👉 “If you can build small features using these concepts, you’re ready for 4–6 LPA interviews.”
