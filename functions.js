
/**
 * Table of Contents
 * 
 * toggleFullscreen()
 * 
 * hideButtons()
 * showButtons()
 * 
 * getAnswers()
 * setAnswers()
 * setAnswersButtonListeners()
 * 
 * stopRecording()
 * startRecording()
 * 
 * setFeedbackContainer()
 * clearFeedbackContainer()
 * 
 * toggleLanguage()
 * 
 * toggleMute()
 * 
 * nodeStart()
 * nodeNextStart()
 * 
 * setIframeModal()
 * setVideoProperties()
 * setVideo()
 * trackVideo()
 * 
 * setTTS(node)
 * 
 * checkUserInput(result)
 * 
 * interaction()
 * initiateQuestion()
 */

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

function setAnswersButtonListeners() {
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

// Stop/Start recording
function stopRecording() {
    STT.recording = false
    document.querySelector("#mute-button").innerHTML = "&#128263;"
}

function startRecording() {
    STT.recording = true;
    document.querySelector("#mute-button").innerHTML = "&#128266;"
}


function setFeedbackContainer(text) {
    document.getElementById('result').innerHTML = text;
}

function clearFeedbackContainer() {
    document.getElementById("feedback-container-result").innerHTML = ""
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

// Mute toggle
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

// Starts current node
function nodeStart() {
    hideButtons(); // Hide buttons and show background
    if (currentNode.movement) {
        // If we have movement, set it
        setGesture(currentNode.movement);
    }
    if (currentNode instanceof Video) {
        setVideo(currentNode);
    } else {
        setTTS(currentNode);
    }
}

// Sets next node and starts it
function nodeNextStart() {
    currentNode = currentNode.nextNode;
    nodeStart();
}

function setTTS(node) {
    // TTS API uses SSML so the text should be within <speak> tags
    // Formats SSML
    const text = '<speak>' + node.tts + '</speak>';

    // SSML format for breaks
    const point = text.search("<break");
    const textNewline = text.slice(0, point) + "<br>" + text.slice(point)


    container = document.getElementById("speak-container");
    container.innerHTML = text;

    textToSpeech(text);
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

function setVideo(node) {
    video = document.getElementById("video");
    setVideoProperties(video, node.video)
    // Check if we have tts and then mute video
    if (node.tts == undefined) {
        video.muted = false;
    } else {
        video.muted = true
        setTTS(currentNode)
    }
    setTimeout(() => {
        video.play(); //start video
        setIframeModal();
        // Scroll page to top to orient user for video
        window.scrollTo(0, 1);

        setTimeout(() => {
            document.getElementById("iframeModal").style.display = "none";
            video.pause(); //stop video
        }, currentNode.videoDuration);
    }, currentNode.videoDelayStart);

}

// tracks if video is playing or not
function trackVideo() {
    video = document.getElementById("video");
    if (video.paused) {
        nodeNextStart();
    } else {
        video.addEventListener('pause', (event) => { nodeNextStart(); }, { once: true });
    }
}

function checkUserInput(result) {
    // Get answers
    const answers = getAnswers()

    result = result.toLowerCase(); //set to lower case
    let results = result.split(" ");
    // If we cant find a match for the input our user gives we startDialog with the current node
    for (const r of results) {
        // Test the user input against nodes if answers in our nodes.
        // We only check the first word
        if (answers[0].split(" ")[0] == r) {
            console.log("Going nodeA");
            setFeedbackContainer(currentNode.nodeAAnswer)
            currentNode instanceof trickQuestion ? currentNode = currentNode.nextNode : currentNode = currentNode.nodeA
            return true;
        } else if (answers[1].split(" ")[0] == r) {
            console.log("Going nodeB");
            setFeedbackContainer(currentNode.nodeBAnswer)
            currentNode instanceof trickQuestion ? currentNode = currentNode.nextNode : currentNode = currentNode.nodeB
            return true;
        } else if (answers[2].split(" ")[0] == r) {
            console.log("Going nodeC");
            setFeedbackContainer(currentNode.nodeCAnswer)
            currentNode instanceof trickQuestion ? currentNode = currentNode.nextNode : currentNode = currentNode.nodeC
            return true;
        }
        //If we didn't find an answer, but still got a response from the STT we just restart the recording again
        startRecording();
        return false;
    }

}

function interaction() {
    console.log("Interaction called")
    if (currentNode instanceof Question || currentNode instanceof trickQuestion) {
        initiateQuestion();
    } else if (currentNode instanceof Monologue) {
        nodeNextStart();
    } else if (currentNode instanceof Video) {
        trackVideo()
    } else if (currentNode instanceof EndTree) {
        setTimeout(function () {
            window.location.reload(1); // reload page on end
        }, 3500);
    } else {
        console.log("Undefined Node")
    }
}

function initiateQuestion() {
    setAnswers(currentNode);
    clearFeedbackContainer();
    startRecording();
}
