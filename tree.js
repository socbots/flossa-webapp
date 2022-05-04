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

/** Interaction Tree english */
function createTreeEng() {
    /** Make all nodes */
    let startNode = new Monologue(eng_welcome.sentence);
    const presentNode = new Monologue(eng_present_purpose.sentence);
    const questionNode_01 = new Question(eng_question_01.sentence, eng_question_01.flossa, eng_question_01.brush, eng_question_01.stop);
    const questionNode_01_alternative = new Question(eng_question_01_alternative.sentence, eng_question_01_alternative.flossa, eng_question_01_alternative.brush, eng_question_01_alternative.stop);

    /** Make Flossa Nodes*/
    const flossa_startNode = new Monologue(eng_flossa_start.sentence);
    const flossa_video_monologueNode = new Monologue(eng_flossa_video_01.pre_sentence);
    const flossa_videoNode_01 = new Video(tts = eng_flossa_video_01.sentence);
    const flossa_monologueNode_01 = new Monologue(eng_flossa_monologue_01.sentence);
    const flossa_questionNode_01 = new trickQuestion(eng_flossa_question_01.sentence, eng_flossa_question_01.answerA, eng_flossa_question_01.answerB, eng_flossa_question_01.answerC);
    const flossa_questionNode_01_monologueResponse = new Monologue(eng_flossa_question_01_response.sentence);
    const flossa_questionNode_02 = new Question(eng_flossa_question_02.sentence, eng_flossa_question_02.answerA, eng_flossa_question_02.answerB, eng_flossa_question_02.answerC);
    const flossa_questionNode_02_correctAnswer = new Monologue(eng_flossa_question_02.correct);
    const flossa_questionNode_02_wrongAnswer = new Monologue(eng_flossa_question_02.wrong);
    const flossa_endNode = new Monologue(eng_flossa_end.sentence);

    /** Make Brushing nodes*/
    const brushing_startNode = new Monologue(eng_brushing_start.sentence);
    const brushing_monologueNode_01 = new Monologue(eng_brushing_monologue_01.point_01);
    const brushing_monologueNode_02 = new Monologue(eng_brushing_monologue_01.point_02);
    const brushing_monologueNode_03 = new Monologue(eng_brushing_monologue_01.point_03);
    const brushing_monologueNode_04 = new Monologue(eng_brushing_monologue_01.point_04);
    const brushing_monologueNode_05 = new Monologue(eng_brushing_monologue_01.point_05);
    const brushing_monologueNode_06 = new Monologue(eng_brushing_monologue_02.sentence);
    const brushing_questionNode_01 = new Question(eng_brushing_question_01.sentence, eng_brushing_question_01.answerA, eng_brushing_question_01.answerB);
    const brushing_questionNode_01_correctAnswer = new Monologue(eng_brushing_question_01.correct)
    const brushing_questionNode_01_wrongAnswer = new Monologue(eng_brushing_question_01.wrong);
    const brushing_endNode = new Monologue(eng_brushing_end.sentence);

    /** Make endTree/stopNode */
    const stopNode = new EndTree(eng_outro.sentence,);

    /** Set all child nodes to correct parent */
    startNode.setNodes(presentNode);
    presentNode.setNodes(questionNode_01);
    questionNode_01.setNodes(flossa_startNode, brushing_startNode, stopNode);
    questionNode_01_alternative.setNodes(flossa_startNode, brushing_startNode, stopNode);
    /** Flossa */
    flossa_startNode.setNodes(flossa_video_monologueNode);
    flossa_video_monologueNode.setNodes(flossa_videoNode_01);
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
        videoDelayStart = 0, videoDuration = 19500
    );

    return startNode;
}



// Swe tree, quick fix
function createTreeSwe() {
    /** Make all nodes */
    let startNode = new Monologue(swe_welcome.sentence);
    const presentNode = new Monologue(swe_present_purpose.sentence);
    const questionNode_01 = new Question(swe_question_01.sentence, swe_question_01.flossa, swe_question_01.brush, swe_question_01.stop);
    const questionNode_01_alternative = new Question(swe_question_01_alternative.sentence, swe_question_01_alternative.flossa, swe_question_01_alternative.brush, swe_question_01_alternative.stop);

    /** Make Flossa Nodes*/
    const flossa_startNode = new Monologue(swe_flossa_start.sentence);
    const flossa_video_monologueNode = new Monologue(swe_flossa_video_01.pre_sentence);
    const flossa_videoNode_01 = new Video(tts = swe_flossa_video_01.sentence);
    const flossa_monologueNode_01 = new Monologue(swe_flossa_monologue_01.sentence);
    const flossa_questionNode_01 = new trickQuestion(swe_flossa_question_01.sentence, swe_flossa_question_01.answerA, swe_flossa_question_01.answerB, swe_flossa_question_01.answerC);
    const flossa_questionNode_01_monologueResponse = new Monologue(swe_flossa_question_01_response.sentence);
    const flossa_questionNode_02 = new Question(swe_flossa_question_02.sentence, swe_flossa_question_02.answerA, swe_flossa_question_02.answerB, swe_flossa_question_02.answerC);
    const flossa_questionNode_02_correctAnswer = new Monologue(swe_flossa_question_02.correct);
    const flossa_questionNode_02_wrongAnswer = new Monologue(swe_flossa_question_02.wrong);
    const flossa_endNode = new Monologue(swe_flossa_end.sentence);

    /** Make Brushing nodes*/
    const brushing_startNode = new Monologue(swe_brushing_start.sentence);
    const brushing_monologueNode_01 = new Monologue(swe_brushing_monologue_01.point_01);
    const brushing_monologueNode_02 = new Monologue(swe_brushing_monologue_01.point_02);
    const brushing_monologueNode_03 = new Monologue(swe_brushing_monologue_01.point_03);
    const brushing_monologueNode_04 = new Monologue(swe_brushing_monologue_01.point_04);
    const brushing_monologueNode_05 = new Monologue(swe_brushing_monologue_01.point_05);
    const brushing_monologueNode_06 = new Monologue(swe_brushing_monologue_02.sentence);
    const brushing_questionNode_01 = new Question(swe_brushing_question_01.sentence, swe_brushing_question_01.answerA, swe_brushing_question_01.answerB);
    const brushing_questionNode_01_correctAnswer = new Monologue(swe_brushing_question_01.correct)
    const brushing_questionNode_01_wrongAnswer = new Monologue(swe_brushing_question_01.wrong);
    const brushing_endNode = new Monologue(swe_brushing_end.sentence);

    /** Make endTree/stopNode */
    const stopNode = new EndTree(swe_outro.sentence,);
    /** Set all child nodes to correct parent */
    startNode.setNodes(presentNode);
    presentNode.setNodes(questionNode_01);
    questionNode_01.setNodes(flossa_startNode, brushing_startNode, stopNode);
    questionNode_01_alternative.setNodes(flossa_startNode, brushing_startNode, stopNode);
    /** Flossa */
    flossa_startNode.setNodes(flossa_video_monologueNode);
    flossa_video_monologueNode.setNodes(flossa_videoNode_01);
    flossa_videoNode_01.setNodes(flossa_monologueNode_01);
    flossa_monologueNode_01.setNodes(flossa_questionNode_01);
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
        videoDelayStart = 0, videoDuration = 19500
    );

    return startNode;
}