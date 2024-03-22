import { compareSync } from 'bcryptjs'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import {useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { userAuthorLoginThunk } from '../../../redux/slices/userAuthorslices';


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
    <div>
        <center><form onSubmit={handleSubmit(handlelogin)} className='w-50 mt-5' >
            <h2>Signin</h2>
            <div className='d-flex justify-content-center border-black' >
        <h5 className='mx-4' >SignIn as</h5>
        <div>
        <div className='form-check form-check-inline'>
          <label htmlFor='user' className='form-check-label ' >User</label>
          <input id='user' type='radio' className='form-check-input' value="user" {...register("usertype", { disabled: state })} />
        </div>
        <div className='form-check form-check-inline'>
          <label htmlFor='author' className='form-check-label ' >Author</label>
          <input id='author' type='radio' className='form-check-input' value="author" {...register("usertype", { disabled: state })} />
        </div>
        </div>
        </div>
        <center><p className='fs-5 text-danger' > {errmsg}</p></center>
            <label htmlFor='username' className='form-label d-flex  ' >Username</label>
            <input type='text' id='username' className='form-control mb-4' {...register("username",{required:true})}  ></input>
            {errors.username?.type === 'required' && <p className="text-danger">*Enter the Username</p>}
            <label htmlFor='password' className='form-label d-flex' >Password</label>
            <input type='password' id='password'{...register("password",{required:true})} className='form-control mb-4' ></input>
            {errors.password?.type === 'required' && <p className="text-danger">*Enter the Password</p>}
            
            <button className='btn btn-success '>Signin</button>
        </form></center>
        <div className='d-flex justify-content-center mt-5' >
        <p> NewUser! </p> <Link to={"/signup"} >Signup</Link>
        </div>
    </div>
  )
}

export default Signin