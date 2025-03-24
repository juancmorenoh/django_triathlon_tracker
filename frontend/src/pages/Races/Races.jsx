import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import styles from './Races.module.css';
import api from "../../api"

function Race() {
  const [races, setRaces] = useState([]);

  useEffect(() => {
    getRaces();
  }, []);

  const getRaces = () =>{
    api.get('tracker/races')
     .then((res) => res.data)
     .then(data => {setRaces(data), console.log(data)})
     .catch(error => alert(error));
  }

  console.log(new Date());
  //Separate PAST from FUTURE races
  const upcomingRaces = races.filter(race => new Date(race.date) > new Date());
  const pastRaces = races.filter(race => new Date(race.date) < new Date());

  return (
    <div className={styles.listContainer}>
      <div className={styles.introList}>
        <h2>Races List</h2>
        <Link className={styles.addElementLink} to="/races/new">Add New Race</Link>
      </div>
      <div className={styles.ListItemsWrapper}>
        <div>
          <h3>Upcoming Races</h3>
          {upcomingRaces.length === 0 ? (
            <div>
              <p>No upcoming races found.</p>
            </div>
          ) :(
            <ul>
              {upcomingRaces.map(race => (
                <li key={race.id}>
                  <Link to={`/races/${race.id}`}>{race.name}</Link>
                </li>
              ))}
            </ul>
          )}
          
        </div>
        <div>
          <h3>Past Races</h3>
          {pastRaces.length === 0 ? (
            <div>
              <p>No Past races found.</p>
            </div>
          ) :(
            <ul>
              {pastRaces.map(race => (
                <li key={race.id}>
                  <Link to={`/races/${race.id}`}>{race.name}</Link>
                </li>
              ))}
            </ul>
          )}
          
        </div>
      </div>
    </div>
  )
}

export default Race
