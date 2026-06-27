# 04 Interview Q&A

Use this file for speaking practice.
Do not just read it.
Answer aloud.

---

## 1. What is React?

React is a JavaScript library for building user interfaces using reusable components. It follows a declarative model where UI is derived from state and props.

---

## 2. What is JSX?

JSX is syntax that looks like HTML inside JavaScript. React uses it to describe what the UI should look like.

---

## 3. What is the difference between props and state?

Props are inputs passed from parent to child and are read-only. State is managed inside a component and can change over time, causing re-renders.

---

## 4. What is a re-render?

A re-render happens when React runs the component again to compute the next UI after state, props, or context changes.

---

## 5. Is re-render the same as DOM update?

No. Re-render is recalculation of component output. DOM update happens later when React commits the actual changes after comparison.

---

## 6. What is conditional rendering?

Conditional rendering means showing different UI based on conditions such as auth state, loading state, or data availability.

---

## 7. Why do we use keys in lists?

Keys help React identify list items across renders so it can preserve the correct item identity and update the UI efficiently.

---

## 8. Why is index as key risky?

When items are inserted, removed, or reordered, index-based identity shifts by position, which can lead to incorrect input state or UI mismatches.

---

## 9. What is a controlled component?

A controlled input is an input whose value comes from React state and is updated through `onChange`.

---

## 10. Why are controlled forms useful?

They make validation, submission, dynamic UI behavior, and data handling easier because React owns the input state.

---

## 11. What is `useState`?

`useState` is a hook used to manage local component state in functional components.

---

## 12. What is `useEffect`?

`useEffect` is a hook used to handle side effects such as API calls, timers, subscriptions, and syncing with external systems.

---

## 13. When should you not use `useEffect`?

You should not use it for values that can be directly derived during render. If no side effect is involved, effect is often unnecessary.

---

## 14. What is lifting state up?

Lifting state up means moving shared state to the nearest common parent so multiple components can use the same source of truth.

---

## 15. What is prop drilling?

Prop drilling is passing props through multiple intermediate components just to reach a deeply nested child. Context can help reduce it for widely shared data.

---

## 16. When would you use Context?

I use Context for shared app-level data such as auth or theme, especially when many components need the same value and prop drilling becomes noisy.

---

## 17. What is a custom hook?

A custom hook is a reusable function that contains React hook logic so the same stateful behavior can be reused across components.

---

## 18. How do you structure a React project?

I usually separate reusable UI into `components`, screens into `pages`, shared hook logic into `hooks`, API logic into `services`, and helpers into `utils`.

---

## 19. How do you call an API in React?

For a basic setup, I use `useEffect` for the side effect and local state for `loading`, `error`, and `data`. For larger apps, I would consider a server-state library like React Query.

---

## 20. What UI states do you handle during API calls?

Loading, error, empty, and success states.

---

## 21. How do you improve performance in React?

I first identify unnecessary renders or expensive computations. Then I optimize intentionally using patterns like smaller components, better state placement, and memoization only where it actually helps.

---

## 22. What is `React.memo`?

`React.memo` memoizes a component so it can skip re-rendering when its props have not changed.

---

## 23. What is the difference between `useMemo` and `useCallback`?

`useMemo` memoizes a computed value. `useCallback` memoizes a function reference.

---

## 24. Do you use memoization everywhere?

No. Overusing it can hurt readability without meaningful performance gain. I use it when there is a real benefit.

---

## 25. What are common mistakes in React?

- mutating state directly
- using unstable keys
- forgetting loading/error states
- putting too much in one component
- using effects unnecessarily

---

## 26. How would you explain your current React learning project?

Strong answer:

```txt
I built a small React task playground focused on core concepts such as reusable props-based cards, state-driven UI, counter constraints, multistep forms, and dynamic rendering. The main goal was to strengthen the fundamentals of componentization, controlled inputs, rendering behavior, and predictable state updates.
```

---

## 27. How do you sound more like a 2-year developer?

Do these in answers:

- say why you chose something
- mention trade-offs
- mention edge cases
- mention maintainability
- mention user states

Example:

```txt
I kept this state local because only this component uses it. If the same data later needs to be shared across siblings or pages, I would lift it or move it to a shared state mechanism.
```

---

## 28. What does scalability mean in frontend?

It means the application remains maintainable and predictable as features grow. Good scalability comes from clean component boundaries, good state ownership, reusable patterns, and a clear API/data layer.

---

## 29. What is accessibility in frontend?

Accessibility means the UI remains usable for a wider range of users, including keyboard users and assistive technology users. Semantic elements and proper form labeling are part of this.

---

## 30. How would you answer “Are you job-ready?”

Balanced answer:

```txt
I am strong on the React fundamentals such as components, state, props, forms, conditional rendering, and API-driven UI. I am also improving project structure and production-facing thinking like loading/error states and reusable design. My focus now is turning that into stronger project execution and cleaner interview explanations.
```

---

## 31. Short Self-Introduction for React Interview

```txt
I have been focusing on frontend development with JavaScript and React, especially on strengthening the core areas such as reusable components, state management, forms, conditional UI, and API integration. Recently I have been building practice tasks and mini-project flows to improve both implementation and explanation quality. My current focus is becoming more solid in production-style React thinking, including structure, edge cases, and scalable component design.
```

---

## 32. Final Speaking Rule

Do not try to sound over-smart.

Aim for:

- correct
- clear
- calm
- structured

That wins more often than random advanced buzzwords.

