# 05 Login Toggle

## Roadmap Mapping

- Week 2
- Conditional Rendering
- Mandatory Task: Login Toggle UI
- Add-on: `<RequireAuth />` wrapper

## Task Objective

Build UI that changes based on login state so you can practice conditional rendering in a real-feeling auth-style scenario.

This task is meant to teach:

- boolean state
- conditional rendering
- logged-in vs logged-out UI branching
- auth-style UI thinking
- optional protected wrapper thinking through `RequireAuth`

The key line this task should leave in your head is:

```txt
one boolean can control large UI branches
```

## What You Must Understand First

Conditional rendering means:

```txt
show different UI depending on some condition
```

Common patterns:

- ternary: `condition ? A : B`
- logical `&&`
- `if` outside JSX

This task connects directly to auth-style UI:

- logged out -> show login prompt
- logged in -> show welcome/dashboard area

## Build Goal

Create a login-toggle demo that clearly shows different screens or sections depending on whether `isLoggedIn` is `true` or `false`.

## What This Task Is Really Testing

This task is checking whether you can:

- store login state in a boolean
- branch the UI into two clear conditions
- keep different views separated cleanly
- connect conditional rendering to practical app flow

## Minimum Requirements

### Logged-out UI

- "Please log in" style message
- login button

### Logged-in UI

- welcome text
- logout button
- optional dashboard preview or protected content area

## Add-on - `RequireAuth`

This is the architecture add-on for this topic.

Instead of repeatedly writing:

```jsx
{isLoggedIn ? <Dashboard /> : <p>Please log in</p>}
```

You can wrap protected content:

```jsx
<RequireAuth isAuthenticated={isLoggedIn}>
  <Dashboard />
</RequireAuth>
```

### What `RequireAuth` Should Do

- render children if authenticated
- render fallback UI otherwise

This trains future thinking for:

- protected routes
- auth guards
- restricted UI sections

## Common Mistakes To Avoid

- making logged-in and logged-out branches too mixed up
- forgetting that auth state should drive the UI
- treating `RequireAuth` like backend security instead of UI protection

## Done When

- login and logout UI switch correctly
- two clear branches of UI exist
- button toggles auth state
- protected block works if `RequireAuth` is included
- you can explain why this is a conditional rendering task

## Revision Questions

1. Why is this a conditional rendering task?
2. How does one boolean control large parts of UI?
3. What problem does `RequireAuth` solve?
4. How is UI auth simulation different from real backend auth?
