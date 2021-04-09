
// This function starts and moves the dialog onwards 
function startDialogue(node, notUnderstod = false) {
  console.log(currentNode);
  currentNode = node;
  setQuestion(node, notUnderstod);
  // If the new node has a _text getter it is of the type RobotFunction Then we don't continue the dialogue
  if (!node?._text && !isRec) {
    isRec = true
    rec.start();
  }
}

// 
function setQuestion(node, notUnderstod = false) {
  const question = document.getElementById("question");

  // The TTS API uses SSML so the text should be within <speak> tags
  // If the user input was not understod add "jag förstod inte..." and a 1sec break between the question.
  // node?._text || node.question means that if the node is of the type RobotFunction it will have a ._text variable else it is a Question and has a .question variable.
  const text = notUnderstod ?
    '<speak> Jag förstod inte vad du menade? <break time="1s"/>' + (node?._text || node.question)+'</speak>' :
    '<speak>'+(node?._text || node.question)+'</speak>';
  question.innerHTML = text;
  textToSpeech(text);
}

function checkInput() {
  const result = document.getElementById("result").innerHTML;
  isRec = false
  // Test the user input against the left and right answers in our node.
  if (currentNode.rightAnswer.includes(result)) {
    console.log("Going right");
    startDialogue(currentNode.rightNode);
  }
  else if (currentNode.leftAnswer.includes(result)) {
    console.log("Going left");
    startDialogue(currentNode.leftNode);
  }
  // If we cant find a match for the input our user gives we startDialog with the current node and set the notUnderstod parameter to true
  else {
    startDialogue(currentNode, notUnderstod = true);
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
