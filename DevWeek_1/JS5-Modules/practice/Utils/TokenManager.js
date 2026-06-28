/*
  Task objective:
  - expose token operations through shared module functions
  - understand module-scoped state as an alternative to closure factories

  Revision purpose:
  - compare closure-based private state with module-scoped shared state
  - remember that one module instance can act like shared utility storage
*/


// const tokenManager = () => {
//     // private var
//     let token = null;

//     return {
//         getToken: function () {
//             return token;
//         },

//         setToken: function (t) {
//             if (token === null) {
//                 token = t;
//             } else {
//                 console.log("already set, use rotateToken() to reassign the token");
//             }
//         },

//         isLoggedIn: function () {
//             return token !== null;
//         },

//         rotateToken: function (newToken) {
//             if (token !== null) {
//                 token = newToken;
//             } else {
//                 console.log("logged out, assign a token using setToken()");
//             }
//         }
//     };
// };

// export default tokenManager;

// Factory version above is useful when you want separate instances.
// In this modules section, we are intentionally showing shared module-scoped state.

// So this file uses module scope instead:
// tokenManager.js
// token now lives at module scope, so imported functions share the same value.
let token = null;

function getToken() {
    return token;
}

function setToken(t) {
    if (token === null) {
        token = t;
    }
}

function isLoggedIn() {
    return token !== null;
}

function rotateToken(newToken) {
    if (token !== null) {
        token = newToken;
    }
}

export { getToken, setToken, isLoggedIn, rotateToken };

// Usage:
// import { setToken, getToken } from "./tokenManager.js";

// setToken("123");
// console.log(getToken());
