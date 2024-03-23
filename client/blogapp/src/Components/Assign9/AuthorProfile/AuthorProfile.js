import React, { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { NewAxios } from '../NewAxios/NewAxios';
import './AuthorProfile.css'
function AuthorProfile() {
  let [followers,setFollowers] = useState(0)
  let {currentUser} = useSelector(state=>state.userAuthoruserAuthorLoginReducer)
  async function getFollowers(){
    const res =  await NewAxios.get(`http://localhost:4000/author-api/${currentUser.username}`)
    setFollowers(res.data.payload)
  }
  return (
    <div className=''>
      <div className='author-profile-container' >
      <center><div >
      <div className='navbars my-2 rounded-5 '>
        <NavLink to='/add-article' className='nav-link' ><li>Add New</li></NavLink>
      </div>
      <div className='navbars mb-2 rounded-5 ' >
      <NavLink   to={`/read-article/${currentUser.username}`}  className='nav-link' ><li >Read Articles</li></NavLink>
      </div>
      </div></center>
      <div>
        
        {
          followers===0?
          <>
          <center><button onClick={getFollowers} className='followers-button' >Followers</button></center>
          </>:
          <>
          <center><button onClick={getFollowers} className='followers-button' >Followers</button></center>
          <center><p>Currently {followers} users Subscribed you.</p></center>
          </>
        }
      </div>
      <div>
      
      </div>
      <div className='content' >
        <Outlet/>
      </div>
    </div>
    </div>
  )
}

export default AuthorProfile