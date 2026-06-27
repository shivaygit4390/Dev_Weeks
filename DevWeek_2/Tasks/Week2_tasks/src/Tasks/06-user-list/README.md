# 06 User List

## Roadmap Mapping

- Week 2
- Lists & Keys
- Controlled Inputs
- Immutable Updates

## What This Task Revises

- render list with `map`
- use stable keys
- add item
- remove item
- edit item
- controlled input form

## Why This Approach

- `users` is the real rendered data
- `formData` stores temporary typed input
- `editingId` switches between add mode and edit mode

## What To Keep In Mind

- `map` is used when one item changes but array shape stays same
- `filter` is used when deleting item
- adding should create a new id
- form inputs should always use `value` and `onChange`

## Done When

- list renders from state
- each item has stable key
- add works
- remove works
- edit works
- button text changes in edit mode

## Revision Questions

1. Why is `editingId` needed?
2. Why use `map` for edit?
3. Why use `filter` for delete?
4. Why is this also a controlled form task?
