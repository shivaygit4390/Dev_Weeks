import React, { useState } from 'react'
import Button from './Button';

const ThemeChanger = () => {
    const [theme, setTheme] = useState('bg-white');
    const coloursArr = [{
        name:'Red',
        colourName : "bg-red-500"
    },
{
        name: 'Yellow' ,
        colourName : 'bg-yellow-500'
    },
    {
        name: 'Blue' ,
        colourName : 'bg-blue-500'
    },
    {
        name: 'Black' ,
        colourName : 'bg-black'
    },
]
  return (
 <>
 <div className = {`${theme} h-[100vh]`} >
      <div className='bg-blue-500 text-white font-extrabold text-4xl border-t-8 border-amber-950 p-4 text-center' >ThemeChanger</div>
      <div className=' p-1.5 bg-white flex justify-around' >
        {
            coloursArr.map((obj, idx) => (
                 <Button  key={idx} {...obj} event = {() => (
                    (theme == obj.colourName)? setTheme('bg-white') : setTheme(obj.colourName)
                 )} />
            ))
        }
         </div>

         
 </div>
 </>
  
  )
}

export default ThemeChanger