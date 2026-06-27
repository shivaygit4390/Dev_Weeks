# 01 User Card

## Roadmap Mapping

- Week 2
- Components + JSX + Props

## What This Task Revises

- reusable component thinking
- passing props from parent to child
- rendering dynamic data into UI

## Why This Approach

- parent keeps the data
- child only displays the data
- this keeps the component reusable

## What To Keep In Mind

- props are read-only
- the card should not create its own user data
- optional values like `bio` should have a fallback

## Done When

- one separate `UserCard` component exists
- multiple cards render from parent data
- status is shown using props
- UI does not break when optional data is missing

## Revision Questions

1. Why is this a reusable component?
2. What data belongs in props?
3. Why should props not be mutated?
