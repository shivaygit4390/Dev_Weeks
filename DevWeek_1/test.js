const test = () => console.log("js is running here");
// test();

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

// console.log(wrapped(5)); // 8

function login(cb){
    setTimeout(
() => {
    console.log("logged in User 1");
    cb("uid");
}
    ,1000)
}

function getUserData(user, cb){
     console.log("getting user data");
    setTimeout(() =>{
    cb({id : user, name : "aman" } );
    },1000)
}

function getOrders(user, cb){
     console.log("getting orders ");
setTimeout(() =>{
    cb(["a", "b"]);
}
,1000)
}

//above ex user iis just a dummy as it will be use in real life to fetch data from db
//  but here we r passing thr datourselves to mic the behaviour

login((user) =>{
    //just to see
    console.log(user);
   getUserData(user, (userdata) =>{
    console.log(userdata)
         getOrders(user, (orders) => {
            console.log(orders)
         })    
   })
})