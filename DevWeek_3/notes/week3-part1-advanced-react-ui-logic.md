# Week 3 Part 1 - Advanced React UI Logic

This note covers the exact Week 3 roadmap jump:

- `useEffect`
- API fetching and cleanup
- shared client state
- Redux Toolkit
- React Query
- loading, error, success, and empty states
- search, filters, and pagination
- performance awareness
- state design maturity
- cleaner app architecture

Week 2 was mostly:

```txt
local state -> UI
```

Week 3 becomes:

```txt
shared state + server data + async states + user actions -> production-style UI
```

Goal of this note:

- make Week 3 understandable before you start coding
- explain the concepts in revision-friendly language
- add the missing state-management bridge needed for resume and interview safety
- give enough examples that you should not need to search outside for the basics
- prepare you for `5-6 LPA` interview explanations

---

## 0. What to Revise Before Starting Week 3

Week 3 does not start from zero.
If the old base is shaky, then:

- `useEffect` will feel confusing
- Context/Redux distinctions will feel random
- React Query will feel like magic instead of making sense

So before starting Week 3 properly, revise these:

### From Week 1

#### 1. Async JavaScript

Revise:

- callbacks
- promises
- `async/await`
- error handling
- sequential vs parallel thinking

Read:

- [Week 1 Checklist](C:/Others/Drive_Next/Dev-DSA/Dev_Weeks/DevWeek_1/WEEK1_REVISION_CHECKLIST.md)
- [Async JS Theory](C:/Others/Drive_Next/Dev-DSA/Dev_Weeks/DevWeek_1/JS2-AsynchJs/AsynchJs.md)
- [Async JS Practice README](C:/Others/Drive_Next/Dev-DSA/Dev_Weeks/DevWeek_1/JS2-AsynchJs/Practice/README.md)

Why it matters for Week 3:

- fetching is async
- loading/error flow is async
- React Query mental model becomes easier if promises already make sense

#### 2. Debounce

Revise:

- what debounce does
- why it prevents expensive work on every keystroke

Read:

- [Debounce & Throttle Theory](C:/Others/Drive_Next/Dev-DSA/Dev_Weeks/DevWeek_1/JS3-Debounce&Throttle/Debounce&Throttle.md)
- [Debounce Practice README](C:/Others/Drive_Next/Dev-DSA/Dev_Weeks/DevWeek_1/JS3-Debounce&Throttle/Practice/README.md)

Why it matters for Week 3:

- debounced search is one of the direct roadmap tasks

### From Week 2

#### 3. React mental model

Revise:

- `UI = f(state)`
- state change -> rerender
- rerender vs DOM update
- why keys matter

Read:

- [Week 2 Part 1 - How React Thinks](C:/Others/Drive_Next/Dev-DSA/Dev_Weeks/DevWeek_2/notes/week2-part1-how-react-thinks.md)

Why it matters for Week 3:

- effects make more sense when render vs rerender is already clear
- optimization and state design also depend on this base

#### 4. Core React coding base

Revise:

- `useState`
- conditional rendering
- list rendering with keys
- controlled forms
- React dev hygiene

Read:

- [Week 2 Part 2 - Core React Concepts and Tasks](C:/Others/Drive_Next/Dev-DSA/Dev_Weeks/DevWeek_2/notes/week2-part2-core-react-concepts-and-tasks.md)

Why it matters for Week 3:

- search/filter inputs depend on controlled forms
- loading/error/empty depends on conditional rendering
- users list depends on lists and keys
- architecture and shared state need the Week 2 React base

#### 5. Router basics for URL sync

This is not required before the entire week, but revise it before the URL-sync part.

Read:

- [React Router Notes](C:/Others/Drive_Next/Dev-DSA/Dev_Weeks/DevWeek_2/notes/React-Router-Notes.md)

Why it matters for Week 3:

- URL query params are part of the Week 3 add-on flow

### Minimum revision if you are in a hurry

If you do not have time to reread everything, at least revise these before serious Week 3 work:

