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


const debounce = (fn, delay) =>{
     let opTimer = null; //will store the timer
    return function(...args){
         if(opTimer != null) clearTimeout(opTimer);
          opTimer = setTimeout( () => {
            // fn(...args);   //do this if dont want to preserve the this context and you r using arrow function
            //but do use apply if you want to preserve this and r usinf normal function
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