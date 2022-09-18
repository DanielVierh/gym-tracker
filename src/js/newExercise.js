
let storedObj = {
    clickedExercise: 'none',
    exercises: [],
    statistics: [],
    activeTraining: false,
    currentTraining: [],
}

/**
 * Anzahl an geschafften Wiederholungen
 */
class Exercise {
    constructor(name, weight, sets, repeats, comment, lastTraining) {
        this.name = name;
        this.weight = weight;
        this.sets = sets;
        this.repeats = repeats;
        this.comment = comment;
        this.lastTraining = lastTraining;
    }
}

let exerciseObjArray = [];
let exercises = [];


window.onload = init();

function init() {
    load_LocalStorage();
}

function saveNewExercise() {
    let exercisename = ''
    let weight = 0
    let sets = 0
    let repeats = 0
    let inputdataIsOk = false;

    if(document.getElementById("inpExercise_Name").value !== "") {
        if(document.getElementById("inpExercise_Name").value !== " ") {
            exercisename = document.getElementById("inpExercise_Name").value;
            exercisename = exercisename.trim();
            inputdataIsOk = true;
            if(exercises.includes(exercisename)) {
                alert("Die Übung existiert bereits")
                inputdataIsOk = false;
            }
        }
    }else {
        alert("Es muss mindestens ein Name vergeben werden")
        inputdataIsOk = false;
    }

    if(document.getElementById("inpExercise_Weight").value !== "") {
        if(document.getElementById("inpExercise_Weight").value !== " ") {
            weight = document.getElementById("inpExercise_Weight").value;
        }
    }

    if(document.getElementById("inpExercise_Sets").value !== "") {
        if(document.getElementById("inpExercise_Sets").value !== " ") {
            sets = document.getElementById("inpExercise_Sets").value;
        }
    }

    if(document.getElementById("inpExercise_Repeats").value !== "") {
        if(document.getElementById("inpExercise_Repeats").value !== " ") {
            repeats = document.getElementById("inpExercise_Repeats").value;
        }
    }

    if(inputdataIsOk === true) {
        const newExercise = new Exercise(exercisename, weight, sets, repeats, '...',[]);
        storedObj.exercises.push(newExercise);
        save_LocalStorage();
        window.location = "index.html"
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
