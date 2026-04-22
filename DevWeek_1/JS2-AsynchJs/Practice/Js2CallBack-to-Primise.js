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
    return getUser(user);
}).then((userdata) => {
    console.log(userdata);
    return getOrders(userdata);
}).then((orders) => {
   console.log(orders);
})