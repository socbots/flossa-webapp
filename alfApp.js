
// This function starts and moves the dialog onwards 
function startDialogue(notUnderstod = false) {
  setQuestion(currentNode, notUnderstod);
  hideResult();
  // If the new node has a _text getter it is of the type RobotFunction Then we don't continue the dialogue
  if (currentNode._video || undefined) {
    console.log("video found")
    setVideo(currentNode._video)
  }
}

function setVideo(url) {
  videoPlayer = document.getElementById("video");
  videoPlayer.src = url;
  videoPlayer.width = 360;
  videoPlayer.height = 240;
}

function hideResult() {
  document.getElementById("result").innerHTML = ""
}

function setAnswers(node) {
  const leftAnswer = document.getElementById("left_answer");
  const rightAnswer = document.getElementById("right_answer");
  if (node._text || undefined ) {
    leftAnswer.innerHTML = "^";
    rightAnswer.innerHTML = "^";
  }
  else {
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



function setButtonListeners() {
  const answers = Array.from(document.getElementsByClassName("answer_button"));
  answers.forEach((btn) => {
    btn.addEventListener("click", () => {

    })
  })
}

let detectedCounter =0;
function isDetected(state){
  if(state ){
    detectedCounter = 0;
    if (!dialogRunning){
      currentNode = rootNode;
      startDialogue(currentNode);
    dialogRunning = true;

      console.log("is see you")
    }
  }
  else {
    detectedCounter += 1;
    if (detectedCounter > 20 && dialogRunning){
      currentNode = getAbortNode()
      startDialogue();
      dialogRunning = false;
      console.log("bye bye")


    }
  }
}

// Test to trigger microphone and audio request from browser
navigator.mediaDevices.getUserMedia({ audio: true })
// We save the rootNode incase we want to reset the dialogue at some point
// createTree() is from the tree.js file
const rootNode = createTree();
let currentNode = rootNode;
let notUnderstod = false;
let dialogRunning = false;

// these create functions are from the speech.js file
button_callback();

  let textToSpeech = createSpeechFunction();
 // let textToSpeech
document.getElementById("speak").addEventListener("click",() => {
  console.log("button clicked")
});

// I don't like using global flags but since I can't find a rec.running, rec.state, rec.isRecognizing etc. variable here we are. 
//let notUnderstod = false;
setButtonListeners();
setInterval(() => {
  isDetected(detected);
}, 200);

