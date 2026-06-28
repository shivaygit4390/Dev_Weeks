# 01 User Card

## Roadmap Mapping

- Week 2
- Components + JSX + Props
- Mini Task: `UserCard`
- Add-on: TypeScript props typing (preferred)

## Task Objective

Build one reusable `UserCard` component that displays one user's profile-style data through props.

This task is not just "make a card UI".
It is your first proper React component task for understanding:

- what a reusable component really means
- how JSX is structured
- how parent-to-child data flow works
- why props are the input layer of a component
- how the same component can render many users with different values

The core line you should remember is:

```txt
same component + different props = reusable UI
```

## What You Must Understand First

### Component

A component is a reusable UI unit.
In React, this is usually a function that returns JSX.

Think:

```txt
input data -> UI output
```

### JSX

JSX is the syntax that looks like HTML inside JavaScript.
It is not real HTML.
React converts it into JavaScript objects internally.

Important JSX rules:

- return one parent element or a fragment
- use `{}` for JavaScript expressions
- use `className` instead of `class`
- component names must start with uppercase

### Props

Props are input values passed from a parent component to a child component.

Example:

```jsx
function UserCard({ name, role }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{role}</p>
    </div>
  );
}
```

Usage:

```jsx
<UserCard name="Nirmal" role="Frontend Developer" />
```

### Core Rule

Props are read-only.
The child component should not mutate the props.
The parent owns the data and decides what to pass.

## Build Goal

Create a separate `UserCard` component that can display one user's details clearly and can be reused for multiple users without rewriting the UI again and again.

## Suggested User Data

Use fields like:

- `name`
- `email`
- `role`
- `city`
- `isOnline`
- `bio`
- `avatarUrl` optional

## What The UI Should Show

Your card should ideally contain:

- user name
- email
- role
- city
- online/offline status
- short bio
- optional avatar image or a fallback text/value if avatar is missing

## What This Task Is Really Testing

This task is checking whether you can:

- create a separate component file
- accept multiple props cleanly
- render dynamic values inside JSX
- reuse one component for many data objects
- handle one optional field safely

You should be able to answer:

- why is this a component?
- which values should come from props?
- what should stay hardcoded?
- how does reusability actually happen here?

## Mandatory Requirements

- `UserCard` should be a separate component
- all displayed user data should come from props
- render at least 2 or 3 different cards from parent data
- use at least one conditional display or fallback

## Example Thinking

Parent example:

```jsx
function App() {
  const users = [
    {
      id: 1,
      name: "Nirmal",
      email: "nirmal@example.com",
      role: "Frontend Developer",
      city: "Delhi",
      isOnline: true,
      bio: "Likes building UI."
    },
    {
      id: 2,
      name: "Aman",
      email: "aman@example.com",
      role: "Backend Developer",
      city: "Lucknow",
      isOnline: false,
      bio: "Enjoys APIs and databases."
    }
  ];

  return (
    <div>
      {users.map((user) => (
        <UserCard key={user.id} {...user} />
      ))}
    </div>
  );
}
```

## Add-on - TypeScript Props Typing

Preferred, not mandatory.

If you want the light TS version:

```tsx
type UserCardProps = {
  name: string;
  email: string;
  role: string;
  city: string;
  isOnline: boolean;
  bio: string;
  avatarUrl?: string;
};

function UserCard({
  name,
  email,
  role,
  city,
  isOnline,
  bio,
  avatarUrl
}: UserCardProps) {
  // component
}
```

## Common Mistakes To Avoid

- hardcoding user data inside the card
- making one huge component instead of a reusable one
- forgetting fallback for optional values
- mutating props
- keeping all rendering logic in parent and learning nothing in child

## Done When

- separate `UserCard` component exists
- parent passes real data through props
- at least 2-3 cards render from parent data
- one optional field is handled safely
- the UI is reusable instead of one-off

## Revision Questions

1. Why is this a reusable component?
2. What data belongs in props?
3. Why should props not be mutated?
4. Why should the parent own the user data?
5. What makes this different from hardcoded JSX?
