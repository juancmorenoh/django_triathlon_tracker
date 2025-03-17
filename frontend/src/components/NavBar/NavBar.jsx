import styles from './NavBar.module.css';
import { useState, useEffect } from 'react';
import {Link, NavLink} from 'react-router-dom';

function NavBar(){
  /* const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = Boolean(localStorage.getItem('access'));;
    setIsAuthenticated(token);
  }, []); */

  return(
    <nav className={styles.navbar}>
      <div className={styles.titleContainer}>
        <Link to="/home" className={styles.title}>Triathlon Tracker</Link>
      </div>

      <div className={styles.menu}>
        <ul className={styles.navLinks}>
          <li><NavLink href="#">Profile</NavLink></li>
          <li><NavLink to="/workouts">Workouts</NavLink></li>
          <li><a href="#">Races</a></li>
          <li><a href="#">Goals</a></li>
        </ul>
      </div>

      <div className={styles.rightActionButtons}>
        <Link to="/logout">Logout</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        {/* {isAuthenticated ? (
          <Link to="/logout">Logout</Link>
        ):(
          <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          </>
        )} */}
      </div>
    </nav>
  )
}

export default NavBar;