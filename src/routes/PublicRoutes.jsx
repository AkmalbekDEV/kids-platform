import React from 'react'
import Login from '../Auth/Login'
import { Route, Routes } from 'react-router-dom'
// import Register from '../Auth/Register'

const PublicRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Login />} />
        </Routes>
    </div>
  )
}

export default PublicRoutes