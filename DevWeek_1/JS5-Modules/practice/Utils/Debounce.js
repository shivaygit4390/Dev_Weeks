export  const debounce = (fn, delay) =>{
     let opTimer = null; //will store the timer
    return function(...args){
         if(opTimer != null) clearTimeout(opTimer);
          opTimer = setTimeout( () => {
            // fn(...args);   //do this if dont want to preserve the this context and you r using arrow function
            //but do use apply if you want to preserve this and r usinf normal function
            fn.apply(this, args)
          } , delay);
    }

}

//this is named export 