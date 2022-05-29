// Application parameters and dev "log"
let appLanguage = document.getElementById("app-language").checked == true ? "eng" : "swe";
console.log("Welcome to Flossa V2")
console.log("Time and Date: " + new Date())
console.log("appLanguage: " + appLanguage)



// hides startup GUI and shows interaction GUI
function changeInterfaceIntoInteraction() {
    document.getElementById("start-wrapper").style.display = "none";
}

// enable the Start button once ASR is ready to listen
window.addEventListener("onASRStart", (evt) => {
    document.querySelector("#speak").ariaDisabled = false;
    document.querySelector("#speak").disabled = false;
})

// sets language dependant GUI elements
document.getElementById("feedback-container-before").innerHTML = appLanguage === "swe" ? swe_feedback_container_before : eng_feedback_container_before;
document.getElementById("speak").value = appLanguage === "swe" ? "Hej" : "Hello";
document.getElementById("hint").innerHTML = appLanguage === "swe" ? 'Säg "Hej", "Hejsan" eller "Börja" för att starta' : 'Say "Hello", "Start" or "Computer" to start';

// set and clear feedbackcontainer
function setFeedbackContainer(text) {
    document.getElementById('feedback-container-result').innerHTML = text;
}

function clearFeedbackContainer() {
    document.getElementById("feedback-container-result").innerHTML = ""
}


// make the whole app fullscreen in order to hide the URL bar
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


// hide or show answer buttons
function hideButtons() {
    document.querySelector("#node-A").style.display = "none";
    document.querySelector("#node-B").style.display = "none";
    document.querySelector("#node-C").style.display = "none";
    document.getElementById("answer-container").style.display = "flex"
    document.querySelector("#microphone-listening").style.display = "none";
}

function showAnswerButtons(element, nodeAnswer) {
    document.getElementById("answer-container").style.display = "flex"
    document.querySelector("#microphone-listening").style.display = "flex";
    element.style.display = "block";
    element.innerHTML = nodeAnswer;
    if (nodeAnswer == undefined) {
        element.style.display = "none";
    }
}

// handles click for correct next node in question
function handleA(){
    if (currentNode instanceof Question) {
        currentNode = currentNode.nodeA
    } else if (currentNode instanceof trickQuestion){
        currentNode = currentNode.nextNode;
    }
    nodeStart();
}
function handleB(){
    if (currentNode instanceof Question) {
        currentNode = currentNode.nodeB
    } else if (currentNode instanceof trickQuestion){
        currentNode = currentNode.nextNode;
    }
    nodeStart();
}
function handleC(){
    if (currentNode instanceof Question) {
        currentNode = currentNode.nodeC
    } else if (currentNode instanceof trickQuestion){
        currentNode = currentNode.nextNode;
    }
    nodeStart();
}

// sets click events
function setAnswerButtonsListeners() {
    const nodeA = document.getElementById("node-A");
    const nodeB = document.getElementById("node-B");
    const nodeC = document.getElementById("node-C");

    nodeA.removeEventListener("click", handleA)
    nodeB.removeEventListener("click", handleB)
    nodeC.removeEventListener("click", handleC)

    nodeA.addEventListener("click", handleA)
    nodeB.addEventListener("click", handleB)
    nodeC.addEventListener("click", handleC)
}

// populates answer-buttons with node answer element
function setAnswers(node) {
    const nodeA = document.getElementById("node-A");
    const nodeB = document.getElementById("node-B");
    const nodeC = document.getElementById("node-C")
    showAnswerButtons(nodeA, node.nodeAAnswer);
    showAnswerButtons(nodeB, node.nodeBAnswer);
    showAnswerButtons(nodeC, node.nodeCAnswer);
    setAnswerButtonsListeners();
}


