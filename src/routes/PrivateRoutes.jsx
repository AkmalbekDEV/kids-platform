import React from 'react'
import Sidebar from '../components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Logo from '../assets/logo.png'
import Navbar from '../components/Navbar'
import Books from '../pages/Books'
import Movies from '../pages/Movies'
import TestShowPage from '../pages/Tests'
import ResultsPage from '../pages/Results'

const PrivateRoutes = () => {
  return (
    <div className='flex items-center w-full h-screen bg-[#F0F7FF] dark:bg-[#252836]'>
      <Sidebar />
      <div className='w-[80%] max-lg:w-full h-screen'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/books/qwertyBooks' element={<Books />} />
          <Route path='/movies/qwertyMovies' element={<Movies />} />
          <Route path='/tests/qwertyTests' element={<TestShowPage />} />
          <Route path='/results/qwertyResults' element={<ResultsPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default PrivateRoutes