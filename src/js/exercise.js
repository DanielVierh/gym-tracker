let storedObj = {
    clickedExercise: 'none',
    exercises: [],
    statistics: [],
    activeTraining: false,
    currentTraining: [],
};

const outpExercise = document.getElementById('outpExercise');
let exerciseObjArray = [];
let exercises = [];
let stopWatchIsRunning = false;
let stopWatchTime = 0;
let exerciseIndex = -1;
let weight = 0;
let repeats = 0;

const openStopWatch = document.getElementById('btn_Stopwatch');
const stopWatchArea = document.getElementById('stopwatchArea');
const closeStopWatch = document.getElementById('btnCloseStopwatch');
const stopWatchStart = document.getElementById('btnStopWatch_Start');
const stopWatchStop = document.getElementById('btnStopWatch_Stop');
const outpStopWatchTime = document.getElementById('outpStopWatchTime');
const btnSaveStoppedTime = document.getElementById('btnSaveStoppedTime');
const btnDeleteExercise = document.getElementById('btnDeleteExercise');
const lblCounter = document.getElementById('lblCounter');
const btnStart = document.getElementById('btnStart');
const lblevent = document.getElementById('lblevent');

window.onload = init();

function init() {
    load_LocalStorage();
}

/**
 *
 * Startzeit -- Sobald ein Training gestartet wird, wird gecheckt, ob activeTraining = false, wenn ja, push startTraining:TIME
    Jedes mal wird Objekt erstellt: NewExercise:
 * Übungsname - muss eingetragen werden  (Über den wird später gesucht)
 * Anzahl abgeschlossener Sätze
 * Wiederholungen
 * Gewicht
 * Endzeit - wird bei Trainingsstopp gesetzt (Bei Home) Zeit berechnen die insgesamt benötigt wurde
 */
