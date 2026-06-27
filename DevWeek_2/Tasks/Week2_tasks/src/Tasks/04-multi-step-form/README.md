# 04 Multi Step Form

## Roadmap Mapping

- Week 2
- State
- Controlled Forms
- Conditional Rendering

## What This Task Revises

- one object for multiple form fields
- moving across steps
- preserving values
- showing different UI based on current step

## Why This Approach

- `step` controls which screen to show
- `formData` keeps all user input in one place
- shared `Form` component reduces repeated markup

## What To Keep In Mind

- form values should remain when user goes back
- step should not go below `1`
- review step should display the final object clearly

## Done When

- next and prev work
- values remain when going back
- review step shows all fields

## Revision Questions

1. Why is `formData` stored as one object?
2. Why is this task an example of conditional rendering?
3. Why is a shared `Form` component useful here?
