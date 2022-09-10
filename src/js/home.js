const trainingswrapper = document.getElementById('trainingswrapper');

let storedObj = {
    clickedExercise: 'none',
    exercises: [],
    statistics: []
}

let exerciseObjArray = [];
let exercises = [];

window.onload = init();

function init() {
    load_LocalStorage();
    loadExercise();
}

//  Erstelle dynamisch Übungen
function loadExercise() {
    for (let i = 0; i < exercises.length; i++) {
        const exercise = document.createElement('a');
        exercise.classList.add('exercise');
        const icon = document.createElement('span');
        icon.classList.add('fa-solid');
        icon.classList.add('fa-circle-chevron-right');
        exercise.innerHTML = exercises[i] + ' ';
        exercise.appendChild(icon);
        exercise.href = 'exercise.html';
        trainingswrapper.appendChild(exercise);
    }
}

function save_LocalStorage() {
    console.log(storedObj);
    localStorage.setItem('stored_Gymtracker_Data', JSON.stringify(storedObj));
    console.log('Daten wurden gespeichert');
}

function load_LocalStorage() {
    if (localStorage.getItem('stored_Gymtracker_Data') !== null) {
        storedObj = JSON.parse(localStorage.getItem('stored_Gymtracker_Data'));
        console.log('Daten geladen');
        try {
            exerciseObjArray = storedObj.exercises;
            for(let i = 0; i < exerciseObjArray.length; i++) {
                exercises.push(exerciseObjArray[i].name)
            }
        } catch (err) {
            console.log(err);
        }
    }else {
        console.log('Daten wurden nicht geladen');
    }
}

// Create event listener for all link clicks
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        storedObj.clickedExercise = link.innerText;
        save_LocalStorage();
        // alert(link.innerText);
    });
  });
