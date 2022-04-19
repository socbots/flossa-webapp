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


const generateTree = (templateTree) => {
    /**
     A list of nodes that can be used to reset the tree or move to another point
     Could this be used for a Question which leads to the same node?
     */

    const checkpoints = [];

    const traverseNode = (node) => {
        switch (node.type) {
            case "question":
                let q;
                if (node.nodeC) {
                    q = new Question(node.sentence, node.answerA, node.answerB, node.answerC);
                    q.setNodes(traverseNode(node.nodeA), traverseNode(node.nodeB), traverseNode(node.nodeC))
                } else {
                    q = new Question(node.sentence, node.answerA, node.answerB);
                    q.setNodes(traverseNode(node.nodeA), traverseNode(node.nodeB))
                }
                // An example usage of checkpoint
                if (node.checkpoint) {
                    console.log("is checkpoint:", q)
                    checkpoints.push(q)
                }
                return q
            case "trickQuestion":
                const t = new trickQuestion(node.sentence, node.answerA, node.answerB, node.answerC);
                t.setNodes(traverseNode(node.nextNode));
                return t
            case "video":
                const v = new Video(node.sentence);
                v.setVideo(node.videoUrl, node.videoDelayStart, node.videoDuration);
                v.setNodes(traverseNode(node.nextNode));
                return v
            case "monologue":
                const m = new Monologue(node.sentence);
                m.setNodes(traverseNode(node.nextNode));
                return m
            case "reset":
                const r = new EndTree(node.sentence);
                return r
            default:
                console.log("Default");
                break;
        }
    }

    const tree = traverseNode(templateTree);
    return [tree, checkpoints];
}
/*
TODO: A question which leads to the same next question is now splitting the tree
    (ie. Hur många gånger flossa? "det var fel" och "det var rätt!" leder båda till "det var allt jag hade om tandtråd"
    men denna end node finns två gånger)
*/
function createTree() {
    const tree_obj = appLanguage === "swe" ? treeSwe : treeEng;
    const [tree, checkpoints] = generateTree(tree_obj);
    console.log("The tree is:", tree);
    return tree;
}

createTree()