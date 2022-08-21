let storeObj = {
    exercises: [],
    statistics: []
}


// sticky-top
const maintitle = document.getElementById("maintitle");
window.addEventListener("scroll", ()=>{
    let scrollHeigth = Math.floor(window.pageYOffset)
    if(scrollHeigth > 100) {
        maintitle.classList.add("sticky-top");
    }else{
        maintitle.classList.remove("sticky-top");
    }
});


function gotoHome() {
    window.location = "index.html";
}

function gotoStatistic() {
    window.location = "statistic.html";
}

function gotoNewExercise() {
    window.location = "newExercise.html";
}


function load_LocalStorage() {
    localStorage.setItem(
        'stored_IntervallObj',
        JSON.stringify(intervalEventObject),
    );
}

function save_LocalStorage() {
    if (localStorage.getItem('stored_IntervallObj') !== null) {
        //@ts-ignore
        intervalEventObject = JSON.parse(localStorage.getItem('stored_IntervallObj'),
        );
        fastingChangeButton!.innerText = `${intervalEventObject.fastingTime}:${intervalEventObject.eatTime}`;
        try {
            waterButton!.innerText = `${intervalEventObject.water.toFixed(
                2,
            )} L`;
        } catch (err) {
            // console.log(err);
            intervalEventObject.water = 0;
            waterButton!.innerText = `${intervalEventObject.water.toFixed(
                2,
            )} L`;
        }
}



