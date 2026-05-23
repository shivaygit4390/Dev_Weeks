# TypeScript Practical Ebook

## Beginner to JS → TS Conversion Ready

> Goal: You already know JavaScript. This guide makes you comfortable enough with TypeScript to read TS code, convert basic JS code into TS, type APIs, type utility functions, and speak confidently in interviews.

---

# 0. What You Are Actually Learning

You are not learning a completely new language.

You are learning:

```txt
JavaScript + Type System
```

JavaScript decides errors mostly at runtime.

TypeScript tries to catch many mistakes before runtime.

Example:

```js
// JavaScript
function add(a, b) {
  return a + b;
}

add(10, "20"); 
// Output: "1020"
// JS allows it
```

```ts
// TypeScript
function add(a: number, b: number): number {
  return a + b;
}

add(10, "20"); 
// Error before running
```

TypeScript helps you answer:

```txt
What type of data is this?
What shape does this object have?
What will this function return?
Can this value be null or undefined?
What type will this API return?
```

---

# 1. Why TypeScript Exists

## Problem in JavaScript

JavaScript is flexible, but that flexibility can create bugs.

```js
const user = {
  name: "Amit",
  age: 25,
};

console.log(user.email.toLowerCase());
```

This code looks okay, but `email` does not exist.

Runtime error:

```txt
Cannot read properties of undefined
```

## TypeScript Solution

```ts
interface User {
  name: string;
  age: number;
}

const user: User = {
  name: "Amit",
  age: 25,
};

console.log(user.email);
```

TypeScript will show error before running:

```txt
Property 'email' does not exist on type 'User'
```

## Main Benefits

```txt
1. Catches bugs early
2. Improves autocomplete
3. Makes APIs safer
4. Makes large codebases easier to maintain
5. Helps during refactoring
6. Makes object structure clear
```

Interview line:

```txt
TypeScript is useful because it adds static type checking to JavaScript, which helps catch mistakes before runtime and makes large codebases easier to maintain.
```

---

# 2. How TypeScript Runs

Browser does not run TypeScript directly.

Flow:

```txt
.ts file → TypeScript compiler → .js file → browser/node runs JS
```

Example:

```ts
let username: string = "Amit";
```

After compilation, types are removed:

```js
let username = "Amit";
```

Important:

```txt
TypeScript is only for development-time safety.
Runtime still runs JavaScript.
```

---

# 3. Basic Type Syntax

In JS:

```js
let age = 25;
```

In TS:

```ts
let age: number = 25;
```

General syntax:

```ts
let variableName: type = value;
```

Examples:

```ts
let username: string = "Amit";
let age: number = 25;
let isLoggedIn: boolean = true;
let price: number = 999.99;
```

---

# 4. Type Inference

TypeScript can automatically understand type from value.

```ts
let age = 25;
```

TS understands:

```txt
age is number
```

So this will fail:

```ts
age = "twenty five";
```

## When to manually write types?

Write types when:

```txt
1. Function parameters
2. Function return values
3. Objects
4. API responses
5. Complex data
6. Values that can have multiple types
```

No need to overdo:

```ts
let name: string = "Amit";
```

This is okay, but TS already knows it.

Better:

```ts
let name = "Amit";
```

But for learning, writing types manually is useful.

---

# 5. Primitive Types

## string

```ts
let name: string = "Amit";
```

## number

```ts
let age: number = 25;
let price: number = 99.5;
```

There is no separate `int` or `float` in TS. Both are `number`.

## boolean

```ts
let isActive: boolean = true;
```

## null

```ts
let data: null = null;
```

## undefined

```ts
let value: undefined = undefined;
```

Usually, you do not type variables directly as `null` or `undefined` unless needed.

---

# 6. Arrays

## Number Array

```ts
let marks: number[] = [80, 90, 95];
```

## String Array

```ts
let names: string[] = ["Amit", "Rahul"];
```

## Alternative syntax

```ts
let marks: Array<number> = [80, 90, 95];
```

Both are correct.

Most common:

```ts
number[]
string[]
```

## Array of Objects

```ts
interface User {
  name: string;
  age: number;
}

const users: User[] = [
  { name: "Amit", age: 25 },
  { name: "Rahul", age: 30 },
];
```

