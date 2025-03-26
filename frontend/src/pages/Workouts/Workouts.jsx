import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import styles from './Workouts.module.css';
import api from "../../api"
import WorkoutForm from './../../components/Forms/WorkoutForm.jsx';
import WorkoutDetails from './../../components/Workout/WorkoutDetails.jsx';
import WorkoutPie from './../../components/Charts/WorkoutPie.jsx';
import Statistics from './../../components/Statistics.jsx';
import {filterWorkoutsByActivity, sortWorkouts} from './../../utils.js';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  const[isWorkoutOpen, setIsWorkoutOpen] = useState(false)
  const[selectedWorkout, setSelectedWorkout] = useState(null)
  const[isToUpdate, setIsToUpdate] = useState(false)

  const[isDuration, setDuration] = useState(false)

  const[activityFilter, setActivityFilter] = useState("");
  const[order, setOrder] = useState("desc");
  const[filterOrder,setFilterOrder] = useState("duration")
  const[searchText, setSearchText] = useState("");


  // Filter workouts by activity
  let filteredWorkouts = filterWorkoutsByActivity(workouts, activityFilter);
  //if search text not empty  search text is contained in
  if (searchText !== "") {
    filteredWorkouts = filteredWorkouts.filter(workout =>
      Object.values(workout).some(value =>
        value.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }

  // Sort the filtered workouts by whatever filterOrder is(date,distance,duration)
  // and what order, ascending or descending
  const orderedWorkouts = sortWorkouts(filteredWorkouts, filterOrder, order);


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
  //inside workout details
  function clickUpdateWorkout(){
    setIsToUpdate(prev=>!prev)
  }

  //Function to toggle the view of the workout details
  //by clicking on the table
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

  //function to set order to either asc or desc
  function toggleOrder(){
    setOrder((prev)=>prev === 'asc'? 'desc' : 'asc');
  }

  return (
    <>
    <h1>WORKOUTS.JSX</h1>
    <div className={styles.listContainer}>    
      <div className={styles.introList}>
        <h2>Workout List</h2>
      </div>
      <div className={styles.tableContainer}>
        <input
          type="text"
          placeholder="Search workouts..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {/* could create reusable component, also used in statistics component V */}
        <button onClick={()=>setActivityFilter("")}>All</button>
        <button onClick={()=>setActivityFilter("run")}>Run</button>
        <button onClick={()=>setActivityFilter("ride")}>Ride</button>
        <button onClick={()=>setActivityFilter("swim")}>Swim</button>
        {order == "asc" ? (
          <button onClick={toggleOrder}>Descending</button>
        ):(
          <button onClick={toggleOrder}>Ascending</button>
        )}

        <label htmlFor="filter-order"></label>
        <select id="filter-order" value={filterOrder} onChange={(e) => setFilterOrder(e.target.value)}>
          <option value="date">Date</option>
          <option value="duration">Duration</option>
          <option value="distance_m">Distance</option>
        </select>

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
            {orderedWorkouts.length > 0 ? (
              orderedWorkouts.map((workout) => ( 
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
      <WorkoutPie workouts={workouts} isDuration={isDuration}></WorkoutPie>
      {/* make it a slide button */}
      <button onClick={()=>setDuration(prev=>!prev)}>Duration/Quantity</button>
    </section>

    {/* section for statistics */}
    <section>
      <Statistics workouts={workouts}/>
    </section>
    </>
    
    
  );
}

export default Workouts
