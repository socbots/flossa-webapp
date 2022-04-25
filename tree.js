// CLASSES 

// This class is the node for our tree structure.
// It should never be a leaf node, and should always have child nodes.
class Question {
    constructor(tts,
        nodeAAnswer,
        nodeBAnswer,
        nodeCAnswer = undefined,
        movement = undefined) {
        this.tts = tts;
        this.nodeAAnswer = nodeAAnswer;
        this.nodeBAnswer = nodeBAnswer;
        this.nodeCAnswer = nodeCAnswer;
        this.movement = movement;
    }
    setNodes(nodeA, nodeB, nodeC = undefined) {
        this.nodeA = nodeA;
        this.nodeB = nodeB;
        this.nodeC = nodeC;
    }
    setMovement(gesture, time = 0) {
        this.movement = { gesture, time }
    }
}

class trickQuestion {
    constructor(tts,
        nodeAAnswer,
        nodeBAnswer,
        nodeCAnswer = undefined,
        movement = undefined,
        nextNode = undefined) {
        this.tts = tts;
        this.nextNode = nextNode;
        this.nodeAAnswer = nodeAAnswer;
        this.nodeBAnswer = nodeBAnswer;
        this.nodeCAnswer = nodeCAnswer;
        this.movement = movement;
    }
    setNextNode(node) {
        this.nextNode = node;
    }
    setMovement(gesture, time = 0) {
        this.movement = { gesture, time }
    }
}

class Monologue {
    constructor(tts,
        nextNode = undefined,
        movement = undefined) {
        this.tts = tts;
        this.nextNode = nextNode;
        this.movement = movement;
    }
    setNextNode(node) {
        this.nextNode = node;
    }
    setMovement(gesture, time = 0) {
        this.movement = { gesture, time }
    }
}

class Video {
    constructor(tts = undefined,
        nextNode = undefined,
        movement = undefined,
        video = undefined) {
        this.tts = tts;
        this.nextNode = nextNode;
        this.video = video;
        this.movement = movement;
    }
    setNextNode(node) {
        this.nextNode = node;
    }
    setVideo(video, videoDelayStart = 0, videoDuration = 10000) {
        this.video = video;
        this.videoDelayStart = videoDelayStart;
        this.videoDuration = videoDuration;
    }
    setMovement(gesture, time = 0) {
        this.movement = { gesture, time }
    }
}

// The EndTree class is used as the leaf nodes of our tree structure
class EndTree {
    constructor(tts, video = undefined, movement = undefined) {
        this.tts = tts;
        this._video = video
        this._movement = movement;
    }
    setMovement(gesture, time = 0) {
        this._movement = { gesture, time }
    }
}

/************* Interaction Tree *************/
// dialog found in text.js
// emote list for gestures found in gesture.js
// We create the children and then the next line before an empty line we set the children to their parent node.
function createTree() {
    // startNode == Root Node
    let startNode = new Question(intro.sentence, intro.continue_no, intro.continue_yes);
    startNode.setMovement(emoteList.wave_left); //Make Alf wave

    //video tutorial node
    const videoTutorialNode = new Video(tts = sentence_video.sentence);
    videoTutorialNode.setVideo(
        "./media/tutorial540p.mp4#t=12",
        videoDelayStart = 13000, videoDuration = 16000
    );
    videoTutorialNode.setMovement(emoteList.look_down, 12000); //Make Alf look down (on the screen, delayed until video starts)
    startNode.setNodes(new EndTree(cancel, ), videoTutorialNode);

    //question 01
    const questionNode01 = new trickQuestion(question_01.sentence, question_01.answerA, question_01.answerB, question_01.answerC);
    videoTutorialNode.setNextNode(nextNode = questionNode01);
    questionNode01.setMovement(emoteList.look_up); //Make Alf look back up for question

    //monologue 01
    const monologueNode01 = new Monologue(
        monologue_01.sentence
    );

    // Set monologue on question 01
    questionNode01.setNextNode(monologueNode01);

    //question 02
    const questionNode02 = new Question(question_02.sentence, question_02.answerA, question_02.answerB, question_02.answerC);
    monologueNode01.setNextNode(nextNode = questionNode02);

    //question 02 correct answer
    const questionNode02Correct = new Monologue(
        question_02.correct,
    );
    //question 02 wrong answer
    const questionNode02Wrong = new Monologue(
        question_02.wrong,
    );
    questionNode02.setNodes(questionNode02Correct, questionNode02Wrong, questionNode02Wrong);

    questionNode02Correct.setNextNode(new EndTree(outro));
    questionNode02Wrong.setNextNode(new EndTree(outro));
    return startNode;
}

function getAbortNode() {
    return new EndTree(cancel)
}