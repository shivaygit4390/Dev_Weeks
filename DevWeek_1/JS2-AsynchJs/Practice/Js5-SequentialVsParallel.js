// ## TASK 6 (REAL INTERVIEW LEVEL)

// Create:

// 3 functions:

// * `api1()` → 1 sec
// * `api2()` → 2 sec
// * `api3()` → 3 sec

// Do:

// 1. Sequential execution → measure time
// 2. Parallel execution → measure time

// Goal:

// * See real difference


/*
  Revision purpose:
  - compare sequential waiting vs parallel execution
  - remember that Promise.all starts work together
*/

function api1(){
    return new Promise(( resolve, reject) =>{
        setTimeout(() =>{
       console.log("first chain");
       resolve();
        },1000)
    })
}

function api2(){
    return new Promise((resolve, reject) =>{
        setTimeout(() =>{
       console.log("Second chain");
         resolve();
        },2000)
    })
}

function api3(){
    return new Promise((resolve, reject) =>{
        setTimeout(() =>{
       console.log("Third chain");
         resolve();
        },3000);
    })
}

//sequential 

async function runSeq(){
    console.log("sequential")
    // Each await blocks the next line until current promise finishes.
    await api1();
    await api2();
    await api3();
    console.log("seq end")
 } 

 runSeq();

 async function runParallel(){
    console.log("parallel started");
  // All three calls begin together here.
  await  Promise.all([api1(), api2(), api3()])
  console.log("parallel ended");
 }
runParallel();

// Sequential flow takes about 1 + 2 + 3 = 6 seconds.
// Parallel flow takes about 3 seconds because all requests start together,
// and total time is dominated by the slowest one.
