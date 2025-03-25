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


  //Flexible function to either CREATE or UPDATE a workout
  //if workout para is passed, reuqest PUT
  const createUpdateWorkout = (e, workoutId = null) => {
    e.preventDefault();
    const url = workoutId ? `/tracker/workouts/${workoutId}/` : '/tracker/workouts/';
    const method = workoutId ? api.put : api.post;
  
    method(url, { activity_type, date, distance_m, duration, name, intensity, notes })
      .then((res) => {
        console.log(res.data);
        if ((workoutId && res.status === 200) || (!workoutId && res.status === 201)) {
          alert(workoutId ? 'Workout updated successfully' : 'Workout created successfully');
        } else {
          alert('Error saving workout');
        }
      })
      .catch((error) => alert(error));
  };
  
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
        createUpdateWorkout={createUpdateWorkout}
        selectedWorkout={selectedWorkout}
        isToUpdate={isToUpdate}
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
        <WorkoutDetails workout={selectedWorkout} clickUpdateWorkout={clickUpdateWorkout}></WorkoutDetails>
      </section>
    )}
    </>
    
    
  );
}

export default Workouts
