# Week 3 Part 2 - Advanced React Tasks with Task Breakdown

This note covers Week 3 Part 2 from your roadmap:

1. `useEffect` fetch-on-mount
2. Production fetching upgrade with React Query
3. Loading, error, and empty states
4. Search, filters, and pagination
5. Performance awareness
6. State design maturity
7. Clean architecture
8. Mandatory User Management Module

This note is made for your current level.

That means:

- tasks are expanded into real build instructions
- examples are included where needed
- what to build is made concrete
- what each task is testing is made explicit
- `Must Do`, `Good to Do`, `Optional`, and `Later / Advanced` labels are clear

---

## 1. First Clarification: Part 1 vs Part 2

Just like Week 2:

- `Part 1` = theory, mental model, explanation
- `Part 2` = practical coding work

Connected meaning:

```txt
Part 1 = What is happening and why
Part 2 = How I build it in code
```

Example:

- Part 1 explains why `useEffect` is for external systems
- Part 2 makes you build a fetch-on-mount screen using that idea

---

## 2. How to Use This Note

For every topic below:

1. read the concept section first
2. understand what the task is really testing
3. build only the minimum working version first
4. then do the useful upgrade
5. finally explain the flow in your own words

Do not try to do the whole week in one rushed sitting.

Correct goal:

```txt
understand the flow
build the flow
be able to hand-code the flow again
```

---

## 3. Part 2 Outcome

By the end of Week 3 Part 2, you should be able to:

- fetch data with `useEffect` cleanly
- handle loading/error/empty states honestly
- use React Query for list fetches and mutations
- connect search, filters, and pagination correctly
- avoid redundant derived state
- add performance optimization only where justified
- structure one realistic feature with cleaner architecture

This is exactly the kind of frontend maturity that starts feeling closer to real job work.

---

## 4. Topic 1 - `useEffect` and Fetch on Mount

### What you must understand first

Before building this task, remember:

- `useEffect` runs after render
- it is for outside-world work like API calls
- cleanup matters
- loading, error, and empty are separate states

### Mandatory Task - Fetch Users on Mount

Priority: `Must Do`

This task is not just "call fetch once".
It is training you in:

- correct `useEffect` usage
- async state flow
- conditional rendering honesty
- avoiding common fetch mistakes

### Build goal

Create a `UsersPage` or similar component that fetches a users list when the component first mounts.

### Suggested state

Use:

- `users`
- `loading`
- `error`

Example:

```jsx
const [users, setUsers] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState('')
```

### What the UI should eventually show

- loading message first
- error message if request fails
- empty message if request succeeds but no records exist
- users list if request succeeds with data

### What the task is really checking

You should be able to answer:

- why is `useEffect` used here?
- why is dependency array `[]` here?
- why do we need `try/catch/finally`?
- why is loading different from empty?

### Mandatory requirements

- request starts on mount
- loading is shown correctly
- error is handled correctly
- success data is rendered
- no infinite rerender loop

### Example thinking

```jsx
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
```

### Common mistakes to avoid

- writing `useEffect(async () => {})`
- forgetting to clear old error before new request
- forgetting `finally`
- checking empty state before loading ends
- adding unstable dependencies accidentally

### "Done" checklist

- request runs once on mount
- loading branch works
- error branch works
- data branch works
- empty branch works

### What you should be able to hand-code after doing it

- basic fetch-on-mount flow
- `try/catch/finally` request handling
- 4-state render branching

### Add-on - AbortController cleanup

Priority: `Good to Do`

### Why it matters

- teaches cleanup properly
- prevents request from continuing meaninglessly after unmount

### Example idea

```jsx
useEffect(() => {
  const controller = new AbortController()

  async function loadUsers() {
    // fetch with signal
  }

  loadUsers()

  return () => controller.abort()
}, [])
```

### Add-on - Latest request wins

Priority: `Later / Advanced`

### Why it matters

- prevents older requests from overwriting newer search results

For your current target, understanding this idea is enough if time is tight.

---

## 5. Topic 2 - Production Fetching Upgrade with React Query

### What you must understand first

This section comes after manual fetching on purpose.

Manual fetching teaches:

- request lifecycle
- loading/error/empty thinking
- cleanup awareness

React Query then upgrades the real module.

### Mandatory Upgrade A - Use `useQuery` for the Users List

Priority: `Must Do`

### Build goal

