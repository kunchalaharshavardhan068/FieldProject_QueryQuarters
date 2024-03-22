import React from 'react'
import './Header.css'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {resetState} from  '../../../redux/slices/userAuthorslices'

function Header() {
  let {loginUserStatus, currentUser } = useSelector(state=>state.userAuthoruserAuthorLoginReducer)
  let dispatch = useDispatch();
  function signout(){
    //removing the token from storage
    localStorage.removeItem('token')
    dispatch(resetState())
    console.log(currentUser.username);
  }
  return (
    <div className=''>
        <ul className='d-flex justify-content-end bg-dark text-light p-4  '>
          {loginUserStatus===false?
            <> 
            <li><NavLink  to={""} >Home </NavLink></li>
            <li ><NavLink to={"signin"} >Signin</NavLink></li>
            <li><NavLink to={"signup"} >Signup</NavLink></li>
            </>: <li><NavLink to={""}  onClick={signout} ><p className='fs-3' >Welcome {currentUser.username},</p> Signout</NavLink></li>}
        </ul>
    </div>
  )
}

export default Header



{/*  */}