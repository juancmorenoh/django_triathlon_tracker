import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import styles from './Workouts.module.css';
import api from "../../api"

function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    getWorkouts();
  }, []);

  const getWorkouts = () =>{
    /* backend url in api app */
    api
    .get('/tracker/workouts')
    .then((res) => res.data)
    .then((data) => {setWorkouts(data); console.log(data);})
    .catch((err) => alert(err));
  }
  return (
    <div className={styles.listContainer}>
      <div className={styles.introList}>
        <h2>Workout List</h2>
        <Link className={styles.addElementLink} to="/workouts/new">Add New Workout</Link>
      </div>
      <div className={styles.tableContainer}>
          
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Date</th>
              <th>Distance</th>
              <th>Duration</th>
              <th>Name</th>
              <th>Intensity</th>
            </tr>
          </thead>
          <tbody>
            {workouts.length > 0 ? (
              workouts.map((workout) => (
                <tr key={workout.id}>
                  <td>
                    <Link to={`/workouts/${workout.id}`}>
                      {workout.activity_type}
                    </Link>
                  </td>
                  <td>{workout.date}</td>
                  <td>{workout.distance_m} m</td>
                  <td>{workout.duration}</td>
                  <td>{workout.name}</td>
                  <td>{workout.intensity}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No workout found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    
  );
}

export default Workouts
