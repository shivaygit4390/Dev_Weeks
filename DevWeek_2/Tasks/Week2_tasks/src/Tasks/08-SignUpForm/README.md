# 08 SignUp Form

## Roadmap Mapping

- Week 2
- Controlled Forms
- Mandatory Task: signup form
- Add-on: submit loading + disable button
- Add-on: basic validation (manual)
- Optional real-use extension in your version: programmatic navigation after success

## Task Objective

Build a proper signup form where every field is controlled by React state, submit is handled manually, validation is checked before success, and the UI responds properly while submitting.

This is one of the highest-value Week 2 tasks because forms bring many React basics together in one place:

- state
- events
- controlled inputs
- submit flow
- validation
- feedback UI
- loading UI
- optional navigation after success

The most important mental line is:

```txt
form value lives in state
validation happens before submit continues
```

## What You Must Understand First

A controlled input means the input value comes from React state.

Example:

```jsx
const [name, setName] = useState("");

<input
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
```

Why controlled forms matter:

- validation becomes easier
- submit handling becomes easier
- error display becomes easier
- loading/disabling logic becomes easier
- reset becomes easier

## Build Goal

Create a signup form with fields such as:

- full name
- email
- password
- confirm password
- role select
- accept terms checkbox

The form should behave like a React-controlled form, not static HTML.

## Better State Shape

Instead of separate state for every field, use one object:

```jsx
const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "",
  acceptTerms: false
});
```

## Required Behavior

- each input connected to state
- `onChange` updates correct field
- `onSubmit` prevents page refresh
- submitted data can be shown in console or preview

## What This Task Is Really Testing

This task is checking whether you can:

- build controlled inputs correctly
- manage many form fields in one object state
- handle text inputs, select, and checkbox
- run submit flow manually
- validate before allowing success
- show user-friendly error messages
- manage loading state
- disable submit button during submission

## Add-on - Submit Loading + Disable Button

Simulate a real submit flow:

- `isSubmitting` state
- set loading true on submit
- disable submit button
- show `Submitting...`
- reset loading after timeout/fake API

This makes the form feel closer to real app behavior.

## Add-on - Basic Validation (Manual)

Do not use a library here yet.

Add rules like:

- name cannot be empty
- email must include `@`
- password minimum 6 chars
- confirm password should match
- terms must be accepted

Store validation feedback in state if needed:

```jsx
const [errors, setErrors] = useState({});
```

## If Your Version Uses Navigation

If your form redirects after success, then this task also helps you practice:

- programmatic navigation
- route change after success
- flow where code decides the next screen

## Common Mistakes To Avoid

- uncontrolled inputs
- direct field mutation instead of state update
- submit continuing even when invalid
- no feedback for user errors
- not disabling submit during loading

## Done When

- every field is controlled
- submit prevents page reload
- loading state exists
- button disables during submit
- manual validation catches bad input
- if navigation is included, route change happens only after success

## Revision Questions

1. Why is this a controlled form?
2. Why is one object state useful for many fields?
3. Why should validation happen before submit continues?
4. Why keep `errors` separately from `formData`?
5. Why is loading/disabled button behavior useful in real apps?
