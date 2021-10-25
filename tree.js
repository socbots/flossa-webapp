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
    /************* English *************/
    /****** Manuscript for robot ******/

const intro = {
    "sentence": "Hello! My name is Alf and I help here at the dental clinic. Would you like to learn how to use dental floss? You can answer by speech or by pressing my screen.",
    "continue_no": "No",
    "continue_yes": "Yes"
};

const cancel = "Have a nice day!"

const sentence_video = {
    "sentence": "Nice. It is impossible to completely clean between your teeth with a standard toothbrush. \
    Gingivitis and caries attack usually start from there. That is why it is recommended that you use dental \
    floss at least once a day before you brush your teeth. Take a long enough string of dental floss and spin it \
    around your fingers. Let the dental floss carefully follow the outline of your tooth and down into the gum. \
    Pull the dental floss carefully up again and down on the other side of your tooth. Repeat this stage for each tooth, even the ones in the back."
};

const question_01 = {
    "sentence": "Now I have a question for you. Sometimes your gum starts to bleed when you use dental floss. \
    What do you think is the cause of this? Say: Wrong technic, signs of gingivitis, or both. You can answer by speech of by using my screen.",
    "answerA": "Wrong technic",
    "answerB": "Signs of gingivitis",
    "answerC": "Both"
};

const monologue_01 = {
    "sentence": "Both is the correct answer <break time='1s'/>"
};

const question_02 = {
    "sentence": "Do you remember how often I recommended you use dental floss. Say: every day, every second day or every third day. You can answer by speech or using my screen.",
    "answerA": "Every day",
    "answerB": "Second day",
    "answerC": "Third day",
    "correct": "That was correct! It is every day. <break time='1s'/>",
    "wrong": "That was wrong. It is every day. <break time='1s'/>"
};

const outro = "Please discuss with your dentist or dental hygienist about what dental floss or toothbrush fits your needs the best. <break time='1s'/> Take care now and have a nice day."

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