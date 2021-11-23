// Hides/shows buttons on initialization (by pressing "speak" button)

// rewrite to proper functions!
var speakButton = document.getElementById("speak");
var answerContainer = document.getElementById("answer-container");
var speakContainer = document.getElementById("speak-container");
var superImage = document.getElementById("super-image");
speakButton.onclick = function() {
    speakContainer.style.display = "none";
    answerContainer.style.display = "flex";
    superImage.style.display = "block";
}


/* Sets text/explanation before container that holds stt result */
document.getElementById("feedback-container-before").innerHTML = feedback_container_before


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


// Quick test to hide buttons after answer
// Also now shows "super-image"
function hideButtons() {
    document.getElementById("node-A").style.display = "none";
    document.getElementById("node-B").style.display = "none";
    document.getElementById("node-C").style.display = "none";
    document.getElementById("super-image").style.display = "block";
}


// Shows/hides answer buttons with CSS
function showHideNodeAnswer(element, node, nodeAnswer) {
    if (node != undefined && nodeAnswer != undefined) {
        // Hide super-image
        document.getElementById("super-image").style.display = "none";
        // Show buttons
        element.style.display = "block";
        element.innerHTML = nodeAnswer;
    } else {
        element.style.display = "none";
        element.innerHTML = ""; //Can be kept empty for checkInput()
    }
}

// Populates answer-buttons with node answer element
function setAnswers(node) {
    const nodeAAnswer = document.getElementById("node-A");
    const nodeBAnswer = document.getElementById("node-B");
    const nodeCAnswer = document.getElementById("node-C")

    if (node instanceof Question) {
        // Show hide buttons
        showHideNodeAnswer(nodeAAnswer, node.nodeA, node.nodeAAnswer);
        showHideNodeAnswer(nodeBAnswer, node.nodeB, node.nodeBAnswer);
        showHideNodeAnswer(nodeCAnswer, node.nodeC, node.nodeCAnswer);

    } else {
        console.log("NODE=", node);
    }
}

// Modal for video
function iframeModal() {
    var iframeModal = document.getElementById("iframeModal");
    var span = document.getElementById("iframeClose");
    iframeModal.style.display = "block";
    // When the user clicks on <span> (x) close the modal
    span.addEventListener('click', function() {
        iframeModal.style.display = "none";
    });
}

// Video properties, adjusted for Alf robot (2021)
function setVideo(node) {
    videoPlayer = document.getElementById("video");
    videoPlayer.src = node.video;
    videoPlayer.width = 1000;
    videoPlayer.height = 700;
    iframeModal();
}

function setFeedbackContainer(nodeText) {
    document.getElementById('result').innerHTML = nodeText;
}