---

# 7. Tuples

Tuple means fixed-length array with fixed type order.

```ts
let user: [string, number] = ["Amit", 25];
```

Correct:

```ts
let user: [string, number] = ["Amit", 25];
```

Wrong:

```ts
let user: [string, number] = [25, "Amit"];
```

Use case:

```ts
const response: [number, string] = [200, "Success"];
```

But in real projects, objects are often cleaner than tuples.

---

# 8. Objects

## Inline Object Type

```ts
const user: { name: string; age: number } = {
  name: "Amit",
  age: 25,
};
```

This is fine for small objects.

But for reusable object structure, use interface.

---

# 9. Interface

Interface defines object shape.

```ts
interface User {
  name: string;
  age: number;
}
```

Usage:

```ts
const user: User = {
  name: "Amit",
  age: 25,
};
```

Now TypeScript checks:

```txt
name must be string
age must be number
extra/missing fields can be detected
```

Wrong:

```ts
const user: User = {
  name: "Amit",
};
```

Error:

```txt
Property 'age' is missing
```

---

# 10. Optional Properties

Sometimes a field may or may not exist.

Use `?`.

```ts
interface User {
  name: string;
  age: number;
  email?: string;
}
```

Now both are valid:

```ts
const user1: User = {
  name: "Amit",
  age: 25,
  email: "amit@example.com",
};

const user2: User = {
  name: "Rahul",
  age: 30,
};
```

Meaning:

```txt
email is optional
```

Important:

```ts
console.log(user2.email.toLowerCase());
```

This may give error because email can be undefined.

Safe version:

```ts
if (user2.email) {
  console.log(user2.email.toLowerCase());
}
```

---

# 11. readonly Property

If a field should not change after creation:

```ts
interface User {
  readonly id: number;
  name: string;
}
```

Usage:

```ts
const user: User = {
  id: 1,
  name: "Amit",
};

user.name = "Rahul"; // allowed
user.id = 2; // error
```

Use case:

```txt
id, createdAt, immutable database values
```

---

# 12. Nested Objects

```ts
interface Address {
  city: string;
  pincode: number;
}

interface User {
  name: string;
  age: number;
  address: Address;
}

const user: User = {
  name: "Amit",
  age: 25,
  address: {
    city: "Lucknow",
    pincode: 226001,
  },
};
```

This is common in API responses.

---

# 13. Type Alias

Type alias also defines types.

```ts
type User = {
  name: string;
  age: number;
};
```

Usage:

```ts
const user: User = {
  name: "Amit",
  age: 25,
};
```

## Interface vs Type

Simple practical rule:

```txt
Use interface for object shapes.
Use type for unions, custom combinations, and flexible types.
```

Example type union:

```ts
type ID = string | number;
```

---

# 14. Union Types

Union means value can be one of multiple types.

```ts
let id: string | number;

id = "abc123";
id = 101;
```

Wrong:

```ts
id = true;
```

Use case:

```ts
type Status = "pending" | "success" | "failed";

let paymentStatus: Status = "pending";
```

Wrong:

```ts
paymentStatus = "done";
```

Only allowed:

```txt
pending, success, failed
```

This is very useful for fixed statuses.

---

# 15. Literal Types

Literal type means exact allowed value.

```ts
type Role = "admin" | "user" | "guest";

let role: Role = "admin";
```

Wrong:

```ts
role = "manager";
```

Use case:

```ts
type ButtonVariant = "primary" | "secondary" | "danger";
```

---

# 16. Functions in TypeScript

Function typing includes:

```txt
1. Parameter types
2. Return type
```

Example:

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

Structure:

```ts
function functionName(param: type): returnType {
  return value;
}
```

---

# 17. Arrow Functions

```ts
const add = (a: number, b: number): number => {
  return a + b;
};
```

Short version:

```ts
const add = (a: number, b: number): number => a + b;
```

---

# 18. void Return Type

Use `void` when function returns nothing.

```ts
function logMessage(message: string): void {
  console.log(message);
}
```

This function performs action but does not return useful value.

Use cases:

```txt
console logging
event handlers
side-effect functions
```

---

