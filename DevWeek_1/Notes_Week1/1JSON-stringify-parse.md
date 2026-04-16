## 📘 JSON.parse & JSON.stringify — Read Me Notes

---

### 🔹 What is JSON?

* JSON = **JavaScript Object Notation**
* It is a **string format**, not a JavaScript object
* Used to **store and transfer data**

```js id="json1"
let jsonString = '{"name":"Aman","age":20}';
```

👉 Looks like an object but is actually a **string**

---

## 🔁 JSON.stringify()

### 👉 What it does:

* Converts **JavaScript object → JSON string**

```js id="stringify1"
let obj = {
  name: "Aman",
  age: 20
};

let str = JSON.stringify(obj);

console.log(str);
// '{"name":"Aman","age":20}'
```

### 🔥 Why it is used:

* Send data to server 🌐
* Store data in localStorage 💾
* Convert object into transferable format

---

## 🔄 JSON.parse()

### 👉 What it does:

* Converts **JSON string → JavaScript object**

```js id="parse1"
let str = '{"name":"Aman","age":20}';

let obj = JSON.parse(str);

console.log(obj.name);
// Aman
```

### 🔥 Why it is used:

* Convert server response into usable object
* Work with APIs
* Read stored JSON data

---

## 🌐 Real World Flow

```js id="flow1"
let user = { name: "Aman" };

// object → string (send to server / storage)
let dataToSend = JSON.stringify(user);

// string received from server
let response = '{"name":"Aman"}';

// string → object (usable data)
let data = JSON.parse(response);
```

---

## ⚠️ Important Rules

### ❌ Invalid JSON:

```js id="bad1"
let bad = "{name: 'Aman'}";
```

### ✅ Valid JSON:

```js id="good1"
let good = '{"name":"Aman"}';
```

✔️ JSON rules:

* Double quotes required ""
* No functions allowed
* No undefined allowed

---

## 🔁 Deep Copy using JSON (Related Concept)

```js id="deep1"
let obj2 = JSON.parse(JSON.stringify(obj1));
```

### 👉 What happens:

* Object → string → new object
* Breaks reference
* Creates deep copy (safe for simple objects)

---

## ⚠️ Limitations of JSON Deep Copy

* ❌ Functions are removed
* ❌ undefined is removed
* ❌ Symbol is removed

---

## ⚡ Modern Recommended Deep Copy (BEST WAY)

### 👉 structuredClone()

```js id="clone1"
let obj2 = structuredClone(obj1);
```

### 🔥 Why this is best:

* Real deep copy (no reference sharing)
* Handles nested objects properly
* Supports more data types than JSON method
* Clean and safe approach

---

## 🎯 Final Summary

* JSON.stringify → object to string
* JSON.parse → string to object
* JSON deep copy → simple but limited
* structuredClone → modern best deep copy method

---

## 🧠 One Line Memory

* stringify = object → string
* parse = string → object
* structuredClone = perfect deep copy 🚀