Take your users list screen and fetch the real list using React Query instead of only manual `useEffect`.

### What this task teaches

- server-state thinking
- query key identity
- query-based loading and error status
- cleaner fetch structure

### Mandatory requirements

- `useQuery` is used for list fetch
- `queryKey` includes the values that affect the list
- `queryFn` lives cleanly, ideally through a service function
- UI uses query state honestly

### Example shape

```jsx
const usersQuery = useQuery({
  queryKey: ['users', page, selectedRole, debouncedSearch],
  queryFn: () =>
    getUsers({
      page,
      role: selectedRole,
      search: debouncedSearch,
    }),
})
```

### What the task is really checking

You should be able to answer:

- what is the `queryKey` doing?
- why does changing search/page/filter belong in the key?
- what is the difference between local state and server state?

### "Done" checklist

- list fetch works through `useQuery`
- loading branch is connected to query state
- error branch is connected to query state
- empty branch still works

### What you should be able to hand-code after doing it

- a basic `useQuery` setup
- a meaningful `queryKey`
- conditional rendering from query state

### Mandatory Upgrade B - Use `useMutation` for CRUD

Priority: `Must Do`

### Build goal

Add one or more real CRUD actions using React Query mutation flow.

Examples:

- create user
- delete user
- update user

### What this task teaches

- mutation flow
- invalidation
- refreshing stale list data correctly

### Example shape

```jsx
const queryClient = useQueryClient()

const deleteUserMutation = useMutation({
  mutationFn: deleteUser,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] })
  },
})
```

### What the task is really checking

You should be able to answer:

- why do we need invalidation after mutation?
- why is mutation different from query?
- what should refresh after delete/create/update?

### "Done" checklist

- one mutation works
- related list updates after success
- invalidation is used correctly

### What you should be able to hand-code after doing it

- one `useMutation` flow
- one `invalidateQueries` call
- a mutation button/form hooked to server update

---

## 6. Topic 3 - Loading, Error, and Empty States

### What you must understand first

Do not treat async UI as:

```txt
data or no data
```

That is too weak.

You need:

- loading
- error
- empty
- success

### Mandatory Task - Robust API UI

Priority: `Must Do`

### Build goal

Make your users screen feel honest and complete, not half-done.

### What the UI should include

- full-screen or visible loader for initial fetch
- readable error block
- empty-state message
- success data UI

### Example branch order

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

### What the task is really testing

- can you show the truth of the request state?
- can you avoid showing wrong UI too early?

### Common mistakes

- showing empty before request is complete
- mixing stale old data with new error unintentionally
- weak error messaging

### "Done" checklist

- all major states are visually separate
- loading is not confused with empty
- success renders only with real data

### What you should be able to hand-code after doing it

- 4 clear async branches
- retry button idea
- cleaner render flow

### Good improvement

Priority: `Good to Do`

- retry button
- slightly better loading placeholder
- better empty-state text

---

## 7. Topic 4 - Search, Filters, and Pagination

### What you must understand first

These tasks are connected.

All of them decide:

```txt
which records should be visible right now
```

---

### Mandatory Task - Debounced Search + Filter

Priority: `Must Do`

### Build goal

Add a search input and at least one filter to your users module.

### Suggested filters

- role
- status
- department

### Suggested state

```jsx
const [searchTerm, setSearchTerm] = useState('')
const [selectedRole, setSelectedRole] = useState('all')
const debouncedSearch = useDebounce(searchTerm, 400)
```

### What the task teaches

- controlled inputs in a realistic UI
- debounce usage
- connecting UI controls to list state
- reset logic for page

### Mandatory requirements

- search input is controlled
- at least one filter is controlled
- actual fetch/filter logic uses debounced search
- page resets to `1` when search/filter changes

### Example thinking

```jsx
useEffect(() => {
  setPage(1)
}, [debouncedSearch, selectedRole])
```

### What the task is really checking

You should be able to answer:

- why debounce is useful here
- why page reset is needed
- why raw input state and debounced state are different concepts

### "Done" checklist

- typing search changes results
- filter changes results
- debounce avoids action on every keystroke
- page reset works

### What you should be able to hand-code after doing it

- controlled search input
- one filter
- one debounced flow
- reset page logic

### Add-on - Sync search/filter/page to URL query params

Priority: `Good to Do`

### Why it matters

- refresh-safe state
- shareable URLs
- more real-app feeling

