export { debounce } from "./Debounce.js";
export { default as apiRequest } from "./apiRequest.js";
export { default as tokenManager } from "./tokenManager.js";

// ✅ Usage Anywhere
// import { debounce, apiRequest, tokenManager } from "./utils/index.js";

// 👉 Now everything comes from one place


// ⚠️ Alternative (Import → Then Export)

// You can also do it like this (less clean, but valid):

// import { debounce } from "./debounce.js";
// import { throttle } from "./throttle.js";
// import apiRequest from "./apiRequest.js";

// export { debounce, throttle, apiRequest };

// 👉 Avoid this unless needed

// 🧠 Key Rules (You Must Remember)
// Named export
// export { debounce } from "./debounce.js";
// Default export
// export { default as apiRequest } from "./apiRequest.js";