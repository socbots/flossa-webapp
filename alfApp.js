// This function starts and moves the dialog onwards 
function startDialogue(notUnderstod = false, setQuestions = true) {
    if (setQuestions) {
        setQuestion(currentNode, notUnderstod);
    } // If the new node has a _text getter it is of the type RobotFunction Then we don't continue the dialogue
    if (currentNode._video || undefined) {
        console.log("video found")
        setVideo(currentNode._video)
        videoRunning = true;
        document.getElementById("talkbox").style.paddingTop = "300px";
        //window.scrollto(0,100)
        window.scrollTo(0, 1);
    }
    if (currentNode._movement || undefined) {
        console.log("movement found")
        setGesture(currentNode._movement)
    }
}

function setVideo(url) {
    videoPlayer = document.getElementById("video");
    videoPlayer.src = url;
    videoPlayer.width = 1000;
    videoPlayer.height = 700;
    iframeModal();
}

function iframeModal() {
    // Get the modal
    var iframeModal = document.getElementById("iframeModal");
    // Get the <span> element that closes the modal
    var span = document.getElementById("iframeClose");
    // When the user clicks on the button, open the modal
    iframeModal.style.display = "block";
    // When the user clicks on <span> (x), close the modal
    span.addEventListener('click', function() {
        location.reload();
    });
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == iframeModal) {
            location.reload();
        }
    }
}

function setGesture(movement) {
    /*     url = "http://193.167.34.217:5000/move"
            //url = "http://192.168.1.38:5000/move"
        fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    gesture: movement.gesture,
                    bodyPart: movement.bodyPart,
                    direction: movement.direction,
                    distance: movement.distance
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
            .then(res => res.json())
            .then(console.log) */
    console.log(movement)
}

function setAnswers(node) {
    const leftAnswer = document.getElementById("left_answer");
    const rightAnswer = document.getElementById("right_answer");
    if (node._text || undefined) {
        leftAnswer.innerHTML = "^";
        rightAnswer.innerHTML = "^";
    } else {
        leftAnswer.innerHTML = node.leftAnswer;
        rightAnswer.innerHTML = node.rightAnswer;
    }
}

// 
function setQuestion(node) {
    const question = document.getElementById("question");
    setAnswers(node, notUnderstod);
    // The TTS API uses SSML so the text should be within <speak> tags
    // If the user input was not understod add "jag förstod inte..." and a 1sec break between the question.
    // node?._text || node.question means that if the node is of the type RobotFunction it will have a ._text variable else it is a Question and has a .question variable.
    const text = notUnderstod ?
        '<speak> Jag förstod inte vad du menade? <break time="1s"/>' + ((node._text || undefined) || node.question) + '</speak>' :
        '<speak>' + ((node._text || undefined) || node.question) + '</speak>';

    const point = text.search("<break");
    const textNewline = text.slice(0, point) + "<br>" + text.slice(point)

    question.innerHTML = point < 0 ? text : textNewline;
    textToSpeech(text);
}





let detectedCounter = 0;

function isDetected(state) {
    if (state && !videoRunning) {
        detectedCounter = 0;
        if (!dialogRunning) {
            notUnderstod = false;
            currentNode = rootNode;
            startDialogue(currentNode);
            dialogRunning = true;
            //console.log("is see you")
        }
    } else {
        detectedCounter += 1;
        if (detectedCounter > 50 && dialogRunning) {
            currentNode = getAbortNode()
            notUnderstod = false;
            startDialogue();
            dialogRunning = false;
            console.log("bye bye")
        }
    }
}
window.scrollTo(0, 1);

// Test to trigger microphone and audio request from browser
navigator.mediaDevices.getUserMedia({ audio: true })
    // We save the rootNode incase we want to reset the dialogue at some point
    // createTree() is from the tree.js file
const rootNode = createTree();
let currentNode = rootNode;
let notUnderstod = false;
let dialogRunning = false;

// these create functions are from the speech.js file
//button_callback();

let textToSpeech = createSpeechFunction();

let videoRunning = false;

document.getElementById("speak").addEventListener("click", () => { isDetected(true) })

// I don't like using global flags but since I can't find a rec.running, rec.state, rec.isRecognizing etc. variable here we are. 
//let notUnderstod = false;
//setButtonListeners();
//setInterval(() => { isDetected(detected); }, 500);

//fetch("https://193.167.34.217/robotfunction")
//  .then((d)=> console.log(d))