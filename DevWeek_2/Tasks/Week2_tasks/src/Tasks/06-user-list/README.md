# 06 User List

## Roadmap Mapping

- Week 2
- Lists & Keys
- Mandatory Task: user list add/remove
- Add-on: edit user immutably
- Add-on: show why index-as-key breaks

## Task Objective

Build a user list where repeated UI is rendered from array state and the list can be updated through add, remove, and edit flows.

This task is much bigger than "show some users".
It is one of the strongest Week 2 tasks because it combines:

- array rendering
- stable keys
- controlled form input
- add flow
- remove flow
- edit flow
- immutable updates

## What You Must Understand First

React often renders repeated UI from arrays:

```jsx
users.map((user) => <UserCard key={user.id} {...user} />)
```

This topic is really about:

- repeated UI rendering
- list updates
- stable keys
- immutable state handling

## Build Goal

Create a list of users that:

- starts with initial user data
- renders all users on screen
- supports removing one user
- supports adding a new user
- supports editing one user without mutating the original array directly

## Suggested Data Shape

```js
{
  id: 1,
  name: "Nirmal",
  role: "Frontend"
}
```

## Required Features

- initial array of users
- list rendering on screen
- remove button
- add-user form or simple inputs
- stable unique id for each item

## What This Task Is Really Testing

This task is checking whether you can:

- render arrays using `map`
- understand why keys matter
- use `filter` to remove an item
- use `map` to replace one changed item
- keep form state and list state separate
- avoid direct mutation

## Logic You Should Practice

### Add User

```txt
take current state
create new user object
return new array with old + new item
```

### Remove User

```txt
filter out the matching id
```

### Edit User

```txt
find matching item by id
return new array
replace only that one user object
```

## Add-on - Edit User Immutably

This is the high-value add-on of this task.

Do not do:

```js
users[0].name = "New Name";
```

Instead:

- create a new array
- create a new updated object for the changed item
- keep unchanged users as they are

This is one of the most important React habits for arrays and objects.

## Add-on - Show Why Index-as-Key Breaks

This is a learning demo, not just a feature.

Best demo idea:

- render editable rows
- use `key={index}`
- type in one row
- remove one row above it
- observe wrong shifting behavior

Then switch to:

```jsx
key={user.id}
```

and compare.

This is the best way to actually feel why stable keys matter.

## Common Mistakes To Avoid

- using unstable keys
- mutating existing array/object directly
- mixing add mode and edit mode without clear state
- storing rendered UI instead of raw data in state

## Done When

- list renders from state
- add works
- remove works
- keys use stable ids
- one item can be edited immutably
- you can explain why `map` and `filter` are used differently

## Revision Questions

1. Why are stable keys important?
2. Why do we use `filter` for delete?
3. Why do we use `map` for edit?
4. Why should list updates stay immutable?
5. Why is this also a controlled form task?
