import * as func from './functions.mjs';

const trainingswrapper = document.getElementById('trainingswrapper');
const btnFinishExercise = document.getElementById("btnFinishExercise");
let isActiveTraining = false;
let storedObj;
let exerciseObjArray = [];
let exercisesAll = [];

// Init
window.onload = () => {
    load_LocalStorage();
    loadExercise();
    func.createNotification("Hallo Sportsfreund","success")
}

class ExerciseStatistik {
    constructor(date, trainingstime, exercises) {
        this.date = date;
        this.trainingstime = trainingstime;
        this.exercises = exercises;
    }
}

//  Erstelle dynamisch Übungen
function loadExercise() {
    for (let i = 0; i < exercisesAll.length; i++) {
        const exercise = document.createElement('a');
        exercise.classList.add('exercise');
        exercise.innerHTML = exercisesAll[i];
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
                exercisesAll.push(exerciseObjArray[i].name)
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
            const trainingsdate = storedObj.currentTraining[1];
            let exercises = []
            console.log(exercisesAll);
            let exerciseindex = -1;
            for(let i = 2; i < storedObj.currentTraining.length; i++) {
                exercises.push(storedObj.currentTraining[i])
                exerciseindex = -1
                for(let j = 0; j < exercisesAll.length; j++) {
                    console.log(storedObj.currentTraining[i].exerciseName + ' vs ' + exercisesAll[j]);
                    exerciseindex++;
                    if(storedObj.currentTraining[i].exerciseName === exercisesAll[j]) {
                        let lastTraining = new ExerciseStatistik(trainingsdate,trainingsTime,storedObj.currentTraining[i])
                        storedObj.exercises[exerciseindex].lastTraining.push(lastTraining);
                        break;
                    }
                }

            }
            const training = new ExerciseStatistik(trainingsdate,trainingsTime,exercises)
            storedObj.statistics.push(training)
            save_LocalStorage();
            console.log(storedObj);
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
  
    return func.addZero(hrs) + ':' + func.addZero(mins) + ':' + func.addZero(secs) + '.' + func.addZero(ms);
  }
