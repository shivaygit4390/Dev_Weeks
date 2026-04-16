const test = () => console.log("js is running here");
test();

const highOrder = (fn) => {
   return fn;
}

const testFn = (a) => {
   return "highorder fn exmple";

}

// console.log(highOrder(testFn)());
 
// retiurning a passed fn with its arguments

const testFn1 = (a) => {
    return a + 3;
}

const ex = (fn) => {
    return function(...args) {
        return fn(...args);
    }
}

const wrapped = ex(testFn1);

console.log(wrapped(5)); // 8