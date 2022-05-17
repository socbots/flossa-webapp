// Hides/shows buttons on initialization (by pressing "speak" button)

// rewrite to proper functions!
const speakButton = document.getElementById("speak");
const answerContainer = document.getElementById("answer-container");
const startWrapper = document.getElementById("start-wrapper");
const superImage = document.getElementById("filler-image");

speakButton.onclick = function () {
    changeInterfaceIntoInteraction(); // Splitted into function to be reused in audio.js
}

function changeInterfaceIntoInteraction() {
    startWrapper.style.display = "none";
    answerContainer.style.display = "flex";
}

/* Sets text/explanation before container that holds stt result */
document.getElementById("feedback-container-before").innerHTML = appLanguage === "swe" ? swe_feedback_container_before : eng_feedback_container_before;
// sets button
document.getElementById("speak").value = appLanguage === "swe" ? "Hej" : "Hello";
// sets hint
document.getElementById("hint").innerHTML = appLanguage === "swe" ? 'Säg "Hej", "Hejsan" eller "Börja" för att starta' : 'Say "Hello", "Start" or "Computer" to start';

/**
 * Make the whole app fullscreen in order to hide the URL bar
 * Click/tap on "vad jag hörde" to run
 */
const toggleFullscreen = async (target) => {
    if (!document.fullscreenElement &&
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) { // current working methods
        document.querySelector("#fullscreen-request").classList.remove("zoom-in");
        document.querySelector("#fullscreen-request").classList.add("zoom-out");
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
        document.querySelector("#fullscreen-request").classList.remove("zoom-out");
        document.querySelector("#fullscreen-request").classList.add("zoom-in");
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

document.querySelector("#fullscreen-request").classList.add("zoom-in");


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

function startRecording() {
    STT.recording = true;
    document.querySelector("#mute-button").innerHTML = "&#128266;"
}

function stopRecording() {
    STT.recording = false
    document.querySelector("#mute-button").innerHTML = "&#128263;"
}

// Modal for video
function setIframeModal() {
    var iframeModal = document.getElementById("iframeModal");
    iframeModal.style.display = "block";
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

// Enable the Start button once ASR is ready to listen
window.addEventListener("onASRStart", (evt) => {
    document.querySelector("#speak").ariaDisabled = false;
    document.querySelector("#speak").disabled = false;
})

// Language toggle
function toggleLanguage() {
    if (idle == true) {
        appLanguage = document.getElementById("app-language").checked == true ? "eng" : "swe";
        const e1 = document.getElementById("feedback-container-before");
        const e2 = document.getElementById("speak");
        const e3 = document.getElementById("hint");
        e1.innerHTML = appLanguage === "swe" ? swe_feedback_container_before : eng_feedback_container_before;
        e2.value = appLanguage === "swe" ? "Hej" : "Hello";
        e3.innerHTML = appLanguage === "swe" ? 'Säg "Hej", "Hejsan" eller "Börja" för att starta' : 'Say "Hello", "Start" or "Computer" to start';
        currentNode = appLanguage === "swe" ? rootNodeSwe : rootNodeEng;
        console.log("toggleLanguage: " + appLanguage);
    }
}

function toggleMute() {
        if (STT.recording == true) {
            stopRecording()
        } else {
            startRecording()
        }
}

document.getElementById("app-language").addEventListener("click", () => {
    toggleLanguage();
});

document.getElementById("mute-button").addEventListener("click", () => {
    toggleMute();
});