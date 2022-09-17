const btnDeleteLocalStorage = document.getElementById("btnDeleteLocalStorage");





// ! Lösche local storage
btnDeleteLocalStorage.addEventListener("click", ()=> {
    const deleteRequest = window.confirm('Soll alles gelöscht werden? Es kann nicht rückgängig gemacht werden');
    if (deleteRequest) {
        storedObj = {
            clickedExercise: 'none',
            exercises: [],
            statistics: [],
            activeTraining: false,
            currentTraining: [],
        };
        save_LocalStorage();
        window.location = 'index.html';
    }
})


function save_LocalStorage() {
    console.log(storedObj);
    localStorage.setItem('stored_Gymtracker_Data', JSON.stringify(storedObj));
    console.log('Daten wurden gespeichert');
}
