# 02 Theme Changer

## Roadmap Mapping

- Week 2
- State (`useState`)
- Events
- Task A: Color Changer

## Task Objective

Build a small component where the user changes a color/theme and sees the UI update immediately.

This task exists to make `useState` feel practical instead of abstract.
It should make you clearly understand:

- current color/theme lives in state
- click event triggers a handler
- handler updates state
- state change causes re-render
- re-render updates visible UI

This is one of the cleanest first examples of:

```txt
UI = function of state
```

## What You Must Understand First

State is data that belongs to a component and can change over time.

Example syntax:

```jsx
const [color, setColor] = useState("white");
```

Meaning:

- `color` = current state value
- `setColor` = function that updates the state

Important rules:

- do not update state directly
- use the setter function
- state change causes re-render
- state should store changing UI data

## Build Goal

Create a small UI where the user clicks buttons like Red, Blue, Green, Black, or Reset and the visible theme/background changes immediately.

## What This Task Is Really Testing

This task is checking whether you can:

- create local state with `useState`
- wire button clicks to event handlers
- update state from user interaction
- connect state to visible styles or classes
- make the UI feel dynamic through state

## Build Idea

Your task can include:

- one box, card, or full section
- color buttons such as Red, Blue, Green, Black
- reset button
- optional current selected color text
- optional UX rule like clicking same color resets to default

## Minimum Requirements

- one state variable for current color/theme
- button click must update the state
- visible UI must change from state
- reset/default state should exist

## Example State

```jsx
const [color, setColor] = useState("white");
```

## Good Extra Touches

- show the current selected color in text
- disable already selected color
- toggle back to default when same color is clicked again

## Why This Task Matters

This task is simple, but it teaches one of the most important React basics:

```txt
state drives the UI
```

That same idea later applies to:

- forms
- login state
- API loading states
- tabs
- filters

## Common Mistakes To Avoid

- trying to change UI without storing value in state
- hardcoding repeated buttons instead of making the task data-driven
- updating local variable instead of state
- forgetting reset/default behavior

## Done When

- clicking a color changes the UI
- reset/default behavior works
- buttons are connected to state change properly
- you can explain how the re-render happened

## Revision Questions

1. Why is `useState` needed here?
2. How does click lead to UI change?
3. What is the state value actually representing?
4. Why is this task a strong example of `UI = function of state`?
