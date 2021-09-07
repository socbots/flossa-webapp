/*
Credits:
https://www.w3schools.com/howto/howto_css_modals.asp
*/

/* Hide speak button on click */
// Get the buttons
var speakButton = document.getElementById("speak");
var answerContainer = document.getElementById("answer-container");
// Get the speak button container
var speakContainer = document.getElementById("speak-container");
// Get the question text container
var questionContainer = document.getElementById("question");
speakButton.onclick = function() {
    speakContainer.style.display = "none"
    answerContainer.style.display = "flex"
    questionContainer.style.display = "block"
    
}

/**
 * Make the whole app fullscreen in order to hide the URL bar
 * Click/tap on "vad jag hörde" to run
 */
const requestFullscreen = async (target) => {
    console.log("requestFullscreen");
    if (target.requestFullscreen) {
        target.requestFullscreen();
    }
    if (target.webkitRequestFullscreen) {
        target.webkitRequestFullscreen();
    }
    if (target.msRequestFullscreen) {
        target.msRequestFullscreen();
    }
}

document.querySelector("#fullscreen-request").addEventListener("click", async (ev) => {
    await requestFullscreen(document.documentElement);
});
