import { useState } from 'react'
import UiCard from './components/UiCard'
import ThemeChanger from './components/ThemeChanger';


function App() {
  const users = [
    {
      id: 1,
      name: "Nirmal",
      email: "nirmal@example.com",
      role: "Frontend Developer",
      city: "Delhi",
      isOnline: true,
      bio: "Likes building UI."
    },
    {
      id: 2,
      name: "Aman",
      email: "aman@example.com",
      role: "Backend Developer",
      city: "Lucknow",
      isOnline: false,
      bio: "Enjoys APIs and databases."
    }
  ];

  return (
    <>
  <h2 className=" font-bold bg-amber-800 text-3xl text-white text-center p-6">Hi this is supposed to be the home section where you will be puting your reusable components.</h2>
  <div>
    {
      users.map((user) =>{
    return <UiCard key={user.id} {...user} />
      })
    }
  {/* just to show how we pass directly values to a reusable components */}
    <UiCard id = {01} name = {"hello"} email = "nothing" role = "BE" city = "city" isOnline = {false}  />
  </div>
  <ThemeChanger/>
    </>
    
  )
}

export default App
