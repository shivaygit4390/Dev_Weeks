# 02 Practical Tasks

This file is the fast hands-on track.

Goal:

- build only high-value React exercises
- complete them in minimum time
- be able to explain each one in interview language

You do not need to build a giant app here.
You need to build enough to prove real understanding.

---

## Task 1 - `UserCard`

### Skills covered

- JSX
- component creation
- props
- reusable UI

### Build

Create a reusable `UserCard` with:

- name
- email
- role
- city
- online/offline status
- optional bio

### Must have

- separate component
- props passed from parent
- render at least 2 users

### Explain in interview

```txt
This task demonstrates componentization and props-driven reusable UI. The parent owns the user data and the child only renders it.
```

---

## Task 2 - Theme or Color Changer

### Skills covered

- `useState`
- event handling
- dynamic styles

### Build

- 3-4 color buttons
- click changes background or card color
- show selected color

### Must have

- state update
- UI visibly changes

### Explain in interview

```txt
I used local state because the selected color only affects this component. Each click updates state, which triggers a re-render and updates the UI.
```

---

## Task 3 - Counter with Constraints

### Skills covered

- state transitions
- guard conditions
- conditional messages

### Build

- increase
- decrease
- optional reset
- do not go below `0`
- do not go above `10`
- show warning at limits

### Must have

- no invalid count range
- clear UI behavior

### Explain in interview

```txt
This task shows that I can implement business rules on top of state instead of only changing state blindly.
```

---

## Task 4 - Login Toggle UI

### Skills covered

- conditional rendering
- boolean state

### Build

- `isLoggedIn` state
- show login prompt when false
- show welcome/dashboard preview when true
- login and logout buttons

### Must have

- 2 clearly different UI states

### Explain in interview

```txt
This is a basic example of condition-driven UI, similar to how auth-based UI works in real applications.
```

---

## Task 5 - User List with Stable Keys

### Skills covered

- array rendering
- `map`
- keys

### Build

- render array of users
- each item has stable `id`
- optionally remove an item

### Must have

- `map`
- `key={user.id}`

### Explain in interview

```txt
Stable keys help React preserve item identity correctly across renders, especially when items are inserted or removed.
```

---

## Task 6 - Signup Form

### Skills covered

- controlled inputs
- form state
- `onSubmit`
- validation basics

### Build

Fields:

- full name
- email
- password
- confirm password

### Must have

- `value`
- `onChange`
- `onSubmit`
- basic validation

### Good enough validation

- non-empty name
- email contains `@`
- password length check
- passwords match

### Explain in interview

```txt
I used controlled inputs so the form state stays in React, which makes validation and submission logic easier to manage.
```

---

## Task 7 - Multi-step Form

### Skills covered

- larger form state
- conditional rendering
- multi-step flow

### Build

Step 1:

- name, email

Step 2:

- city, role

Step 3:

- password, confirm password

Step 4:

- review values

### Must have

- next and prev
- values preserved when going back
- final review screen

### Can stay light

- styling
- perfect validation

### Explain in interview

```txt
I kept a single formData object and a step state so the UI changes by step while the input values remain preserved.
```

---

## Task 8 - Fetch Users from API

### Skills covered

- `useEffect`
- async API calling
- loading/error handling

### Build

- fetch from a public API
- show loading
- show error
- show data list

### Must have

- `useEffect`
- `loading`
- `error`
- cleanup awareness if needed later

### Explain in interview

```txt
I used useEffect for the API side effect and tracked loading and error states so the UI remains predictable during async work.
```

---

## Task 9 - Parent Child Communication

### Skills covered

- callback props
- lifting state up

### Build

Example:

- search input in parent
- child list filters based on query

or

- child form submits data to parent list

### Must have

- child triggers parent update through callback

### Explain in interview

```txt
When multiple components depend on the same data, I lift the shared state to their nearest common parent and pass data down through props and updates through callbacks.
```

---

## Task 10 - Small Integrated Mini App

### Skills covered

- combining features
- folder structure
- practical confidence

### Build

Create one small app that includes:

- reusable card
- state task
- form
- list
- fetch section

### Must have

- organized files
- no giant single component

### Explain in interview

```txt
I combined smaller task-based components into a structured mini app to simulate real project organization rather than isolated toy examples.
```

---

## Minimum Completion Order

If you are rushing, do tasks in this order:

1. `UserCard`
2. theme/color changer
3. counter
4. login toggle
5. user list
6. signup form
7. API fetch
8. multistep form
9. parent-child communication
10. mini app integration

---

## What Can Be Skipped If Time Is Less

Skip first:

- perfect styling
- heavy validation
- advanced animation
- full TypeScript conversion

Do not skip:

- forms
- lists
- state
- props
- conditional rendering
- API loading/error states

---

## Final Interview Rule

You do not need 20 tasks.
You need 6-8 tasks you can explain properly.

Weak candidate:

```txt
I made many things but I don’t remember why.
```

Better candidate:

```txt
I built fewer things, but I can explain data flow, state ownership, rendering, validation, and trade-offs clearly.
```

