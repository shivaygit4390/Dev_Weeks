// TASK: Debounce Function

// Create:
// debounce(fn, delay)

// Returns a function that:

// clears previous timer
// sets new timer
// runs fn only after delay
// if called again before delay → previous call cancelled

// Expected:

// const d = debounce(fn, 1000);

// d();
// d();
// d();

// → fn runs only once after 1 sec (from last call)

// Applications:

// Search input (API call after typing stops)
// Auto-save (save after user stops typing)
// Resize events (avoid multiple triggers)
// Form validation (run after user stops input)

// Rules:

// use closure
// no global vars
// preserve this
// pass args
//Whats a debounce function
// A debounce function is a programming technique used to limit the rate at which a function fires by delaying its 
// execution until a set amount of time has passed since the last time it was called


/*
  Revision purpose:
  - understand delayed execution after repeated calls stop
  - remember that debounce cancels the previous pending timer
*/

const debounce = (fn, delay) =>{
     let opTimer = null; //will store the timer
    return function(...args){
         // Every fresh call replaces the previous pending execution.
         if(opTimer != null) clearTimeout(opTimer);
          opTimer = setTimeout( () => {
            // fn(...args);   //do this if dont want to preserve the this context and you r using arrow function
            // Use apply when you want to preserve `this` for a normal function.
            fn.apply(this, args)
          } , delay);
    }

}

function test() {
    console.log("running...");
}

const d = debounce(test,1000 );

d();
d();
d();
