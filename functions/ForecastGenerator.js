const generateForecast = async () => {
//  const params =  '?workoutLength=' + this.state.workoutLength
//                + '&hasUpper='      + this.state.selectedExerciseGroups.includes(exerciseGroups.UPPER)
////                + '&hasLower='      + this.state.selectedExerciseGroups.includes(exerciseGroups.LOWER)
////                + '&hasCore='       + this.state.selectedExerciseGroups.includes(exerciseGroups.CORE)
////                + '&restLevel='     + this.state.restLevel;
////  const url = 'https://x9txjb9yi5.execute-api.eu-west-1.amazonaws.com/staging/workout' + params;
//  const url = 'https://oeywaj7qa0.execute-api.us-west-2.amazonaws.com/dev/forecast'
//  const response = await fetch(url);
//  console.log(response.json());
//  const data = await response;
////  var activitiesArray = data.map(activity =>
////    {var mappedTo = new Array(activityObjectElements.NUM_ELEMENTS);
////     mappedTo[activityObjectElements.NAME] = activity.name;
////     mappedTo[activityObjectElements.DESC] = activity.description;
////     mappedTo[activityObjectElements.TIME_IN_SEC] = parseInt(activity.amountTime);
////     mappedTo[activityObjectElements.NUM_REPS] = activity.numReps;
////     mappedTo[activityObjectElements.NUM_SEC_TO_DO_REPS] = activity.numSecToDoReps;
////     mappedTo[activityObjectElements.VIDEO_URL] = activity.videoURL;
////     return mappedTo;});
//  console.log("generate forecast here")
}
module.exports = {
  generateForecast
}