# 01 React Core Theory

This note is the minimum detailed React theory you should know for emergency interview prep.

It is not built for memorizing everything.
It is built so that you can:

- understand the model
- explain it clearly
- code the basics confidently

---

## 1. What React Actually Is

React is a library for building UI using reusable components.

The main mental model:

```txt
UI = function of state and props
```

Meaning:

- if data changes, UI changes
- instead of manually editing DOM everywhere, you update data and React recalculates UI

This is called `declarative UI`.

Imperative style:

```txt
find element -> change text -> change style -> hide button
```

Declarative React style:

```txt
if state is X, UI should look like Y
```

---

## 2. JSX

JSX is syntax that looks like HTML inside JavaScript.

Example:

```jsx
function Welcome() {
  return <h1>Hello</h1>;
}
```

Important rules:

- return one parent or use fragment
- JavaScript expressions go inside `{}`
- `className`, not `class`
- component names start with uppercase

JSX is not HTML.
It becomes JavaScript objects that React uses to build UI.

---

## 3. Components

Components are reusable pieces of UI.

Think:

```txt
small self-contained UI units
```

Examples:

- `Navbar`
- `UserCard`
- `ProductList`
- `SignupForm`

Good component qualities:

- single purpose
- reusable
- clear props
- small enough to understand

Bad component qualities:

- too many responsibilities
- mixed UI and unrelated logic
- large prop lists without structure

---

## 4. Props

Props are inputs passed from parent to child.

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

Props are read-only.
Child should not mutate them.

Interview line:

```txt
Props are used to pass data and behavior from parent to child. They help components stay reusable and configurable.
```

---

## 5. State

State is data managed inside a component that can change over time.

Example:

```jsx
const [count, setCount] = useState(0);
```

Use state for:

- count
- selected tab
- form inputs
- modal open/close
- loading flag

Do not use normal variables for UI-changing data.

Why:

```txt
Normal variable change does not tell React to update the UI.
State update does.
```

---

## 6. Re-render

When state or relevant props change, React re-runs the component to compute the next UI.

Important:

- re-render is not full page reload
- re-render is not always full DOM rebuild

React:

1. recalculates component output
2. compares old and new UI trees
3. commits only actual DOM changes

That is why React feels efficient.

---

## 7. Event Handling

React handles user interaction with event props.

Examples:

- `onClick`
- `onChange`
- `onSubmit`

Correct:

```jsx
<button onClick={handleClick}>Save</button>
```

Wrong:

```jsx
<button onClick={handleClick()}>Save</button>
```

Why wrong:

```txt
It runs immediately during render instead of on click.
```

---

## 8. Conditional Rendering

Conditional rendering means showing different UI based on conditions.

Examples:

```jsx
{isLoggedIn ? <Dashboard /> : <LoginPage />}
```

```jsx
{error && <p>Something went wrong</p>}
```

This is used everywhere:

- auth
- loading state
- error state
- role-based UI
- modals

Interview line:

```txt
Conditional rendering is how React expresses different UI states based on data such as auth, loading, permissions, or availability of content.
```

---

## 9. Lists and Keys

Lists are rendered with `map`.

Example:

```jsx
users.map((user) => <UserCard key={user.id} user={user} />)
```

Keys matter because they help React identify list items across renders.

Good keys:

- database id
- stable uuid

Avoid:

- `Math.random()`
- dynamic unstable values
- array index for dynamic lists

Why index keys are risky:

- insertion can shift identity
- inputs may show wrong values
- checkbox or local state may move incorrectly

---

## 10. Controlled Forms

Controlled input means React state controls input value.

Example:

```jsx
const [name, setName] = useState("");

<input value={name} onChange={(e) => setName(e.target.value)} />
```

Why controlled forms matter:

- validation
- submission handling
- predictable input state
- dynamic UI behavior

Most React interviewers expect you to know controlled forms well.

---

## 11. `useEffect`

`useEffect` is used to synchronize the component with external systems.

Examples:

- API calls
- timers
- subscriptions
- event listeners
- syncing document title

Simple example:

```jsx
useEffect(() => {
  fetchUsers();
}, []);
```

Important mental model:

