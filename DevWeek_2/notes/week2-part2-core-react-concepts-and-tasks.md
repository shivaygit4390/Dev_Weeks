# Week 2 Part 2 - Core React Concepts with Task Breakdown

This note covers Week 2 Part 2 from your roadmap:

1. Components + JSX + Props
2. State (`useState`)
3. Conditional Rendering
4. Lists & Keys
5. Events
6. Controlled Forms
7. React Dev Hygiene
8. TypeScript Starter
9. Weekend UI Playground app

This note is made for your current level.

That means:

- theory is included where needed
- tasks are expanded into real build instructions
- add-ons are explained clearly
- what to code is made concrete
- what to study before coding is made clear

---

## 1. First Clarification: Part 1 vs Part 2

You asked whether these tasks belong only to Part 1 or not.

Clear answer:

- `Part 1` was the React mental model and theory foundation
- `Part 2` is the actual core React coding practice

So:

- Part 1 taught you how React thinks
- Part 2 teaches you how to build with React

They are connected like this:

```txt
Part 1 = "What React is doing"
Part 2 = "How I actually use React to build UI"
```

Example:

- Part 1: state change causes re-render
- Part 2: now you use `useState` in a counter, color changer, and form

So these Part 2 tasks are not "only from Part 1".
They are the practical coding layer that comes after Part 1.

---

## 2. How to Use This Note

For each topic below, follow this order:

1. understand the concept section
2. read the task breakdown
3. build the mandatory task
4. then build the add-on if time allows
5. finally explain what you built in your own words

Do not rush all tasks in one sitting.

The correct goal is:

```txt
build slowly, understand properly, and be able to explain it
```

---

## 3. Part 2 Outcome

By the end of Part 2, you should be able to:

- build reusable components
- pass and use props confidently
- manage local state
- render different UI based on conditions
- render and update lists correctly
- handle user events
- build controlled forms
- structure a small React app properly
- start reading and writing light TypeScript in React

This is exactly the kind of React foundation that matters for a `6-7 LPA` conversation.

---

## 4. Topic 1 - Components + JSX + Props

### What you must understand first

#### Component

A component is a reusable UI unit.

In modern React, it is usually a function that returns JSX.

Example:

```jsx
function Welcome() {
  return <h1>Hello</h1>;
}
```

Think of a component as:

```txt
input data -> UI output
```

#### JSX

JSX is the syntax that looks like HTML inside JavaScript.

Example:

```jsx
const element = <h1>Hello</h1>;
```

But JSX is not real HTML.
It is syntax that React turns into JavaScript objects.

#### Props

Props are inputs passed from parent to child component.

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

So props are like function parameters for components.

#### Core rule

Props are read-only.

Child components should not mutate props.

If UI should change, usually the parent updates the data and passes new props.

### JSX rules you must remember

- return one parent element, or use a fragment
- use `{}` to write JavaScript expressions inside JSX
- use `className` instead of `class`
- use camelCase for DOM props like `onClick`
- components must start with uppercase

Example:

```jsx
function Card() {
  return (
    <>
      <h2>Title</h2>
      <p>Description</p>
    </>
  );
}
```

### Mandatory mini task - `UserCard`

This is not just "make a card".
This task is training you in:

- component creation
- JSX layout
- props usage
- reusable UI thinking
- conditional display of optional data

### Build goal

Create a reusable `UserCard` component that can display one user's details.

### Suggested user data

Use these fields:

- `name`
- `email`
- `role`
- `city`
- `isOnline`
- `bio`
- `avatarUrl` optional

### What the UI should show

Your card should contain:

- user name
- email
- role
- city
- online/offline badge
- short bio
- optional avatar image or fallback text

### What the task is really checking

You should be able to answer:

- why is this a component?
- what data should come from props?
- what should stay hardcoded?
- how can I reuse this same card for many users?

### Mandatory requirements

- `UserCard` must be a separate component
- all displayed data should come through props
- use at least one conditional display
- render at least 2 or 3 cards from parent component with different data

### Example thinking

Parent:

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

### Add-on - TypeScript props typing

This is preferred, not mandatory.

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

### Common mistakes to avoid

