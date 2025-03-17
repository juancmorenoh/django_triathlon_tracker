import React from 'react'
import {BrowserRouter,Routes, Route, NavLink, Navigate} from 'react-router-dom'
import NavBar from './components/NavBar/NavBar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

import ProtectedRoute from './components/ProtectedRoute';

function Logout(){
  localStorage.clear();
  return <Navigate to='/login' />
}

function RegisterAndLogout(){
  localStorage.clear();
  return <Register />
}

function App() {
  return (
    <>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/logout' element={<Logout />}></Route>
        <Route path='/register' element={<RegisterAndLogout />}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
