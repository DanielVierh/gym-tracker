// Add a 0 to a number under 10
const addZero = (num)=> {
    if(num < 10) {
        num = `0${num}`
    }
    return num
}

// Toast Notification
const createNotification = (message, messageType, display_time) => {
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
    }, display_time);
}

const splitVal = (val, marker, pos) => {
    const elem = val.split(marker);
    const retVal = elem[pos];
    return retVal;
}


export { addZero, createNotification, splitVal }