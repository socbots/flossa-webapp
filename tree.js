// CLASSES 

// This class is the node for our tree structure. It should never be a leaf node, and should always have 2 child nodes.
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

// The EndTree class is used as the leaf nodes of our tree structure
class EndTree {
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

// movObj emotelist for robot
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

/************* SVENSKA *************/
/****** Manuscript for robot ******/

const intro = {
    "sentence": "Hej! Jag heter Alf och hjälper till här i tandvården. Vill du lära dig hur du använder tandtråd på bästa sätt? Du kan svara genom tal eller med att trycka på min skärm.",
    "continue_no": "Nej",
    "continue_yes": "Ja"
};

const cancel = "Ha en trevlig dag!"

const sentence_video = {
    "sentence": "Fint. Det är omöjligt att göra rent mellan tänderna med en vanlig tandborste. Tandköttsinflammationer och kariesangrepp \
                startar ofta där. Därför rekommenderas du att använda tandtråden en gång varje dag innan du borstar tänderna. Ta en rejäl \
                bit tandtråd och linda den runt fingrarna. Låt tandtråden försiktigt följa den ena tandytan ner i tandköttsfickan. Dra \
                den sakta uppåt igen. För sedan ner tråden längs med den andra tandytan och upp igen. Gör så mellan alla tänder, också \
                de längst bak."
};

const question_01 = {
    "sentence": "Nu har jag en fråga till dig. Ibland börjar de blöda när du använder tandtråd. Vad tror du det kan bero på. Säg: fel \
    teknik, tecken på tandköttsinflammation, eller båda. Du kan också svara genom att trycka på min skärm.",
    "answerA": "Fel teknik",
    "answerB": "Tecken på tandköttsinflammation",
    "answerC": "Båda"
};

const monologue_01 = {
    "sentence": "Båda är rätta svaret <break time='1s'/>"
};

const question_02 = {
    "sentence": "Kommer du ihåg hur ofta jag rekommenderade att du ska använda tandtråd. Säg: varje dag, varannan dag eller tredje dag. \
                Du kan också svara genom att trycka på min skärm.",
    "answerA": "Varje",
    "answerB": "Varannan",
    "answerC": "Tredje",
    "correct": "Det var rätt! Svaret är varje dag <break time='1s'/>",
    "wrong": "Det var fel. Svaret är varje dag <break time='1s'/>"
};

const outro = "Diskutera gärna med tandläkaren eller tandhygienisten vilken om vilken tandtråd,eller borste som passar dig. \
                Sköt om dig nu och ha det så bra"

/************* Interaction Tree *************/
// We create the children and then the next line before an empty line we set the children to their parent node.
function createTree() {
    // startNode == Root Node
    let startNode = new Question(intro.sentence, intro.continue_no, intro.continue_yes);
    startNode.setMovement(emoteList.wave_left); //Make Alf wave

    //video tutorial node
    const videoTutorialNode = new Question(question = sentence_video.sentence);
    videoTutorialNode.setVideo(
        "./media/tutorial540p.mp4#t=12",
        13000,
        16000
    );
    videoTutorialNode.setDelayedMovement(emoteList.look_down); //Make Alf look down (on the screen, delayed until video starts)
    startNode.setNodes(new EndTree(cancel, ), videoTutorialNode);

    //question 01
    const questionNode01 = new Question(question_01.sentence, nodeAAnswer = question_01.answerA, nodeBAnswer = question_01.answerB, nodeCAnswer = question_01.answerC);
    videoTutorialNode.setNodes(nodeA = questionNode01);
    questionNode01.setMovement(emoteList.look_up); //Make Alf look back up for question

    //monologue 01
    const questionNode02 = new Question(
        monologue_01.sentence,
        nodeAAnswer = undefined,
        nodeBAnswer = undefined,
        nodeCAnswer = undefined,
        movement = undefined,
        video = undefined,
        monologue = true
    );

    questionNode01.setNodes(questionNode02, questionNode02, questionNode02);

    //question 02
    const questionNode03 = new Question(question_02.sentence, question_02.answerA, question_02.answerB, question_02.answerC);
    questionNode02.setNodes(nodeA = questionNode03);

    //question 02 correct answer
    const questionNode03Correct = new Question(
        question_02.correct,
        nodeAAnswer = undefined,
        nodeBAnswer = undefined,
        nodeCAnswer = undefined,
        movement = undefined,
        video = undefined,
        monologue = true
    );
    //question 02 wrong answer
    const questionNode03Wrong = new Question(
        question_02.wrong,
        nodeAAnswer = undefined,
        nodeBAnswer = undefined,
        nodeCAnswer = undefined,
        movement = undefined,
        video = undefined,
        monologue = true
    );
    questionNode03.setNodes(questionNode03Correct, questionNode03Wrong, questionNode03Wrong);

    questionNode03Correct.setNodes(new EndTree(outro));
    questionNode03Wrong.setNodes(new EndTree(outro));
    return startNode;
}

function getAbortNode() {
    return new EndTree(cancel)
}