# 19. Optional Parameters

```ts
function greet(name?: string): string {
  return `Hello ${name || "User"}`;
}
```

Here `name` can be:

```txt
string or undefined
```

Safe usage:

```ts
function greet(name?: string): string {
  if (name) {
    return `Hello ${name}`;
  }

  return "Hello User";
}
```

---

# 20. Default Parameters

```ts
function greet(name: string = "User"): string {
  return `Hello ${name}`;
}
```

Here if name is not passed, default value is used.

```ts
greet(); // Hello User
greet("Amit"); // Hello Amit
```

---

# 21. Rest Parameters

JS:

```js
function sum(...nums) {
  return nums.reduce((acc, curr) => acc + curr, 0);
}
```

TS:

```ts
function sum(...nums: number[]): number {
  return nums.reduce((acc, curr) => acc + curr, 0);
}
```

Meaning:

```txt
nums is an array of numbers
```

---

# 22. Function Type

You can type a variable that stores a function.

```ts
let add: (a: number, b: number) => number;
```

Assign function:

```ts
add = (x, y) => x + y;
```

Use case: callbacks.

```ts
function calculate(
  a: number,
  b: number,
  operation: (x: number, y: number) => number
): number {
  return operation(a, b);
}

const result = calculate(10, 5, (x, y) => x + y);
```

---

# 23. any

`any` disables TypeScript safety.

```ts
let data: any = 10;

data = "hello";
data = true;
data.anything.random();
```

This is allowed because TS stops checking.

Use `any` only when:

```txt
1. Migrating old JS code
2. Unknown third-party data
3. Quick temporary escape
```

Interview line:

```txt
I avoid any unless absolutely necessary because it removes TypeScript’s safety.
```

---

# 24. unknown

`unknown` is safer than `any`.

```ts
let data: unknown = "hello";
```

You cannot directly use it:

```ts
data.toUpperCase(); // error
```

First check type:

```ts
if (typeof data === "string") {
  console.log(data.toUpperCase());
}
```

Use case:

```txt
External API response, unknown input, error handling
```

---

# 25. Type Narrowing

Type narrowing means checking type before using value.

```ts
function printValue(value: string | number): void {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}
```

TS understands:

```txt
inside if → value is string
inside else → value is number
```

Common narrowing tools:

```txt
typeof
if check
Array.isArray()
in operator
truthy check
```

---

# 26. null and undefined Handling

Example:

```ts
let token: string | null = null;
```

Later:

```ts
token = "abc123";
```

You cannot directly use token:

```ts
token.toUpperCase(); // error if token can be null
```

Safe:

```ts
if (token) {
  console.log(token.toUpperCase());
}
```

Use case:

```txt
login token
selected user
API response
DOM element
```

---

# 27. Type Assertions

Sometimes you know more than TypeScript.

```ts
const input = document.getElementById("username") as HTMLInputElement;

console.log(input.value);
```

Meaning:

```txt
I am telling TS this element is an HTMLInputElement.
```

Use carefully. Do not overuse.

---

# 28. Promises and Async Functions

Async function always returns Promise.

```ts
async function getName(): Promise<string> {
  return "Amit";
}
```

For number:

```ts
async function getCount(): Promise<number> {
  return 10;
}
```

For object:

```ts
interface User {
  name: string;
  age: number;
}

async function getUser(): Promise<User> {
  return {
    name: "Amit",
    age: 25,
  };
}
```

---

# 29. API Response Typing

This is one of the most important practical TypeScript use cases.

## Without TypeScript

```js
const res = await fetch("/api/user");
const data = await res.json();

console.log(data.user.name);
```

If API shape changes, runtime error may happen.

## With TypeScript

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

interface ApiResponse {
  success: boolean;
  data: User;
  message: string;
}

const res = await fetch("/api/user");
const data: ApiResponse = await res.json();

console.log(data.data.name);
```

Now TS knows what data should look like.

---

# 30. Generic API Response

Different APIs return different data.

User API:

```ts
interface User {
  id: number;
  name: string;
}
```

Product API:

```ts
interface Product {
  id: number;
  title: string;
  price: number;
}
```

Common response shape:

```ts
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
```

Now:

```ts
const userResponse: ApiResponse<User> = {
  success: true,
  data: {
    id: 1,
    name: "Amit",
  },
};

