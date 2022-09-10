const trainingswrapper = document.getElementById('trainingswrapper');

// ! Später durch Local Storage Eintrag ersetzen
const exercises = [
    'Liegestütze',
    'Hantelcurls',
    'Situps',
    'Schulterpresse',
    'Planks',
];

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
    localStorage.setItem('stored_Gymtracker_Data', JSON.stringify(storedObj));
}

function load_LocalStorage() {
    if (localStorage.getItem('stored_Gymtracker_Data') !== null) {
        intervalEventObject = JSON.parse(
            localStorage.getItem('stored_Gymtracker_Data'),
        );
        // fastingChangeButton!.innerText = `${intervalEventObject.fastingTime}:${intervalEventObject.eatTime}`;
        try {
            // waterButton!.innerText = `${intervalEventObject.water.toFixed( 2)} Liter`;
        } catch (err) {
            console.log(err);
        }
    }
}

function feffe() {
    alert('Feffe');
}
