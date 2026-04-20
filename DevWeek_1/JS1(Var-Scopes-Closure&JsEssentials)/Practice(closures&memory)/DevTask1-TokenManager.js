// TASK: Closure-Based Token Manager

// Objective:
// Create a token manager where token is private and only accessible via methods.

// Function to create:
// createTokenManager()

// Inside:

// Maintain a private variable → token

// Return object must have methods:

// setToken(tokenValue)
// → store token
// getToken()
// → return token
// rotateToken(newToken)
// → replace old token with new token
// isLoggedIn()
// → return true if token exists, else false

// Rules:

// token must NOT be directly accessible
// only methods can access/update it

// Expected usage:

// const auth = createTokenManager();

// auth.setToken("abc123");
// auth.getToken(); // "abc123"
// auth.isLoggedIn(); // true

// auth.rotateToken("xyz999");
// auth.getToken(); // "xyz999"

// Invalid:
// auth.token ❌

// Goal:
// Use closure to keep token private and persistent



const tokenManager = () => {
    // private var
    let token = null;

    return {
        getToken: function () {
            return token;
        },

        setToken: function (t) {
            if (token === null) {
                token = t;
            } else {
                console.log("already set, use rotateToken() to reassign the token");
            }
        },

        isLoggedIn: function () {
            return token !== null;
        },

        rotateToken: function (newToken) {
            if (token !== null) {
                token = newToken;
            } else {
                console.log("logged out, assign a token using setToken()");
            }
        }
    };
};


// testing
const auth = tokenManager();

auth.setToken("12xv");
console.log(auth.getToken());   // 12xv

auth.rotateToken("45fxc");
console.log(auth.getToken());   // 45fxc

console.log(auth.token);        // undefined