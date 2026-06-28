/*
  Task objective:
  - convert callback-based async flow into promises
  - chain async steps in a cleaner linear style using `.then()`

  Revision purpose:
  - convert nested callbacks into promise chaining
  - remember that each `.then()` should return the next async step
*/

function login(){
    return new Promise((resolve, reject) =>{
   setTimeout(() =>{
    resolve("uid");
   },1000)
    })
}

function getUser(user){
return new Promise((resolve, reject) =>{
    setTimeout(() => {
    resolve({id : user, name : "Nirmal"});
    },1000)
})
}

function getOrders(user){
    return new Promise((resolve, reject) =>{
        setTimeout(() =>{
            resolve(["o1", "o2"]);
        },1000)
    })
}

//calling

login().then((user) =>{
    console.log(user);
    // Return next promise so chain waits for user data.
    return getUser(user);
}).then((userdata) => {
    console.log(userdata);
    return getOrders(userdata);
}).then((orders) => {
   console.log(orders);
})