1. [Async JS Theory](C:/Others/Drive_Next/Dev-DSA/Dev_Weeks/DevWeek_1/JS2-AsynchJs/AsynchJs.md)
2. [Debounce & Throttle Theory](C:/Others/Drive_Next/Dev-DSA/Dev_Weeks/DevWeek_1/JS3-Debounce&Throttle/Debounce&Throttle.md)
3. [Week 2 Part 1 - How React Thinks](C:/Others/Drive_Next/Dev-DSA/Dev_Weeks/DevWeek_2/notes/week2-part1-how-react-thinks.md)
4. [Week 2 Part 2 - Core React Concepts and Tasks](C:/Others/Drive_Next/Dev-DSA/Dev_Weeks/DevWeek_2/notes/week2-part2-core-react-concepts-and-tasks.md)

That is the smallest safe revision base.

---

## 1. First Big Clarification

Week 3 is not mainly about "more hooks".

It is mainly about this shift:

```txt
In Week 2 you mostly controlled the data.
In Week 3 some important data and flows are no longer simple local component state.
```

Now you must think about:

- request started or not?
- data arrived or not?
- request failed or not?
- request succeeded but returned nothing?
- should this value live locally, in shared client state, or come from the server?
- user changed search/filter/page?
- cached data is stale or still okay?

So if Week 2 taught:

```txt
how to build UI with React
```

Week 3 teaches:

```txt
how to build realistic UI that depends on shared state, API state, and async behavior
```

---

## 2. The State Map You Must Keep Clear

Before Redux and React Query, keep this one map in your head.

### A. Local or component state

This belongs to one component or one small isolated UI area.

Examples:

- current input value
- whether a modal is open
- current tab
- current counter value

Good tools:

- `useState`
- sometimes `useReducer`

### B. Shared client state

This is still frontend-owned state, but many components need it.

Examples:

- logged-in user info already known in frontend
- app theme
- sidebar open/closed
- selected workspace
- global filters
- current auth role used across screens

Good tools:

- `Context API` for light-to-medium shared state
- `Redux Toolkit` for more structured app-wide state

### C. Server state

This is data coming from backend or API.

Examples:

- users list from backend
- products list
- payment history
- plans/subscriptions from server

This data is different because:

- you do not own the original source
- it can become stale
- it may need refetching
- multiple screens may depend on it
- server changes can make frontend copies outdated

Best tool in this roadmap:

- `React Query`

### The one-line memory rule

```txt
local state = one component owns it
shared client state = frontend owns it but many components need it
server state = backend owns it, frontend only reads/mutates it
```

If this distinction is clear, half of Week 3 confusion disappears.

---

## 3. Important Terminology You Must Know

### Side effect

Any logic that steps outside pure rendering.

Examples:

- API request
- timer
- event subscription
- localStorage write
- manually controlling browser APIs

Memory line:

```txt
render should describe UI
effect should synchronize with the outside world
```

### Cleanup

Code that undoes or stops what your effect started.

Examples:

- `clearTimeout`
- `removeEventListener`
- `abort()`
- disconnecting subscriptions

### Prop drilling

Passing props through many intermediate components only because a deep child needs them.

Example:

```txt
App -> Layout -> Header -> Nav -> UserBadge
```

If only `UserBadge` needs `currentUser`, but all layers receive it as props, that is prop drilling.

### Race condition

Two async operations finish in an unexpected order.

Example:

1. user types `n`
2. request for `n` starts
3. user types `ni`
4. request for `ni` starts
5. `ni` finishes first
6. then older `n` finishes later and wrongly overwrites UI

### Derived state

Data that can be calculated from existing state instead of stored separately.

Bad example:

```jsx
const [users, setUsers] = useState([])
const [search, setSearch] = useState('')
const [filteredUsers, setFilteredUsers] = useState([])
```

Better:

```jsx
const filteredUsers = users.filter((user) =>
  user.name.toLowerCase().includes(search.toLowerCase())
)
```

### Cache

Stored copy of data that can be reused instead of fetching from zero every time.

### Query key

The identity of fetched data in React Query.

Example:

```txt
['users', page, role, debouncedSearch]
```

If this key changes, React Query treats it as different query state.

### Query invalidation

Telling React Query:

```txt
this cached data may now be outdated, please mark it stale and refetch when needed
```

---

## 4. `useEffect` - The Correct Mental Model

