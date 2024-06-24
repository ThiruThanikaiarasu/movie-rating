import React from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import NavbarComponent from '../NavbarComponent/NavbarComponent'
import HomeComponent from '../HomeComponent/HomeComponent'
import AddMovieComponent from '../AddMovieComponent/AddMovieComponent'
import LoginComponent from '../LoginComponent/LoginComponent'

const RouterComponent = () => {
  return (
    <Router>
        <NavbarComponent />
        <Routes>
            <Route path='/' element={<HomeComponent />} />
            <Route path='/admin/add' element={<AddMovieComponent />} />
            <Route path='/admin/login' element={<LoginComponent />} />
        </Routes>
    </Router>
  )
}

export default RouterComponent