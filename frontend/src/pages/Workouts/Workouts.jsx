import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import styles from './Workouts.module.css';
import api from "../../api"
import WorkoutForm from './../../components/Forms/WorkoutForm.jsx';
import WorkoutDetails from './../../components/Workout/WorkoutDetails.jsx';
import WorkoutPie from './../../components/Charts/WorkoutPie.jsx';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  const[isWorkoutOpen, setIsWorkoutOpen] = useState(false)
  const[selectedWorkout, setSelectedWorkout] = useState(null)
  const[isToUpdate, setIsToUpdate] = useState(false)

  useEffect(() => {
    getWorkouts();
  }, []);

  //get all workouts from api
  const getWorkouts = () =>{
    //Fetch data from api
    api
    .get('/tracker/workouts/')
    .then((res) => res.data)
    .then((data) => {setWorkouts(data); console.log(data);})
    .catch((error) => alert(error));
  }


  
  //function passed to workoutdetail component to set update status
  function clickUpdateWorkout(){
    setIsToUpdate(prev=>!prev)
  }

  //Function to toggle the view of the workout
  function handleWorkoutClick(workout){
    //if selectedWorkout not null, if not null compare it to workout.id
    if (selectedWorkout?.id === workout.id) {
      setIsWorkoutOpen((prev) => !prev);
      setIsToUpdate(false)
    } else {
      setSelectedWorkout(workout);
      setIsWorkoutOpen(true);
      setIsToUpdate(false)
    }
  }

  return (
    <>
    <h1>WORKOUTS.JSX</h1>
    <div className={styles.listContainer}>    
      <div className={styles.introList}>
        <h2>Workout List</h2>
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
                <>
                <tr key={workout.id} 
                    onClick={()=>handleWorkoutClick(workout)}>
                      {console.log(isWorkoutOpen)}
                  <td>               
                    {workout.activity_type}   
                  </td>
                  <td>{workout.date}</td>
                  <td>{workout.distance_m} m</td>
                  <td>{workout.duration}</td>
                  <td>{workout.name}</td>
                  <td>{workout.intensity}</td>
                </tr>
                </>
      
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
    {/* Section to create or update a Workout */}
    <section className={styles.workout}>
      <WorkoutForm 
        selectedWorkout={selectedWorkout}
        isToUpdate={isToUpdate}
      />
    </section>

    {/* section to see details of workout (DELETE/UPDATE) */}
    {isWorkoutOpen &&(
      <section>
        <WorkoutDetails workout={selectedWorkout} clickUpdateWorkout={clickUpdateWorkout}></WorkoutDetails>
      </section>
    )}

    {/* section for charts */}
    <section>
      {/* <WorkoutPie workouts={workouts}></WorkoutPie> */}
    </section>
    </>
    
    
  );
}

export default Workouts
