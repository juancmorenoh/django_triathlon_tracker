import styles from './NavBar.module.css';
import {Link} from 'react-router-dom';

function NavBar(){
  return(
    <nav className={styles.navbar}>
      <div>
        <Link to="/home" className={styles.title}>Triathlon Tracker</Link>
      </div>

      <div className={styles.menu}>
        <ul className={styles.navLinks}>
          <li><a href="#">Profile</a></li>
          <li><a href="#">Workouts</a></li>
          <li><a href="#">Races</a></li>
          <li><a href="#">Goals</a></li>
        </ul>
      </div>

      <div>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/logout">Logout</Link>
      </div>
      
    </nav>
  )
}

export default NavBar;