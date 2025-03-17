import {Link} from 'react-router-dom';
import styles from './Home.module.css';

function Home(){
  /* Improve authentication, this is basic 
  check expiration time or api call to check*/
  const isAuthenticated = Boolean(localStorage.getItem('access'));

  return(
    <>
      <section className={styles.intro}>
        <div>
          <h1>Welcome to Your Triathlon Tracker!</h1>
        </div>
        {!isAuthenticated &&(
          <div className={styles.linkContainer}>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </div>
        )}
        <div>
          <h2>Your Triathlon Training</h2>
          <p>Track your progress and monitor your workouts across three key disciplines:running, swimming, and cycling.</p>
        </div>
      </section>
    </>
  )
}

export default Home;