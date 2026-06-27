# 03 Counter Constraints

## Roadmap Mapping

- Week 2
- State (`useState`)

## What This Task Revises

- state updates
- business rules on state
- showing messages conditionally

## Why This Approach

- `count` stores the actual number
- `limitMessage` stores feedback for invalid actions
- separate handlers keep increase and decrease logic clear

## What To Keep In Mind

- do not update state blindly
- first check the rule
- then either show message or update value

## Done When

- counter does not go below `0`
- counter does not go above `10`
- message appears when user tries invalid action

## Revision Questions

1. Why is `limitMessage` separate from `count`?
2. Why do we use the functional setter `prev => prev + 1`?
3. What business rule is being protected here?
