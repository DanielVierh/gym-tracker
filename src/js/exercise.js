


let storedObj = {
    clickedExercise: 'none',
    exercises: ['Liegestütze','Hantelcurls','Situps','Schulterpresse','Planks',],
    statistics: []
}

const outpExercise = document.getElementById("outpExercise");
let exerciseObjArray = [];
let exercises = [];



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
        createNotification("Bin in load Data. Objekt gefunden", "info")
        try {
            outpExercise.innerHTML = storedObj.clickedExercise;
            exerciseObjArray = storedObj.exercises;
            let currentExerciseName = '';
            for(let i = 0; i < exerciseObjArray.length; i++) {
                currentExerciseName = exerciseObjArray[i].name;
                console.log(exerciseObjArray[i].name);
                createNotification(`currentExerciseName: ${currentExerciseName} vs storedObj.clickedExercise: ${storedObj.clickedExercise}`, "info")
                if(currentExerciseName == storedObj.clickedExercise) {
                    document.getElementById("inpExercise_Weight").value = exerciseObjArray[i].weight
                    document.getElementById("inpExercise_Sets").value = exerciseObjArray[i].sets
                    document.getElementById("inpExercise_Repeats").value = exerciseObjArray[i].repeats
                    document.getElementById("inpExercise_Comments").value = exerciseObjArray[i].comment   
                    createNotification("Los gehts", "success")
                    createNotification('Weight: ' + exerciseObjArray[i].weight + ' Sets:' +  exerciseObjArray[i].sets, "info")
                    break;
                }
            }

        } catch (err) {
            console.log(err);
            createNotification('Error', "alert")
            createNotification('Error' + err, "alert")
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
