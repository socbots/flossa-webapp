// CLASSES 

// This class is the node for our tree structure. It should never be a leaf node, and should allways have 2 child nodes.
class Question {
    constructor(question,
        nodeAAnswer = undefined,
        nodeBAnswer = undefined,
        nodeCAnswer = undefined,
        movement = undefined,
        video = undefined,
        monologue = false,
        delayedMovement = undefined) {
        this.question = question;
        this.video = video;
        this.nodeAAnswer = nodeAAnswer;
        this.nodeBAnswer = nodeBAnswer;
        this.nodeCAnswer = nodeCAnswer;
        this._movement = movement;
        this.monologue = monologue;
        this.delayedMovement = delayedMovement;
    }
    setVideo(video, timeUntilStart, duration) {
        this.video = video;
        this.timeUntilStart = timeUntilStart;
        this.duration = duration;
    }
    setNodes(nodeA, nodeB = undefined, nodeC = undefined) {
        this.nodeA = nodeA;
        this.nodeB = nodeB;
        this.nodeC = nodeC;
    }
    setMovement(movObj) {
        /*
        {
            bodyPart: bodyPart,
            gesture: gesture,
            direction: direction,
            distance: distance,
        }
        */
        this._movement = movObj
    }
    setDelayedMovement(gesture, time = undefined) {
        /* object with the shape:
        {
            bodyPart: bodyPart,
            gesture: gesture,
            direction: direction,
            distance: distance,
        }
        */
        this.delayedMovement = { gesture, time };
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
    setMovement(movObj) {
        /*
        {
            bodyPart: bodyPart,
            gesture: gesture,
            direction: direction,
            distance: distance,
        }
        */
        this._movement = movObj
    }
}

const emoteList = {
    wave_left: {
        bodyPart: "left_hand",
        gesture: "wave"
    },
    look_down: {
        bodyPart: "head",
        direction: "down",
        distance: 5
    },
    look_up: {
        bodyPart: "head",
        direction: "up",
        distance: 8
    }
}

const mening1 = "Hej! Vill du lära dig hur du använder tandtråd på bästa sätt? Du kan svara genom tal eller med att trycka på min skärm."
const mening2 = "Fint. Det är omöjligt att göra rent mellan tänderna med en vanlig tandborste. Tandköttsinflammationer och kariesangrepp \
                startar ofta där. Därför rekommenderas du att använda tandtråden en gång varje dag innan du borstar tänderna. Ta en rejäl \
                bit tandtråd och linda den runt fingrarna. Låt tandtråden försiktigt följa den ena tandytan ner i tandköttsfickan. Dra \
                den sakta uppåt igen. För sedan ner tråden längs med den andra tandytan och upp igen. Gör så mellan alla tänder, också \
                de längst bak."
const mening3 = "Nu har jag en fråga till dig. Ibland börjar de blöda när du använder tandtråd. Vad tror du det kan bero på. Säg: fel \
                teknik, tecken på tandköttsinflammation, eller båda. Du kan också svara genom att trycka på min skärm."
const mening4 = "Kommer du ihåg hur ofta jag rekommenderade att du ska använda tandtråd. Säg: varje dag, varannan dag eller tredje dag. \
                Du kan också svara genom att trycka på min skärm."
const goodBye = "Diskutera gärna med tandläkaren eller tandhygienisten vilken om vilken tandtråd,eller borste som passar dig. \
                Sköt om dig nu och ha det så bra"

// CREATE QUESTIONS TREE

// This was a bit hard to populate and make it look nice/easy to understand. Use miro interaction tree to make it easier to follow
// We create the children and then the next line before an empty line we set the children to their parent node.
function createTree() {
    // greeting == Root Node
    let greeting = new Question(mening1, "nej", "ja");
    // {bodyPart: "left_hand", direction: "up", distance: 5.0}
    greeting.setMovement(emoteList.wave_left);

    const flossingTutorial = new Question(question = mening2);
    flossingTutorial.setVideo(
        "./media/toothflesh.mp4#t=12",
        13000,
        16000
    ); // Can't call video="url" like in Python, so a separate function is needed
    //Make alf look down on the screen
    flossingTutorial.setDelayedMovement(emoteList.look_down);
    greeting.setNodes(new RobotFunction("Ha en trevlig dag!", ), flossingTutorial);


    const flossingFails = new Question(mening3, nodeAAnswer = "fel teknik", nodeBAnswer = "tecken på tandköttsinflammation", nodeCAnswer = "båda");
    flossingTutorial.setNodes(nodeA = flossingFails);
    //Make alf look back up when asking question
    flossingFails.setMovement(emoteList.look_up);

    const illusion = new Question(
        'Båda är rätta svaret <break time="1s"/>',
        nodeAAnswer = undefined,
        nodeBAnswer = undefined,
        nodeCAnswer = undefined,
        movement = undefined,
        video = undefined,
        monologue = true
    );

    flossingFails.setNodes(illusion, illusion, illusion);

    // Super fail: checkInput() will split up the answer and then see if that word is contained in
    // NodeA, NodeB, NodeC. "dag" exists in every answer so NodeA will always be chosene
    const flossingHowOften = new Question(mening4, "Varje", "Varannan", "Tredje");
    illusion.setNodes(nodeA = flossingHowOften);

    const flossingCorrectAnswer = new Question(
        'Det var rätt! Svaret är varje dag <break time="1s"/>',
        nodeAAnswer = undefined,
        nodeBAnswer = undefined,
        nodeCAnswer = undefined,
        movement = undefined,
        video = undefined,
        monologue = true
    );
    const flossingWrongAnswer = new Question(
        'Det var fel. Svaret är varje dag <break time="1s"/>',
        nodeAAnswer = undefined,
        nodeBAnswer = undefined,
        nodeCAnswer = undefined,
        movement = undefined,
        video = undefined,
        monologue = true
    );
    flossingHowOften.setNodes(flossingCorrectAnswer, flossingWrongAnswer, flossingWrongAnswer);

    flossingCorrectAnswer.setNodes(new RobotFunction(goodBye));
    flossingWrongAnswer.setNodes(new RobotFunction(goodBye));

    /*
    let guidanceFollow = new Question("Välj din tandläkare");
    guidance.setNodes(new RobotFunction("Ha en trevlig dag"), guidanceFollow);

    guidanceFollow.setNodes(new RobotFunction("Ha en trevlig dag"), new RobotFunction("Ha en trevlig dag"));
*/
    return greeting;
}

function getAbortNode() {
    return new RobotFunction("Ha en trevlig dag")
}

//const rootNode = createTree();