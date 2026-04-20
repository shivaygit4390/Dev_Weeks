// # 🧠 TASK 1 — CALLBACK HELL (SHORT)

// ## 🎯 Goal

// * Understand async flow
// * Feel why nested callbacks are messy

// ---

// ## 📌 What to do

// Create 3 functions using `setTimeout`:

// ### 1. login(cb)

// * wait 1 sec
// * print "User logged in"
// * call cb("user123")  ← dummy data

// ---

// ### 2. getUser(user, cb)

// * wait 1 sec
// * print "Got user data"
// * call cb({ id: user, name: "Aman" }) ← dummy

// ---

// ### 3. getOrders(user, cb)

// * wait 1 sec
// * print "Fetched orders"
// * call cb(["order1", "order2"]) ← dummy

// ---

// ## 🔗 Call them like this (IMPORTANT)

// ```js
// login((user) => {
//   getUser(user, (userData) => {
//     getOrders(userData, (orders) => {
//       console.log(orders);
//     });
//   });
// });
// ```

// ---

// ## ⚠️ Notes

// * Data is **fake (hardcoded)**
// * `user` mostly useless — just for flow
// * Focus = **step1 → step2 → step3**

// ---

// ## 😵 Expected

// * Code becomes nested
// * Hard to read

// 👉 This is **Callback Hell**

function login(cb){
    setTimeout(() =>{
        console.log("logged in user");
        cb("userid");
    },1000)
}

function getUser(user,cb){
     console.log("getting user data");
    setTimeout(()=>{
       cb({id:user, name: "aman"});
    },1000)
}

function getOrder(user, cb){
    console.log("getting orders");
    setTimeout(() => {
        cb(["o1", "o2"]);
    }, 1000)
}


//calling
login((user) =>{
      console.log(user);
   getUser(user, (userData)=>{
          console.log(userData);
          getOrder(user, (order) => {
            console.log(order);
          } )    
   })   
})