- creating one huge component instead of a reusable card
- hardcoding user data inside the card
- forgetting optional rendering for avatar
- mutating props
- putting all logic in parent and making child too dumb to learn anything

### "Done" checklist

- separate `UserCard` component exists
- data is passed through props
- at least 2-3 cards rendered from parent
- one optional field handled properly
- UI looks clean enough to read

---

## 5. Topic 2 - State with `useState`

### What you must understand first

State is data that belongs to a component and can change over time.

Example:

- count value
- selected color
- form input text
- current step in form
- whether modal is open

Syntax:

```jsx
const [count, setCount] = useState(0);
```

Meaning:

- `count` is current state value
- `setCount` updates it

### Important rules

- do not update state directly
- use the setter function
- state update causes re-render
- state should hold changing UI data

Wrong:

```js
count = count + 1;
```

Correct:

```js
setCount(count + 1);
```

### Task A - Color Changer

### Goal

Build a small component where the user changes a color and sees the UI update immediately.

### What this task teaches

- basic `useState`
- event handling
- dynamic styles
- UI derived from state

### Build idea

Create:

- a box or card
- buttons like Red, Blue, Green, Reset
- current selected color text
- background color changes based on selected state

### Minimum requirements

- one state variable for current color
- button click should update the color
- visible UI should change
- add reset button

### Example state

```jsx
const [color, setColor] = useState("white");
```

### Good extra touch

- show the current color name
- disable clicking the already selected color

### Task B - Counter Constraints

### Goal

Build a counter with rules, not just increase/decrease.

### What this task teaches

- state updates
- guard conditions
- UI constraints
- business logic in components

### Suggested requirements

- start from `0`
- increase button
- decrease button
- reset button
- do not go below `0`
- do not go above `10`
- show warning message at limits

### Why this task matters

Anyone can make a simple counter.
The real learning is:

```txt
Can you add rules to state transitions?
```

That is closer to real app logic.

### Add-on - Multi-step form stepper using state only

This is a very important task.

### Goal

Build a step-based form without any library.

### What this teaches

- state-driven UI flow
- conditional rendering
- managing multiple inputs
- moving between steps
- preserving entered data

### Suggested steps

Step 1:

- name
- email

Step 2:

- city
- role

Step 3:

- password
- confirm password

Step 4:

- review all data before submit

### Required state

You will usually need:

- `step`
- `formData`

Example:

```jsx
const [step, setStep] = useState(1);
const [formData, setFormData] = useState({
  name: "",
  email: "",
  city: "",
  role: "",
  password: "",
  confirmPassword: ""
});
```

### Required behavior

- next button
- previous button
- cannot go past last step
- cannot go below first step
- keep previous input values
- final review screen

### Common mistakes to avoid

- storing each small value in too many disconnected states without reason
- losing old form data when changing step
- not validating before moving ahead

### "Done" checklist for state topic

- color changer works
- counter rules work
- at least one message or disabled state is shown
- stepper keeps previous data and moves correctly

---

## 6. Topic 3 - Conditional Rendering

### What you must understand first

Conditional rendering means:

```txt
show different UI depending on some condition
```

Common ways:

- `if`
- ternary `condition ? A : B`
- `&&` for show/hide

Examples:

```jsx
{isLoggedIn ? <Dashboard /> : <LoginPage />}
```

```jsx
{error && <p>Error occurred</p>}
```

### Very important understanding

Conditional rendering can:

- show/hide DOM
- mount/unmount components
- preserve or reset state depending on identity

That connects directly to Part 1.

### Mandatory task - Login Toggle UI

### Goal

Build UI that changes based on login state.

### What it teaches

- boolean state
- conditional rendering
- practical auth-style UI

### Build idea

Create:

- one `isLoggedIn` state
- login button when logged out
- logout button when logged in
- greeting text when logged in
- login prompt when logged out

### Minimum requirements

Logged out UI:

- "Please log in"
- login button

Logged in UI:

- "Welcome, Nirmal"
- logout button
- maybe dashboard preview or profile box

### Add-on - `<RequireAuth />` wrapper

This is a good beginner architecture task.

### Goal

Create a wrapper component that protects content.

### Concept

Instead of writing this everywhere:

```jsx
{isLoggedIn ? <Dashboard /> : <p>Please log in</p>}
```

