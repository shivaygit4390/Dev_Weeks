// # Mini Tasks
// 1.Create counter (increment/decrement)
// 2.Token manager (your task)
// 3.Fix loop timeout issue
// 4.Write memoization function
// 5.Private variable using closure

// 1. and 5. Already built
//making a private count var that can be ascessed and manipulated via function but not directly its a counter too

const privateCount = () =>{
    let count = 0;
    return {
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

// above fn prints 4 4 4 4 due to var global scope so everytime it is updated as only 1 var i exists

// fix 1 -  use let as its fn scoped so every iteration makes a new let i so i remains udated wrt current iteration
// fix 2 using closure make var i a shared var and use it inside a function to ascess it
for(var i = 0; i < 3; i++){
    
    (function(i){
setTimeout(() => console.log(i));
    })(i);
}

//above reated 3 fn execution in the stack and abve fn is IIFE that is immedietely invoked