import Compiledtasks from './components/shared/Compiled-tasks'

import {  Route, Routes } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Home from './components/shared/Home'
import UserCard from './Tasks/01-user-card/UserCard'
import ThemeChanger from './Tasks/02-theme-changer/ThemeChanger'
import CounterConstraints from './Tasks/03-counter-constraints/CounterConstraints'
import MultiStepForm from './Tasks/04-multi-step-form/MultiStepForm'
import LoginToggle from './Tasks/05-login-toggle/LoginToggle'
import UserList from './Tasks/06-user-list/UserList'
import EventTracker from './Tasks/07-EventTracker/EventTracker'
import SignUp from './Tasks/08-SignUpForm/SignUp'
function App() {
  // Keep sample data close to the task that consumes it.
  // This helps revision because you can instantly see:
  // 1. what shape the props have
  // 2. how list rendering works
  const users = [
    {
      id: 1,
      name: 'Nirmal',
      email: 'nirmal@example.com',
      role: 'Frontend Developer',
      city: 'Delhi',
      isOnline: true,
      bio: 'Likes building UI.',
    },
    {
      id: 2,
      name: 'Aman',
      email: 'aman@example.com',
      role: 'Backend Developer',
      city: 'Lucknow',
      isOnline: false,
      bio: 'Enjoys APIs and databases.',
    },
  ]

  return (
    <main className="space-y-10 p-6">
    <Navbar/>
     <Routes>
      <Route path='/' element = {<Home/>} />
       <Route path='/usercard' element = {<div>
        {
          users.map((user) => (
                 <UserCard key={user.id} {...user}  />
          ))
        }
          {/* One direct hardcoded usage is useful for revision:
              it reminds you that reusable components work with any valid props. */}
          <UserCard
            id={3}
            name="Hello"
            email="nothing@example.com"
            role="BE"
            city="City"
            isOnline={false}
            bio="This card is rendered directly to revise props passing."
          />
       </div>} ></Route>
       <Route path='/themechanger' element = {<ThemeChanger/>} ></Route>
       <Route path='/counter' element = {<CounterConstraints/>} ></Route>
       <Route path='/multistep' element = {<MultiStepForm/>} ></Route>
       <Route path='/login' element = {<LoginToggle/>} ></Route>
       <Route path='/Userlist' element = {<UserList/>} ></Route>
       <Route path='/events' element = {<EventTracker/>} ></Route>
       <Route path='/signup' element = {<SignUp/>} ></Route>
  <Route path='/compiled' element = {<Compiledtasks/>} ></Route>
</Routes>
    </main>
  )
}

export default App
