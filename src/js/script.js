

let storedObj = {
    exercises: [],
    statistics: []
}

class Exercise {
    constructor(name, weight, satz, wiederh, traintime, id) {
        this.name = name;
        this.weight = weight;
        this.satz = satz;
        this.wiederh = wiederh;
        this.traintime = traintime;
        this.id = id;
    }
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


function save_LocalStorage() {
    localStorage.setItem(
        'stored_Gymtracker_Data',
        JSON.stringify(storedObj),
    );
}

function load_LocalStorage() {
    if (localStorage.getItem('stored_Gymtracker_Data') !== null) {
        intervalEventObject = JSON.parse(localStorage.getItem('stored_Gymtracker_Data'),
        );
        // fastingChangeButton!.innerText = `${intervalEventObject.fastingTime}:${intervalEventObject.eatTime}`;
        try {
            // waterButton!.innerText = `${intervalEventObject.water.toFixed( 2)} Liter`;
        } catch (err) {
            console.log(err);
        }
    }
}


const nofifyBtn = document.getElementById("notifiBtn");

nofifyBtn.addEventListener("click", ()=> {
    Notification.requestPermission().then(perm => {
        if(perm === "granted") {
            const notification = new Notification("Example notification", {
                body: "Helloooo World",
            })
        }
    })
})
