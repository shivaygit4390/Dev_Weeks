# 🚀 React Router Notes (Interview + Revision)

> **Goal:** Learn React Router in the simplest way possible and understand *why* we use each thing.

---

# 📌 What is React Router?

React Router allows us to build **Single Page Applications (SPA)** where the page changes **without reloading the browser**.

Without Router:

```
Click About
↓
Entire page reloads
```

With React Router:

```
Click About
↓
Only component changes
```

Result:

* Faster
* Better User Experience
* No full reload

---

# 📌 Installation

```bash
npm install react-router-dom
```

---

# 📌 BrowserRouter

Think of it as:

```
BrowserRouter

↓

Enables Routing
for the entire application
```

Usually in `main.jsx`

```jsx
<BrowserRouter>
    <App />
</BrowserRouter>
```

Without it:

❌ Routing won't work.

---

# 📌 Route

A Route maps

```
URL

↓

Component
```

Example

```
/about

↓

About Component
```

Think

```
IF URL == "/about"

Render About.jsx
```

---

# 📌 Routes

`<Routes>` is just a container.

Think

```
Routes

↓

Contains all Route components
```

Example

```
Routes

├── Home
├── About
├── Contact
```

---

# 📌 Route Syntax

```jsx
<Route
    path="/about"
    element={<About />}
/>
```

Meaning

```
User visits

/about

↓

Show About Component
```

---

# 📌 Link

React version of

```html
<a href="">
```

Instead use

```jsx
<Link to="/about">
```

---

## Why NOT use `<a>` ?

Because

```
<a>

↓

Reloads complete website
```

React loses state.

Example

Counter = 10

Click About using `<a>`

↓

Counter resets.

---

Using `<Link>`

```
Counter = 10

↓

Click About

↓

Counter still exists
```

No refresh.

---

# 📌 Link Syntax

```jsx
<Link to="/">
Home
</Link>
```

Think

```
Link

↓

Go to URL
```

---

# 📌 useNavigate()

Used when **JavaScript decides where to go**.

Examples

```
Login Success

↓

Dashboard
```

```
Signup Complete

↓

Home
```

```
Delete User

↓

Users Page
```

---

Usage

```jsx
const navigate = useNavigate();
```

Then

```jsx
navigate("/users");
```

Think

```
Button Click

↓

Function

↓

navigate()

↓

Change Page
```

---

# 📌 Link vs useNavigate()

Use Link

```
User manually clicks navigation
```

Examples

```
Navbar

Sidebar

Footer
```

---

Use useNavigate()

```
After Login

After Signup

After Logout

After Delete

After Payment
```

---

Interview Question

"When should you use Link?"

Answer

```
When user manually navigates.
```

"When should you use navigate?"

Answer

```
When code decides navigation.
```

---

# 📌 useParams()

Used for **Dynamic URLs**

Example

```
/users/1

/users/2

/users/45
```

Here

```
1

2

45
```

are dynamic.

Route

```jsx
/users/:id
```

Read value

```jsx
const { id } = useParams();
```

If URL is

```
/users/5
```

then

```
id = 5
```

---

Real Example

```
View Employee

↓

/employee/10

↓

Employee Details Page
```

---

# 📌 Dynamic Route

```
/products/:id
```

Possible URLs

```
/products/1

/products/45

/products/100
```

Same component

Different data.

---

# 📌 404 Route

Always keep last.

```jsx
<Route
path="*"
element={<NotFound />}
/>
```

Meaning

```
No Route Matched

↓

Show NotFound Page
```

Example

```
/hello

↓

404
```

---

# 📌 Folder Structure

```
src

pages
│
├── Home.jsx
├── About.jsx
├── Contact.jsx
├── UserDetail.jsx
└── NotFound.jsx

components
│
└── Navbar.jsx

App.jsx

main.jsx
```

---

# 📌 Navigation Flow

```
BrowserRouter

↓

Routes

↓

Route

↓

Component

↓

Link / navigate()

↓

Next Page
```

---

# 📌 Interview Flow

```
BrowserRouter

↓

Routes

↓

Route

↓

Link

↓

useNavigate()

↓

useParams()

↓

404
```

---

# 📌 Common Mistakes

❌ Using `<a>` instead of `<Link>`

❌ Forgetting BrowserRouter

❌ Writing

```jsx
element={Home}
```

Correct

```jsx
element={<Home />}
```

---

❌ Forgetting to import

```
Link

Route

Routes

BrowserRouter

useNavigate

useParams
```

---

❌ Writing

```jsx
navigate("users")
```

instead of

```jsx
navigate("/users")
```

---

# 📌 Mental Models

## BrowserRouter

```
Turns ON routing.
```

---

## Routes

```
Keeps all routes together.
```

---

## Route

```
URL

↓

Component
```

---

## Link

```
User chooses page.
```

---

## useNavigate()

```
Code chooses page.
```

---

## useParams()

```
Reads values from URL.
```

---

## 404

```
Wrong URL

↓

Not Found
```

---

# ⭐ Interview Questions

### Q1. Why React Router?

```
To navigate between pages
without refreshing the browser.
```

---

### Q2. Difference between `<a>` and `<Link>`?

```
<a>

Reloads browser

----------------

<Link>

Changes component

No reload
```

---

### Q3. Why BrowserRouter?

```
Provides routing capability
to the entire application.
```

---

### Q4. Difference between Link and useNavigate?

```
Link

↓

User Navigation

-----------------

navigate()

↓

Programmatic Navigation
```

---

### Q5. Why useParams?

```
To read dynamic values
from URL.
```

---

### Q6. Why 404 Route?

```
To handle unknown URLs
gracefully.
```

---

# 🎯 Interview Checklist

```
✅ BrowserRouter

✅ Routes

✅ Route

✅ Link

✅ useNavigate()

✅ useParams()

✅ Dynamic Routes

✅ 404 Page

⭐⭐⭐⭐⭐ React Router Basics Complete
```
