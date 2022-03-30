// Hides/shows buttons on initialization (by pressing "speak" button)

// rewrite to proper functions!
var speakButton = document.getElementById("speak");
var answerContainer = document.getElementById("answer-container");
var startWrapper = document.getElementById("start-wrapper");
var superImage = document.getElementById("filler-image");
speakButton.onclick = function () {
    changeInterfaceIntoInteraction(); // Splitted into function to be reused in audio.js
}

function changeInterfaceIntoInteraction() {
    startWrapper.style.display = "none";
    answerContainer.style.display = "flex";
}

/* Sets text/explanation before container that holds stt result */
document.getElementById("feedback-container-before").innerHTML = feedback_container_before


/**
 * Make the whole app fullscreen in order to hide the URL bar
 * Click/tap on "vad jag hörde" to run
 */
const toggleFullscreen = async (target) => {
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

document.querySelector("#fullscreen-request").addEventListener("click", async (ev) => {
    await toggleFullscreen(document.documentElement);
});


// Also now shows "filler-image"
function hideButtons() {
    document.querySelector("#node-A").style.display = "none";
    document.querySelector("#node-B").style.display = "none";
    document.querySelector("#node-C").style.display = "none";
    document.getElementById("answer-container").style.display = "flex"
    document.querySelector("#microphone-listening").style.display = "none";
}


// Shows/hides answer buttons with CSS
function showButtons(element, nodeAnswer) {
    document.getElementById("answer-container").style.display = "flex"
    // Show microphone listening animation
    document.querySelector("#microphone-listening").style.display = "flex";
    // Show buttons
    element.style.display = "block";
    element.innerHTML = nodeAnswer;
    if (nodeAnswer == undefined) {
        element.style.display = "none";
    }
}

// returns a list of the node Answers in lower case
function getAnswers() {
    list = []
    list.push(nodeAAnswer = document.getElementById("node-A").innerHTML.toLowerCase());
    list.push(nodeBAnswer = document.getElementById("node-B").innerHTML.toLowerCase());
    list.push(nodeCAnswer = document.getElementById("node-C").innerHTML.toLowerCase());

    return list
}

// Populates answer-buttons with node answer element
function setAnswers(node) {
    const nodeAAnswer = document.getElementById("node-A");
    const nodeBAnswer = document.getElementById("node-B");
    const nodeCAnswer = document.getElementById("node-C")
    // Show hide buttons
    showButtons(nodeAAnswer, node.nodeAAnswer);
    showButtons(nodeBAnswer, node.nodeBAnswer);
    showButtons(nodeCAnswer, node.nodeCAnswer);
}

function setButtonListeners() {
    const nodeAbtn = document.getElementById("node-A");
    const nodeBbtn = document.getElementById("node-B");
    const nodeCbtn = document.getElementById("node-C");

    nodeAbtn.addEventListener("click", () => {
        checkUserInput(nodeAbtn.innerHTML, true);
        nodeStart(true);
    })
    nodeBbtn.addEventListener("click", () => {
        checkUserInput(nodeBbtn.innerHTML, true);
        nodeStart(true);
    })
    nodeCbtn.addEventListener("click", () => {
        checkUserInput(nodeCbtn.innerHTML, true);
        nodeStart(true);
    })
}

// Modal for video
function setIframeModal() {
    var iframeModal = document.getElementById("iframeModal");
    var span = document.getElementById("iframeClose");
    iframeModal.style.display = "block";
    // When the user clicks on <span> (x) close the modal
    span.addEventListener('click', function () {
        iframeModal.style.display = "none";
    });
}

// Video properties, adjusted for Alf robot (2021)
function setVideoProperties(video, url) {
    video.src = url;
    video.width = 1000;
    video.height = 700;
}

function setFeedbackContainer(text) {
    document.getElementById('result').innerHTML = text;
}

function clearResult() {
    document.getElementById("result").innerHTML = ""
}

// Enable the Start button once Kaldi is ready to listen
window.addEventListener("onASRStart", (evt) => {
    document.querySelector("#speak").ariaDisabled = false;
    document.querySelector("#speak").disabled = false;
})