import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import styles from './Goals.module.css';
import api from "../../api"


function Goals() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    getGoals();
  }, []);

  const getGoals = () =>{
    api
    .get('/tracker/goals')
    .then((res) => res.data)
    .then((data) => {setGoals(data); console.log(data);})
    .catch((err) => alert(err));
  }
  return (
    <div className={styles.listContainer}>
      <div className={styles.introList}>
        <h2>Goals List</h2>
        <Link className={styles.addElementLink} to="/goals/new">Add New Goals</Link>
      </div>
      <div className={styles.listItem}>
        {goals.length > 0 ? (
          <ul>
            {goals.map((goal) => (
              <li key={goal.id}>
                <Link to={`/goals/${goal.id}`}>{goal.goal_type}</Link>
              </li>
            ))}
          </ul>
        ):(
          <div>
            <p>No Goals Found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Goals
