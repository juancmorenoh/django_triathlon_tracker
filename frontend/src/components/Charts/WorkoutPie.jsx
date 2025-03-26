import {Chart as ChartJS} from 'chart.js/auto'
import {Pie} from 'react-chartjs-2';
import './../../styles/chart.css';
import {convertToSeconds} from './../../utils.js';

function WorkoutPie({workouts,isDuration}) {

  const activities = ['Swim', 'Run', 'Ride'];
  const counts = activities.map(activity => ({ activity, quantity: 0, durationS: 0 }));

  workouts.forEach(workout => {
    const durationSeconds = convertToSeconds(workout.duration)
    if (workout.activity_type === 'swim'){
      counts[0].quantity += 1;
      counts[0].durationS += durationSeconds;
    }
    if (workout.activity_type === 'run'){
      counts[1].quantity += 1;
      counts[1].durationS += durationSeconds;
    }
    if (workout.activity_type === 'ride'){
      counts[2].quantity += 1;
      counts[2].durationS += durationSeconds;
    }
  });
  
  if (!workouts || workouts.length === 0) return <p>No workouts available</p>;
  return (
    <>
    {isDuration? (
      <div className='pie-char-workout'>
      <Pie
        data={{
          labels: counts.map(count => count.activity),
          datasets: [{
            label: 'Workout Time in minutes',
            display:true,
            data: counts.map(count => count.durationS),
            backgroundColor: ['rgba(87, 194, 0, 0.8)', 'rgba(38, 0, 253, 0.8)', 'rgba(255, 206, 86, 0.8)'],
          }],
        }}
      />
    </div>
    ):(
      <div className='pie-char-workout'>
      <Pie
        data={{
          labels: counts.map(count => count.activity),
          datasets: [{
            label: 'Workout Quantity',
            display:true,
            data: counts.map(count => count.quantity),
            backgroundColor: ['rgba(87, 194, 0, 0.8)', 'rgba(38, 0, 253, 0.8)', 'rgba(255, 206, 86, 0.8)'],
          }],
        }}
      />
    </div>
    )}
    
    
    </>
  )
}

export default WorkoutPie
