// CLASSES 

class Question {
  constructor(question, leftAnswer, rightAnswer) {
    this.question = question;
    this.leftAnswer = leftAnswer;
    this.rightAnswer = rightAnswer;
    this.leftNode = null;
    this.rightNode = null;
  }
  setLeftNode(node) {
    this.leftNode = node;
  }
  setRightNode(node) {
    this.rightNode = node;
  }
  setNodes(left, right) {
    this.leftNode = left;
    this.rightNode = right;
  }
}

class RobotFunction {
  constructor(text) {
    this._text = text;
  }
  set text(input) {
    this._text = input;
  }
  get text() {
    return this._text;
  }
}

// CREATE QUESTIONS TREE

function createTree() {
  // Root Node
  let greeting = new Question("Hej! Vill du tala med mig", "nej", "jo");
  let greetingFollow = new Question("Hur Känner du dig inför besöket?", "spänd", "lugn");
  greeting.setNodes(new RobotFunction("Ha en trevlig dag"), greetingFollow);

  let flossing = new Question("Vill du ha hygienråd?", "nej", "jo");
  let relax = new Question("Kan jag hjälpa dig slappna av", "jo", "nej");
  greetingFollow.setNodes(relax, flossing);

  let relaxEnd = new RobotFunction("Här är en video för att hjälpa dig slappna av: <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' >Video</a>")
  relax.setNodes(relaxEnd, flossing);

  let flossingFollow = new Question("Använder du tandtråd?", "nej", "jo");
  let guidance = new Question("Hjälp med att hitta rätt?", "nej", "jo");
  flossing.setNodes(flossingFollow, guidance);

  let flossingSometimes = new RobotFunction("Här är en länk till info om tandhygien: <a href='https://www.tandlakare.se/tandhygien/' >Video</a>")
  flossingFollow.setNodes(flossingSometimes, flossingSometimes);

  let guidanceFollow = new Question("Välj din tandläkare");
  guidance.setNodes(new RobotFunction("Ha en trevlig dag"), guidanceFollow);

  guidanceFollow.setNodes(new RobotFunction("Ha en trevlig dag"), new RobotFunction("Ha en trevlig dag"));
  console.log(greeting);
  return greeting;
}

//const rootNode = createTree();
