// TASK: Throttle Function

// Objective:
// Implement a function that ensures a given function executes at most once in a specified time interval.

// Function to create:
// throttle(fn, delay)

// Requirements:

// Accept:
// function fn
// delay (in milliseconds)
// Return a new function
// When the returned function is called:
// Execute fn immediately on the first call
// Ignore all subsequent calls within the next delay time
// After the delay has passed, allow the next call to execute again

// Expected behavior:

// const t = throttle(fn, 1000);

// t(); // executes immediately
// t(); // ignored
// t(); // ignored

// (after 1 second)

// t(); // executes again

// Constraints:

// Do not use global variables
// Use closure to manage internal state
// Preserve this context
// Pass all arguments correctly to fn

// Goal:

// Ensure that no matter how many times the function is triggered, it runs only once per defined time interval.
// Difference from debounce:

// Debounce → runs after user stops
// Throttle → runs at fixed intervals

const throttle = (fn, delay) => {
    //track if timer is finished or not
    let canRun = true;
    return function(...args){
     if(canRun){
           canRun = false;
            fn.apply(this, args)
           setTimeout(() =>{
            canRun = true;
        } ,delay)
        
     }
    }
}

function test() {
    console.log("running...");
}

const t = throttle(test, 10);
t("call 1"); // runs
t("call 2"); // ignored
t("call 3"); // ignored

setTimeout(() => t("call 4"), 1100); // runs
setTimeout(() => t("call 5"), 1200); // ignored
setTimeout(() => t("call 6"), 2300); // runs