# 03 Counter Constraints

## Roadmap Mapping

- Week 2
- State (`useState`)
- Task B: Counter Constraints

## Task Objective

Build a counter with rules, not just plain increase/decrease behavior.

This task is meant to move you beyond a toy counter and train you in:

- state updates
- guard conditions
- business-rule thinking
- invalid action feedback
- controlled state transitions

The deeper point is:

```txt
before changing state, check whether the new state is valid
```

## What You Must Understand First

A simple state update is easy.
The real learning begins when UI rules are added on top of state.

Example:

- count should not go below `0`
- count should not go above `10`
- invalid actions should show feedback

This is closer to real app logic than a plain counter.

## Build Goal

Create a counter that starts from `0`, has increase/decrease behavior, and respects fixed limits.

## Suggested Requirements

- start from `0`
- increase button
- decrease button
- optional reset button
- do not go below `0`
- do not go above `10`
- show a message or warning at limits

## What This Task Is Really Testing

This task is checking whether you can:

- update numeric state correctly
- add rule checks before state updates
- stop invalid transitions
- show user feedback for invalid actions
- separate main value and UI message if needed

## Why This Task Matters

Anyone can make:

```txt
count + 1
count - 1
```

But this task is testing whether you can control how and when state is allowed to change.

That is much more useful in real UI work.

## Good Thinking Pattern

Your handler logic should mentally follow:

```txt
button clicked
-> check rule
-> if invalid, show message
-> if valid, update count
```

## Common Mistakes To Avoid

- updating count first, validating later
- letting count go outside limits
- mixing up state value and warning message
- using direct mutation instead of setter

## Done When

- counter does not go below `0`
- counter does not go above `10`
- feedback appears for invalid actions
- valid actions still update correctly
- you can explain what business rule is being protected

## Revision Questions

1. Why is this more valuable than a normal counter?
2. Why should rules be checked before state update?
3. Why might `count` and `message` be separate pieces of state?
4. What makes this closer to real app logic?
