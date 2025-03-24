import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import { AuthProvider } from '../AuthContext.jsx';
import AppRoutes from './components/AppRoutes.jsx';



function App() {




  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <AppRoutes />
        <Footer />
      </BrowserRouter>
    </AuthProvider>   
    </>
  )
}

export default App
