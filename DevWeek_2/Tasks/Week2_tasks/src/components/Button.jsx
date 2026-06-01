import React from 'react'
const Button = ({name, colourName, event }) => {
  return (
   <button onClick={event}
    className={`p-2 text-xl text-center text-white ${colourName} rounded-md`} >{name}</button>
  )
}

export default Button