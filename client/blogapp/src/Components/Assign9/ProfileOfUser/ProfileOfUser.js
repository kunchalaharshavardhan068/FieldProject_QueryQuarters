import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function ProfileOfUser() {
  return (
    <div>
      <NavLink to={'/articles'} >Articles</NavLink>
    </div>
  )
}

export default ProfileOfUser