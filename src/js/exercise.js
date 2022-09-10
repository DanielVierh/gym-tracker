
let storedObj = {
    clickedExercise: 'none',
    exercises: ['Liegestütze','Hantelcurls','Situps','Schulterpresse','Planks',],
    statistics: []
}

const outpExercise = document.getElementById("outpExercise");

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

        } catch (err) {
            console.log(err);
        }
    }else {
        console.log('Daten wurden nicht geladen');
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
