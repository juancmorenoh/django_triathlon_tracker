import styles from './NavBar.module.css';
import { useState, useEffect } from 'react';
import {Link, NavLink} from 'react-router-dom';
import { useAuth } from '../../../AuthContext.jsx';

function NavBar(){
  const {isAuthenticated, handleLogout} = useAuth();

  return(
    <nav className={styles.navbar}>
      <div className={styles.titleContainer}>
        <Link to="/home" className={styles.title}>Triathlon Tracker</Link>
      </div>

      <div className={styles.menu}>
        <ul className={styles.navLinks}>
          <li><NavLink to="/profile">Profile</NavLink></li>
          <li><NavLink to="/workouts">Workouts</NavLink></li>
          <li><NavLink to="/races">Races</NavLink></li>
          <li><NavLink to="/goals">Goals</NavLink></li>
        </ul>
      </div>

      <div className={styles.rightActionButtons}>
        {/* <Link to="/logout">Logout</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link> */}
        {isAuthenticated ? (
          <Link onClick={handleLogout} to="/logout">Logout</Link>
        ):(
          <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          </>
        )} 
      </div>
    </nav>
  )
}

export default NavBar;