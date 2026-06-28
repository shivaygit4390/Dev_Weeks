/*
  Task objective:
  - compare a normal inner function call with a returned closure
  - understand when outer variables stay alive after outer function execution

  Revision purpose:
  - compare a normal inner function call with a true persistent closure
  - remember that closure becomes important when inner logic survives outside outer execution
*/

function counter(){
    let count = 0;
    function inc(){
        ++count;
    }
    // inc runs only inside counter, so count does not stay available later.
    inc();
    console.log(count);

}

counter();
//above ex is a closure but uts outer var count isnt saved coz it wouldn be used once outer fn is used ad we r not storing 
// anything out of the outer function like returnnf inner function 

//or another example to make a complete closure + outer var saved scanario
function outer() {
  let count = 0;
 // Returned function keeps access to count even after outer finishes.
 // This is the closure pattern worth remembering for interviews.
  return function () {
    count++;
    return count;
  };
}

let inc = outer();
// inc now stores the returned inner function, so closed-over state can live on.
console.log(inc);
