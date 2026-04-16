function counter(){
    let count = 0;
    function inc(){
        ++count;
    }
    inc();
    console.log(count);

}

counter();
//above ex is a closure but uts outer var count isnt saved coz it wouldn be used once outer fn is used ad we r not storing 
// anything out of the outer function like returnnf inner function 

//or another example to make a complete closure + outer var saved scanario
function outer() {
  let count = 0;
 //inner can ascess the outer fn variable(the outer fn is destroyed generally after execution from 
        // stack but if lexical scoping is there and inner fn is ascessing the var of outer fn then
        //  it doesnt get destroyed in the stack and hence the variable memory is not released)
  return function () {
    count++;
    return count;
  };
}

let inc = outer();
console.log(inc);