class NewCurrentExercise {
    constructor(exerciseName, finishedSets, weight, repeats) {
        this.exerciseName = exerciseName;
        this.finishedSets = finishedSets;
        this.weight = weight;
        this.repeats = repeats;
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
        console.log('Daten für Übungen wurden geladen');
        try {
            outpExercise.innerHTML = storedObj.clickedExercise;
            exerciseObjArray = storedObj.exercises;
            let currentExerciseName = '';
            for (let i = 0; i < exerciseObjArray.length; i++) {
                currentExerciseName = exerciseObjArray[i].name;
                if (currentExerciseName === storedObj.clickedExercise) {
                    weight = exerciseObjArray[i].weight;
                    repeats = exerciseObjArray[i].repeats;
                    document.getElementById('inpExercise_Weight').value =
                        weight;
                    document.getElementById('inpExercise_Sets').value =
                        exerciseObjArray[i].sets;
                    document.getElementById('inpExercise_Repeats').value =
                        repeats;
                    document.getElementById('inpExercise_Comments').value =
                        exerciseObjArray[i].comment;
                    exerciseIndex = i;
                    break;
                }
            }
        } catch (err) {
            console.log(err);
        }
    } else {
        createNotification('Daten wurden nicht geladen', 'alert');
    }
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
openStopWatch.addEventListener('click', () => {
    stopWatchArea.classList.add('active');
});

closeStopWatch.addEventListener('click', () => {
    closeTheStopWatch();
});

function closeTheStopWatch() {
    stopWatchIsRunning = false;
    stopWatchTime = 0;
    stopWatchStart.style.boxShadow = 'none';
    btnStopWatch_Stop.style.boxShadow = 'none';
    secIntoTime();
    stopWatchArea.classList.remove('active');
}

stopWatchStart.addEventListener('click', () => {
    stopWatchIsRunning = true;
    stopWatchStart.style.boxShadow = '0 0 15px green';
    btnStopWatch_Stop.style.boxShadow = 'none';
    setCurrentExercise();
});

btnStopWatch_Stop.addEventListener('click', () => {
    stopWatchIsRunning = false;
    stopWatchStart.style.boxShadow = 'none';
    btnStopWatch_Stop.style.boxShadow = '0 0 15px red';
});

btnSaveStoppedTime.addEventListener('click', () => {
    const request = window.confirm('Möchtest du die Zeit speichern?');
    if (request) {
        const trackedTime = secIntoTime();
        const oldValue = storedObj.exercises[exerciseIndex].comment;
        const spacer = '\n ---- \n';
        const newValue = `Deine letzte Zeit war: ${trackedTime}`;
        storedObj.exercises[exerciseIndex].comment =
        getDateAndTimeString() + ': \n' + newValue + spacer + oldValue;
        save_LocalStorage();
        closeTheStopWatch();
        createNotification('Zeit wurde gespeichert', 'success');
        setTimeout(() => {
            location.location = 'index.html';
        }, 4000);
    }
});

function getDateAndTimeString() {
    const date = new Date();
    let date2 = new Date();
    let output = String(date2.getDate()).padStart(2, '0') + '.' + String(date2.getMonth() + 1).padStart(2, '0') + '.' + date2.getFullYear();
    const pureDate = splitVal(date + '', 'GMT', 0);
    const wochentag = weekday(splitVal(pureDate + '', ' ', 0 ))
    const month = splitVal(pureDate + '', ' ', 1 )
    const day = splitVal(pureDate + '', ' ', 2 )
    const year = splitVal(pureDate + '', ' ', 3 )
    const time = splitVal(pureDate + '', ' ', 4 )

    return `${wochentag} ${output} - ${time}`;
}

function weekday(val) {
    switch (val) {
        case 'Sat':
            return 'Samstag';
            break;
        case 'Sun':
            return 'Sonntag';
            break;
        case 'Mon':
            return 'Montag';
            break;
        case 'Tues':
            return 'Dienstag';
            break;
        case 'Wed':
            return 'Mittwoch';
            break;
        case 'Thurs':
            return 'Donnerstag';
            break;
        case 'Fri':
            return 'Freitag';
            break;
        default:
            break;
    }
}


setInterval(() => {
    updateStopWatch();
}, 1000);

function updateStopWatch() {
    if (stopWatchIsRunning === true) {
        stopWatchTime++;
        secIntoTime();
    }
}

function secIntoTime() {
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
btnDeleteExercise.addEventListener('click', () => {
    const request = window.confirm(
        'Soll diese Übung wirklich gelöscht werden?',
    );
    if (request) {
        storedObj.exercises.splice(exerciseIndex, 1);
        save_LocalStorage();
        window.location = 'index.html';
    }
});

const countdownTime = 10;
const trainingTime = 30;
const pauseTime = 30;
let countdownLifecycle = 0;
let counter = -1;

// Starte Übung
function startExercise() {
    // Initial Countdown
    setCurrentExercise();
    btnStart.style.display = 'none';
    speech(
        `Dein Training beginnt in ${countdownTime} Sekunden. Mach dich bereit`,
    );

    setTimeout(() => {
        countdownLifecycle = 1;
        counter = countdownTime;
        lblCounter.innerHTML = counter;
        lblevent.style.display = 'block';
        lblevent.innerHTML = 'Countdown';
    }, 5000);
}

setInterval(() => {
    if (countdownLifecycle === 1 && counter >= 0) {
        counter--;
        lblCounter.innerHTML = counter;

        if (counter > 0 && counter < 5) {
            speech(counter);
        }
    }
    if (counter === 0) {
        if (countdownLifecycle === 1) {
            speech('Los gehts');
            lblevent.innerHTML = 'Training';
            countdownLifecycle++;
            counter = trainingTime;
        }
    }
    if (countdownLifecycle === 2 && counter > 0) {
        counter--;
        lblCounter.innerHTML = counter;

        if (counter > 0 && counter < 5) {
            speech(counter);
        }
        if (counter === 0) {
            if (countdownLifecycle === 2) {
                speech(`Übung beendet. Ab jetzt ${pauseTime} Sekunden Pause.`);
                countdownLifecycle++;
                counter = pauseTime;
                lblevent.innerHTML = 'Pause';
            }
        }
    }
    if (countdownLifecycle === 3 && counter > 0) {
        counter--;
        lblCounter.innerHTML = counter;

        if (counter > 0 && counter < 5) {
            speech(counter);
        }

        if (counter === 0) {
            if (countdownLifecycle === 3) {
                speech('Fertig');
                location.reload();
            }
        }
    }
}, 1000);

// ? Setze Training

function setCurrentExercise() {
    const exerciseName = storedObj.clickedExercise;
    let finishedSets = 1;
    let exerciseFirstTimeToday = true;

    // Checken ob training gerade angefangen hat
    if (storedObj.activeTraining === false) {
        storedObj.activeTraining = true;
        const startTime = new Date();
        storedObj.currentTraining.push(startTime)
    } else {
        // Suche, ob diese Übung bereits abgeschlossen wurde
        for (let i = 0; i < storedObj.currentTraining.length; i++) {
            if (exerciseName === storedObj.currentTraining[i].exerciseName) {
                storedObj.currentTraining[i].finishedSets++;
                exerciseFirstTimeToday = false;
                break;
            }
        }
    }
    // Wenn Training noch nicht absolviert, hinzufügen
    if (exerciseFirstTimeToday === true) {
        const newCurrentExercise = new NewCurrentExercise(
            exerciseName,
            finishedSets,
            weight,
            repeats,
        );
        storedObj.currentTraining.push(newCurrentExercise);
    }
    console.log(storedObj.currentTraining);
    save_LocalStorage();
}
