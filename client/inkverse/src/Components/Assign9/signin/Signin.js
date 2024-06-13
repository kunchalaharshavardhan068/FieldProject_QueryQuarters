import { compareSync } from 'bcryptjs'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import {useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { userAuthorLoginThunk } from '../../../redux/slices/userAuthorslices';
import './Signin.css'


function Signin() {
  let [state, setState] = useState(false);
  let {register,handleSubmit,formState:{errors}}= useForm()
  let {loginUserStatus,errorOccured,errmsg,currentUser} = useSelector(state=>state.userAuthoruserAuthorLoginReducer)
  let dispatch= useDispatch();
  let navigate = useNavigate();
  let [err,setErr] = useState('');
  function handlelogin(userCred){
    dispatch(userAuthorLoginThunk(userCred))
  }
  useEffect(()=>{  
    if(loginUserStatus)
    {
      if(currentUser.usertype=== "user" ){
        navigate('/userprofile')
        }
      if(currentUser.usertype=== "author"){
        navigate('/authorprofile')
          }
         
    }},[loginUserStatus])
  return (
    <div className='background' >
      <div className='d-flex justify-content-end ' >
      <div className=' signincard rounded-2 '>
      <div className="container homePage d-flex justify-content-center align-items-center vh-100">
      <div className="container card mt-0 mb-5 p-3 loginWidth bg-body-secondary loginCard">
        <p className='fs-3 text-primary mb-4'>SignIn</p>
        <form onSubmit={handleSubmit(handlelogin)}>
          {/* radio */}
          <div className="mb-4">
            <label htmlFor="user" className="form-check-label me-3" style={{ fontSize: "1.2rem", color: "var(--light-dark-grey)" }}>
              Login as
            </label>
            <br />
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                id="author"
                value="author"
                {...register("usertype")}
              />
              <label htmlFor="author" className="form-check-label">
                Author
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                id="user"
                value="user"
                {...register("usertype")}
              />
              <label htmlFor="user" className="form-check-label">
                User
              </label>
            </div>
          </div>
          <center><p className='fs-5 text-danger' > {errmsg}</p></center>
          <div className="form-group">
            <label htmlFor='username' className="form-label">Username</label>
            <input type="text" className="form-control" id="username" {...register("username")} />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" {...register("password")} />
          </div>
          <button type="submit" className='btn btn-outline-primary mt-3 d-block mx-auto'>Login</button>
        </form>
        <div className='d-flex justify-content-center mt-3' >
        <p> NewUser! </p> <Link to={"/signup"} >Signup</Link>
        </div>
      </div>
      
      <div></div>
    </div>
    </div>
    </div>
    </div>
    
  )
  
        
}

export default Signin