You build a reusable wrapper:

```jsx
<RequireAuth isAuthenticated={isLoggedIn}>
  <Dashboard />
</RequireAuth>
```

### What `RequireAuth` should do

- if authenticated, render children
- otherwise show fallback UI

### Example shape

```jsx
function RequireAuth({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <p>Please log in to continue.</p>;
  }

  return children;
}
```

### Why this matters

This builds the thinking needed later for:

- protected routes
- auth guards
- role-based UI

### "Done" checklist

- login and logout UI switch correctly
- at least 2 branches of UI exist
- wrapper component works for one protected block

---

## 7. Topic 4 - Lists & Keys

### What you must understand first

React often renders repeated UI using arrays.

Example:

```jsx
users.map((user) => <UserCard key={user.id} {...user} />)
```

This topic is about:

- rendering lists
- updating arrays immutably
- using stable keys
- understanding add/remove/edit flow

### Mandatory task - User List Add/Remove

### Goal

Build a list of users where new users can be added and existing users can be removed.

### What this teaches

- array state
- `map`
- `filter`
- list rendering
- keys in real usage

### Suggested data shape

```js
{
  id: 1,
  name: "Nirmal",
  role: "Frontend"
}
```

### Required features


- initial array of users
- render list on screen
- button to remove one user
- form or simple input to add new user
- unique stable id for each user


### Logic you should practice

Add user:

```txt
take current state
create new user object
return new array with old + new item
```

Remove user:

```txt
filter out the matching id
```

### Add-on - Edit user immutably

This is a very important real app skill.

### Goal

Allow updating one existing user without mutating the array directly.

### What this teaches

- immutable updates
- `map` for replace-one-item logic
- controlled input basics

### Example idea

- click "Edit"
- change role or name
- save updated user

### Correct mental model

Do not directly mutate:

```js
users[0].name = "New Name";
```

Instead create a new array and new object for changed item.

### Add-on - Show why index-as-key breaks

This is a learning task, not only a coding task.

### Best demo idea

Render a list of editable inputs.

Each row contains:

- input field
- remove button

Then:

1. use `key={index}`
2. type text in one row
3. remove or insert an item above it
4. observe values shifting or behaving strangely

Then switch to:

```jsx
key={user.id}
```

and compare behavior.

This is the best way to actually feel the problem.

### "Done" checklist

- add works
- remove works
- keys use stable ids
- one item can be edited immutably
- you can explain why index keys are risky

---

## 8. Topic 5 - Events

### What you must understand first

Events are how React handles user interaction.

Examples:

- click
- input change
- submit
- focus
- blur

React event names use camelCase:

```jsx
onClick
onChange
onSubmit
```

### Important syntax

Correct:

```jsx
<button onClick={handleClick}>Click</button>
```

Wrong:

```jsx
<button onClick={handleClick()}>Click</button>
```

The wrong version calls the function immediately during render.

### Mandatory task - Click Tracker

### Goal

Track user clicks and show the count or history.

### What this teaches

- event handlers
- state updates after events
- passing data into handlers

### Build options

Simple version:

- button
- click count displayed

Better version:

- count clicks
- show last clicked button name
- show click history

### Example features

- button A
- button B
- total clicks
- last action text like "Last clicked: Save"

### Add-on - Keep handlers outside JSX

This is good code quality practice.

Instead of:

```jsx
<button onClick={() => setCount(count + 1)}>Increase</button>
```

you can write:

```jsx
function handleIncrease() {
  setCount((prev) => prev + 1);
}

<button onClick={handleIncrease}>Increase</button>
```

### Why this matters

- cleaner JSX
- easier debugging
- easier reuse
- better readability

You do not need to force this everywhere, but you should practice it.

### "Done" checklist

- click updates state
- displayed UI changes correctly
- at least one named handler is outside JSX

---

## 9. Topic 6 - Controlled Forms

### What you must understand first

A controlled input means the input value comes from React state.

Example:

```jsx
const [name, setName] = useState("");

<input
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
```

React controls the input value.

This is the standard pattern for most forms in React.

### Why controlled forms matter

They make it easier to:

- validate input
- disable submit
- show errors
- submit structured data
- reset form

