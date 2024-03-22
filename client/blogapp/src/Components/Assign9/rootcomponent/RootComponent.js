import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import './RootComponent.css'

function RootComponent() {
  return (
    <div className=''>
        <Header/>
        <div style={{minHeight : "85vh "}} className='px-5 '>
        <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default RootComponent