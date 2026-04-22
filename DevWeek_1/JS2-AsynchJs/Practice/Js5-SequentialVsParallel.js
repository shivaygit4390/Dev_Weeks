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
    await api1();
    await api2();
    await api3();
    console.log("seq end")
 } 

 runSeq();

 async function runParallel(){
    console.log("parallel started");
  await  Promise.all([api1(), api2(), api3()])
  console.log("parallel ended");
 }
runParallel();

//here above seq one will take 1+2+3 seconds ie 6 seconds while 
//parallel wull take only 3 secionds as 1 and 2 were executed parallely