// stop and start recording
function stopRecording() {
    STT.recording = false
    document.querySelector("#mute-button").innerHTML = "&#128263;"
}
function startRecording() {
    STT.recording = true;
    document.querySelector("#mute-button").innerHTML = "&#128266;"
}
// mute toggle
function toggleMute() {
    if (STT.recording == true) {
        stopRecording()
    } else {
        startRecording()
    }
}

document.getElementById("mute-button").addEventListener("click", () => {
    toggleMute();
});

// language toggle
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

document.getElementById("app-language").addEventListener("click", () => {
    toggleLanguage();
});

// starts current node
function nodeStart() {
    hideButtons(); // Hide buttons and show background
    if (currentNode.movement) {
        setGesture(currentNode.movement); // If we have movement, set it
    }
    if (currentNode instanceof Video) {
        setVideo(currentNode);
    } else {
        setTTS(currentNode);
    }
}

// sets next node and starts it
function nodeNextStart() {
    currentNode = currentNode.nextNode;
    nodeStart();
}

// createSpeechFunction returns a function called textToSpeech that we can save to a variable and call when needed.
// textToSpeech uses the variable context and calls on the function playAudio which the function "remembers" i.e. Closure
function createSpeechFunction() {
    const context = new AudioContext();
    let textToSpeech = (text) => {
        url = makeUrl(appLanguage, text)
        fetch(url)
            .then(response => response.arrayBuffer())
            .then(buffer => context.decodeAudioData(buffer))
            .then(audio => playAudio(audio))
    }
    function playAudio(audioBuffer) {
        stopRecording();
        const source = context.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(context.destination);
        source.detune.value = -400;
        source.start();
        console.log(source);
        source.onended = () => {
            interaction()
        }
    }
    return textToSpeech;
}

// TTS API uses SSML so the text should be within <speak> tags
function setTTS(node) {
    const text = '<speak>' + node.tts + '</speak>';
    const point = text.search("<break");
    const textNewline = text.slice(0, point) + "<br>" + text.slice(point)
    container = document.getElementById("speak-container");
    container.innerHTML = text;
    textToSpeech(text);
}

// url for speech synthesis
function makeUrl(lang, text) {
    let url = ""
    if (lang === "swe") {
        url = "https://alf-tts-api.herokuapp.com/tts?ReqString=" + text + "&lang=sv-SE&gender=FEMALE-A&rate=1.3&pitch=1.1"  //swedish
    } else if (lang === "eng") {
        url = "https://alf-tts-api.herokuapp.com/tts?ReqString=" + text + "&lang=en-US&gender=FEMALE&rate=1.2&pitch=1.3"    //english
    } else {
        url = "https://alf-tts-api.herokuapp.com/tts?ReqString=" + text + "&lang=en-US&gender=FEMALE&rate=1.2&pitch=1.3"    //default --english
    }
    return url
}

// modal for video node
function setIframeModal() {
    var iframeModal = document.getElementById("iframeModal");
    iframeModal.style.display = "block";
}

// video properties
function setVideoProperties(video, url) {
    video.src = url;
    video.width = 1000;
    video.height = 700;
}

// video node & timers
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

// returns a list of the node answers in lower case
function getLowerCaseAnswers() {
    list = []
    list.push(nodeAAnswer = document.getElementById("node-A").innerHTML.toLowerCase());
    list.push(nodeBAnswer = document.getElementById("node-B").innerHTML.toLowerCase());
    list.push(nodeCAnswer = document.getElementById("node-C").innerHTML.toLowerCase());
    return list
}

// main logic for user input
function checkUserInput(result) {
    const answers = getLowerCaseAnswers();
    result = result.toLowerCase(); //set to lower case
    let results = result.split(" ");
    for (const r of results) {
        // Test result (the users input) against answers, we only check the first word
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

// cleans up UI for new question
function initiateQuestion() {
    setAnswers(currentNode);
    clearFeedbackContainer();
    startRecording();
}

// main logic depending on node class
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
        }, 1500);
    } else {
        console.log("Undefined Node")
    }
}


