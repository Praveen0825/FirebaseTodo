import React from 'react'
import {useHistory} from 'react-router-dom'
import { Link } from 'react-router-dom'
import {auth} from '../firebase'

export default function NavBar({user}){
    const history = useHistory()
return (
<nav>
    <div className="nav-wrapper blue">
      <Link to="/" className="brand-logo">Todo</Link>
      <ul id="nav-mobile" className="right ">
       {
        user?
        <li>
            <button className="btn red" onClick={()=>{
                auth.signOut()
               history.push('/login')
            }}>logout</button>
        </li>
        :
        <>
        <li><Link to="/login">login</Link></li>
        <li><Link to="/signup">signup</Link></li>
        </>   
       }   
        
      </ul>
    </div>
  </nav>
        

)


}

