import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import styles from './Workouts.module.css';
import api from "../../api"

function Workout() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    getWorkouts();
  }, []);

  const getWorkouts = () =>{
    /* backend url in api app */
    api
    .get('/api/workouts')
    .then((res) => res.data)
    .then((data) => {setWorkouts(data); console.log(data);})
    .catch((err) => alert(err));
  }
  return (
    <div className={styles.workoutListContainer}>
      <h2>Workout List</h2>
      <div>
        <Link to="/workouts/new">Add New Workout</Link>
      </div>
      <div className="workout-table">
          
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

export default Workout
