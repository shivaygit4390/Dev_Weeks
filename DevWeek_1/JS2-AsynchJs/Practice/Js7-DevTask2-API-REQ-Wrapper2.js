// # 🧠 TASK — API WRAPPER (Production-Level) -- Addon task

// ## 🎯 Problem

// Create an async function:

// ```js
// apiRequest(url, options = {}, retries = 2, timeout = 5000)
// ```

// ---

// ## 📌 Requirements

// * Use `fetch` for API calls
// * Use `async/await`
// * Always return a **consistent response object**
// * Parse JSON safely
// * Handle all failure types properly

// ---

// ## 🎯 Response Format (MANDATORY)

// ```js
// {
//   ok: boolean,
//   data: any,
//   error: string | null,
//   status: number
// }
// ```

// ---

// ## ⚙️ Behavior Rules

// ### ✅ Success (2xx)

// * `ok: true`
// * `data: parsed JSON`
// * `error: null`

// ---

// ### ❌ HTTP Error (4xx / 5xx)

// * `ok: false`
// * `data: null`
// * `error: extracted message`
// * `status: response.status`
// * ❗ DO NOT retry

// ---

// ### 🌐 Network Error (fetch throws)

// * Retry up to `retries`
// * Final failure:

// ```js
// {
//   ok: false,
//   data: null,
//   error: "Network Error",
//   status: 0
// }
// ```

// ---

// ## ⏱️ Timeout Handling

// * Use `AbortController` + `setTimeout`
// * Abort request if it exceeds `timeout`

// ---

// ### ❌ Timeout Behavior

// ```js
// {
//   ok: false,
//   data: null,
//   error: "Request Timeout",
//   status: 0
// }
// ```

// * ❗ DO NOT retry timeout

// ---

// ## 🔁 Retry Logic

// * Retry ONLY for:

//   * network failures

// * DO NOT retry:

//   * timeout
//   * HTTP errors

// ---

// ## 🧠 Internal Requirements

// * Clear timeout after request completes
// * Use `try/catch`
// * Avoid memory leaks

// ---

// ## 🧪 Expected Usage

// ```js
// const res = await apiRequest("/users");

// if (res.ok) {
//   console.log(res.data);
// } else {
//   console.log(res.error);
// }
// ```

// ---

// ## 🎯 What is Being Tested

// * Async control flow
// * Error classification
// * Timeout handling
// * Retry logic correctness
// * Clean, reusable design

// ---




async function apiRequest(url, options = {}, retries = 2, timeout = 5000){

for(let i = 0; i <= retries; i++){
    //1.prepare the controller
    const controller = new AbortController();
    const signal = controller.signal;
//2.make the timer and collect id to cancel if request is suscessfull
    const timer = setTimeout(() => {
        controller.abort();
    }, timeout);
     
   // 3. now call the request
   try{
    let res = await fetch(url, {...options, signal});
    //req fetched so cancel timer to stop use of abort (saves cpu usage)
    clearTimeout(timer);
    let status = res.status;
    let data;
    try{
        data = await res.json();
    }catch{
        data = null
    }
   //now for err case
   if(!res.ok){
         return{
            ok : false,
            data : null,
            error : data.message || "req failed",
            status
         }
   
   }
        return {
        ok : true,
        data,
        error : null,
        status
     } 


   }catch(err){
    //err b agya to timeout hta do frzi kyu lgana
    clearTimeout(timer);
    //below block to make sure if timeout haooens then we shouldnt
    //  retry as we made api wrapper to fail if timeout occurs and manual aort is there
    const isTimeout = err.name === "AbortError";  //checks if we cancelled this req via timeout ie if err
    //  type occured due to timeout then dont retry just return and off the code
    if(isTimeout){
    return {
        ok: false,
        data: null,
        error: "Request Timeout",
        status: 0
    }
}
    if(i === retries){
        return { 
            ok : false,
            data : null,
            error : err.name  === "AbortError" ? "Timeout" : "Network Error",
            status : 0
        }
    }

   } 

}
}

export default apiRequest;