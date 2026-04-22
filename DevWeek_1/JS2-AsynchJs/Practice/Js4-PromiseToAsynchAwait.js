function login(){
    return new Promise((resolve, reject) =>{
   setTimeout(() =>{
    resolve("uid");
   },1000)
    })
}

function getUser(user){
return new Promise((resolve, reject) =>{
    // reject(new Error("Intentional error")); //to chck the catch block working or not
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


//call using asynch await

async function userFlow(){
  try{
      let uid = await login();
    console.log(uid);
    let data = await getUser(uid);
    console.log(data);
    let orders = await getOrders(data.id);
    console.log(orders);
  }catch(err){
    console.log(err);
  }
}

userFlow();