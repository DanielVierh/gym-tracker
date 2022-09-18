
let storedObj = {
    clickedExercise: 'none',
    exercises: [],
    statistics: [],
    activeTraining: false,
    currentTraining: [],
}

const trainingswrapper = document.getElementById("trainingswrapper");


let statisticObjArray = [];

window.onload = init();

function init() {
    load_LocalStorage();
}








function load_LocalStorage() {
    if (localStorage.getItem('stored_Gymtracker_Data') !== null) {
        storedObj = JSON.parse(localStorage.getItem('stored_Gymtracker_Data'));
        console.log('Daten geladen');
        console.log(storedObj);
        try {
            statisticObjArray = storedObj.statistics;
            loadTrainings();

        } catch (err) {
            console.log(err);
        }
    }else {
        console.log('Daten wurden nicht geladen');
    }
}



function loadTrainings() {
    console.log(statisticObjArray);
    
    for(let i = statisticObjArray.length - 1; i > -1; i--) {
        let trainingdiv = document.createElement('div')
        trainingdiv.classList.add('trainingResultbox')
        let trainingsdate = document.createElement('h2');
        trainingsdate.innerHTML = statisticObjArray[i].date;
        let trainingsTime = document.createElement('p');
        trainingsTime.innerHTML = statisticObjArray[i].trainingstime;
        let exercisesdiv = document.createElement('div');
        trainingdiv.appendChild(trainingsdate)
        trainingdiv.appendChild(trainingsTime)

        for(let j = 0; j < statisticObjArray[i].exercises.length; j++) {
            let headline = document.createElement('h2');
            headline.innerHTML = statisticObjArray[i].exercises[j].exerciseName;
            let values = document.createElement('p');
            const text = `Gewicht: ${statisticObjArray[i].exercises[j].weight} | Wiederholungen: ${statisticObjArray[i].exercises[j].repeats} | Abgeschlossene Sätze: ${statisticObjArray[i].exercises[j].finishedSets} \n `
            values.innerHTML = text;
            exercisesdiv.appendChild(headline);
            exercisesdiv.appendChild(values);
            trainingdiv.appendChild(exercisesdiv);
        }
        trainingswrapper.appendChild(trainingdiv);
    }
    
}