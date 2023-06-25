
// sticky-top
const maintitle = document.getElementById("maintitle");


function gotoHome() {
    window.location = "index.html";
}

function gotoStatistic() {
    window.location = "statistic.html";
}

function gotoNewExercise() {
    window.location = "newExercise.html";
}

function gotoSettings() {
    window.location = "settings.html";
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
    }, 5000);
}
