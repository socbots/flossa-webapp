// CLASSES 

// This class is the node for our tree structure. It should never be a leaf node, and should allways have 2 child nodes.
class Question {
  constructor(question, leftAnswer, rightAnswer) {
    this.question = question;
    this.leftAnswer = leftAnswer;
    this.rightAnswer = rightAnswer;
    this.leftNode = null;
    this.rightNode = null;
    this.movement = null;
  }
  setNodes(left, right) {
    this.leftNode = left;
    this.rightNode = right;
  }
  setMovement(bodyPart,gesture,direction,distance){
    this.movement = 
      {
        bodyPart: bodyPart,
        gesture: gesture,
        direction: direction,
        distance: distance,
      }
  }
}

// The RobotFunction class is used as the leaf nodes of our tree structure
// This means that when we encounter a RoboFunction the dialogue has ended.
class RobotFunction {
  constructor(text, video = undefined,movement = undefined) {
    this._text = text;
    this._video = video
    this.movement = movement;
  }
  setMovement(bodyPart,gesture,direction,distance){
    this.movement = 
      {
        bodyPart: bodyPart,
        gesture: gesture,
        direction: direction,
        distance: distance,
      }
  }
}

// CREATE QUESTIONS TREE

// This was a bit hard to populate and make it look nice/easy to understand. Use miro interaction tree to make it easier to follow
// We create the children and then the next line before an empty line we set the children to their parent node.
function createTree() {
  // greeting == Root Node
  let greeting = new Question("Hej! Vill du tala med mig", "nej", "jo");

  const moveHead= {
    bodyPart: "left_hand",
    gesture: "wave"

  }

  let greetingFollow = new Question("Hur Känner du dig inför besöket?", "spänd", "lugn");
  greeting.setNodes(new RobotFunction("Ha en trevlig dag!", video = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1", ), greetingFollow);

  let flossing = new Question("Vill du ha hygienråd?", "jo", "nej");
  let relax = new Question("Kan jag hjälpa dig slappna av", "jo", "nej");
  greetingFollow.setNodes(relax, flossing);

  let relaxEnd = new RobotFunction("Här är en video för att hjälpa dig slappna av!", video = 'https://www.youtube.com/embed/dQw4w9WgXcQ')
  relax.setNodes(relaxEnd, flossing);

  let flossingFollow = new Question("Använder du tandtråd?", "nej", "jo");
  let guidance = new Question("Hjälp med att hitta rätt?", "nej", "jo");
  flossing.setNodes(flossingFollow, guidance);

  let flossingSometimes = new RobotFunction("Här är en video om tandhygien", video = 'https://www.youtube.com/embed/vYbVHPLZrRo')
  flossingFollow.setNodes(flossingSometimes, flossingSometimes);

  let guidanceFollow = new Question("Välj din tandläkare");
  guidance.setNodes(new RobotFunction("Ha en trevlig dag"), guidanceFollow);

  guidanceFollow.setNodes(new RobotFunction("Ha en trevlig dag"), new RobotFunction("Ha en trevlig dag"));

  return greeting;
}

function getAbortNode(){
  return new RobotFunction("Ha en trevlig dag")
}

//const rootNode = createTree();
