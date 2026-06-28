/*
  Task objective:
  - keep API request logic in one reusable module
  - export a shared request helper instead of rewriting fetch logic everywhere

  Revision purpose:
  - reusable API wrapper moved into a module
  - same async logic, now importable from other files
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
            // Keep output shape consistent for whichever file imports this utility.
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
    // Request failed, so clear timeout to avoid leaving extra timer work running.
    clearTimeout(timer);
    // Timeout should not retry in this design.
    const isTimeout = err.name === "AbortError";
    if(isTimeout){
    // Timeout is treated as a final failure in this wrapper design.
    return {
        ok: false,
        data: null,
        error: "Request Timeout",
        status: 0
    }
}
    if(i === retries){
        // Retries exhausted: return one last standardized failure object.
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
