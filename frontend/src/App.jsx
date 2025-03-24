import React from 'react'
import {BrowserRouter,Routes, Route, NavLink, Navigate} from 'react-router-dom'
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';

import AppRoutes from './components/AppRoutes.jsx';
import { useState, useEffect } from 'react';
import ProtectRoute from './components/ProtectedRoute.jsx';


function App() {


  return (
    <>
    <BrowserRouter>
      <NavBar />
      <AppRoutes />
      <Footer />
    </BrowserRouter>
    </>
  )
}

export default App