const productResponse: ApiResponse<Product[]> = {
  success: true,
  data: [
    {
      id: 1,
      title: "Laptop",
      price: 50000,
    },
  ],
};
```

Meaning:

```txt
ApiResponse<T> is reusable.
T changes depending on API.
```

---

# 31. Generics Explained Properly

Generic means placeholder type.

Basic example:

```ts
function identity<T>(value: T): T {
  return value;
}
```

Usage:

```ts
const a = identity<string>("hello");
const b = identity<number>(100);
```

Here:

```txt
T becomes string for first call.
T becomes number for second call.
```

Why useful?

Without generics:

```ts
function identity(value: any): any {
  return value;
}
```

Problem:

```txt
any loses type safety
```

With generics:

```ts
function identity<T>(value: T): T {
  return value;
}
```

Benefit:

```txt
input type and output type stay connected
```

---

# 32. Generic API Request

```ts
async function apiRequest<T>(url: string): Promise<T> {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("API failed");
  }

  const data: T = await res.json();
  return data;
}
```

Usage:

```ts
interface User {
  id: number;
  name: string;
}

const user = await apiRequest<User>("/api/user");

console.log(user.name);
```

For product list:

```ts
interface Product {
  id: number;
  title: string;
  price: number;
}

const products = await apiRequest<Product[]>("/api/products");

products.forEach((product) => {
  console.log(product.title);
});
```

Interview line:

```txt
Generics are useful when one function should work with multiple data types while still keeping type safety, like a reusable API wrapper.
```

---

# 33. JS to TS Conversion Method

Whenever converting JS to TS, follow this process:

```txt
Step 1: Identify variables
Step 2: Identify function parameters
Step 3: Identify function return value
Step 4: Identify object shapes
Step 5: Create interfaces/types
Step 6: Handle null/undefined
Step 7: Avoid any where possible
```

---

# 34. JS → TS Conversion Example 1

## JavaScript

```js
function getFullName(user) {
  return user.firstName + " " + user.lastName;
}

const user = {
  firstName: "Amit",
  lastName: "Sharma",
};

console.log(getFullName(user));
```

## TypeScript

```ts
interface User {
  firstName: string;
  lastName: string;
}

function getFullName(user: User): string {
  return user.firstName + " " + user.lastName;
}

const user: User = {
  firstName: "Amit",
  lastName: "Sharma",
};

console.log(getFullName(user));
```

What we typed:

```txt
user object shape
function parameter
function return value
```

---

# 35. JS → TS Conversion Example 2

## JavaScript

```js
const products = [
  { id: 1, title: "Laptop", price: 50000 },
  { id: 2, title: "Phone", price: 20000 },
];

function getExpensiveProducts(products, minPrice) {
  return products.filter((product) => product.price >= minPrice);
}
```

## TypeScript

```ts
interface Product {
  id: number;
  title: string;
  price: number;
}

const products: Product[] = [
  { id: 1, title: "Laptop", price: 50000 },
  { id: 2, title: "Phone", price: 20000 },
];

function getExpensiveProducts(
  products: Product[],
  minPrice: number
): Product[] {
  return products.filter((product) => product.price >= minPrice);
}
```

What we typed:

```txt
Product interface
array of Product
minPrice as number
return as Product[]
```

---

# 36. JS → TS Conversion Example 3: Token Manager

## JavaScript

```js
const tokenManager = (() => {
  let token = null;

  return {
    setToken(newToken) {
      token = newToken;
    },

    getToken() {
      return token;
    },

    clearToken() {
      token = null;
    },

    isLoggedIn() {
      return !!token;
    },
  };
})();
```

## TypeScript

```ts
type Token = string | null;

interface TokenManager {
  setToken: (newToken: string) => void;
  getToken: () => Token;
  clearToken: () => void;
  isLoggedIn: () => boolean;
}

