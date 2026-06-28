// ## TASK 3

// Create:

// * 3 chained promises
// * Force error in 2nd step
// * Confirm:

//   * 3rd step is skipped
//   * catch handles error

/*
  Task objective:
  - force a promise failure in the middle of a chain
  - confirm that later `.then()` steps are skipped and `.catch()` handles the error

  Revision purpose:
  - see how rejection skips later `.then()` handlers
  - remember that `.catch()` handles the failed chain
*/

function login(){
    return new Promise((resolve, reject) => {
        console.log("chain 1 login");
        resolve("uid");
    })
}

function getUser(user){
    return new Promise((resolve, reject) =>{
        // Forced mismatch intentionally sends control to catch.
        if(user != "uixd")   reject(new Error("Forced failure in step 2"));
            else resolve({id : user, name : "Nirmal"});
    })
}

function getOrders(user){
    return new Promise ((resolve, reject) => {
        resolve(["o1"]);
    })
}

login().then((user) =>{
    return getUser(user);
}).then((userdata) =>{
    return getOrders(userdata);
}).then((orders) => {
    console.log(orders);
}).catch((err) => {
    console.log(err);
})
