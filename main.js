// This function starts and moves the dialog onwards 
function startDialogue(notUnderstod = false, setQuestions = true) {
    hideButtons();
    if (setQuestions) {
        setQuestion(currentNode, notUnderstod);
    }
    if (currentNode._movement || undefined) {
        setGesture(currentNode._movement);
    }
    // Special adjustment to timings for the tutorial video
    // then it'll play the video after a delay
    // close after 50 seconds
    // then automatically start the next dialogue
    if (currentNode instanceof Question && currentNode.video || undefined) {
        setTimeout(() => {
            console.log("Starting tutorial video")
            setVideo(currentNode);
            videoRunning = true;

            if (currentNode.delayedMovement) setGesture(currentNode.delayedMovement.gesture);

            window.scrollTo(0, 1);

            setTimeout(() => {
                console.log("Ending tutorial video and going to next node");
                document.getElementById("iframeModal").style.display = "none";
                isRec = false;
                answerFound = true;
                currentNode = currentNode.nodeA;
                startDialogue(notUnderstod = false);
            }, currentNode.duration);

        }, currentNode.timeUntilStart);
    }
}

function setQuestion(node) {
    // TTS API uses SSML so the text should be within <speak> tags
    // Formats SSML or sends sorry_repeat if not understod
    const text = notUnderstod ? sorry_repeat : '<speak>' + ((node._text || undefined) || node.question) + '</speak>';

    // SSML format for breaks
    const point = text.search("<break");
    const textNewline = text.slice(0, point) + "<br>" + text.slice(point)

    // question.innerHTML = point < 0 ? text : textNewline;
    textToSpeech(text);
}

// Legacy function for building SSML repetition of full node dialoge
function repeat_question(node) {
    s = '<speak>' + sorry_repeat + ((node._text || undefined) || node.question) + '</speak>';
    return s
}

// Test to trigger microphone and audio request from browser
navigator.mediaDevices.getUserMedia({ audio: true })

// Create node tree from tree.js, save rootNode incase of reset
const rootNode = createTree();
let currentNode = rootNode;
let notUnderstod = false;

// Call and create functions from the speech.js file
let textToSpeech = createSpeechFunction();
let videoRunning = false;

// Initialization
document.getElementById("speak").addEventListener("click", () => {
    currentNode = rootNode;
    startDialogue(currentNode)
})

// TODO list in in browser console
const TODO = [
    "Proper documentation",
    "Suggestion, only repeat Alf after X amount of failiures",
]

TODO.forEach(element => {
    console.log("TODO: " + element);
});