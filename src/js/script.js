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
