
// This function starts and moves the dialog onwards 
function startDialogue(node, notUnderstod = false) {
  console.log(currentNode);
  currentNode = node;
  setQuestion(currentNode, notUnderstod);
  // If the new node has a _text getter it is of the type RobotFunction Then we don't continue the dialogue
  if (!node?._text && !isRec) {
    isRec = true
    rec.start();
  }
}

function hideResult(){
  setTimeout(()=>{document.getElementById("result").innerHTML = ""},2000)
}

function setAnswers(node){
  const leftAnswer = document.getElementById("left_answer");
  const rightAnswer = document.getElementById("right_answer");
  if (node?._text){

    leftAnswer.innerHTML = "^";
    rightAnswer.innerHTML = "^";
  }
  else{
  leftAnswer.innerHTML = node.leftAnswer;
  rightAnswer.innerHTML = node.rightAnswer;
}
}

function makesEyesLarger(){
  
}

// 
function setQuestion(node, notUnderstod = false) {
  const question = document.getElementById("question");
  setAnswers(node,notUnderstod);
  // The TTS API uses SSML so the text should be within <speak> tags
  // If the user input was not understod add "jag förstod inte..." and a 1sec break between the question.
  // node?._text || node.question means that if the node is of the type RobotFunction it will have a ._text variable else it is a Question and has a .question variable.
  const text = notUnderstod ?
    '<speak> Jag förstod inte vad du menade? <break time="1s"/>' + (node?._text || node.question)+'</speak>' :
    '<speak>'+(node?._text || node.question)+'</speak>';

  const point =  text.search("<break");
  const textNewline = text.slice(0,point)+"<br>"+text.slice(point)

  question.innerHTML = point < 0 ? text : textNewline ;
  textToSpeech(text);
}

function checkInput() {
  console.log("Checking input");
  const result = document.getElementById("result").innerHTML;
  isRec = false
  // Test the user input against the left and right answers in our node.
  if (currentNode.rightAnswer.includes(result) && result) {
    console.log(result)
    console.log("Going right");
    startDialogue(currentNode.rightNode);
  }
  else if (currentNode.leftAnswer.includes(result) && result) {
    console.log("Going left");
    startDialogue(currentNode.leftNode);
  }
  // If we cant find a match for the input our user gives we startDialog with the current node and set the notUnderstod parameter to true
  else {
    startDialogue(currentNode, notUnderstod = true);
    hideResult();
  }
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

startDialogue(currentNode);
