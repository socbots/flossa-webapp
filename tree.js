// CLASSES 

// This class is the node for our tree structure. It should never be a leaf node, and should allways have 2 child nodes.
class Question {
    constructor(question, nodeAAnswer = undefined, nodeBAnswer = undefined, nodeCAnswer = undefined, movement = undefined, video = undefined) {
        this.question = question;
        this.video = video;
        this.nodeAAnswer = nodeAAnswer;
        this.nodeBAnswer = nodeBAnswer;
        this.nodeCAnswer = nodeCAnswer;
        this._movement = movement;
    }
    setVideo(video) {
        this.video = video;
    }
    setNodes(nodeA, nodeB = undefined, nodeC = undefined) {
        this.nodeA = nodeA;
        this.nodeB = nodeB;
        this.nodeC = nodeC;
    }
    setMovement(bodyPart = null, gesture = null, direction = null, distance = null) {
        this._movement = {
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
    constructor(text, video = undefined, movement = undefined) {
        this._text = text;
        this._video = video
        this._movement = movement;
    }
    setMovement(bodyPart = null, gesture = null, direction = null, distance = null) {
        this._movement = {
            bodyPart: bodyPart,
            gesture: gesture,
            direction: direction,
            distance: distance,
        }
    }
}

const wave_left = {
    bodyPart: "left_hand",
    gesture: "wave"
}

const mening1 = "Hej! Vill du lära dig hur du använder tandtråd på bästa sätt? Du kan svara genom tal eller med att trycka på min skärm."
const mening2 = "Fint. Det är omöjligt att göra rent mellan tänderna med en vanlig tandborste. Tandköttsinflammationer och kariesangrepp startar ofta där. Därför rekommenderas du att använda tandtråden en gång varje dag innan? du borstar tänderna. Ta en rejäl bit tandtråd och linda den runt fingrarna."
const mening3 = "Låt tandtråden försiktigt följa den ena tandytan ner i tandköttsfickan. Dra den sakta uppåt igen. För sedan ner tråden längs med den andra tandytan och upp igen. Gör så mellan alla tänder, också de längst bak."
const mening4 = "Nu har jag en fråga till dig. Ibland börjar de blöda när du använder tandtråd. Vad tror du det kan bero på. Säg: fel teknik, tecken på tandköttsinflammation, eller båda. Du kan också svara genom att trycka på min skärm."
const mening5 = "Kommer du ihåg hur ofta jag rekommenderade att du ska använda tandtråd. Säg: varje dag, varannan dag eller tredje dag. Du kan också svara genom att trycka på min skärm."

// CREATE QUESTIONS TREE

// This was a bit hard to populate and make it look nice/easy to understand. Use miro interaction tree to make it easier to follow
// We create the children and then the next line before an empty line we set the children to their parent node.
function createTree() {
    // greeting == Root Node
    let greeting = new Question(mening1, "nej", "ja", movement = wave_left);
    console.log("greeting is:", greeting);

    const flossingTutorial = new Question(question = mening2);
    flossingTutorial.setVideo("./media/Folktandvården Stockholm – Hur man använder tandtråd.mp4"); // Can't call video="url" like in Python, so a separate function is needed
    greeting.setNodes(new RobotFunction("Ha en trevlig dag!", "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"), flossingTutorial);
    
    const robotTellsYouHowToFloss = new Question(mening3);
    flossingTutorial.setNodes(nodeA = robotTellsYouHowToFloss);

    
    let flossingQuiz = new Question(mening4, nodeAAnswer = "fel teknik", nodeBAnswer = "tecken på tandköttsinflammation", nodeCAnswer = "båda");

    robotTellsYouHowToFloss.setNodes(nodeA = flossingQuiz);

    let flossing = new Question("Vill du ha hygienråd?", "jo", "nej", movement = { bodyPart: "head", direction: "up", distance: 4 });
    flossingQuiz.setNodes(flossing, flossing, flossing);
    /* 
    let relax = new Question("Kan jag hjälpa dig slappna av", "jo", "nej");
    let relaxEnd = new RobotFunction("Här är en video för att hjälpa dig slappna av!", video = 'https://www.youtube.com/embed/dQw4w9WgXcQ', movement = { gesture: "getSchwifty" })
    relax.setNodes(relaxEnd, flossing); */


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

function getAbortNode() {
    return new RobotFunction("Ha en trevlig dag")
}

//const rootNode = createTree();