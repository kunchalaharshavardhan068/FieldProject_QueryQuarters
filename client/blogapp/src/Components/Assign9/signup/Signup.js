import { hashSync } from 'bcryptjs'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'


function Signup() {
  let [state, setState] = useState(false);
  let { register, handleSubmit, formState: { errors } } = useForm()
  let navigate = useNavigate()
  let [err,setErr] = useState('')


async function onhandle(obj) {
  // console.log(obj);
  // axios is used to send http request
  
    if(obj.usertype==='user')
    {
      let res = await axios.post('http://localhost:4000/user-api/user',obj);
    // console.log(res.data.message);
    if(res.data.message==='Usercreated')
    {
      navigate('/signin');
      // console.log("user created");
    }
    else {
      // console.log('error occured');
      setErr(res.data.message)

    }
    }
    else{
      let res = await axios.post('http://localhost:4000/author-api/author',obj);
    // console.log(res.data.message);
    if(res.data.message==='Authorregistered')
    {
      navigate('/signin');
      // console.log("user created");
    }
    else {
      // console.log('error occured');
      setErr(res.data.message)

    }

    }


  }
  return (
    <div>
      <center><form onSubmit={handleSubmit(onhandle)} className='w-50 mt-5 '>
        <h2 className='m-4' >Registration Form</h2>
        
        <div className='d-flex justify-content-center border-black   ' >
        <h5 className='mx-4' >Register as</h5>
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
        <label htmlFor='username' className='form-label d-flex  ' >Username</label>
        <input type='text' id='username' {...register("username", { required: true })} className='form-control mb-4' ></input>
        {err.length!==0 && <p className='text-danger'>{err}</p>}
        {errors.username?.type === 'required' && <p className="text-danger">*Enter the Username</p>}
        <label htmlFor='password' className='form-label d-flex' >Password</label>
        <input type='password' id='password' {...register("password", { required: true})} className='form-control mb-4' ></input>
        {errors.password?.type === 'required' && <p className="text-danger">*Enter the Password</p>}
        {/* {errors.password?.type === 'minlength' && <p className="text-danger">*Minimum length should be 8</p>} */}
        <label htmlFor='email' className='form-label d-flex  ' >Email</label>
        <input type='email' id='email' {...register("email", { required: true })} className='form-control mb-4' ></input>
        {errors.email?.type === 'required' && <p className="text-danger">*Enter the Email</p>}
        <button type='submit' className='btn btn-success '>Register</button>
      </form></center>
      <div className='d-flex justify-content-center mt-5' >
        <p> AlreadyRegistered! </p> <Link to={"/signin"} >Signin</Link>
      </div>
    </div>
  )
}

export default Signup