### Mandatory task - Signup Form

### Goal

Build a proper basic signup form.

### Suggested fields

- full name
- email
- password
- confirm password
- role select
- accept terms checkbox

### Required behavior

- each input connected to state
- `onChange` updates correct field
- `onSubmit` prevents page refresh
- submitted data is shown in console or preview

### Better state shape

Instead of separate state for every field at first, you can use one object:

```jsx
const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "",
  acceptTerms: false
});
```

### Add-on - Submit loading + disable button

### Goal

Simulate real submit flow.

### Build behavior

- `isSubmitting` state
- when form submits, set loading true
- disable submit button
- show "Submitting..."
- after timeout or fake API, reset loading

This teaches you real-world UI behavior.

### Add-on - Basic validation (manual)

Do not use a library here yet.

Add manual rules like:

- name cannot be empty
- email must include `@`
- password minimum 6 chars
- password and confirm password must match
- terms must be accepted

### What validation should do

- stop form submission if invalid
- show readable error messages
- preferably store errors in state

Example:

```jsx
const [errors, setErrors] = useState({});
```

### "Done" checklist

- every field is controlled
- submit prevents page reload
- loading state exists
- button disables during submit
- manual validation catches bad input

---

## 10. Topic 7 - React Dev Hygiene

This part is not just theory.
It is about working like a cleaner developer.

### Folder structure

The roadmap suggests:

- `components`
- `pages`
- `hooks`
- `services`
- `utils`

### What each folder means

#### `components`

Reusable UI pieces.

Examples:

- `UserCard`
- `Navbar`
- `Button`
- `InputField`

#### `pages`

Top-level route screens.

Examples:

- `HomePage`
- `UsersPage`
- `SignupPage`
- `PlaygroundPage`

#### `hooks`

Custom reusable hooks.

Examples later:

- `useToggle`
- `useDebounce`
- `useLocalStorage`

You may not need many custom hooks yet in Week 2, but keep the folder idea in mind.

#### `services`

API and backend interaction logic.

Examples:

- `authService.js`
- `userService.js`

#### `utils`

Pure helper functions.

Examples:

- validators
- formatters
- constants helpers

### Why folder structure matters

Without structure, small projects become messy quickly.

This part trains you to separate:

- UI
- page-level composition
- business logic
- reusable helpers

### ESLint + Prettier setup

This is mandatory in roadmap terms because it teaches discipline.

### What ESLint does

- catches common mistakes
- enforces code quality rules
- warns about unused variables and unsafe patterns

### What Prettier does

- formats code consistently

### Why both matter

Together they help you:

- write cleaner code
- reduce style inconsistency
- look more professional

### For now, what you should understand

At your level, you should know:

- ESLint = code quality checker
- Prettier = auto formatter
- they are often used together

You do not need to memorize every config option right now.

### "Done" checklist

- you can explain the folder purpose
- your Week 2 app is not one giant file
- you know what ESLint and Prettier are solving

---

## 11. Topic 8 - TypeScript Starter

This is marked as recommended in your roadmap.

That means:

- good to do
- helpful for familiarity
- not something to get stuck on for days

### Goal here

Do not aim for mastery.

Aim for:

- reading TS props
- typing 2-3 simple components
- getting used to basic React TS syntax

### Best components to convert

Convert easy ones:

- `UserCard`
- `Counter`
- `SignupForm` props or helper types

### What to type first

- props
- simple state
- form object shape

### Example

```tsx
type User = {
  id: number;
  name: string;
  role: string;
};

type UserCardProps = {
  user: User;
};
```

### What you can safely skip for now

- advanced generics
- complex utility types
- deep config
- custom hook typing complexity

### Good rule for you

```txt
Use TS for familiarity, not as a time trap.
```

### "Done" checklist

- at least 1-2 components typed
- you understand typed props at a basic level
- TS did not block your React progress

---

## 12. Weekend Task - Build One "UI Playground" App

This is how you combine the whole week.

### What this means

Do not leave tasks as isolated toy files only.

Build one small app where all these concepts live together.

### Suggested app structure

Pages:

- `HomePage`
- `UsersPage`
- `FormsPage`
- `AuthDemoPage`

Components:

