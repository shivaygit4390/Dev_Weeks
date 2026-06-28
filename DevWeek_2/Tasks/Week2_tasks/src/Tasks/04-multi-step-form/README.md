# 04 Multi Step Form

## Roadmap Mapping

- Week 2
- State
- Controlled Forms
- Conditional Rendering
- Add-on: Multi-step form stepper using state only

## Task Objective

Build a step-based form without any form library, where the UI changes one screen at a time but all previously typed values stay preserved.

This is a high-value add-on because it combines many React basics together:

- `step` state for current screen
- `formData` object state for all values
- conditional rendering for steps
- controlled inputs
- next/prev flow
- preserving values when going back
- final review before submit

The most important mental line is:

```txt
same form data object stays alive
only the visible step UI changes
```

## What This Task Is Really Testing

This task is checking whether you can:

- manage multiple related form fields in one object
- track current step separately
- render different UI based on step
- keep previously typed values intact
- move through a multi-screen flow correctly

## Suggested Steps

### Step 1

- name
- email

### Step 2

- city
- role

### Step 3

- password
- confirm password

### Step 4

- review all data before submit

## Suggested State Shape

You will usually need:

- `step`
- `formData`

Example:

```jsx
const [step, setStep] = useState(1);
const [formData, setFormData] = useState({
  name: "",
  email: "",
  city: "",
  role: "",
  password: "",
  confirmPassword: ""
});
```

## Required Behavior

- next button
- previous button
- cannot go below first step
- cannot go past final step
- typed values should remain when user goes back
- final review screen should show collected values

## What This Task Teaches Beyond Forms

This task is also teaching:

- state-driven UI flow
- how one screen can disappear and another can appear
- why data should be stored separately from visible layout

That is why this task feels more like real app UI than small isolated demos.

## Common Mistakes To Avoid

- storing too many disconnected states without reason
- losing old form values when step changes
- not separating `step` from `formData`
- allowing step to go invalid
- not showing a clear review screen

## Done When

- next/prev works
- step stays within valid range
- previous field values remain while navigating
- review screen shows full data
- you can explain how `step` and `formData` solve different problems

## Revision Questions

1. Why is `formData` better as one object here?
2. Why is this task an example of conditional rendering?
3. Why should step and data be separate states?
4. What would break if values reset on each step change?
