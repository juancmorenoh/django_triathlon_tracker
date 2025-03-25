import { useLocation,useNavigate } from "react-router-dom";
import { useState, useEffect} from "react";
import api from "../../api"

function WorkoutDetails({workout}) {

  if (!workout) {
    return <div>No workout data found!</div>;
  }else{
    console.log(workout)
  }

  //Function to delete workout
  function deleteWorkout(id){
    api
      .delete(`/tracker/workouts/${id}/`)
      .then((res) => {
        if(res.status === 204) {
          alert('Workout deleted successfully');
        }
        else alert('Failed to delete Workout');   
      })
      .catch((err) => alert(err));
  }

  return (
    <>
    <h1>WORKOUTDETAILS.JSX</h1>
    <div>
      <h2>Workout Detail</h2>
      <p><strong>Type:</strong> {workout.activity_type}</p>
      <p><strong>Date:</strong> {workout.date}</p>
      <p><strong>Distance:</strong> {workout.distance_m} m</p>
      <p><strong>Duration:</strong> {workout.duration}</p>
      <p><strong>Name:</strong> {workout.name}</p>
      <p><strong>Intensity:</strong> {workout.intensity}</p>
      <button onClick={() => deleteWorkout(workout.id)}>Delete Workout</button>
    </div>
    </>
  );
}

export default WorkoutDetails;
