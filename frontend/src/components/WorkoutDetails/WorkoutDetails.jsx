import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../api"

function WorkoutDetails() {
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);

  useEffect(() => {
    getWorkoutDetail();
  }, [id]);

  const getWorkoutDetail = () => {
    api
      .get(`/api/workouts/${id}/`)
      .then((res) => res.data)
      .then((data) => {setWorkout(data); console.log(data);})
      .catch((err) => alert("Workout not found"));
  };

  if (!workout) return <p>Loading...</p>;

  return (
    <div>
      <h2>Workout Detail</h2>
      <p><strong>Type:</strong> {workout.activity_type}</p>
      <p><strong>Date:</strong> {workout.date}</p>
      <p><strong>Distance:</strong> {workout.distance_m} m</p>
      <p><strong>Duration:</strong> {workout.duration}</p>
      <p><strong>Name:</strong> {workout.name}</p>
      <p><strong>Intensity:</strong> {workout.intensity}</p>
    </div>
  );
}

export default WorkoutDetails;
