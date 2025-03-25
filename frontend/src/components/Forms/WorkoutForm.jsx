import React from 'react'

function WorkoutForm({
  createWorkout, 
  setActivityType, 
  setDate, 
  setDistance, 
  setDuration, 
  setName, 
  setIntensity,
  setNotes
  }){
  
  return (
    <>
    <h1>WORKOUT.JSX </h1>
    <form onSubmit={createWorkout}>
      <div>
        <label htmlFor='activity_type'>Activity Type</label>
        <select
          id='activity_type'
          name="activity_type"
          onChange={(e) => setActivityType(e.target.value)}
        >
          <option value="" disabled>Select Activity</option>
          <option value="swim">Swim</option>
          <option value="ride">Ride</option>
          <option value="run">Run</option>
        </select>
      </div>

      <div>
        <label htmlFor='distance'>Distance (m)</label>
        <input
          type="number"
          name="distance_m"
          id='distance'
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
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor='intensity'>Intensity</label>
        <select 
          name="intensity"
          id='intensity'
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
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
      </div>

      <div>
        <label htmlFor='name'>Workout Name</label>
        <input
          id='name'
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <button type="submit">Submit Workout</button>
    </form>
    </>
    
  )
}

export default WorkoutForm
