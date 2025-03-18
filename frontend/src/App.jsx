import React from 'react'
import {BrowserRouter,Routes, Route, NavLink, Navigate} from 'react-router-dom'
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Workouts from './pages/Workouts/Workouts';
import WorkoutDetails from './components/WorkoutDetails/WorkoutDetails';
import Races from './pages/Races/Races';
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
        <Route path='/home' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/logout' element={<Logout />}></Route>
        <Route path='/register' element={<RegisterAndLogout />}></Route>
        <Route path='/workouts' element={<ProtectedRoute><Workouts /></ProtectedRoute>}></Route>
        <Route path='/workouts/:id' element={<ProtectedRoute><WorkoutDetails /></ProtectedRoute>}></Route>
        <Route path='/races' element={<ProtectedRoute><Races /></ProtectedRoute>}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
    </>
  )
}

export default App
