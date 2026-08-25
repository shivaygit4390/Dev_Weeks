import { useEffect, useState } from 'react'
import Loader from './components/Loader';



function App() {
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(true);
  const [Userlist, SetUserList] = useState([{name : "a"}, {name : "z"}, {name : "v"}])
//creating an effect so that we can fetch users list and assign to out userlist state
useEffect(() => {

  //added in last step - Abort Controller for cleanup
  // prevents request from continuing meaninglessly after unmount
  const controller = new AbortController();
  const {signal} = controller;

  //create a function to fetch
  const fetchUsers = async() =>{
    try{
      //handle the err and loading states
      setErr('');
      setLoading(true);
      //since we have local state for testing
      SetUserList([]);
//fetch the list and collect response 
//fetching with signal so that we can abort the process when unmounted
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {signal});  // {signal : signal} we used short hand...
    //check if response object have ok or or not
    if(!response.ok) throw new Error('Failed to fetch');

    //if not problem then collect response in json in data
    const data  = await response.json();
    //now set out list state with data ie state will be full of object arrays for each users
   SetUserList(data);
    }
    catch(err){
      //if cleaned up or aborted by us then
      if(err.name === 'AbortError') console.log('Fetch Aborted Successfully');
      // if some error occured via URL fetch
      else setErr(err.message || "Issue occured")}
    finally{
      setLoading(false);
    }
  }
  //call the function
  fetchUsers();
  return (() => {
    controller.abort();
  })
}, [])


  return (
    <>
     <div className = "bg-green-500 text-4xl">
      <b>List of Usrs from the Mock API</b>
    <hr />
    <div>
      {err ? <div>{err}</div> : null }
      {/* handle when list have 0 users */}
     {!loading && !err && Userlist.length === 0 && <div>No users found</div>}
{!loading ? Userlist.map((user) => {
  return <div key = {user.id} >{user.name}</div>
}) : <Loader/> }

    </div>
     </div>
    </>
  )
}

export default App



//Addon - If there is a race condition due to useeffect dependencies like search or querry


// =========================================
// REACT NETWORK CLEANUP & RACE CONDITIONS
// =========================================

// 1. THE PROBLEM: Race Conditions
// -----------------------------------------
// When a user triggers multiple requests rapidly (e.g., typing fast in a search bar),
// older network requests can finish AFTER newer ones due to network speeds.
// This overwrites your state with stale data and breaks the UI.

// 2. THE STRATEGY: Latest Request Wins
// -----------------------------------------
// The app must actively kill or ignore all previous pending requests 
// the exact moment a new action is taken. Only the response from 
// the absolute last request is allowed to update your state.

// 3. THE IMPLEMENTATION: Lifecycle Ordering
// -----------------------------------------
// React guarantees a strict order whenever a dependency changes:
//  CLEANUP FIRST ➔ SETUP SECOND

// • Step 1 (Cleanup): React fires the cleanup function of the PREVIOUS render.
//                     This triggers controller.abort(), killing the stale request.
// • Step 2 (Setup):   React runs the new effect block, spawning a completely 
//                     fresh AbortController and firing the brand-new fetch.

// 4.  BRAIN SNAPSHOT
// -----------------------------------------
// • Empty Array []     ➔ Runs ONLY on Unmount (User leaves the page).
// • With Dependency [X]➔ Runs on EVERY update (Kills old flight before starting new).
// =========================================
