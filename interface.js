/*
Credits:
https://www.w3schools.com/howto/howto_css_modals.asp
*/

// Get the modal
var modal = document.getElementById("canvasModal");
// Get the button that opens the modal
var btn = document.getElementById("canvasBtn");
// Get the <span> element that closes the modal
var span = document.getElementById("canvasClose");
// When the user clicks on the button, open the modal
btn.onclick = function() {
        modal.style.display = "block";
    }
    // When the user clicks on <span> (x), close the modal
span.onclick = function() {
        modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

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
    answerContainer.style.display = "block"
    questionContainer.style.display = "block"

}