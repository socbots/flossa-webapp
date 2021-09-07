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