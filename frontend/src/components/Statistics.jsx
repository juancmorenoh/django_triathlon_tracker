import {useState} from 'react'
import {convertToSeconds,convertToHHMMSS} from './../utils.js';

function Statistics({workouts,activityfilter}) {
  const[selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  function filterWorkouts(){
    return workouts.filter(workout => workout.activity_type === activityfilter)
  }

  const filteredWorkouts = filterWorkouts()
  console.log(filteredWorkouts)
  
  function calculateWorkoutStats(workouts, yearFilter) {
    const now = new Date();
    const fourWeeksAgo = new Date();
    fourWeeksAgo.setDate(now.getDate() - 28);
  
    // Initialize stats object
    const stats = {
      totalActivities: 0,
      totalDistance: 0,
      totalTime: 0,
      last4Weeks: { activities: 0, totalDistance: 0, totalTime: 0 },
      yearly: { activities: 0, totalDistance: 0, totalTime: 0 },
      longestDistance: null,
      longestTime: null
    };
  
    // Iterate through the workouts
    workouts.forEach(workout => {
      const durationS = convertToSeconds(workout.duration)
      const workoutDate = new Date(workout.date);
      const year = workoutDate.getFullYear();
  
      // All-time totals
      stats.totalActivities++;
      stats.totalDistance += workout.distance_m
      stats.totalTime += durationS;
  
      //Last 4 weeks
      if (workoutDate >= fourWeeksAgo) {
        stats.last4Weeks.activities++;
        stats.last4Weeks.totalDistance += workout.distance_m;
        stats.last4Weeks.totalTime += durationS;
      }
  
      //Yearly totals
      if (year === yearFilter) {
        stats.yearly.activities++;
        stats.yearly.totalDistance += workout.distance_m;
        stats.yearly.totalTime += durationS;
      }
  
      // Longest distance
      if (!stats.longestDistance || workout.distance_m > stats.longestDistance.distance_m) {
        stats.longestDistance = { ...workout };
      }
  
      // Longest time
      if (!stats.longestTime || durationS > convertToSeconds(stats.longestTime.duration)) {
        stats.longestTime = { ...workout };
      }
    });
  
    // Calculate averages for last 4 weeks
    if (stats.last4Weeks.activities > 0) {
      stats.last4Weeks.avgDistance = stats.last4Weeks.totalDistance / stats.last4Weeks.activities;
      stats.last4Weeks.avgTime = stats.last4Weeks.totalTime / stats.last4Weeks.activities;
    } else {
      stats.last4Weeks.avgDistance = 0;
      stats.last4Weeks.avgTime = 0;
    }
    stats.totalTime = convertToHHMMSS(stats.totalTime)
    stats.yearly.totalTime = convertToHHMMSS(stats.yearly.totalTime)
    if(stats.last4Weeks.totalTime)stats.last4Weeks.totalTime = convertToHHMMSS(stats.last4Weeks.totalTime)
    return stats;
  }

  const stats = calculateWorkoutStats(filteredWorkouts,selectedYear)

  // Generate a list of years based on the workouts data
  const allYears = [...new Set(workouts.map(workout => new Date(workout.date).getFullYear()))];
  return (
    <div className="statistics">
      <h2>Workout Statistics</h2>

      <div className="stat-group">
        <h3>All time</h3>
        <p><strong>Total Activities:</strong> {stats.totalActivities}</p>
        <p><strong>Total Distance (m):</strong> {stats.totalDistance} meters</p>
        <p><strong>Total Time:</strong> {stats.totalTime}</p>
      </div>
      <hr />
      <div className="stat-group">
        <h3>Last 4 Weeks</h3>
        <p><strong>Activities:</strong> {stats.last4Weeks.activities}</p>
        <p><strong>Total Distance (m):</strong> {stats.last4Weeks.totalDistance} meters</p>
        <p><strong>Total Time:</strong> {stats.last4Weeks.totalTime}</p>
        <p><strong>Average Distance:</strong> {stats.last4Weeks.avgDistance.toFixed(2)} meters</p>
        <p><strong>Average Time:</strong> {stats.last4Weeks.avgTime}</p>
      </div>
      <hr />
      <div className="stat-group">
        <h3>Yearly Stats ({selectedYear})</h3>
        <label htmlFor="yearSelect">Select Year:</label>
        <select
          id="yearSelect"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {allYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <p><strong>Activities:</strong> {stats.yearly.activities}</p>
        <p><strong>Total Distance (m):</strong> {stats.yearly.totalDistance} meters</p>
        <p><strong>Total Time:</strong> {stats.yearly.totalTime}</p>
      </div>
      <hr />
      <div className="stat-group">
        <h3>Longest Workout</h3>
        <p><strong>Longest Distance:</strong> {stats.longestDistance ? stats.longestDistance.distance_m : 'N/A'} meters</p>
        <p><strong>Longest Time:</strong> {stats.longestTime ? stats.longestTime.duration : 'N/A'}</p>
      </div>
    </div>
  )
}

export default Statistics