const tokenManager: TokenManager = (() => {
  let token: Token = null;

  return {
    setToken(newToken: string): void {
      token = newToken;
    },

    getToken(): Token {
      return token;
    },

    clearToken(): void {
      token = null;
    },

    isLoggedIn(): boolean {
      return !!token;
    },
  };
})();
```

Explanation:

```txt
Token can be string or null.
setToken accepts only string.
getToken returns string or null.
clearToken returns nothing.
isLoggedIn returns boolean.
TokenManager defines the API shape of the object.
```

---

# 37. JS → TS Conversion Example 4: API Wrapper

## JavaScript

```js
async function apiRequest(url, options = {}) {
  try {
    const res = await fetch(url, options);
    const data = await res.json();

    if (!res.ok) {
      return {
        ok: false,
        error: data.message || "Something went wrong",
      };
    }

    return {
      ok: true,
      data,
    };
  } catch (error) {
    return {
      ok: false,
      error: error.message,
    };
  }
}
```

## TypeScript

```ts
interface ApiSuccess<T> {
  ok: true;
  data: T;
}

interface ApiFailure {
  ok: false;
  error: string;
}

type ApiResult<T> = ApiSuccess<T> | ApiFailure;

async function apiRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResult<T>> {
  try {
    const res = await fetch(url, options);
    const data = await res.json();

    if (!res.ok) {
      return {
        ok: false,
        error: data.message || "Something went wrong",
      };
    }

    return {
      ok: true,
      data: data as T,
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
```

Usage:

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

const result = await apiRequest<User>("/api/user");

if (result.ok) {
  console.log(result.data.name);
} else {
  console.log(result.error);
}
```

Why this is good:

```txt
If ok is true → data exists
If ok is false → error exists
TS understands the difference automatically
```

---

# 38. Discriminated Union

This is what we used above.

```ts
type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };
```

Now:

```ts
if (result.ok) {
  result.data;
} else {
  result.error;
}
```

TypeScript knows:

```txt
inside if → success response
inside else → failure response
```

This is a very practical TypeScript pattern.

---

# 39. React Props Typing

If you use React with TS:

```tsx
interface ButtonProps {
  text: string;
  disabled?: boolean;
  onClick: () => void;
}

function Button({ text, disabled = false, onClick }: ButtonProps) {
  return (
    <button disabled={disabled} onClick={onClick}>
      {text}
    </button>
  );
}
```

Explanation:

```txt
text is required
disabled is optional
onClick must be a function
```

---

# 40. useState Typing

```tsx
const [count, setCount] = useState<number>(0);
```

For object:

```tsx
interface User {
  name: string;
  email: string;
}

const [user, setUser] = useState<User | null>(null);
```

Why `User | null`?

```txt
Initially user may not exist.
After API call, user becomes object.
```

Safe usage:

```tsx
if (!user) {
  return <p>Loading...</p>;
}

return <p>{user.name}</p>;
```

---

# 41. Event Typing in React

Input change event:

```tsx
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
};
```

Form submit:

```tsx
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};
```

Basic awareness is enough.

---

# 42. Utility Types: Basic Awareness

You do not need deep mastery, but know these.

## Partial

Makes all fields optional.

```ts
interface User {
  name: string;
  email: string;
}

const updateUser: Partial<User> = {
  name: "Amit",
};
```

Use case:

```txt
Update forms
PATCH APIs
```

## Pick

Select some fields.

```ts
type UserPreview = Pick<User, "name" | "email">;
```

## Omit

Remove some fields.

```ts
type PublicUser = Omit<User, "password">;
```

Use case:

```txt
Hide sensitive fields
```

Interview-safe line:

```txt
I know common utility types like Partial, Pick, and Omit, mainly for API payloads and form data.
```

---

# 43. Enums vs Union Types

Enum:

```ts
enum Role {
  Admin = "admin",
  User = "user",
}
```

Usage:

```ts
let role: Role = Role.Admin;
```

But modern TS often prefers union types:

```ts
type Role = "admin" | "user";
```

For your level, union types are enough.

---

# 44. TypeScript with Backend Data

Example backend user:

```ts
interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member";
  createdAt: string;
}
```

Payment response:

```ts
interface PaymentResponse {
  orderId: string;
  amount: number;
  currency: "INR";
  status: "created" | "paid" | "failed";
}
```

Membership example:

```ts
interface Membership {
  id: string;
  userId: string;
  planName: string;
  status: "active" | "expired" | "pending";
  startDate: string;
  endDate: string;
}
```

This connects directly with full-stack project thinking.

---

# 45. Error Handling in TypeScript

In TS, caught error is usually `unknown`.

```ts
try {
  throw new Error("Failed");
} catch (error) {
  console.log(error.message); // may error
}
```

Safe:

```ts
try {
  throw new Error("Failed");
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message);
  } else {
    console.log("Unknown error");
  }
}
```

This is important in API wrapper.

---

# 46. TypeScript Interview Questions

## Q1. What is TypeScript?

Answer:

```txt
TypeScript is a superset of JavaScript that adds static type checking. It helps catch errors before runtime and improves maintainability, especially in larger applications.
```

## Q2. Why use TypeScript?

Answer:

```txt
It helps prevent type-related bugs, gives better IDE support, makes APIs safer, and makes refactoring easier.
```

## Q3. Difference between JS and TS?

Answer:

```txt
JavaScript is dynamically typed and errors often appear at runtime. TypeScript adds static typing, so many errors are caught during development before the code runs.
```

## Q4. What is interface?

Answer:

```txt
An interface defines the structure of an object. It tells TypeScript which properties and types an object should have.
```

## Q5. What are generics?

Answer:

```txt
Generics allow us to create reusable functions or types that work with multiple data types while preserving type safety.
```

## Q6. Where have you used TypeScript?

Answer:

```txt
My core stack is JavaScript, but I have used TypeScript concepts for API response typing, object modeling, and utility functions like token management and reusable API wrappers.
```

---

# 47. What You Should Not Overdo Right Now

Skip deep focus on:

```txt
Advanced generics
Decorators
Complex mapped types
Deep tsconfig
Namespace
Declaration merging
Advanced compiler internals
```

Your target:

```txt
Readable TS
Basic writing
JS to TS conversion
API response typing
Token manager typing
React props awareness
```

---

# 48. Final Practical Checklist

You should be able to type:

```txt
Variables
Arrays
Objects
Functions
Callbacks
Interfaces
Optional fields
Union types
Async functions
API responses
Generic API wrappers
Token manager
React props
Basic useState
```

---

# 49. DEV TASKS

## Task 1 — Convert tokenManager to TypeScript

Requirements:

```txt
1. token should be string or null
2. setToken should accept string
3. getToken should return string or null
4. clearToken should return void
5. isLoggedIn should return boolean
6. Define interface for tokenManager object
```

Starter JS:

```js
const tokenManager = (() => {
  let token = null;

  return {
    setToken(newToken) {
      token = newToken;
    },

    getToken() {
      return token;
    },

    clearToken() {
      token = null;
    },

    isLoggedIn() {
      return !!token;
    },
  };
})();
```

Expected TS direction:

```ts
type Token = string | null;

interface TokenManager {
  setToken: (newToken: string) => void;
  getToken: () => Token;
  clearToken: () => void;
  isLoggedIn: () => boolean;
}
```

---

## Task 2 — Type apiRequest Return Shape

Requirements:

```txt
1. url should be string
2. options should be RequestInit
3. function should return Promise<ApiResult<T>>
4. success response should contain data
5. failure response should contain error
6. use generic T for flexible API response
```

Expected type structure:

```ts
interface ApiSuccess<T> {
  ok: true;
  data: T;
}

interface ApiFailure {
  ok: false;
  error: string;
}

type ApiResult<T> = ApiSuccess<T> | ApiFailure;
```

---

# 50. Final Interview Positioning

Say this:

```txt
My primary stack is JavaScript, but I am comfortable with TypeScript basics. I understand how to type functions, objects, interfaces, API responses, and reusable utilities. I have practiced converting JS utilities like tokenManager and apiRequest into TypeScript. I mainly use TS for safer API handling, better autocomplete, and maintainable object structures.
```

---

# Final Result

After this note, you should be able to:

```txt
Understand TypeScript syntax
Convert basic JS to TS
Type functions and objects
Create interfaces
Use union types
Use generics in API wrappers
Type async responses
Explain TS in interviews
Handle your roadmap tasks
```
