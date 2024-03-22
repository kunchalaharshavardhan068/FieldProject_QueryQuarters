import React, { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { NewAxios } from '../NewAxios/NewAxios';
// import AuthorsHeader from '../AuthorsHeader/AuthorsHeader'
function AuthorProfile() {
  let [followers,setFollowers] = useState('')
  let {currentUser} = useSelector(state=>state.userAuthoruserAuthorLoginReducer)
  async function getFollowers(){
    const res =  await NewAxios.get(`http://localhost:4000/author-api/${currentUser.username}`)
    setFollowers(res.data.payload)
  }
  return (
    <div>
      <div>
        <NavLink to='/add-article' ><li  >Add New</li></NavLink>
              <NavLink to={`/read-article/${currentUser.username}`} ><li >Read Articles</li></NavLink>
      </div>
      <div>
        <button onClick={getFollowers} >Followers</button>
        {followers}
      </div>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default AuthorProfile