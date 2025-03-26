export function convertToSeconds(duration) {
  const [hours, minutes, seconds] = duration.split(':').map(Number);
  return (hours * 3600) + (minutes * 60) + seconds;
}

export function convertToHHMMSS(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function filterWorkoutsByActivity(workouts,activityfilter){
  if(!activityfilter) return workouts
  return workouts.filter(workout => workout.activity_type === activityfilter)
}

export function sortWorkouts(workouts, orderType, order) {
  return [...workouts].sort((a, b) => {
    let valueA = a[orderType];
    let valueB = b[orderType];

    if (orderType === "duration") {
      valueA = convertToSeconds(a.duration);
      valueB = convertToSeconds(b.duration);
    } else if (orderType === "date") {
      valueA = new Date(a.date).getTime();
      valueB = new Date(b.date).getTime();
    } else {
      valueA = parseFloat(valueA);
      valueB = parseFloat(valueB);
    }

    return order === "asc" ? valueA - valueB : valueB - valueA;
  });
}

