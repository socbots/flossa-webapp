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
    let startNode = new Question(intro.sentence, intro.present, intro.say, intro.deaf);

    const presentNode = new Monologue(
        present_txt
    );
    presentNode.setMovement(emoteList.wave_left, 3500);

    const presentContinueNode = new Monologue(
        present_continue_txt
    );

    const sayNode = new Monologue(
        say_txt
    );
    sayNode.setMovement(emoteList.look_up, 3500);

    const deafNode = new Monologue(
        deaf_txt
    );

    const slut = new EndTree("", );

    startNode.setNodes(presentNode, sayNode, deafNode)
    presentNode.setNextNode(presentContinueNode)
    presentContinueNode.setNextNode(slut)
    sayNode.setNextNode(slut)
    deafNode.setNextNode(slut)

    return startNode;
}

function getAbortNode() {
    return new EndTree(cancel)
}