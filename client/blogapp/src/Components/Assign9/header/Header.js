import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {resetState} from  '../../../redux/slices/userAuthorslices'
import inkverseLogo from '../../../Images/inkverseLogo.jpg'
import './Header.css'
import { useAuth0 } from "@auth0/auth0-react";
function Header() {
  const { loginWithRedirect, isAuthenticated , logout } = useAuth0();
  let {loginUserStatus, currentUser } = useSelector(state=>state.userAuthoruserAuthorLoginReducer)
  let dispatch = useDispatch();
  function signout(){
    //removing the token from storage
    localStorage.removeItem('token')
    dispatch(resetState())
    console.log(currentUser.username);
  }
  return (
    <div className='header bgcHeader'>
        {/* <ul className='d-flex justify-content-end bg-dark text-light p-4  '> */}
          {loginUserStatus===false?
            <> 
            <div className='navbar bgcHeader  border-danger-subtle border-bottom-0 navComponenth'>
                <div className='navbar-brand mx-3 my-0 py-0 '>
                <img src={inkverseLogo} alt="Logo"style={{maxHeight:"10vh"}}></img>
                </div>
                <ul className='nav'>
                  {/* link to home */}
                    <li className='nav-item navComponenth'>
                    <NavLink className="nav-link   fs-5 navComponenth" to=''> Home</NavLink>
                    </li>
                  {/* link to Register */}
                    <li className='nav-item navComponenth'>
                    <NavLink className="nav-link fs-5 navComponenth" to='signup'> SignUp</NavLink>
                    </li>{/* link to Login */}
                    <li className='nav-item navComponenth'>
                    <NavLink className="nav-link fs-5 navComponenth" to='signin'> SignIn</NavLink>
                    </li>
                </ul>
            </div>
            </>: <div className='navbar bgcHeader border-danger-subtle border-bottom-0 navComponenth' >
            <div className='navbar-brand mx-3 my-0 py-0 navComponenth'>
                <img src={inkverseLogo} alt="Logo"style={{maxHeight:"10vh"}}></img>
                </div>
                <ul className='nav navComponenth' >
                <li className='nav-item navComponenth' ><NavLink to={""}  className="nav-link fs-5 navComponenth"  onClick={signout} >
                  <p className='fs-3 navComponenth' >Welcome, {currentUser.username}</p> Signout</NavLink>
                </li>
                </ul>
            </div>}
        {/* </ul> */}
    </div>
  )
}

export default Header



{/*  */}