### Example idea

```jsx
const [searchParams, setSearchParams] = useSearchParams()
```

Then use URL params as part of your current screen state.

---

### Mandatory Task - Pagination Component

Priority: `Must Do`

### Build goal

Create a reusable pagination UI for the users screen.

### Basic requirements

- current page
- next button
- previous button
- visible page number
- disabled limit states

### What the task teaches

- page-based list control
- connecting page state to visible data
- boundary handling

### Example client-side thinking

```jsx
const startIndex = (page - 1) * pageSize
const endIndex = startIndex + pageSize
const visibleUsers = filteredUsers.slice(startIndex, endIndex)
```

### Example server-side thinking

```txt
page becomes part of query key or request params
```

### Common mistakes

- page not resetting after filters change
- next going past last page
- total pages calculated from wrong array

### "Done" checklist

- page changes data
- prev/next rules work
- search/filter interaction works

### What you should be able to hand-code after doing it

- page state
- basic slicing or page-request logic
- a reusable `Pagination` component API

### Add-on - Direct page buttons

Priority: `Optional`

Good if time allows, but not required for survival if prev/next is already solid.

---

## 8. Topic 5 - Performance Awareness

### What you must understand first

This section is not asking:

```txt
useMemo everywhere
useCallback everywhere
```

It is asking:

```txt
can you optimize only when there is a real reason?
```

### Mandatory Task - Use `useMemo` and `useCallback` Correctly

Priority: `Good to Do`

### Build goal

Apply one or two justified optimizations in the users module.

### Good `useMemo` examples

- filtered list
- sorted + filtered list
- paginated visible list from a large array

Example:

```jsx
const filteredUsers = useMemo(() => {
  return users.filter((user) =>
    user.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  )
}, [users, debouncedSearch])
```

### Good `useCallback` examples

- delete handler passed to memoized row
- edit handler passed into list item components

Example:

```jsx
const handleDelete = useCallback((id) => {
  deleteUserMutation.mutate(id)
}, [deleteUserMutation])
```

### What the task is really testing

You should be able to answer:

- why did I optimize this spot?
- what real problem was I solving?
- why did I avoid optimizing other places?

### "Done" checklist

- one justified `useMemo` or `useCallback` exists
- you can explain the reason clearly
- code did not become hook-spam

### What you should be able to hand-code after doing it

- one valid `useMemo` example
- one valid `useCallback` example
- explanation of when not to optimize

### Add-on - `React.memo` for list rows

Priority: `Optional`

Useful if:

- row component is extracted
- props are stable enough
- rerender skipping is meaningful

### Important theory even if skipped

You should still be able to explain:

```txt
React.memo is useful when a child is expensive and stable props make skipped rerenders valuable.
```

---

## 9. Topic 6 - State Design Maturity

### What you must understand first

Good React code stores:

- source-of-truth values

and derives:

- calculated views

### Mandatory Task - Remove Redundant Derived State

Priority: `Good to Do`

### Build goal

Refactor one part of the module so that duplicate state is removed.

### Strong candidates

- remove `filteredUsers` state if it can be derived
- remove `visibleUsers` state if it can be sliced from filtered list
- remove `totalPages` state if it can be calculated

### Example

Bad:

```jsx
const [filteredUsers, setFilteredUsers] = useState([])
```

Better:

```jsx
const filteredUsers = useMemo(() => {
  return users.filter(...)
}, [users, search, selectedRole])
```

### What the task is really testing

- can you identify source of truth?
- can you simplify code by deriving values instead of storing them?

### "Done" checklist

- unnecessary duplicate state removed
- logic feels simpler
- fewer sync bugs are possible

### What you should be able to hand-code after doing it

- a before/after refactor example
- explanation of why derived state was better

---

## 10. Topic 7 - Clean Architecture

### What you must understand first

The roadmap folders are not for decoration.

They are there to separate:

- page composition
- API logic
- reusable UI
- reusable hooks
- pure helpers

### Mandatory Task - Restructure App / Feature

Priority: `Must Do`

### Build goal

Keep Week 3 feature code clean enough that revision stays easy.

### Suggested shape

```txt
src/
  pages/
    UsersPage.jsx
  components/
    users/
      UserList.jsx
      UserRow.jsx
      UserSearch.jsx
      UserFilters.jsx
      Pagination.jsx
      UserForm.jsx
  hooks/
    useDebounce.js
    useUsersQuery.js
  services/
    userService.js
  utils/
    queryHelpers.js
```

