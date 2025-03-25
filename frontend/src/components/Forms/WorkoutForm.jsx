import {useEffect,useState} from 'react'
import api from "../../api"
//To update workout component after creating/updating,
//pass workout state and set it to [...=>]
  
function WorkoutForm({selectedWorkout,isToUpdate}){
  //Workoutform state
    const [activity_type, setActivityType] = useState('');
    const [date, setDate] = useState('');
    const [distance_m, setDistance] = useState('');
    const [duration, setDuration] = useState('');
    const [name, setName] = useState('');
    const [intensity, setIntensity] = useState('');
    const [notes, setNotes] = useState('');

  //If workout is to update, set the field value to selectedWorkout[fields]
  useEffect(() => {
    if (isToUpdate && selectedWorkout) {
      setActivityType(selectedWorkout.activity_type);
      setDate(selectedWorkout.date);
      setDistance(selectedWorkout.distance_m);
      setDuration(selectedWorkout.duration);
      setName(selectedWorkout.name);
      setIntensity(selectedWorkout.intensity);
      setNotes(selectedWorkout.notes);
    }
  }, [isToUpdate, selectedWorkout]);

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

  //Select CREATE or UPDATE api function
  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (isToUpdate && selectedWorkout) {
      createUpdateWorkout(e, selectedWorkout.id);
    } else {
      createUpdateWorkout(e);
    }
  };

  //set correct value for update fields, set empty for new form
  const getValue = (fieldName) => {
    return isToUpdate && selectedWorkout ? selectedWorkout[fieldName] : '';
  }

  return (
    <>
    <h1>WORKOUT.JSX </h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='activity_type'>Activity Type</label>
        <select
          id='activity_type'
          name="activity_type"
          value={activity_type}
          onChange={(e) => setActivityType(e.target.value)}
        >
          <option value="">Select Activity</option>
          <option value="swim">Swim</option>
          <option value="ride">Ride</option>
          <option value="run">Run</option>
        </select>
      </div>

      <div>
        <label htmlFor='distance_m'>Distance (m)</label>
        <input
          type="number"
          name="distance_m"
          id='distance_m'
          value={distance_m}
          onChange={(e) => setDistance(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor='duration'>Duration (hh:mm:ss)</label>
        <input
          type="text"
          id='duration'
          name="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="e.g. 01:30:00"
          required
        />
      </div>

      <div>
        <label htmlFor='date'>Date</label>
        <input
          type="date"
          name="date"
          id='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor='intensity'>Intensity</label>
        <select 
          name="intensity"
          id='intensity'
          value={intensity}
          onChange={(e) => setIntensity(e.target.value)}
        >
          <option value="">Select Intensity</option>
          <option value="1">Very Low</option>
          <option value="2">Low</option>
          <option value="3">Medium</option>
          <option value="4">High</option>
          <option value="5">Very High</option>
        </select>
      </div>

      <div>
        <label htmlFor='notes'>Notes</label>
        <textarea
          name="notes"
          id='notes'
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
      </div>

      <div>
        <label htmlFor='name'>Workout Name</label>
        <input
          id='name'
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <button type="submit">{isToUpdate&&selectedWorkout ? 'Update Workout' : 'Create Workout'}</button>
      
    </form>
    </>
    
  )
}

export default WorkoutForm
