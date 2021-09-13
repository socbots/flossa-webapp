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
const toggleFullscreen = async(target) => {
    console.log("toggleFullscreen");
    if (!document.fullscreenElement &&
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) { // current working methods
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

document.querySelector("#fullscreen-request").addEventListener("click", async(ev) => {
    await toggleFullscreen(document.documentElement);
});