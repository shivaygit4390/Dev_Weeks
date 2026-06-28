/*
  Task objective:
  - practice closure basics through small drills
  - build a private counter and fix the loop-timeout problem using closure

  Revision purpose:
  - small closure drills in one file
  - private variable pattern plus loop timeout fix
*/

// # Mini Tasks
// 1.Create counter (increment/decrement)
// 2.Token manager (your task)
// 3.Fix loop timeout issue
// 4.Write memoization function
// 5.Private variable using closure

// 1. and 5. Already built
// Private counter:
// count can be changed through methods, but it cannot be touched directly from outside.

const privateCount = () =>{
    let count = 0;
    return {
        // All methods below share the same closed-over count.
        inc : () => ++count,
        dec : () => --count,
        show : () => console.log(count)
    }
}

const fnCheck = privateCount();

// fnCheck.show(); //0
// fnCheck.inc(); // by 1
// fnCheck.show(); //1
// fnCheck.dec(); // dec by 1 again
// fnCheck.show(); // 0 


//  3.Fix loop timeout issue

// for(var i = 0; i < 4; i++){
//     setTimeout(() => console.log(i))
// }

// The commented version prints the final value repeatedly because `var` creates one shared loop variable.

// Fix 1:
// use `let`, so every iteration gets its own block-scoped variable.
// Fix 2:
// use closure/IIFE so current value is captured before timeout runs later.
for(var i = 0; i < 3; i++){
    
    (function(i){
// IIFE parameter captures current loop value before timeout runs later.
setTimeout(() => console.log(i));
    })(i);
}

// IIFE runs immediately and captures current `i` for that iteration.
