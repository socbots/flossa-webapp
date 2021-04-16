
// This function starts and moves the dialog onwards 
function startDialogue(notUnderstod = false) {


  //currentNode = node;
  setQuestion(currentNode, notUnderstod);
  hideResult();

  // If the new node has a _text getter it is of the type RobotFunction Then we don't continue the dialogue
  if ((currentNode._text || undefined) && !isRec) {
    isRec = true
    rec.start();
  }
  else if (currentNode._video || undefined) {
    console.log("video found")
    setVideo(currentNode._video)
  }

}


function setVideo(url) {
  videoPlayer = document.getElementById("video");
  console.log(videoPlayer);
  videoPlayer.src = url;
  videoPlayer.width = 360;
  videoPlayer.height = 240;


}

function hideResult() {
  //document.getElementById("result").innerHTML = ""
  setTimeout(() => { document.getElementById("result").innerHTML = "" }, 2500)
}

function setAnswers(node) {
  const leftAnswer = document.getElementById("left_answer");
  const rightAnswer = document.getElementById("right_answer");
  console.log(node)
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
  notUnderstod = false;
}

function checkInput(res, isFinal = false) {
  console.log("Checking input");
  let result = res.results[0][0].transcript;
  // Test the user input against the left and right answers in our node.
  if (currentNode.rightAnswer.includes(result) && result) {
    console.log("Going right");
    // rec.abort() terminates
    rec.abort();
    currentNode = currentNode.rightNode;
    //   isRec = false
    //startDialogue(currentNode.rightNode);

  }
  else if (currentNode.leftAnswer.includes(result) && result) {
    console.log("Going left");
    //  isRec = false
    rec.abort();

    currentNode = currentNode.leftNode;
    // startDialogue(currentNode.leftNode);
  }
  // If we cant find a match for the input our user gives we startDialog with the current node and set the notUnderstod parameter to true
  else if (isFinal) {
    console.log("true final");
    // quickfix: I don't like this global variable but it works
    notUnderstod = true;
    rec.abort();

  }
}

function setButtonListeners() {
  const answers = Array.from(document.getElementsByClassName("answer_button"));
  console.log(answers)
  answers.forEach((btn) => {
    btn.addEventListener("click", () => {

    })
  })
}

// We save the rootNode incase we want to reset the dialogue at some point
// createTree() is from the tree.js file
const rootNode = createTree();
let currentNode = rootNode;
// these create functions are from the speech.js file
let rec = createRecognitionObject();
const textToSpeech = createSpeechFunction();
// I don't like using global flags but since I can't find a rec.running, rec.state, rec.isRecognizing etc. variable here we are. 
let isRec = false;
let notUnderstod = false;
setButtonListeners();
startDialogue(currentNode);