The React docs describe `useEffect` as a hook that lets you synchronize a component with an external system. That is the most important sentence to remember. Inference from the docs: if there is no external system involved, there is a strong chance you do not need an effect at all. Source: [React useEffect](https://react.dev/reference/react/useEffect)

### Wrong mental model

```txt
useEffect is a place for random logic
```

### Better mental model

```txt
render calculates UI
effect runs after React commits that render
```

So the order is:

1. component function runs
2. React decides what should be on screen
3. DOM updates happen
4. `useEffect` runs after that

That is why effects are good for:

- fetching data
- starting timers
- attaching listeners
- synchronizing browser or third-party APIs

They are bad for:

- values you can calculate during render
- normal filtering/sorting that does not need external sync
- patching avoidable state mistakes

### Clean interview answer

```txt
useEffect runs after render and is used to synchronize the component with external systems like APIs, timers, subscriptions, or browser APIs.
```

---

## 5. How the Effect Lifecycle Actually Works

Suppose you write:

```jsx
useEffect(() => {
  console.log('setup')

  return () => {
    console.log('cleanup')
  }
}, [roomId])
```

React behavior is:

1. component mounts
2. setup runs
3. if `roomId` changes later, cleanup runs with old values
4. then setup runs again with new values
5. when component unmounts, cleanup runs one final time

### Think of every effect as a tiny process

The React docs push this idea strongly: write each effect like one independent setup/cleanup cycle. That is a very strong way to think. Source: [React useEffect](https://react.dev/reference/react/useEffect)

Memory line:

```txt
setup starts something
cleanup stops that same thing
```

If your setup starts:

- timer
- listener
- request
- connection

then your cleanup should stop or undo it.

---

## 6. Why Effects Sometimes Run Twice in Development

In development with Strict Mode, React intentionally does an extra setup + cleanup cycle before the real setup. This is a stress test for your cleanup logic. If your effect breaks because of this, the problem is usually not "React is wrong"; the problem is usually that cleanup logic is incomplete. Source: [React useEffect](https://react.dev/reference/react/useEffect)

### Practical meaning

If you see:

- fetch happening twice in development
- connection opening and closing once extra
- logs appearing twice

it may be because Strict Mode is checking whether your cleanup is truly safe.

Do not panic immediately.
First ask:

```txt
is my cleanup really mirroring my setup?
```

---

## 7. Dependency Array Without Confusion

### No dependency array

```jsx
useEffect(() => {
  console.log('runs after every render')
})
```

This runs after every commit.

Usually risky unless that is truly what you want.

### Empty dependency array

```jsx
useEffect(() => {
  fetchUsers()
}, [])
```

This means:

```txt
run after first mount only
```

This is the common fetch-on-mount case.

### Dependency list present

```jsx
useEffect(() => {
  fetchUsers(searchTerm)
}, [searchTerm])
```

This means:

```txt
run after mount and again when searchTerm changes
```

### The real rule

Dependencies should represent all reactive values the effect reads from component scope: props, state, and functions/variables declared in the component. Source: [React useEffect](https://react.dev/reference/react/useEffect)

So the right question is not:

```txt
How do I silence dependency warnings?
```

The right question is:

```txt
What values is this effect truly reading?
```

### Example

```jsx
function UsersPage({ role }) {
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchUsers(role, page)
  }, [role, page])
}
```

Why both dependencies belong:

- `role` affects the request
- `page` affects the request

---

## 8. Why Infinite Loops Happen

Effects loop when:

1. effect updates state
2. that state change causes rerender
3. effect dependencies now appear changed
4. effect runs again

### Classic bad example

```jsx
const [users, setUsers] = useState([])

useEffect(() => {
  setUsers([...users, newUser])
}, [users])
```

This loops because the effect depends on `users` and also changes `users`.

### Another common bad example

```jsx
function UsersPage() {
  const fetchUsers = async () => {
    // request
  }

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])
}
```

If `fetchUsers` is recreated on every render, the effect keeps seeing a new dependency.

### Better debugging questions

Ask:

- does this logic need an effect at all?
- am I storing something that can be derived?
- am I using a function/object dependency that changes every render?

### Very important React-doc idea

If you are not synchronizing with an external system, you probably do not need an effect. Source: [React useEffect](https://react.dev/reference/react/useEffect)

---

## 9. Manual Fetching - The Correct First-Step Pattern

Before React Query, you should still understand one clean manual fetch flow.

### Why manual fetching matters first

Because if you do not understand:

- loading
- error
- success
- empty
- cleanup

then React Query becomes magic instead of understanding.

### Correct basic pattern

```jsx
import { useEffect, useState } from 'react'

function UsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true)
        setError('')

        const response = await fetch('https://jsonplaceholder.typicode.com/users')

        if (!response.ok) {
          throw new Error('Failed to fetch users')
        }

        const data = await response.json()
        setUsers(data)
      } catch (err) {
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  if (loading) return <p>Loading users...</p>
  if (error) return <p>{error}</p>
  if (users.length === 0) return <p>No users found.</p>

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
```

### Why this pattern is good

- async function is inside effect, not the effect callback itself
- loading is set before request
- error is cleared before new request
- non-OK response is handled
- `finally` guarantees loading cleanup
- render branches are honest

### Why not write `useEffect(async () => {})`

Because the effect callback should return either:

- nothing
- or a cleanup function

An async function returns a Promise, not cleanup logic.

---

## 10. Cleanup for Fetching - AbortController

Manual fetch screens should also teach cleanup.

### Example

```jsx
useEffect(() => {
  const controller = new AbortController()

  async function loadUsers() {
    try {
      setLoading(true)
      setError('')

      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users',
        { signal: controller.signal }
      )

      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }

      const data = await response.json()
      setUsers(data)
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Something went wrong')
      }
    } finally {
      setLoading(false)
    }
  }

  loadUsers()

  return () => controller.abort()
}, [])
```

### Why this matters

If user leaves the page before request finishes:

- old request should not keep living forever
- outdated result should not keep trying to update state

Memory line:

```txt
if the effect starts a request, cleanup should know how to stop it
```

---

## 11. Why Shared Client State Enters the Picture Now

Now that you have seen local state and server fetch flow, the next natural question is:

```txt
What if many components need the same frontend-owned state?
```

Example:

```txt
App -> Layout -> Header -> ProfileMenu -> UserBadge
```

If:

- `Header` needs user role
- `ProfileMenu` needs user name
- `UserBadge` needs avatar

and you pass those values manually through every layer, you get prop drilling.

This is where `Context` and `Redux` become relevant.

### Memory line

```txt
Context and Redux are not for replacing every useState.
They are for shared client state.
```

---

## 12. Context API - The First Shared-State Step

The React docs describe context like this: it lets components pass information deep down without explicitly passing props. That is the best first definition to remember. Sources: [React createContext](https://react.dev/reference/react/createContext), [React useContext](https://react.dev/reference/react/useContext)

### When Context is useful

Context is good when:

- many components need the same value
- the value is relatively stable or app-level
- you want to avoid prop drilling
- you do not need heavy Redux-style structure

Examples:

- theme
- current logged-in user
- auth methods like `logout`
- language
- feature flags

### The basic mental model

```txt
create context
provide value high in tree
read value deep in tree with useContext
```

### Example

```jsx
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({
    name: 'Nirmal',
    role: 'admin',
  })

  function logout() {
    setCurrentUser(null)
  }

  return (
    <AuthContext.Provider value={{ currentUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

function UserBadge() {
  const { currentUser } = useContext(AuthContext)

  return <p>{currentUser ? currentUser.name : 'Guest'}</p>
}
```

### What happens when context value changes

React will re-render the components reading that context value. This is why Context is useful, but also why it should not be treated like "free global everything". Source: [React createContext](https://react.dev/reference/react/createContext)

### Important caveat

Context solves:

- prop drilling

It does not automatically solve:

- large-scale state organization
- complex debugging
- action flow discipline
- large app predictability

That is where Redux becomes more useful.

---

## 13. Context API - What It Does Not Mean

Context is not:

- a replacement for all local state
- a replacement for server-state tools
- automatically better than Redux in all cases

### Bad Context usage pattern

Putting a huge constantly-changing app state object into one giant context and making everything depend on it.

This usually becomes:

- noisy
- harder to debug
- less structured

### Better use of Context

Use it for lighter shared values like:

- theme
- current user shell
- auth helper methods
- app settings

### Interview answer

```txt
I use Context to avoid prop drilling for shared app-level values like theme or current user information. For more complex global state with multiple slices and predictable action flows, Redux Toolkit is usually a better fit.
```

---

## 14. Redux Toolkit - Why It Comes After Context

Redux Toolkit is the modern recommended way to write Redux. The official Quick Start shows `configureStore`, `createSlice`, and React-Redux hooks as the normal modern path. Sources: [Redux Toolkit Quick Start](https://redux-toolkit.js.org/tutorials/quick-start), [React Redux Hooks](https://react-redux.js.org/api/hooks)

### Why Redux exists at all

Redux is useful when:

- state is truly app-wide
- many unrelated components need to read/update it
- updates should be predictable and explicit
- you want clearer structure around actions and reducers
- your project is large enough that local state and Context start feeling messy

### Good examples

- auth/session shell
- sidebar / app layout state
- selected workspace or branch
- notification center
- complex wizard shared across screens
- large shared filters and UI preferences

### Memory line

```txt
Redux gives structure to global client state.
```

Context says:

```txt
here is shared data
```

Redux says:

```txt
here is global state
here is how it changes
here is how components read and update it
```

---

## 15. Redux Toolkit Core Mental Model

The pieces you must clearly understand:

### Store

The single app-wide container holding Redux state.

Think:

```txt
central box of global client state
```

### Slice

A named part of the Redux state with:

- initial state
- reducers
- generated actions

Think:

```txt
one domain of global state
```

Examples:

- `authSlice`
- `uiSlice`
- `membershipSlice`

### Reducer

A function describing how state changes when an action happens.

### Action

An event that says:

```txt
something happened
```

Examples:

- `loginSuccess`
- `toggleSidebar`
- `setActivePlan`

### Selector

A function or pattern used to read specific state from the store.

Examples:

- current user
- current theme
- active role

### Dispatch

How components send actions to Redux.

---

## 16. The Basic Redux Toolkit Flow

This is the flow you should memorize:

```txt
component dispatches action
reducer updates slice state
store gets new state
components reading that state update
```

### Example

```jsx
// uiSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarOpen: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen
    },
  },
})

export const { toggleSidebar } = uiSlice.actions
export default uiSlice.reducer
```

```jsx
// store.js
import { configureStore } from '@reduxjs/toolkit'
import uiReducer from './uiSlice'

export const store = configureStore({
  reducer: {
    ui: uiReducer,
  },
})
```

```jsx
// component
import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebar } from './uiSlice'

function SidebarButton() {
  const dispatch = useDispatch()
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen)

  return (
    <button onClick={() => dispatch(toggleSidebar())}>
      {sidebarOpen ? 'Close' : 'Open'} Sidebar
    </button>
  )
}
```

### Very important Redux Toolkit detail

The official docs explain that `createSlice` lets you write "mutating" logic, but it is still producing correct immutable updates because it uses Immer internally. Source: [Redux Toolkit Quick Start](https://redux-toolkit.js.org/tutorials/quick-start)

That means:

```jsx
state.sidebarOpen = !state.sidebarOpen
```

looks mutative, but Redux Toolkit safely converts it into immutable update logic.

---

## 17. `configureStore`, `createSlice`, `useSelector`, `useDispatch`

These four should be crystal clear.

### `configureStore`

Sets up the Redux store in the recommended modern way.

Think:

```txt
main Redux setup point
```

### `createSlice`

Creates:

- slice name
- initial state
- reducers
- generated action creators

### `useSelector`

Used to read data from the Redux store.

Example:

```jsx
const currentUser = useSelector((state) => state.auth.currentUser)
```

### `useDispatch`

Used to dispatch actions.

The React Redux docs describe it simply: it returns a reference to the store's `dispatch` function. Source: [React Redux Hooks](https://react-redux.js.org/api/hooks)

Example:

```jsx
const dispatch = useDispatch()
dispatch(toggleSidebar())
```

### Interview answer

```txt
configureStore creates the Redux store, createSlice defines a named piece of state and the reducers that update it, useSelector reads values from the store, and useDispatch sends actions to update the store.
```

---

## 18. Async Redux - What You Need to Know at This Level

Since your resume/project already mentions Redux, one more thing matters:

```txt
basic async Redux awareness
```

### `createAsyncThunk`

Redux Toolkit provides `createAsyncThunk` for async logic tied to Redux flows.

At your level, you should know:

- it is used for async actions in Redux
- it usually pairs with pending/fulfilled/rejected states
- many real company projects use this pattern

### But here is the important Week 3 decision

For this roadmap:

- `React Query` should handle most server data fetching
- `Redux` should not try to replace React Query for every API list

### So what should you do?

Know `createAsyncThunk` at a working awareness level for interview and resume defense.

But for this roadmap's Week 3 user-management module:

- server lists and CRUD fetch flow -> prefer `React Query`
- shared client state -> prefer `Redux`

This keeps the architecture cleaner.

---

## 19. React Query - Why It Exists

The TanStack docs describe it like this: it makes fetching, caching, synchronizing, and updating server state easier. That wording matters because it tells you the real problem it solves: server state, not just "fetching". Source: [TanStack Query Overview](https://tanstack.com/query/latest/docs/framework/react/overview)

### Why plain `useState` + `useEffect` becomes painful at scale

With manual fetching, you keep rewriting:

- loading state
- error state
- retry logic
- cache thinking
- stale-data handling
- mutation refresh behavior

### React Query mental model

```txt
React Query is a server-state manager for React
```

It helps with:

- fetching
- caching
- background refetching
- deduping requests
- mutation workflows
- invalidation

### Very important distinction

React Query is not replacing all state.

You still use:

- `useState` for local state
- `Context` for lighter shared client state
- `Redux` for more structured global client state

React Query mainly helps with:

- server state

---

## 20. `useQuery` - The List Fetching Mental Model

Memory line:

```txt
queryKey = identity of the data
queryFn = how to fetch the data
```

### Example

```jsx
const usersQuery = useQuery({
  queryKey: ['users', page, selectedRole, debouncedSearch],
  queryFn: () =>
    fetchUsers({
      page,
      role: selectedRole,
      search: debouncedSearch,
    }),
})
```

### Why this is strong

If:

- page changes
- role changes
- debounced search changes

then the query key changes, and React Query treats it as different query state.

### Example render usage

```jsx
if (usersQuery.isPending) {
  return <p>Loading users...</p>
}

if (usersQuery.isError) {
  return <p>{usersQuery.error.message}</p>
}

if (!usersQuery.data?.length) {
  return <p>No users found.</p>
}

return <UserList users={usersQuery.data} />
```

---

## 21. `useMutation` and Query Invalidation

After a successful create, update, or delete, the cached list may be outdated.

### Example

```jsx
const queryClient = useQueryClient()

const deleteUserMutation = useMutation({
  mutationFn: deleteUser,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] })
  },
})
```

### What invalidation means

It marks matching query data as stale so React Query can refetch fresh data when needed.

### Interview answer

```txt
After a successful create, update, or delete, I invalidate the related users query so the list cache becomes stale and React Query can refresh it with fresh server data.
```

---

## 22. Local State vs Context vs Redux vs React Query

This is one of the most important interview tables for your current level.

### `useState`

Use when:

- only one component or one small area owns the state

Examples:

- input field
- modal open/close
- selected tab

### Context API

Use when:

- many components need the same value
- value is relatively stable or app-level
- you mainly want to avoid prop drilling

Examples:

- theme
- current user shell
- auth helper methods

### Redux Toolkit

Use when:

- state is truly global or cross-feature
- updates should be predictable and structured
- many components read and update it

Examples:

- auth/session shell in a bigger app
- sidebar/layout state
- complex shared UI state
- role/permissions shell

### React Query

Use when:

- data comes from backend
- it needs caching, refetching, invalidation, or stale-data handling

Examples:

- users list
- subscriptions
- plans
- payments list

### Clean interview answer

```txt
I use local state for component-only values, Context for lighter shared app-level values, Redux Toolkit for more structured global client state, and React Query for server state like fetched lists and CRUD data that need caching and invalidation.
```

---

## 23. Loading, Error, Success, Empty - Treat It Like a State Machine

Most weak API UIs only think in two states:

- data
- no data

That is not enough.

### Better model

```txt
idle
loading
error
success-with-data
success-but-empty
```

### Why loading is not empty

These are totally different:

- loading = request still running
- empty = request finished correctly but returned zero usable items

### Example branching order

```jsx
if (loading) {
  return <p>Loading users...</p>
}

if (error) {
  return <p>{error}</p>
}

if (users.length === 0) {
  return <p>No users found.</p>
}

return <UserList users={users} />
```

---

## 24. Search, Filters, and Pagination - One Combined Mental Model

Do not think of these as three unrelated topics.

All three answer one question:

```txt
which slice of data should the user see right now?
```

### Search

Text-based narrowing.

### Filters

Rule-based narrowing.

Examples:

- role = admin
- status = active

### Pagination

Splitting large result sets into pages.

### Important combined rule

When search or filters change, page usually should reset to `1`.

Why:

If user is on page `5` and a new filter leaves only 1 page of results, page `5` no longer makes sense.

---

## 25. Debounced Search - Practical Intuition

Debounce means:

```txt
wait a short time before doing the expensive action
```

This is useful for:

- API search
- expensive filtering

### Why debounce matters

Without debounce, typing:

```txt
n i r m a l
```

might trigger 6 separate requests or heavy recalculations.

With debounce, only the more final intended input triggers the expensive logic.

### Example thinking

```jsx
const [searchTerm, setSearchTerm] = useState('')
const debouncedSearch = useDebounce(searchTerm, 400)
```

Then the expensive fetch/filter logic should use:

```txt
debouncedSearch
```

not:

```txt
searchTerm directly on every keystroke
```

---

## 26. URL Query Sync - Why It Feels More Real

Example URL:

```txt
/users?search=nir&page=2&role=frontend
```

### Why this is valuable

- refresh keeps the same view
- link becomes shareable
- browser back/forward works meaningfully
- current state becomes visible in URL

### Example mental usage

```jsx
const [searchParams, setSearchParams] = useSearchParams()

const page = Number(searchParams.get('page') || 1)
const role = searchParams.get('role') || 'all'
const search = searchParams.get('search') || ''
```

You do not need mastery here yet.
You need pattern familiarity.

---

## 27. Performance Without Becoming Hook-Crazy

The React docs clearly say you should rely on `useMemo` and `useCallback` only as performance optimizations, not as logic crutches. If code only works because of them, something deeper is wrong. Sources: [React useMemo](https://react.dev/reference/react/useMemo), [React useCallback](https://react.dev/reference/react/useCallback)

### Wrong maturity

```txt
I learned useMemo and useCallback, so I will use them everywhere.
```

### Better maturity

```txt
First find a real performance reason.
Then optimize the correct place.
```

### `useMemo`

Good for expensive derived values.

Example:

```jsx
const filteredUsers = useMemo(() => {
  return users.filter((user) =>
    user.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  )
}, [users, debouncedSearch])
```

### `useCallback`

Good when function identity actually matters.

Example:

```jsx
const handleDelete = useCallback((id) => {
  deleteUserMutation.mutate(id)
}, [deleteUserMutation])
```

### `React.memo`

Useful when:

- child rendering is expensive
- props are stable enough
- rerender skipping gives real benefit

### When not to optimize

Do not optimize:

- tiny calculations
- small components with no lag
- code only because the hook exists

---

## 28. State Design Maturity - Source of Truth Thinking

Week 3 is also about getting out of beginner state design mistakes.

### Bad pattern

```jsx
const [users, setUsers] = useState([])
const [search, setSearch] = useState('')
const [filteredUsers, setFilteredUsers] = useState([])
const [currentPageUsers, setCurrentPageUsers] = useState([])
```

Problem:

- too many values are storing versions of the same truth
- keeping them in sync becomes hard

### Better pattern

Store source-of-truth values:

- `users`
- `search`
- `selectedRole`
- `page`

Then derive:

- `filteredUsers`
- `visibleUsers`
- `totalPages`

### Memory line

```txt
store inputs
derive views
```

---

## 29. Clean Architecture for This Week

The roadmap gives:

```txt
components/ pages/ hooks/ services/ utils/ types/
```

This is not decoration.
It is about responsibility.

### `pages`

Route-level screens.

Example:

- `UsersPage`

This page should mainly:

- connect pieces
- call hooks
- decide what UI sections to show

### `components`

Reusable UI pieces.

Examples:

- `UserList`
- `UserRow`
- `SearchBar`
- `Pagination`
- `FilterPanel`

### `hooks`

Reusable behavior logic.

Examples:

- `useDebounce`
- `useUsersQuery`
- `useUrlFilters`

### `services`

API communication logic.

Examples:

- `getUsers`
- `createUser`
- `updateUser`
- `deleteUser`

### `utils`

Pure helpers.

Examples:

- filter helpers
- query-string helpers
- formatting helpers

### `types`

Mainly for shared data shape definitions in TS-oriented setups.
For your current JS-first path, understand the purpose and keep it light.

### Memory line

```txt
page composes
components render
hooks reuse logic
services talk to API
utils help with pure logic
```

---

## 30. Common Week 3 Mistakes

- using `useEffect` for calculations that should happen during render
- forcing empty dependency arrays to hide bugs
- forgetting that Strict Mode can run an extra setup+cleanup cycle in development
- using Context for everything blindly
- using Redux for every tiny local state
- trying to make Redux replace React Query completely
- not separating loading, error, and empty states
- storing too much redundant derived state
- using React Query without understanding query keys
- forgetting to invalidate related queries after mutation
- adding `useMemo` or `useCallback` everywhere blindly
- not resetting pagination when filters change
- mixing API logic directly into huge JSX files

---

## 31. Week 3 Priority Filter - Theory Side

### Must not skip

- `useEffect` dependency and cleanup clarity
- manual fetch lifecycle understanding
- Context API basics
- Redux Toolkit basics
- local state vs Context vs Redux vs React Query distinction
- loading vs error vs empty distinction
- React Query basic mental model
- query key + invalidation understanding
- search/filter/page interaction
- derived state vs source-of-truth clarity

### Can keep light

- deeper Context optimization details
- advanced Redux middleware details
- heavy `createAsyncThunk` patterns
- deep cache tuning
- edge-case memoization details

### Safe to postpone

- advanced optimistic updates
- infinite queries
- heavy prefetching strategy
- very advanced Redux architecture patterns
- deeper TypeScript modeling

### Enough for interview survival

If you can explain these clearly, you are in a strong survival zone:

1. why `useEffect` exists
2. when cleanup matters
3. what Context solves
4. why Redux Toolkit is useful
5. why React Query is different from Redux
6. why loading, error, and empty are different
7. what query keys do
8. why invalidation matters
9. why pagination resets after filter/search changes
10. why redundant derived state is risky

---

## 32. Fast Interview Explanation Pack

### What is `useEffect`?

```txt
useEffect is used to synchronize a component with external systems like APIs, timers, subscriptions, or browser APIs. It runs after render.
```

### What problem does Context solve?

```txt
Context helps avoid prop drilling for shared app-level values by letting deeply nested components read values without manually passing them through every layer.
```

### When would you use Redux Toolkit instead of Context?

```txt
I would use Redux Toolkit when global client state becomes more structured, cross-feature, and update-heavy, and I want predictable action-driven updates, slices, and clearer debugging.
```

### Why not use Redux for fetched server lists?

```txt
Because React Query is better suited for server state like fetched lists, caching, invalidation, and stale-data handling. Redux is more appropriate for structured global client state.
```

### What is a query key?

```txt
A query key identifies a specific piece of fetched data in React Query. If values inside the key change, React Query knows it is a different query state.
```

### Why invalidate after mutation?

```txt
Because create, update, or delete actions can make cached list data outdated. Invalidating tells React Query to mark it stale and refresh with newer server data.
```

### When would you use `useMemo`?

```txt
When I have an expensive derived calculation like filtering and sorting a large list, and I want to avoid recomputing it unnecessarily.
```

---

## 33. Revision Questions

1. What is the difference between local state, shared client state, and server state?
2. Why does React say `useEffect` is for synchronizing with external systems?
3. What are the three dependency-array forms?
4. Why do objects/functions sometimes cause extra effect reruns?
5. Why does Strict Mode sometimes make effects look like they ran twice?
6. Why is cleanup important for fetches, timers, and listeners?
7. What problem does Context solve?
8. Why is Context not automatically a replacement for Redux?
9. What are store, slice, reducer, selector, and dispatch?
10. Why is Redux Toolkit preferred over older raw Redux patterns?
11. Why is React Query better for server state?
12. What is query invalidation?
13. Why should search/filter changes often reset page to `1`?
14. What is redundant derived state?
15. When should `useMemo` help, and when should it not?

---

## 34. Final Week 3 Mental Model

Try to remember Week 3 like this:

```txt
useState handles local UI state
Context handles lighter shared client state
Redux Toolkit handles structured global client state
useEffect handles outside-world sync
manual fetch teaches async truth
React Query manages server state better
loading, error, and empty must be handled honestly
search, filter, and page decide the visible slice
state should stay minimal
optimization should solve a real problem
architecture should separate concerns cleanly
```

If this picture is clear in your head, Week 3 becomes much easier to revise and explain.
