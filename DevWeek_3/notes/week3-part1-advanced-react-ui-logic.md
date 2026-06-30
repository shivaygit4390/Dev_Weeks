# Week 3 Part 1 - Advanced React UI Logic

This note covers the exact Week 3 roadmap jump:

- `useEffect`
- API fetching and cleanup
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
server data + async states + user actions -> production-style UI
```

Goal of this note:

- make Week 3 understandable before you start coding
- explain the concepts in revision-friendly language
- give enough examples that you do not need to search outside for the basics
- prepare you for `5-6 LPA` interview explanations

---

## 1. First Big Clarification

Week 3 is not mainly about "more hooks".

It is mainly about this shift:

```txt
In Week 2 you mostly controlled the data.
In Week 3 the server controls important data.
```

That changes everything.

Now you must think about:

- request started or not?
- data arrived or not?
- request failed or not?
- request succeeded but returned nothing?
- user changed search/filter/page?
- cached data is stale or still okay?

So if Week 2 taught:

```txt
how to build UI with React
```

Week 3 teaches:

```txt
how to build realistic UI that depends on APIs and changing async state
```

---

## 2. The Most Important New Mental Model

React UI now has two broad kinds of state:

### Client state

This is UI-owned state.

Examples:

- search input text
- selected filter
- current page number
- modal open/close
- active tab

### Server state

This is data that comes from backend or API.

Examples:

- users list
- user profile
- products list
- dashboard stats

Why server state is different:

- you do not own the original source
- it can become outdated
- it may need refetching
- multiple screens may need the same data
- other people or systems may change it

This is exactly why Week 3 introduces React Query.

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

Short memory line:

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
- disconnecting a socket or subscription

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

Example:

Bad:

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
this data may now be outdated, mark it stale and refetch it if needed
```

---

## 4. `useEffect` - The Correct Mental Model