### What each part should roughly do

- `pages` -> compose the screen
- `components` -> render reusable UI
- `hooks` -> reuse logic
- `services` -> talk to API
- `utils` -> pure helpers

### What the task is really testing

- can you keep logic separated?
- can you stop one page from becoming huge?
- can you make future revision easier?

### "Done" checklist

- API logic is not sprayed inside JSX everywhere
- page is cleaner than a giant single file
- shared UI pieces are separated

### What you should be able to hand-code after doing it

- one service function
- one page component
- one reusable hook/helper

### Important note for your goal

For `5-6 LPA` readiness, reasonable clarity matters much more than enterprise-level folder obsession.

---

## 11. Mandatory Module - User Management Module

Priority: `Must Do`

This is the Week 3 proof task.
It is where the whole week comes together.

### Roadmap mapping

- list + CRUD
- search + filter + pagination
- loading/error/empty
- optimized rendering
- URL-synced state

### What this module is really checking

You should be able to prove:

- I can fetch and show real API data
- I can mutate data and refresh the list correctly
- I can manage search, filter, and page together
- I can structure one feature properly

### Simple screen blueprint

Your module can be this simple:

1. page title
2. search bar
3. filter controls
4. add or edit user form/button
5. loading/error/empty area
6. users list or table
7. pagination controls

Optional:

- edit flow
- delete confirmation

### Minimum scope you should build

- users page
- fetch users from API
- loading, error, and empty states
- search input
- at least one filter
- pagination
- create and delete, or edit and delete
- React Query list fetch
- query invalidation after mutation

### Example flow

1. page loads
2. users fetch
3. loading appears
4. list appears
5. user searches or filters
6. page updates correctly
7. user creates/edits/deletes
8. list refreshes correctly

### React Query and state rules for this module

Keep these rules fixed:

- use `useQuery` for list fetch
- use `useMutation` for create/update/delete
- invalidate users query after successful mutation
- put page/search/filter values into query key if they affect fetch
- reset page to `1` when search/filter changes

Example query key:

```txt
['users', page, debouncedSearch, selectedRole]
```

### What "done" means

- module feels like one feature, not scattered small demos
- list fetch works through React Query
- mutation updates are reflected back correctly
- loading/error/empty are handled honestly
- search/filter/page work together
- folder structure is readable

### What you should be able to hand-code after doing it

- one `useQuery` list setup
- one `useMutation` setup
- one invalidation call
- one debounced search flow
- one pagination flow
- one derived-state cleanup example

### What can stay simple

- styling
- modal polish
- advanced optimistic updates
- very advanced cache tuning
- perfect validation polish

### What must not stay weak

- async state truthfulness
- query invalidation understanding
- page reset rules
- separation of service and UI logic

### Best build phases

If this module feels too big, build in this order:

1. create users page skeleton
2. manual fetch with `useEffect`
3. loading/error/empty states
4. move API calls to `services`
5. upgrade list fetch to React Query
6. add one mutation and invalidation
7. add search and one filter
8. add pagination
9. remove redundant derived state
10. add one justified optimization if needed

### Minimum acceptable version vs better version

Minimum acceptable version for your current goal:

- list fetch works
- loading/error/empty exists
- one mutation works
- search works
- one filter works
- pagination works
- React Query is used
- feature is reasonably clean

Better version if time allows:

- URL-synced search/filter/page
- both edit and delete
- one clear memoization improvement
- cleaner reusable components

Advanced version that can wait:

- optimistic updates
- race-condition hardening
- advanced cache tuning
- prefetching

---

## 12. Recommended Order to Build Week 3

Build in this order:

1. manual fetch with `useEffect`
2. robust loading/error/empty UI
3. move request logic into `services`
4. upgrade list fetch to React Query
5. add one mutation and invalidate list query
6. add search
7. add one filter
8. add pagination
9. add URL sync if time allows
10. remove redundant derived state
11. add one justified optimization
12. clean folder structure

This order works because each step supports the next one.

---

## 13. How to Think About Each Week 3 Task Properly

These tasks are not random.
Each one is testing a real frontend skill:

