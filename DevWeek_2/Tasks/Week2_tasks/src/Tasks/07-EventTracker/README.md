# 07 Event Tracker

## Roadmap Mapping

- Week 2
- Events
- Mandatory Task: click tracker
- Add-on: keep handlers outside JSX

## Task Objective

Build a click/event tracker where user interaction updates several related parts of the UI together.

This task should help events feel more real than:

```txt
button clicked -> count + 1
```

The real point is:

```txt
one event can update many related UI sections at once
```

## What You Must Understand First

Events are how React responds to user interaction.

Examples:

- `onClick`
- `onChange`
- `onSubmit`

Correct handler usage:

```jsx
<button onClick={handleClick}>Click</button>
```

Wrong:

```jsx
<button onClick={handleClick()}>Click</button>
```

Wrong version runs immediately during render.

## Build Goal

Create a mini event-tracking UI where one or more buttons update:

- total click count
- latest clicked action
- optional action history

## Example Feature Ideas

- button A / button B
- Save / Delete / Share buttons
- total clicks text
- last action text like `Last clicked: Save`
- optional full event history list

## What This Task Is Really Testing

This task is checking whether you can:

- connect event handlers to UI properly
- update state after events
- pass extra action data into handlers
- update multiple state values from one click
- keep JSX readable while handling interaction

## Add-on - Keep Handlers Outside JSX

Instead of writing too much logic inline:

```jsx
<button onClick={() => setCount(count + 1)}>Increase</button>
```

Prefer cleaner named handlers where possible:

```jsx
function handleIncrease() {
  setCount((prev) => prev + 1);
}

<button onClick={handleIncrease}>Increase</button>
```

This improves:

- readability
- debugging
- reuse
- clarity during revision

## Common Mistakes To Avoid

- calling handler immediately during render
- mixing too much logic directly inside JSX
- updating only one state when task is meant to track related info
- not understanding what each state value represents

## Done When

- click updates state correctly
- UI changes immediately after event
- at least one named handler exists outside JSX
- if multiple state values are tracked, they stay in sync logically

## Revision Questions

1. Why is `onClick={handleClick}` correct but `onClick={handleClick()}` wrong?
2. How can one event update multiple state values?
3. Why are named handlers sometimes cleaner than inline logic?
4. What state values depend on the same event in this task?
