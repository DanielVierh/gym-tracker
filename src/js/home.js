const trainingswrapper = document.getElementById('trainingswrapper');
const btnFinishExercise = document.getElementById("btnFinishExercise");

let isActiveTraining = false;

let storedObj = {
    clickedExercise: 'none',
    exercises: [],
    statistics: [],
    activeTraining: false,
    currentTraining: [],
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
        exercise.innerHTML = exercises[i];
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
        console.log(storedObj);
        try {
            exerciseObjArray = storedObj.exercises;
            for(let i = 0; i < exerciseObjArray.length; i++) {
                exercises.push(exerciseObjArray[i].name)
            }

            isActiveTraining = storedObj.activeTraining;
            if(isActiveTraining === true) {
                btnFinishExercise.classList.add("active");
            }

        } catch (err) {
            console.log(err);
        }
    }else {
        console.log('Daten wurden nicht geladen');
    }
}

// ? Create event listener for all link clicks
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        storedObj.clickedExercise = link.innerText;
        save_LocalStorage();
        // alert(link.innerText);
    });
  });


// ? Laufendes Training beenden
  btnFinishExercise.addEventListener("click", ()=> {
    const finishRequest = window.confirm("Training beenden?");
    if(finishRequest) {
        btnFinishExercise.classList.remove("active");
        storedObj.activeTraining = false;
        save_LocalStorage();
        const saveRequest = window.confirm("Soll dein Training gespeichert werden?");
        if(saveRequest) {
            const now = new Date();
            const startTime = storedObj.currentTraining[0];
            
            const endTime = now.getTime();

            const differenz = endTime - startTime;

            const trainingsTime = msToTime(differenz)

            console.log(`trainingsTime: ${trainingsTime}`);
            //todo Training speichern
            console.log('Training wurde gespeichert');

            storedObj.currentTraining = [];

            save_LocalStorage();
        }
    }
  })

  function msToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
  
    return addZero(hrs) + ':' + addZero(mins) + ':' + addZero(secs) + '.' + addZero(ms);
  }

  function addZero(num) {
      if(num < 10) {
          num = `0${num}`
      }
      return num
  }