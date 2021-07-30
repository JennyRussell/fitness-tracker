const exerciseTypeSelect = document.querySelector("#type");
const cardioForm = document.querySelector(".cardio-form");
const resistanceForm = document.querySelector(".resistance-form");
const cardioNameInput = document.querySelector("#cardio-name");
const nameInput = document.querySelector("#name");
const weightInput = document.querySelector("#weight");
const setsInput = document.querySelector("#sets");
const repsInput = document.querySelector("#reps");
const durationInput = document.querySelector("#duration");
const resistanceDurationInput = document.querySelector("#resistance-duration");
const distanceInput = document.querySelector("#distance");
const completeButton = document.querySelector("button.complete");
const addButton = document.querySelector("button.add-another");
const toast = document.querySelector("#toast");
const newExercise = document.querySelector(".new-exercise")

let exerciseType = null;
let shouldNavigateAway = false;

async function initExercise() {
  let exercise;

  if (location.search.split("=")[1] === undefined) {
    exercise = await API.createExercise()
    console.log(exercise)
  }
  if (exercise) {
    location.search = "?id=" + exercise._id;
  }

}

initExercise();

function handleExerciseTypeChange(event) {
  exerciseType = event.target.value;

  if (exerciseType === "cardio") {
    cardioForm.classList.remove("d-none");
    resistanceForm.classList.add("d-none");
  } else if (exerciseType === "resistance") {
    resistanceForm.classList.remove("d-none");
    cardioForm.classList.add("d-none");
  } else {
    cardioForm.classList.add("d-none");
    resistanceForm.classList.add("d-none");
  }

  validateInputs();
}

function validateInputs() {
  let isValid = true;

  if (exerciseType === "resistance") {
    if (nameInput.value.trim() === "") {
      isValid = false;
    }

    if (weightInput.value.trim() === "") {
      isValid = false;
    }

    if (setsInput.value.trim() === "") {
      isValid = false;
    }

    if (repsInput.value.trim() === "") {
      isValid = false;
    }

    if (resistanceDurationInput.value.trim() === "") {
      isValid = false;
    }
  } else if (exerciseType === "cardio") {
    if (cardioNameInput.value.trim() === "") {
      isValid = false;
    }

    if (durationInput.value.trim() === "") {
      isValid = false;
    }

    if (distanceInput.value.trim() === "") {
      isValid = false;
    }
  }

  if (isValid) {
    completeButton.removeAttribute("disabled");
    addButton.removeAttribute("disabled");
  } else {
    completeButton.setAttribute("disabled", true);
    addButton.setAttribute("disabled", true);
  }
}

async function handleFormSubmit(event) {
  event.preventDefault();

  let exerciseData = {};

  if (exerciseType === "cardio") {
    exerciseData.type = "cardio";
    exerciseData.name = cardioNameInput.value.trim();
    exerciseData.distance = Number(distanceInput.value.trim());
    exerciseData.duration = Number(durationInput.value.trim());
  } else if (exerciseType === "resistance") {
    exerciseData.type = "resistance";
    exerciseData.name = nameInput.value.trim();
    exerciseData.weight = Number(weightInput.value.trim());
    exerciseData.sets = Number(setsInput.value.trim());
    exerciseData.reps = Number(repsInput.value.trim());
    exerciseData.duration = Number(resistanceDurationInput.value.trim());
  }

  await API.addExercise(exerciseData);
  clearInputs();
  toast.classList.add("success");
}

function handleToastAnimationEnd() {
  toast.removeAttribute("class");
  if (shouldNavigateAway) {
    location.href = "/";
  }
}

function clearInputs() {
  cardioNameInput.value = "";
  nameInput.value = "";
  setsInput.value = "";
  distanceInput.value = "";
  durationInput.value = "";
  repsInput.value = "";
  resistanceDurationInput.value = "";
  weightInput.value = "";
}

if (exerciseTypeSelect) {
  exerciseTypeSelect.addEventListener("change", handleExerciseTypeChange);
}
if (completeButton) {
  completeButton.addEventListener("click", function (event) {
    shouldNavigateAway = true;
    handleFormSubmit(event);
  });
}
if (addButton) {
  addButton.addEventListener("click", handleFormSubmit);
}
toast.addEventListener("animationend", handleToastAnimationEnd);

document
  .querySelectorAll("input")
  .forEach(element => element.addEventListener("input", validateInputs));
