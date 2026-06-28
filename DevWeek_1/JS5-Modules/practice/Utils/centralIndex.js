/*
  Task objective:
  - collect utility exports in one central file
  - simplify imports by re-exporting helpers from one place

  Revision purpose:
  - central export file
  - collect reusable utilities behind one import point
*/

export { debounce } from "./Debounce.js";
export { default as apiRequest } from "./ApiWrapper.js";
export { getToken, setToken, isLoggedIn, rotateToken } from "./TokenManager.js";

// Usage anywhere:
// import { debounce, apiRequest, getToken, setToken } from "./utils/index.js";

// Everything can now be imported from one place.

// Alternative style (valid, but more repetitive):
// import { debounce } from "./Debounce.js";
// import apiRequest from "./ApiWrapper.js";
// import { getToken } from "./TokenManager.js";
//
// export { debounce, apiRequest, getToken };

// Key rules to remember:
// - named export: export { debounce } from "./Debounce.js";
// - default export: export { default as apiRequest } from "./ApiWrapper.js";
