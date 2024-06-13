import { hashSync } from 'bcryptjs'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'
import './Signup.css'


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
    <div className='background' >
      <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card rounded-2  p-4 w-50 bg-body-secondary loginCard">
        <p className='fs-3 text-primary '>SignUp</p>
        <form onSubmit={handleSubmit(onhandle)} className='' >
          <div className="mb-4">
            <label htmlFor="user" className="form-check-label me-3" style={{ fontSize: "1.2rem", color: "var(--light-dark-grey)" }}>
              Register as
            </label>
            <br></br>
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
          {err.length!==0 && <p className='text-danger'>{err}</p>}
          <div className="form-group">
            <label htmlFor='username' className="form-label">Username</label>
            <input type="text" className="form-control" id="username" {...register("username")} />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" {...register("password")} />
          </div>
          <div className="form-group">
            <label htmlFor="email" className='form-label'>Email</label>
            <input type='email' className='form-control' id="email" {...register("email")} />
          </div>
          <button type="submit" className='btn btn-outline-primary mt-3 d-block mx-auto'>Signup</button>
          <div className='d-flex justify-content-center mt-3' >
          <p> AlreadyRegistered! </p> <Link to={"/signin"} >Signin</Link>
        </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Signup
