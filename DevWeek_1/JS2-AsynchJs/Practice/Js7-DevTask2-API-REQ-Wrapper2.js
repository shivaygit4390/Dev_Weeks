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




/*
  Revision purpose:
  - production-style API wrapper with timeout and retry
  - classify timeout, network error, and HTTP error separately
*/

async function apiRequest(url, options = {}, retries = 2, timeout = 5000){

for(let i = 0; i <= retries; i++){
    //1.prepare the controller
    const controller = new AbortController();
    const signal = controller.signal;
//2. Create a timer id so it can be cleared if request succeeds.
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
            // HTTP errors are not retried in this design.
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
    // Request failed, so clear timeout to avoid extra timer work.
    clearTimeout(timer);
    // Timeout should not retry in this design.
    const isTimeout = err.name === "AbortError";
    if(isTimeout){
    // Timeout returns immediately because it is treated as final failure.
    return {
        ok: false,
        data: null,
        error: "Request Timeout",
        status: 0
    }
}
    if(i === retries){
        // Final retry exhausted: return one last consistent failure object.
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
