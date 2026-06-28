/*
  Task objective:
  - export debounce as a reusable utility function
  - combine debounce logic with named-export module syntax

  Revision purpose:
  - same debounce idea, now exported as reusable utility
  - revise named export syntax with functional utility code
*/

export  const debounce = (fn, delay) =>{
     let opTimer = null; //will store the timer
    return function(...args){
         // Latest call wins, so previous pending timer is cancelled.
         if(opTimer != null) clearTimeout(opTimer);
          opTimer = setTimeout( () => {
            // fn(...args);   //do this if dont want to preserve the this context and you r using arrow function
            // Use apply when you want to preserve `this` for a normal function.
            fn.apply(this, args)
          } , delay);
    }

}

//this is named export 