- `UserCard`
- `Counter`
- `ColorChanger`
- `RequireAuth`
- `SignupForm`

### Suggested route ideas

`/`

- overview page

`/users`

- user cards
- add/remove/edit users

`/state-demo`

- color changer
- counter constraints

`/auth-demo`

- login toggle
- `RequireAuth` wrapper demo

`/forms`

- signup form
- multi-step form stepper

### Add React Router basics

At your level, React Router basics means:

- routes
- links
- layout wrapper

Example mental model:

```txt
Navbar stays common
main page area changes by route
```

### Why this weekend task matters

Because interviewers trust projects more than disconnected theory.

This task proves you can combine concepts into one small product.

### Weekend "Done" checklist

- one app contains all week tasks
- route navigation works
- code is split into folders
- repeated UI is componentized

---

## 13. Recommended Order to Build Part 2

Build in this order:

1. `UserCard`
2. color changer
3. counter constraints
4. login toggle UI
5. click tracker
6. user list add/remove
7. signup form
8. multi-step form
9. `RequireAuth`
10. immutable editing
11. index-key bug demo
12. combine into UI Playground
13. light TypeScript conversion

This order works because each topic supports the next one.

---

## 14. How to Think About Each Task Properly

These tasks are not random.
Each one is testing a React skill:

- `UserCard` -> components, props, JSX
- color changer -> basic state
- counter constraints -> state rules
- login toggle -> conditional rendering
- user list -> arrays + keys
- click tracker -> events
- signup form -> controlled inputs
- stepper -> multiple states and flow control
- `RequireAuth` -> reusable conditional wrapper
- TS starter -> basic typed React familiarity

If you see this pattern, the roadmap starts making much more sense.

---

## 15. What to Study Before Coding Each Task

### Before `UserCard`

Study:

- component basics
- JSX rules
- props

### Before color changer and counter

Study:

- `useState`
- event handlers
- state update triggers UI change

### Before login toggle

Study:

- ternary rendering
- `&&`
- mount vs show/hide idea

### Before user list

Study:

- `map`
- `filter`
- immutable array updates
- stable keys

### Before click tracker

Study:

- `onClick`
- passing handler references
- event-to-state update flow

### Before signup form

Study:

- controlled inputs
- `onChange`
- `onSubmit`
- validation basics

### Before UI Playground

Study:

- folder structure
- route basics
- combining components

---

## 16. Common Beginner Confusions Cleared

### "Should I make one file per task?"

For learning: yes at first if needed.

For final Week 2 app: no.
Combine properly into a structured app.

### "Do I need backend for this week?"

No.
Week 2 is React foundation.
Keep data local and simple.

### "Do I need advanced styling?"

No.
Readable clean UI is enough.
Functionality and understanding matter more.

### "Do I need TypeScript in all components?"

No.
Only starter-level familiarity is enough for now.

### "Are add-ons optional?"

Usually:

- mandatory task must be done
- add-on should be done if time allows, especially the useful ones like immutable editing and form validation

---

## 17. Strong Minimum Scope for You

If time becomes tight, do at least this:

- `UserCard`
- color changer
- counter constraints
- login toggle UI
- user list add/remove
- signup form with controlled inputs
- one combined UI Playground app

Then add these next:

- immutable edit
- `RequireAuth`
- multi-step form
- basic TS conversion

If time is very tight, the first block is the minimum you should not skip.

---

## 18. Self-Check Questions

After Part 2, you should be able to answer:

1. What is the difference between component, JSX, and props?
2. Why is state different from a normal variable?
3. Why does React encourage controlled forms?
4. Why do we use `map` to render lists?
5. Why are stable keys important?
6. Why should we update arrays and objects immutably?
7. How does conditional rendering connect with auth UI?
8. What problem does `RequireAuth` solve?
9. Why is keeping handlers outside JSX sometimes cleaner?
10. Why is folder structure important even in small apps?

If you can answer these, you are not just coding blindly.

---

## 19. Final Practical Summary

This whole Part 2 is basically training you to do this:

```txt
take data
turn it into UI with components
change UI through state
switch UI through conditions
repeat UI through lists
react to user actions through events
capture user input through controlled forms
organize code cleanly
combine everything into one small app
```