```txt
If something is caused by rendering and needs to interact with the outside world, useEffect may be the right place.
```

Common mistake:

Using `useEffect` for logic that can be computed directly during render.

Rule:

- derive what you can in render
- use `useEffect` only for side effects

---

## 12. Dependency Array in `useEffect`

Examples:

Run once on mount:

```jsx
useEffect(() => {
  fetchData();
}, []);
```

Run when `query` changes:

```jsx
useEffect(() => {
  search(query);
}, [query]);
```

No dependency array:

```jsx
useEffect(() => {
  console.log("runs after every render");
});
```

You should understand the behavior, not memorize blindly.

---

## 13. Component Communication

Common patterns:

### Parent to child

Use props.

### Child to parent

Parent passes callback prop.

Example:

```jsx
<UserForm onSubmit={handleUserSubmit} />
```

### Sibling to sibling

Usually lift shared state to common parent.

Example:

- `SearchBar` changes query
- `UserList` shows filtered users
- parent stores query state

This is called `lifting state up`.

---

## 14. Context

Context helps avoid deep prop drilling for widely used data.

Examples:

- theme
- auth user
- language

Use Context when:

- many components need same data
- passing props through many levels feels noisy

Do not use Context for every state.
It is not automatically better than props.

Interview line:

```txt
I use Context for shared app-level state like auth or theme, but I avoid putting everything into Context because local state is often simpler and easier to reason about.
```

---

## 15. Custom Hooks

Custom hooks are functions that reuse stateful logic.

Example:

```jsx
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = () => setValue((prev) => !prev);
  return [value, toggle];
}
```

When to use:

- repeated state logic
- fetch logic reuse
- toggle/modal logic
- debounce logic

Do not create hooks too early just for abstraction.

---

## 16. Folder Structure

Basic reasonable structure:

```txt
src/
  components/
  pages/
  hooks/
  services/
  utils/
```

Meaning:

- `components` -> reusable UI
- `pages` -> route screens
- `hooks` -> custom hooks
- `services` -> API logic
- `utils` -> pure helper functions

For small apps, keep it simple.
Do not over-engineer.

---

## 17. Performance Basics

At interview level, you should know:

- React re-renders components when state/props change
- not every re-render is a bug
- optimize only when needed

Common tools:

- `React.memo`
- `useMemo`
- `useCallback`

But:

```txt
Do not say you use them everywhere.
```

Better line:

```txt
I first look for unnecessary re-renders, heavy computations, or expensive child trees. Then I use memoization only where it gives a measurable benefit.
```

---

## 18. API Call Basics

Typical fetch UI should handle:

- loading
- success
- error
- empty data

This matters a lot in interviews.

Weak UI:

```txt
Just fetch and console.log result.
```

Better UI:

```txt
Show spinner while loading, error message on failure, empty state if no records, and the content on success.
```

---

## 19. Scalability Basics

For React scalability, think in these buckets:

- component size
- state ownership
- API separation
- reusability
- predictable data flow

A scalable React codebase usually:

- keeps components focused
- keeps business logic out of huge UI files
- separates API logic
- avoids deeply tangled state
- standardizes patterns

You do not need advanced architecture speech for `5-7 LPA`, but you should sound structured.

---

## 20. Common Mistakes

- mutating state directly
- using index as key in dynamic lists
- forgetting loading/error states
- putting too much logic in one component
- using `useEffect` for everything
- not controlling form inputs
- using global state too early

---

## 21. 2-Year Experience Level Answer Style

If you want to sound more experienced, speak like this:

- mention trade-offs
- mention edge cases
- mention maintainability
- mention user states
- mention code structure

Instead of:

```txt
I used useState because it stores data.
```

Say:

```txt
I kept this as local state because the data is only relevant to this component, so lifting it higher or putting it into global state would add unnecessary complexity.
```

---

## 22. Final Core Theory Summary

If you remember only one React summary, remember this:

```txt
React is a declarative UI library where components render UI from state and props. State updates trigger re-renders, lists require stable keys, forms are usually controlled, and useEffect is used for side effects like API calls. Scalable React comes from good component boundaries, clear data flow, and avoiding unnecessary complexity.
```