- fetch-on-mount -> correct `useEffect` usage
- React Query upgrade -> server-state maturity
- loading/error/empty -> honest async UI
- debounced search -> efficient input-driven list logic
- filters -> real-world list narrowing
- pagination -> managing large lists
- optimization -> maturity, not hook-collection
- derived-state cleanup -> cleaner state design
- architecture cleanup -> feature organization
- user management module -> ability to combine all of the above

If you see this pattern, Week 3 becomes much more understandable.

---

## 14. What to Study Before Coding Each Task

### Before fetch-on-mount

Study:

- `useEffect`
- dependency arrays
- `try/catch/finally`
- conditional rendering

### Before React Query upgrade

Study:

- server state vs client state
- `queryKey`
- `queryFn`
- invalidation idea

### Before search/filter/pagination

Study:

- controlled inputs
- debounce concept
- array filtering
- page reset logic

### Before performance task

Study:

- derived state
- rerender reasons
- `useMemo` and `useCallback` only as optimization tools

### Before clean architecture task

Study:

- role of `pages`, `components`, `hooks`, `services`, `utils`

---

## 15. Common Beginner Confusions Cleared

### "Do I still need to learn manual fetch if I will use React Query?"

Yes.
Because manual fetch teaches the underlying async UI lifecycle.

### "Do I need backend of my own for this week?"

Not necessarily.
An existing API or mock API is enough for learning the frontend logic.

### "Do I need perfect CRUD UI polish?"

No.
Correct logic matters much more than visual polish.

### "Do I need all advanced React Query features?"

No.
Basic `useQuery`, `useMutation`, and invalidation are the real high-value parts.

### "Do I need to optimize everything?"

No.
You need to understand where optimization is justified.

---

## 16. Strong Minimum Scope for You

If time gets tight, do at least this:

- one fetch-on-mount screen
- one proper loading/error/empty flow
- one React Query list fetch
- one mutation + invalidation
- one search input
- one filter
- one pagination flow
- one clean users feature structure

Then add next:

- URL sync
- better mutation coverage
- one justified optimization
- derived-state refactor

If time becomes very tight, the first block is your minimum safe Week 3 core.

---

## 17. Hand-Coding Recovery Checklist

After Week 3, you should be able to rewrite these from memory:

1. fetch-on-mount with `useEffect`
2. loading/error/empty conditional branches
3. one `useQuery` list fetch
4. one `useMutation` with invalidation
5. debounced search input flow
6. basic pagination logic
7. one derived-state refactor example

If you can hand-code these again, Week 3 has actually gone into your hands and head.

---

## 18. Week 3 Priority Filter for `5-6 LPA`

### A. Must Not Skip

#### 1. `useEffect` fetch-on-mount clarity

Must do:

- one proper fetch-on-mount screen
- loading/error/empty distinction
- no effect misuse

#### 2. React Query basics

Must do:

- `useQuery` for list
- `useMutation` for one CRUD action
- `invalidateQueries` after success

#### 3. Search + filter + pagination basics

Must do:

- one search
- one filter
- pagination
- page reset logic

#### 4. Clean feature organization

Must do:

- `pages`
- `components`
- `services`
- optionally simple `hooks`/`utils`

#### 5. Mandatory user management module

Must do:

- realistic combined feature

---

### B. Good to Do, But Can Be Light

#### 1. AbortController cleanup

Good to do:

- build once or at least understand clearly

#### 2. URL query sync

Good to do:

- especially once, because it feels production-like

#### 3. One justified optimization

Good to do:

- `useMemo`
- `useCallback`

#### 4. Derived-state cleanup

Good to do:

- one refactor is enough

---

### C. Safe to Postpone If Time Is Tight

#### 1. Advanced race-condition handling

Safe to postpone.

#### 2. Heavy optimistic updates

Safe to postpone.

#### 3. Deep cache tuning

Safe to postpone.

#### 4. Multiple advanced filters

Safe to postpone.

#### 5. Perfect visual polish

Safe to postpone.

---

### D. Best Week 3 Minimum for Your Current Goal

If your time is tight, keep this core:

1. fetch-on-mount with correct async states
2. `useQuery` list fetch
3. one mutation + invalidation
4. one search input + one filter
5. pagination basics
6. one clean user-management feature structure

If these are strong, Week 3 is still valuable even if some polish is left.

---

### E. Final Decision Rule

Use this rule:

```txt
Do all core async-data tasks.
Do the high-value React Query and list-logic parts.
Keep advanced optimization and heavy polish for later if needed.
```

That is the right Week 3 balance for your current target.
