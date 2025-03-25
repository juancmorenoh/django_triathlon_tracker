import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.jsx';
import Profile from './../pages/Profile/Profile.jsx';
import Workouts from './../pages/Workouts/Workouts.jsx';
import Home from './../pages/Home/Home.jsx';
import Login from './../pages/Login/Login.jsx';
import Goals from './../pages/Goals/Goals.jsx';
import Races from './../pages/Races/Races.jsx';
import Register from './../pages/Register/Register.jsx';

function AppRoutes() {

  // Logout function
  function Logout() {
    localStorage.clear();
    return <Navigate to='/login' />
  }

  // Register and logout function
  function RegisterAndLogout() {
    localStorage.clear();
    return <Register />
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path='/home' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/logout' element={<Logout />} />
      <Route path='/register' element={<RegisterAndLogout />} />

      {/* Protected Routes */}
      <Route path='/workouts' element={<ProtectedRoute><Workouts /></ProtectedRoute>} />
      <Route path='/races' element={<ProtectedRoute><Races /></ProtectedRoute>} />
      <Route path='/goals' element={<ProtectedRoute><Goals /></ProtectedRoute>} />
      <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        

      {/* Catch-all Route */}
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
}

export default AppRoutes;
