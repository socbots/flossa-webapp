
function startDialogue(node, notUnderstod = false) {
  currentNode = node;
  setQuestion(node, notUnderstod);
  // If the new node has a _text getter it is of the type RobotFunction Then we don't continue the dialogue
  if (!node?._text && !isRec) {
    isRec = true
    rec.start();
  }
}

function setQuestion(node, notUnderstod = false) {
  const question = document.getElementById("question");
  const text = notUnderstod ?
    '<speak> Jag förstod inte vad du menade? <break time="1s"/>' + (node?._text || node.question)+'</speak>' :
    '<speak>'+(node?._text || node.question)+'</speak>';
  question.innerHTML = text;
  textToSpeech(text);
}

function checkInput() {
  const result = document.getElementById("result").innerHTML;
  const alfTalkbox = document.getElementById("alf_talkbox");
  isRec = false
  if (alfTalkbox.innerHTML.length > 10) {
    alfTalkbox.innerHTML = "";
  }
  console.log(currentNode);
  if (currentNode.rightAnswer.includes(result)) {
    console.log("Going right");
    startDialogue(currentNode.rightNode);
  }
  else if (currentNode.leftAnswer.includes(result)) {
    console.log("Going left");
    startDialogue(currentNode.leftNode);
  }
  else {
    startDialogue(currentNode, true);
  }
}

const rootNode = createTree();
let currentNode = rootNode;
let rec = createRecognitionObject();
let isRec = false;
const textToSpeech = createSpeechFunction();

startDialogue(currentNode);
