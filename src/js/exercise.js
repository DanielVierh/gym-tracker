


let storedObj = {
    clickedExercise: 'none',
    exercises: [],
    statistics: []
}

const outpExercise = document.getElementById("outpExercise");
let exerciseObjArray = [];
let exercises = [];
let stopWatchIsRunning = false;
let stopWatchTime = 0;
let exerciseIndex = -1;


const openStopWatch = document.getElementById("btn_Stopwatch");
const stopWatchArea = document.getElementById("stopwatchArea");
const closeStopWatch = document.getElementById("btnCloseStopwatch");
const stopWatchStart = document.getElementById("btnStopWatch_Start");
const stopWatchStop = document.getElementById("btnStopWatch_Stop");
const outpStopWatchTime = document.getElementById("outpStopWatchTime");
const btnSaveStoppedTime = document.getElementById("btnSaveStoppedTime");
const btnDeleteExercise = document.getElementById("btnDeleteExercise");


window.onload = init();

function init() {
    load_LocalStorage();
}


function save_LocalStorage() {
    console.log(storedObj);
    localStorage.setItem('stored_Gymtracker_Data', JSON.stringify(storedObj));
    console.log('Daten wurden gespeichert');
}

function load_LocalStorage() {
    if (localStorage.getItem('stored_Gymtracker_Data') !== null) {
        storedObj = JSON.parse(localStorage.getItem('stored_Gymtracker_Data'));
        console.log('Daten für Übungen wurden geladen');
        try {
            outpExercise.innerHTML = storedObj.clickedExercise;
            exerciseObjArray = storedObj.exercises;
            let currentExerciseName = '';
            for(let i = 0; i < exerciseObjArray.length; i++) {
                currentExerciseName = exerciseObjArray[i].name;
                console.log(exerciseObjArray[i].name);
                if(currentExerciseName === storedObj.clickedExercise) {
                    document.getElementById("inpExercise_Weight").value = exerciseObjArray[i].weight
                    document.getElementById("inpExercise_Sets").value = exerciseObjArray[i].sets
                    document.getElementById("inpExercise_Repeats").value = exerciseObjArray[i].repeats
                    document.getElementById("inpExercise_Comments").value = exerciseObjArray[i].comment
                    exerciseIndex = i;                    
                    break;
                }
            }

        } catch (err) {
            console.log(err);
            // createNotification('Error', "alert")
            // createNotification('Error' + err, "alert")
        }
    }else {
        createNotification("Daten wurden nicht geladen", "alert")
    }
}



const nofifyBtn = document.getElementById("notifiBtn");
if(nofifyBtn) {
    nofifyBtn.addEventListener("click", ()=> {
        speech("Hallo Welt")
        Notification.requestPermission().then(perm => {
            if(perm === "granted") {
                const notification = new Notification("Example notification", {
                    body: "Hallo Welt",
                })
            }
        })
    })
}


function speech(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    speechSynthesis.speak(utterance);
}




// Toast Notification
function createNotification(message, messageType) {
    // Erstelle Div
    const notifi = document.createElement('div');
    // Füge Klasse hinzu
    notifi.classList.add('toast'); // Messagebox
    notifi.classList.add(messageType); // Messagetypes: alert, info, modal, warning, success
    // Textmessage hinzufügen
    notifi.innerText = message;
    // Dem Toastcontainer das erstelle Toast hinzufügen
    toasts.appendChild(notifi);

    // Nachricht nach festgelegter Zeit wieder entfernen
    setTimeout(() => {
        notifi.remove();
    }, 10000);
}


// Stoppuhr
openStopWatch.addEventListener("click", ()=> {
    stopWatchArea.classList.add("active");
});

closeStopWatch.addEventListener("click", ()=> {
    stopWatchIsRunning = false;
    stopWatchTime = 0;
    stopWatchStart.style.boxShadow = 'none';
    btnStopWatch_Stop.style.boxShadow = 'none';
    secIntoTime();
    stopWatchArea.classList.remove("active");
});

stopWatchStart.addEventListener("click", ()=> {
    stopWatchIsRunning = true;
    stopWatchStart.style.boxShadow = '0 0 15px green';
    btnStopWatch_Stop.style.boxShadow = 'none';
});

btnStopWatch_Stop.addEventListener("click", ()=> {
    stopWatchIsRunning = false;
    stopWatchStart.style.boxShadow = 'none';
    btnStopWatch_Stop.style.boxShadow = '0 0 15px red';
});

btnSaveStoppedTime.addEventListener("click", ()=> {
    const trackedTime = secIntoTime();
    const date = new Date();
    const pureDate = splitVal(date + '','GMT', 0);  
    const oldValue = storedObj.exercises[exerciseIndex].comment;
    const spacer = '\n ---- \n';
    const newValue = `Deine letzte Zeit war: ${trackedTime}`;
    storedObj.exercises[exerciseIndex].comment = pureDate + ': \n' +  newValue + spacer + oldValue;
    save_LocalStorage()
})


setInterval(() => {
    updateStopWatch()
}, 1000);

function updateStopWatch() {
    if(stopWatchIsRunning === true) {
        stopWatchTime ++;
        secIntoTime()
    }
}



function secIntoTime(){
    let date = new Date(null);
    date.setSeconds(stopWatchTime);
    const result = date.toISOString().substr(11, 8);
    outpStopWatchTime.innerHTML = result;
    return result;
}


function splitVal(val, marker, pos) {
    const elem = val.split(marker);
    const retVal = elem[pos];
    return retVal;
}



// Delete Exercise
btnDeleteExercise.addEventListener("click", ()=> {
    const request = window.confirm("Soll diese Übung wirklich gelöscht werden?")
    if(request) {
        storedObj.exercises.splice(exerciseIndex, 1);
        save_LocalStorage();
        window.location = 'index.html';
    }
})