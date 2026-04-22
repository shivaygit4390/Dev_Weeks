# 📄 JSDOC — UTILITIES (FINAL CLEAN VERSION)

---

# 1. debounce.js

```js
/**
 * Creates a debounced version of a function.
 * Delays execution until after a specified delay has passed
 * since the last time the function was invoked.
 *
 * @param {Function} fn - The function to debounce
 * @param {number} delay - Delay time in milliseconds
 * @returns {Function} A debounced function
 *
 * @example
 * const debouncedFn = debounce(() => console.log("run"), 300);
 * debouncedFn();
 */
export const debounce = (fn, delay) => {
  let opTimer = null;

  return function (...args) {
    if (opTimer !== null) clearTimeout(opTimer);

    opTimer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};
```

---

# 2. tokenManager.js (Factory Version)

```js
/**
 * Creates a token manager with private state using closure.
 *
 * @returns {Object} Token manager instance
 * @returns {Function} returns.getToken - Get current token
 * @returns {Function} returns.setToken - Set token (only if not already set)
 * @returns {Function} returns.rotateToken - Replace existing token
 * @returns {Function} returns.isLoggedIn - Check if token exists
 *
 * @example
 * const auth = tokenManager();
 * auth.setToken("abc");
 * console.log(auth.getToken());
 */
const tokenManager = () => {
  let token = null;

  return {
    /**
     * Returns current token
     * @returns {string|null}
     */
    getToken() {
      return token;
    },

    /**
     * Sets token if not already set
     * @param {string} t
     */
    setToken(t) {
      if (token === null) {
        token = t;
      }
    },

    /**
     * Replaces existing token
     * @param {string} newToken
     */
    rotateToken(newToken) {
      if (token !== null) {
        token = newToken;
      }
    },

    /**
     * Checks if user is logged in
     * @returns {boolean}
     */
    isLoggedIn() {
      return token !== null;
    }
  };
};

export default tokenManager;
```

---

# 3. apiRequest.js

```js
/**
 * Makes an API request with retry and timeout support.
 *
 * @param {string} url - API endpoint
 * @param {Object} [options={}] - Fetch options
 * @param {number} [retries=2] - Number of retry attempts (network errors only)
 * @param {number} [timeout=5000] - Timeout duration in ms
 *
 * @returns {Promise<{
 *   ok: boolean,
 *   data: any,
 *   error: string|null,
 *   status: number
 * }>}
 *
 * @example
 * const res = await apiRequest("/users");
 * if (res.ok) console.log(res.data);
 * else console.log(res.error);
 */
async function apiRequest(url, options = {}, retries = 2, timeout = 5000) {
  // your implementation here
}

export default apiRequest;
```

---

# 🧠 WHY THIS MATTERS

JSDoc gives you:

* Better readability
* Auto suggestions in VS Code
* Clear API contracts
* Professional codebase feel

---

# 🎯 INTERVIEW LINE

> “I use JSDoc to document my modules so they are self-explanatory and easier for teams to use and maintain.”

---

# ✅ FINAL CHECK

Now you have:

* Modular structure ✅
* Clean exports/imports ✅
* Encapsulation ✅
* Central barrel file ✅
* JSDoc documentation ✅

👉 This is **production-level utility setup**

---
