// MINI TASK 3 — API REQUEST WRAPPER (PROBLEM STATEMENT)
// Objective

// Design a reusable function that standardizes how your application makes HTTP API requests.

// You must ensure:

// consistent response format
// proper error handling
// production-level reliability features (timeout + retry)
// PART 1 — CORE REQUIREMENT
// Implement a function:
// apiRequest(url, options?)
// Behavior:

// This function should:

// Make an HTTP request using fetch
// Handle all success and failure cases
// Always return a consistent object shape
// REQUIRED RETURN FORMAT

// Regardless of success or failure, the function must return:

// {
//   ok: boolean,
//   data: any,
//   error: string | null,
//   status: number
// }
// RULES (MANDATORY)
// 1. Handle successful responses

// If response status is 2xx:

// ok: true
// data: parsed JSON
// error: null
// 2. Handle non-2xx responses (VERY IMPORTANT)

// If response status is NOT 2xx:

// Do NOT treat as success
// Extract error message (if possible)
// Return:
// {
//   ok: false,
//   data: null,
//   error: "error message",
//   status: response.status
// }
// 3. Handle network failures

// Examples:

// no internet
// DNS failure
// request blocked

// Return:

// {
//   ok: false,
//   data: null,
//   error: "Network Error",
//   status: 0
// }


async function apiRequest(url, options = {}){
    try{
        let res = await fetch(url, options);

        let status = res.status;

        let data;
//try catch req to frtch data as data might be come like empty page
        try{
            //parsing data to json takes time so use await
            data = await res.json();
        }catch(err){
           data = null;
        }
        if(!res.ok){
            return{
                ok : false,
                data : null,
                error : data || "request failed",
                status
            }
        }
         //if res.ok true
            return{
                ok : true,
                 data,
                 error : null,
                 status
            }
    }
    catch(err){
   return {
         ok : false,
     data : null,
     error : err.message,
     status : 0
   }
    }
}