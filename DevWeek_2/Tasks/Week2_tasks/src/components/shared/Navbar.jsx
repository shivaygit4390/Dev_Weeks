
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <ol className='bg-amber-900 p-2 rounded flex flex-row gap-2 text-xl justify-center' >
        <li className='bg-white p-2 font-medium rounded-3xl ' ><Link to = '/usercard' >UserCard</Link></li>
        <li className='bg-white p-2 font-medium rounded-3xl ' ><Link to = '/themechanger' >ThemeTask</Link></li>
        <li className='bg-white p-2 font-medium rounded-3xl '><Link to = '/counter' >Counter</Link></li>  
        <li className='bg-white p-2 font-medium rounded-3xl '><Link to = '/multistep' >Multiforms</Link></li> 
        <li className='bg-white p-2 font-medium rounded-3xl '><Link to = '/login' >LoginToggle</Link></li> 
        <li className='bg-white p-2 font-medium rounded-3xl '><Link to = '/Userlist' >UserList</Link></li>
        <li className='bg-white p-2 font-medium rounded-3xl '><Link to = '/events' >Event Tracker</Link></li>  
        <li className='bg-white p-2 font-medium rounded-3xl '><Link to = '/signup' >SignUp Submit</Link></li> 
        <li className='bg-white p-2 font-medium rounded-3xl '><Link to = '/compiled' >Compiled-Tasks</Link></li> 
         
    </ol>
  )
}

export default Navbar