That is exactly why these task lines in the roadmap are short.
Each short line is actually one practical React skill block.

Now that the tasks are expanded, you should be able to start building without guessing what the roadmap means.

---

## 20. What You Should Do Next

Best next move:

1. read the `UserCard` section
2. build only that first
3. then move in the recommended order
4. keep your final versions ready for the UI Playground app

---

## 21. Week 2 Priority Filter for 5 LPA

This section is the practical filter if your goal is:

- get interview-ready fast
- avoid getting stuck doing every small extra
- focus on what matters most for a `5 LPA` style role

### A. Must Not Skip

These are the Week 2 things you should definitely do.

#### 1. Components + JSX + Props

Must do:

- make at least one reusable component like `UserCard`
- pass props from parent
- render multiple cards or multiple uses of the same component
- understand JSX basics

#### 2. State with `useState`

Must do:

- one simple state task like color/theme changer
- one logic-based state task like counter constraints

#### 3. Conditional Rendering - Basic Level

Must do:

- basic login toggle or show/hide UI task

Important:

```txt
Do not skip conditional rendering completely.
Only skip the deeper add-on if needed.
```

#### 4. Lists & Keys - Basic Level

Must do:

- render a list using `map`
- use stable `key`
- understand why keys matter

#### 5. Events

Must do:

- handle clicks properly
- connect event to state update

#### 6. Controlled Forms - Basic Level

Must do:

- make at least one proper controlled form
- use `value` and `onChange`
- use `onSubmit`

#### 7. Basic Dev Hygiene

Must do:

- do not keep everything in one file
- separate at least `components` and `tasks/pages`
- know what ESLint and Prettier are

---

### B. Good to Do, But Can Be Light

These are useful, but they do not need perfection right now.

#### 1. Multi-step form

Good to do:

- build it once
- keep previous values
- move next/prev properly

But:

```txt
It does not need to become a polished production wizard.
```

#### 2. Immutable edit in list task

Good to do:

- at least understand updating arrays/objects immutably

#### 3. Basic manual validation

Good to do:

- empty check
- email basic check
- password match check

#### 4. TypeScript starter

Good to do:

- type 1 or 2 simple props objects

But:

```txt
Do not get stuck on TS syntax if it slows your React learning.
```

#### 5. Weekend UI Playground app

Good to do:

- combine several tasks in one app

But:

```txt
It can stay small and simple.
```

---

### C. Safe to Skip for Now If Time Is Tight

These are the first things you can postpone.

#### 1. `RequireAuth` wrapper add-on

Safe to postpone if:

- you already understand basic conditional rendering

#### 2. React Router basics

Safe to postpone for now if:

- your core React basics are still shaky

#### 3. Perfect styling

Safe to postpone.

Readable UI is enough.

#### 4. Full TypeScript conversion

Safe to postpone.

Do not let TypeScript block Week 2 progress.

#### 5. Advanced polish in every mini task

Safe to postpone.

For example:

- fancy validation UI
- perfect spacing
- too much refactoring
- extra abstraction too early

---

### D. What You Should Not Skip Even If You Skip Add-ons

If you skip all add-ons, you should still make sure these basics are done well:

- reusable component with props
- at least one solid state task
- at least one conditional rendering task
- at least one list rendering task with keys
- at least one form with controlled inputs
- basic file structure

If these are done properly, you are still on track.

If these are also weak, then skipping add-ons becomes dangerous.

---

### E. Best 5 LPA Week 2 Minimum

If your time is tight, this is the Week 2 minimum set I would keep:

1. `UserCard`
2. `ThemeChanger` or color changer
3. `CounterConstraints`
4. login toggle UI
5. user list render with proper keys
6. one signup form with controlled inputs
7. basic structure into separate components

If you finish these properly and can explain them, that is meaningful progress.

---

### F. Best 5 LPA Add-ons to Keep

If you keep only a few extras, keep these:

1. basic manual validation in form
2. immutable update understanding
3. very light TypeScript props typing

These give much better value than trying to do every optional thing.

---

### G. Final Decision Rule

Use this rule:

```txt
Do all core tasks.
Do only high-value add-ons.
Skip polish-heavy or time-heavy extras if they slow progress.
```

That is the right balance for your current target.



