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
    setNodes(node) {
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
    setNodes(node) {
        this.nextNode = node;
    }
    setMovement(gesture, time = 0) {
        this._movement = { gesture, time }
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
    setNodes(node) {
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

/** Interaction Tree */
function createTree() {
    /** Make all nodes */
    let startNode = new Monologue(welcome.sentence);
    const presentNode = new Monologue(present_purpose.sentence);
    const questionNode_01 = new Question(question_01.sentence, question_01.flossa, question_01.brush, question_01.stop);
    const questionNode_01_alternative = new Question(question_01_alternative.sentence, question_01_alternative.flossa, question_01_alternative.brush, question_01_alternative.stop);

    /** Make Flossa Nodes*/
    const flossa_startNode = new Monologue(flossa_start.sentence);
    const flossa_videoNode_01 = new Video(tts = flossa_video_01.sentence);
    const flossa_monologueNode_01 = new Monologue(flossa_monologue_01.sentence);
    const flossa_questionNode_01 = new trickQuestion(flossa_question_01.sentence, flossa_question_01.answerA, flossa_question_01.answerB, flossa_question_01.answerC);
    const flossa_questionNode_01_monologueResponse = new Monologue(flossa_question_01_response.sentence);
    const flossa_questionNode_02 = new Question(flossa_question_02.sentence, flossa_question_02.answerA, flossa_question_02.answerB, flossa_question_02.answerC);
    const flossa_questionNode_02_correctAnswer = new Monologue(flossa_question_02.correct);
    const flossa_questionNode_02_wrongAnswer = new Monologue(flossa_question_02.wrong);
    const flossa_endNode = new Monologue(flossa_end.sentence);

    /** Make Brushing nodes*/
    const brushing_startNode = new Monologue(brushing_start.sentence);
    const brushing_monologueNode_01 = new Monologue(brushing_monologue_01.point_01);
    const brushing_monologueNode_02 = new Monologue(brushing_monologue_01.point_02);
    const brushing_monologueNode_03 = new Monologue(brushing_monologue_01.point_03);
    const brushing_monologueNode_04 = new Monologue(brushing_monologue_01.point_04);
    const brushing_monologueNode_05 = new Monologue(brushing_monologue_01.point_05);
    const brushing_monologueNode_06 = new Monologue(brushing_monologue_02.sentence);
    const brushing_questionNode_01 = new Question(brushing_question_01.sentence, brushing_question_01.answerA, brushing_question_01.answerB);
    const brushing_questionNode_01_correctAnswer = new Monologue(brushing_question_01.correct)
    const brushing_questionNode_01_wrongAnswer = new Monologue(brushing_question_01.wrong);
    const brushing_endNode = new Monologue(brushing_end.sentence);

    /** Make endTree/stopNode */
    const stopNode = new EndTree(outro.sentence, );

    /** Set all child nodes to correct parent */
    startNode.setNodes(presentNode);
    presentNode.setNodes(questionNode_01);
    questionNode_01.setNodes(flossa_startNode, brushing_startNode, stopNode);
    questionNode_01_alternative.setNodes(flossa_startNode, brushing_startNode, stopNode);
    /** Flossa */
    flossa_startNode.setNodes(flossa_videoNode_01);
    flossa_videoNode_01.setNodes(flossa_monologueNode_01);
    flossa_monologueNode_01.setNodes(flossa_questionNode_01);
    flossa_questionNode_01.setNodes(flossa_questionNode_01_monologueResponse);
    flossa_questionNode_01_monologueResponse.setNodes(flossa_questionNode_02);
    flossa_questionNode_02.setNodes(flossa_questionNode_02_correctAnswer, flossa_questionNode_02_wrongAnswer, flossa_questionNode_02_wrongAnswer);
    flossa_questionNode_02_correctAnswer.setNodes(flossa_endNode);
    flossa_questionNode_02_wrongAnswer.setNodes(flossa_endNode);
    flossa_endNode.setNodes(questionNode_01_alternative);
    /** Brushing */
    brushing_startNode.setNodes(brushing_monologueNode_01);
    brushing_monologueNode_01.setNodes(brushing_monologueNode_02);
    brushing_monologueNode_02.setNodes(brushing_monologueNode_03);
    brushing_monologueNode_03.setNodes(brushing_monologueNode_04);
    brushing_monologueNode_04.setNodes(brushing_monologueNode_05);
    brushing_monologueNode_05.setNodes(brushing_monologueNode_06);
    brushing_monologueNode_06.setNodes(brushing_questionNode_01);
    brushing_questionNode_01.setNodes(brushing_questionNode_01_correctAnswer, brushing_questionNode_01_wrongAnswer)
    brushing_questionNode_01_correctAnswer.setNodes(brushing_endNode);
    brushing_questionNode_01_wrongAnswer.setNodes(brushing_endNode);
    brushing_endNode.setNodes(questionNode_01_alternative);

    /** Set flossa video on flossa video node */
    flossa_videoNode_01.setVideo(
        "./media/tutorial540p.mp4#t=12",
        videoDelayStart = 12000, videoDuration = 20000
    );

    return startNode;
}