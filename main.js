// This function starts and moves the dialog onwards 
function nodeStart(understood = true) {
    // Hide buttons and show background
    hideButtons();
    // If we have movement, set it
    if (currentNode.movement) {
        setGesture(currentNode.movement);
    }
    // Special Timeouts for Video
    if (currentNode instanceof Video) {
        setVideo(currentNode);
    } else {
        setTTS(currentNode, understood);
    }
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

function setTTS(node, understood = true) {
    // TTS API uses SSML so the text should be within <speak> tags
    // Formats SSML or sends sorry_repeat if not understood
    const text = understood ? '<speak>' + node.tts + '</speak>' : sorry_repeat;

    // SSML format for breaks
    const point = text.search("<break");
    const textNewline = text.slice(0, point) + "<br>" + text.slice(point)


    container = document.getElementById("speak-container");
    container.innerHTML = text;

    textToSpeech(text);
}

// Legacy function for building SSML repetition of full node dialoge
function repeat_question(node) {
    s = '<speak>' + sorry_repeat + node.tts + '</speak>';
    return s
}

function interaction() {
    console.log("Interaction called")
    if (currentNode instanceof Question || currentNode instanceof trickQuestion) {
        initiateQuestion();
    } else if (currentNode instanceof Monologue) {
        startNextNode();
    } else if (currentNode instanceof Video) {
        trackVideo()
    } else {
        setTimeout(function () {
            window.location.reload(1); // reload page on end
        }, 3500);
    }
}

function initiateQuestion() {
    setAnswers(currentNode, understood);
    clearResult();
    startRecording();
}

// tracks if video is play or not
function trackVideo() {
    video = document.getElementById("video");
    if (video.paused) {
        startNextNode();
    } else {
        video.addEventListener('pause', (event) => { startNextNode(); }, { once: true });
    }
}

function startNextNode() {
    currentNode = currentNode.nextNode;
    nodeStart();
}

function startRecording() {
    kaldi.listening = true;
}

function checkUserInput(result) {
    // Get answers
    const answers = getAnswers()

    result = result.toLowerCase(); //set to lower case
    let results = result.split(" ");
    // If we cant find a match for the input our user gives we startDialog with the current node and set the understood parameter to true
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
    }
    //If we didn't find an answer, but still got a response from the STT we just restart the recording again
    kaldi.listening = true;
    return false;
}

// Test to trigger microphone and audio request from browser
// kaldi.listening = false; // Kaldi hasn't been initialized yet.

// Create node tree from tree.js, save rootNode incase of reset
const rootNode = createTree();
let currentNode = rootNode;
let understood = true;

// Call and create functions from the speech.js file
let textToSpeech = createSpeechFunction();

// Enable answer buttons
setButtonListeners();

// Initialization
document.getElementById("speak").addEventListener("click", () => {
    currentNode = rootNode;
    // Disable kaldi voice activation
    idle = false;
    nodeStart(currentNode)
})