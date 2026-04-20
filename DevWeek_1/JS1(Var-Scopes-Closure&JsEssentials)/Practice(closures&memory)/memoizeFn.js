// Problem Statement

// Create a function called memoize that optimizes another function by caching its results.

// Requirements
// memoize should take a function fn as input
// It should return a new function
// When the returned function is called:
// If the input was seen before → return cached result
// If not → call original function, store result, then return it

function testM(a,b){
    console.log("running fn");
    return a*b;
}

const memoizedFn = (fn) => {
    // an object to store results
const cache = {};

return (...args) => {
       let key = JSON.stringify(args);
       if(key in cache ) return cache[key];
    // else return  cache[key] = fn(...args); //confusing (storing as well as returning the result)
    else cache[key] = fn(...args); //store the result
    return cache[key];  //stored result  
}
}

// const Memos1 = memoizedFn(testM);

// console.log(Memos1(2,3));
// console.log(Memos1(2,3));


// -------------------------------------------------------------------------

//version of same memoized fn if the passed function useses this and we have ti preserve the context
const obj = {
  x: 10,
  multiply(y) {
    console.log("running fn");
    return this.x * y;
  }
};

const memoized2 = (fn) => {
    const cache = {};
    return function(...args){
        let key = JSON.stringify(args);
        if(key in cache) return cache[key];
        else cache[key] = fn.apply(this, args);
        return cache[key];
    }

}



const Memos = memoized2(obj.multiply);

console.log(Memos.call(obj, 2)); // running fn → 20
console.log(Memos.call(obj, 2)); // 20 (cached)
console.log(Memos.call(obj, 3)); // running fn → 30
console.log(Memos.call(obj, 3)); // 30 (cached)