The official React docs describe `useEffect` as a hook that lets you synchronize a component with an external system. That is the most important sentence to remember. Inference from the docs: if there is no external system involved, there is a strong chance you do not need an effect at all. Sources: [React useEffect](https://react.dev/reference/react/useEffect)

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

This is where many people stay confused.

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

The React docs strongly push this idea: write each effect like one independent setup/cleanup cycle. That is a very strong way to think. Source: [React useEffect](https://react.dev/reference/react/useEffect)

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

This confuses almost everyone once.

In development with Strict Mode, React intentionally does an extra setup + cleanup cycle before the real setup. This is a stress test for your cleanup logic. If your effect breaks because of this, the problem is usually not "React is wrong"; the problem is usually that cleanup logic is incomplete. Source: [React useEffect](https://react.dev/reference/react/useEffect)

### Practical meaning

If you see:

- fetch happening twice in development
- connection opening and closing once extra
- logs appearing twice

it may be because Strict Mode is checking whether your effect is resilient.

Do not panic immediately.
First ask:

```txt
is my cleanup truly mirroring my setup?
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

Usually dangerous unless that is really what you want.

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

The React docs describe dependencies as all reactive values referenced in setup code: props, state, and variables/functions declared inside the component. Source: [React useEffect](https://react.dev/reference/react/useEffect)

So the right question is not:

```txt
How do I silence dependency warnings?
```

The right question is:

```txt
What values is this effect truly reading from component scope?
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

If either changes, the effect should reflect the new situation.

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

### Very important React doc idea

If you are not synchronizing with an external system, you probably do not need an effect. That sentence alone prevents many bad loops. Source: [React useEffect](https://react.dev/reference/react/useEffect)

---

## 9. Manual Fetching - The Correct First-Step Pattern

Before React Query, you should still understand one clean manual fetch flow.

### Why manual fetching matters first

Because if you do not understand:

- loading
- error
- success
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
- non-OK HTTP response is handled
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

## 11. Loading, Error, Success, Empty - Treat It Like a State Machine

Most bad API UIs only think in two states:

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

### Wrong UI behavior

Showing:

```txt
No users found
```

before the request even finishes.

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

### Better real-world version

You might later keep:

- full-page loading on first fetch
- smaller inline loader on refetch
- retry button on error
- friendly empty-state message

But the logic order stays the same.

---

## 12. React Query - Why It Exists

The TanStack docs describe TanStack Query as a library that makes fetching, caching, synchronizing, and updating server state easier. That wording is very useful because it tells you the real problem it solves: server state, not just "fetching". Source: [TanStack Query Overview](https://tanstack.com/query/latest/docs/framework/react/overview)

### Why plain `useState` + `useEffect` becomes painful at scale

With manual fetching, you keep rewriting:

- loading state
- error state
- refetch logic
- retry logic
- cache thinking
- stale data handling
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

You still use normal React state for client state like:

- search input text
- selected filter in the UI
- modal open/close

React Query mainly helps with server state.

---

## 13. `useQuery` - The List Fetching Mental Model

The docs say `queryKey` is required, and the query automatically updates when that key changes. That gives you the cleanest memory line for Week 3. Source: [TanStack Query useQuery](https://tanstack.com/query/latest/docs/framework/react/reference/useQuery)

### Memory line

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

then the query key changes, and React Query treats it as a different query state.

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

## 14. `useMutation` and Query Invalidation

The docs describe `mutationFn` as the async function that performs the task. Then after mutation success, you typically invalidate related queries. Source: [TanStack Query useMutation](https://tanstack.com/query/latest/docs/framework/react/reference/useMutation), [TanStack Query Query Invalidation](https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation)

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

The docs explain that invalidating a query:

- marks it stale
- and if it is being used on screen, it may refetch in the background

That is exactly why invalidation is better than manual refresh hacks everywhere.

### Interview answer

```txt
After a successful create, update, or delete, I invalidate the related users query so the cached list becomes stale and React Query can refetch fresh server data.
```

---

## 15. `useEffect` vs React Query - Do Not Mix Them Incorrectly

This confusion is common.

### Use manual `useEffect` when you are learning:

- how fetch lifecycle works
- how cleanup works
- how loading/error/empty branching works

### Prefer React Query in the real module for:

- list fetches
- detail fetches
- create/update/delete flows
- caching and invalidation

### Best learning order

1. build one manual fetch screen with `useEffect`
2. understand async UI states properly
3. then upgrade the real module to React Query

That matches your roadmap and makes the concepts stick properly.

---

## 16. Search, Filters, and Pagination - One Combined Mental Model

Do not think of these as three unrelated tasks.

All three answer one question:

```txt
which slice of data should the user see right now?
```

### Search

Text-based narrowing.

Example:

- search by user name
- search by email

### Filters

Rule-based narrowing.

Example:

- role = admin
- status = active
- department = frontend

### Pagination

Splitting large result sets into pages.

### Important combined rule

When search or filters change, page usually should reset to `1`.

Why:

If user is on page `5` and new filter leaves only 1 page of results, page `5` no longer makes sense.

### Concrete example

Suppose:

- current page = `4`
- user searches "nir"
- filtered data becomes very small

Then correct logic is often:

```jsx
setPage(1)
```

not:

```txt
stay on page 4 and show confusion
```

---

## 17. Debounced Search - Practical Intuition

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

might trigger 6 separate requests.

With debounce, only the final intended input may trigger the actual fetch/filter.

### Example thinking

You usually have:

- raw input state
- debounced version of that state

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

## 18. URL Query Sync - Why It Feels More Real

React Router’s `useSearchParams` returns the current URL search params and a function to update them, and setting them causes a navigation. That is the key official behavior to remember. Source: [React Router useSearchParams](https://reactrouter.com/api/hooks/useSearchParams)

### Example URL

```txt
/users?search=nir&page=2&role=frontend
```

### Why this is valuable

- refresh keeps the same view
- link becomes shareable
- browser back/forward works meaningfully
- current state is visible in URL

### Example mental usage

```jsx
const [searchParams, setSearchParams] = useSearchParams()

const page = Number(searchParams.get('page') || 1)
const role = searchParams.get('role') || 'all'
const search = searchParams.get('search') || ''
```

Then when user updates filters:

```jsx
setSearchParams({
  search: newSearch,
  role: newRole,
  page: '1',
})
```

You do not need to master every detail now.
Just understand the pattern.

---

## 19. Performance Without Becoming Hook-Crazy

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

Use when you want to avoid recomputing expensive derived values.

Good example:

```jsx
const visibleUsers = useMemo(() => {
  return users
    .filter((user) => user.role === selectedRole || selectedRole === 'all')
    .filter((user) =>
      user.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
}, [users, selectedRole, debouncedSearch])
```

### `useCallback`

Use when function identity matters.

Good example:

```jsx
const handleDelete = useCallback((userId) => {
  deleteUserMutation.mutate(userId)
}, [deleteUserMutation])
```

This becomes more useful when passing the handler to memoized child rows.

### `React.memo`

Use when:

- child rendering is expensive
- props are stable enough
- skipping rerender gives real benefit

### When not to optimize

Do not optimize:

- tiny calculations
- small components with no lag
- code only because a hook exists

### Very clean interview line

```txt
I do not optimize by default. I first identify unnecessary rerenders or expensive derived calculations, then I use useMemo, useCallback, or React.memo only where they solve a real problem.
```

---

## 20. State Design Maturity - Source of Truth Thinking

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

### Example

```jsx
const filteredUsers = useMemo(() => {
  return users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  )
}, [users, search])

const totalPages = Math.ceil(filteredUsers.length / pageSize)

const currentPageUsers = filteredUsers.slice(
  (page - 1) * pageSize,
  page * pageSize
)
```

### Memory line

```txt
store inputs
derive views
```

---

## 21. Clean Architecture for This Week

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

Mainly for TypeScript-oriented shared models.
For your current JS-first approach, understand the purpose, keep it light.

### Memory line

```txt
page composes
components render
hooks reuse logic
services talk to API
utils help with pure logic
```

---

## 22. Common Week 3 Mistakes

- using `useEffect` for calculations that should happen during render
- forcing empty dependency arrays to hide bugs
- forgetting that Strict Mode can run an extra setup+cleanup cycle in development
- not separating loading, error, and empty states
- storing too much redundant derived state
- using React Query without understanding query keys
- forgetting to invalidate related queries after mutation
- adding `useMemo` or `useCallback` everywhere blindly
- not resetting pagination when filters change
- mixing API logic directly into huge JSX files

---

## 23. Week 3 Priority Filter - Theory Side

### Must not skip

- `useEffect` dependency and cleanup clarity
- manual fetch lifecycle understanding
- loading vs error vs empty distinction
- React Query basic mental model
- query key + invalidation understanding
- search/filter/page interaction
- derived state vs source-of-truth clarity

### Can keep light

- deep cache tuning
- edge-case memoization details
- advanced URL-state abstractions

### Safe to postpone

- advanced optimistic updates
- infinite queries
- heavy prefetching strategy
- deeper TypeScript modeling

### Enough for interview survival

If you can explain these clearly, you are in a strong survival zone:

1. why `useEffect` exists
2. when cleanup matters
3. why loading, error, and empty are different
4. what React Query solves
5. why query keys matter
6. why invalidation is needed after mutation
7. why pagination resets after filter/search changes
8. why redundant derived state is risky
9. why optimization should be problem-driven

---

## 24. Fast Interview Explanation Pack

### What is `useEffect`?

```txt
useEffect is used to synchronize a component with external systems like APIs, timers, subscriptions, or browser APIs. It runs after render.
```

### Why do effects need cleanup?

```txt
Cleanup stops or undoes what the effect started, such as clearing timers, removing listeners, aborting requests, or disconnecting subscriptions.
```

### Why not put everything in `useEffect`?

```txt
Because render logic and derived values should stay in normal React rendering. Effects are mainly for external synchronization.
```

### Why React Query?

```txt
Server state is different from normal local state because it can become stale, needs refetching, and often benefits from caching and invalidation. React Query manages those concerns much better than manual useEffect everywhere.
```

### What is a query key?

```txt
A query key identifies a specific piece of fetched data in React Query. If values inside the key change, React Query knows it is a different query state.
```

### Why invalidate after mutation?

```txt
Because create, update, or delete actions can make cached list data outdated. Invalidating tells React Query to mark it stale and refetch fresh data when needed.
```

### When would you use `useMemo`?

```txt
When I have an expensive derived calculation like filtering and sorting a large list, and I want to avoid recomputing it unnecessarily.
```

### When would you avoid `useCallback`?

```txt
If function identity is not actually causing a problem, I avoid adding it just for the sake of using the hook.
```

---

## 25. Revision Questions

1. What is the difference between client state and server state?
2. Why does React say `useEffect` is for synchronizing with external systems?
3. What are the three dependency-array forms?
4. Why do objects/functions sometimes cause extra effect reruns?
5. Why does Strict Mode sometimes make effects look like they ran twice?
6. Why is cleanup important for fetches, timers, and listeners?
7. Why should you not make the effect callback itself `async`?
8. Why is loading different from empty?
9. What problems does React Query solve?
10. What is a query key?
11. Why invalidate queries after mutation?
12. Why should search/filter changes often reset page to `1`?
13. What is redundant derived state?
14. When should `useMemo` help, and when should it not?
15. What is the difference between `pages`, `components`, `hooks`, and `services`?

---

## 26. Final Week 3 Mental Model

Try to remember Week 3 like this:

```txt
render describes UI
useEffect handles outside-world sync
manual fetch teaches async truth
React Query manages server state better
loading, error, and empty must be handled honestly
search, filter, and page decide the visible slice
state should stay minimal
optimization should solve a real problem
architecture should separate concerns cleanly
```

If this picture is clear in your head, Week 3 will feel much easier while revising.
