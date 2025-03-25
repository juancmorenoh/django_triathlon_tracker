import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import styles from './Workouts.module.css';
import api from "../../api"
import WorkoutForm from './../../components/Forms/WorkoutForm.jsx';
import WorkoutDetails from './../../components/Workout/WorkoutDetails.jsx';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  //Workoutform state
  const [activity_type, setActivityType] = useState('');
  const [date, setDate] = useState('');
  const [distance_m, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [name, setName] = useState('');
  const [intensity, setIntensity] = useState('');
  const [notes, setNotes] = useState('');

  const[isWorkoutOpen, setIsWorkoutOpen] = useState(false)
  const[selectedWorkout, setSelectedWorkout] = useState(null)

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

  //save workout form in database
  const createWorkout = (e) => {
    e.preventDefault();
    api
    .post('/tracker/workouts/', {activity_type, date, distance_m, duration, name, intensity, notes})
    .then((res) => {
      console.log(res.data)
      if (res.status == 201) alert('Success')
      else (alert('Error'))
      
    })
    .catch((error) => alert(error))
  }
  
  //Function to toggle the view of the workout
  function handleWorkoutClick(workout){
    //if selectedWorkout not null, if not null compare it to workout.id
    if (selectedWorkout?.id === workout.id) {
      setIsWorkoutOpen((prev) => !prev);
    } else {
      setSelectedWorkout(workout);
      setIsWorkoutOpen(true);
    }
  }

  return (
    <>
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
    {/* Section to create a new Workout */}
    <section className={styles.workout}>
      <WorkoutForm 
        createWorkout={createWorkout}
        setActivityType={setActivityType} 
        setDate={setDate}
        setDistance={setDistance}
        setDuration={setDuration}
        setName={setName}
        setIntensity={setIntensity}
        setNotes={setNotes}
      />
    </section>

    {/* section to see details of workout (DELETE/UPDATE) */}
    {isWorkoutOpen &&(
      <section>
        <WorkoutDetails workout={selectedWorkout}></WorkoutDetails>
      </section>
    )}
    
    </>
    
    
  );
}

export default Workouts
