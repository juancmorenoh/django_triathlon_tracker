import React from 'react'
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

  //Separate PAST from FUTURE races
  const upcomingRaces = races.filter(race => new Date(race.date > new Date()));
  const pastRaces = races.filter(race => new Date(race.date < new Date()));

  return (
    <div className={styles.listContainer}>
      <div className={styles.introList}>
        <h2>Races List</h2>
        <Link className={styles.addElementLink} to="/races/new">Add New Race</Link>
      </div>
      <div className={styles.ListItemsWrapper}>
        <div>
          <h3>Upcoming Races</h3>
          {upcomingRaces.map(race => (
            <div key={race.id}>
              <Link to={`/races/${race.id}`}>{race.name}</Link>
            </div>
          ))}
        </div>
        <div>
          <h3>Past Races</h3>
          {pastRaces.map(race => (
            <div key={race.id}>
              <Link to={`/races/${race.id}`}>{race.name}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Race
