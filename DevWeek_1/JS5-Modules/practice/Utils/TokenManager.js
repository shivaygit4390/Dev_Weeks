
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

//we wouldnt be using above thing as it will give seoerate instaces of token manager with each import like it wouldnt be sharing global state

// so  we su this 
// tokenManager.js
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