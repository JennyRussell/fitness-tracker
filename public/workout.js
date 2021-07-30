async function initExercise() {
  const lastExercise = await API.getLastExercise();
  console.log("Last exercise:", lastExercise);
  if (lastExercise) {
    document
      .querySelector("a[href='/exercise?']")
      .setAttribute("href", `/exercise?id=${lastExercise._id}`);

    const exerciseSummary = {
      date: formatDate(lastExercise.day),
      totalDuration: lastExercise.totalDuration,
      numExercises: lastExercise.exercises.length,
      ...tallyExercises(lastExercise.exercises)
    };

    renderExerciseSummary(exerciseSummary);
  } else {
    renderNoExerciseText()
  }
}

function tallyExercises(exercises) {
  const tallied = exercises.reduce((acc, curr) => {
    if (curr.type === "resistance") {
      acc.totalWeight = (acc.totalWeight || 0) + curr.weight;
      acc.totalSets = (acc.totalSets || 0) + curr.sets;
      acc.totalReps = (acc.totalReps || 0) + curr.reps;
    } else if (curr.type === "cardio") {
      acc.totalDistance = (acc.totalDistance || 0) + curr.distance;
    }
    return acc;
  }, {});
  return tallied;
}

function formatDate(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  return new Date(date).toLocaleDateString(options);
}

function renderExerciseSummary(summary) {
  const container = document.querySelector(".exercise-stats");

  const exerciseKeyMap = {
    date: "Date",
    totalDuration: "Total Exercise Duration",
    numExercises: "Exercises Performed",
    totalWeight: "Total Weight Lifted",
    totalSets: "Total Sets Performed",
    totalReps: "Total Reps Performed",
    totalDistance: "Total Distance Covered"
  };

  Object.keys(summary).forEach(key => {
    const p = document.createElement("p");
    const strong = document.createElement("strong");

    strong.textContent = exerciseKeyMap[key];
    const textNode = document.createTextNode(`: ${summary[key]}`);

    p.appendChild(strong);
    p.appendChild(textNode);

    container.appendChild(p);
  });
}

function renderNoExerciseText() {
  const container = document.querySelector(".exercise-stats");
  const p = document.createElement("p");
  const strong = document.createElement("strong");
  strong.textContent = "You have not created a exercise yet!"

  p.appendChild(strong);
  container.appendChild(p);
}

initExercise();
