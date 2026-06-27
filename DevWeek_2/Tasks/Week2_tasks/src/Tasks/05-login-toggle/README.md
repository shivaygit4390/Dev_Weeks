# 05 Login Toggle

## Roadmap Mapping

- Week 2
- Conditional Rendering

## What This Task Revises

- toggling UI based on auth state
- controlled login input basics
- reusable auth wrapper idea

## Why This Approach

- `isLoggedIn` decides which UI to show
- login form and welcome view are separated
- `RequireAuth` shows how protected content can be wrapped

## What To Keep In Mind

- this is UI-level auth simulation, not real backend auth
- one boolean can change large parts of UI
- wrapper pattern is useful for future protected routes thinking

## Done When

- logged-out view and logged-in view both render correctly
- button toggles auth state
- protected content shows only when authenticated

## Revision Questions

1. Why is this a conditional rendering task?
2. What is the use of `RequireAuth`?
3. Why separate login view and welcome view?
