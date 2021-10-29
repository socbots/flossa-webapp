// This function starts and moves the dialog onwards 
function startDialogue(notUnderstod = false, setQuestions = true) {
    hideButtons();
    if (setQuestions) {
        setQuestion(currentNode, notUnderstod);
    }
    if (currentNode._movement || undefined) {
        setGesture(currentNode._movement);
    }
    // If the new node has an attribute _text getter it is of the type EndTree which then won't continue the dialogue
    // If it's the tutorial video then it'll play, close after 50 seconds and start the next dialogue
    if (currentNode instanceof Question && currentNode.video || undefined) {
        console.log("startDialogue: video node: isRec=", isRec);
        setTimeout(() => {
            console.log("Starting tutorial video")
            setVideo(currentNode.video);
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

// Video properties, adjusted for Alf robot (2021)
function setVideo(url) {
    videoPlayer = document.getElementById("video");
    videoPlayer.src = url;
    videoPlayer.width = 1000;
    videoPlayer.height = 700;
    iframeModal();
}

// Modal for video
function iframeModal() {
    var iframeModal = document.getElementById("iframeModal");
    var span = document.getElementById("iframeClose");
    iframeModal.style.display = "block";
    // When the user clicks on <span> (x), close the modal and start next Dialogue in tree
    span.addEventListener('click', function() {
        iframeModal.style.display = "none";
        currentNode = currentNode.nodeA;
        startDialogue();
    });
}

// Sends gesture commands to backend
function setGesture(movement) {
    url = "http://alfsse.herokuapp.com/move" //Backend adress
    fetch(url, {
            method: 'POST',
            body: JSON.stringify(movement),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        .then(res => res.json())
        .then((res2) => {
            console.log("movement res from heroku:", res2);
        });
}

// Populates answer answer-buttons with node answer element
function setAnswers(node) {
    const nodeAAnswer = document.getElementById("node-A");
    const nodeBAnswer = document.getElementById("node-B");
    const nodeCAnswer = document.getElementById("node-C")

    if (node instanceof Question) {
        answerFound = false;
        // Show hide buttons
        showHideNodeAnswer(nodeAAnswer, node.nodeA, node.nodeAAnswer);
        showHideNodeAnswer(nodeBAnswer, node.nodeB, node.nodeBAnswer);
        showHideNodeAnswer(nodeCAnswer, node.nodeC, node.nodeCAnswer);

    } else {
        console.log("NODE=", node);
    }
}

function setQuestion(node) {
    // const question = document.getElementById("question");
    //setAnswers(node, notUnderstod);
    /* The TTS API uses SSML so the text should be within <speak> tags
     * If the user input was not understod add "jag förstod inte..." and a 1sec break between the question.
     * node?._text || node.question means that if the node is of the type EndTree it will have a ._text variable else it is a Question and has a .question variable.
     */
    const text = notUnderstod ?
        '<speak> Jag förstod inte vad du menade? <break time="1s"/>' /*+ ((node._text || undefined) || node.question) +*/ + '</speak>' :
        '<speak>' + ((node._text || undefined) || node.question) + '</speak>';

    const point = text.search("<break");
    const textNewline = text.slice(0, point) + "<br>" + text.slice(point)

    // question.innerHTML = point < 0 ? text : textNewline;
    textToSpeech(text);
}



// Shows/hides answer buttons with CSS
function showHideNodeAnswer(element, node, nodeAnswer) {
    // console.log("nodeanswer: ", nodeAnswer);
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

// Test to trigger microphone and audio request from browser
navigator.mediaDevices.getUserMedia({ audio: true })
const rootNode = createTree(); // create node tree from tree.js, save rootNode incase of reset
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
    "DONE - Move 'Vad jag hörde' to a fixed position, higher up",
    "DONE - Fix dental floss blue background image as pepper",
    "DONE - Change button colors to green, RGB of about: (25,150,100)",
    "DONE - Don't have subtitles, only the dental floss background",
    "DONE - Hide answers until question has been fully asked",
    "DONE - Update README, pretty images",
    "DONE, now waits 5 seconds than reloads page - Alf Iimediately start speaking after tree is done?",
    "Proper documentation",
    "First miliseconds of audio seems to be not included in blob after changing to WebRTC swap, problem on short voice lines like 'jo' or 'nej'",
]

TODO.forEach(element => {
    console.log("TODO: " + element);
});