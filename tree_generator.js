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


const swe_tree = {
    type: "monologue",
    sentence: "Hej och välkommen. <break time='0,5'/> \
        Jag heter Snow och hjälper till här i huset.",
    nextNode: {
        type: "monologue",
        sentence: "Jag brukar informera gäster och personal här i huset om olika \
            saker <break time='0.5s'/> och just idag informerar jag om tandvård.",
        nextNode: {
            type: "question",
            sentence: "Nu är jag fundersam på om ni vill lära er om tandtråd <break time='0.5s'/> \
            eller tandborstning? <break time='0.5s'/> Ni kan också avsluta samtalet.",
            answerA: "Tandtråd",
            nodeA: {
                type: "monologue",
                sentence: "Jag kommer visa en video från folktandvården i Stockholm \
                <break time='0.5s'/> och samtidigt berättar jag om hur man använder tandtråd.",
                nextNode: {
                    type: "video",
                    sentence: "Det är omöjligt att göra rent mellan tänderna med en vanlig tandborste.\
                    <break time='0.5s'/> Tandköttsinflammationer och kariesangrepp \
                    startar ofta där. <break time='0.5s'/> Därför rekommenderas ni att använda \
                    tandtråden en gång varje dag innan ni borstar tänderna. <break time='0.5s'/> \
                    Se till att ta en rejäl bit tandtråd och linda den runt fingrarna. \
                    <break time='0.5s'/>  Låt tandtråden sedan försiktigt följa den ena tandytan ner \
                     i tandköttsfickan. <break time='0.5s'/>  Dra \
                    tandtråden sedan sakta uppåt igen och för den ner tråden längs med den andra \
                    tandens yta och sedan upp igen. <break time='1.0s'/>  Gör så mellan alla tänder,\
                     också de längst bak för bästa resultat.",
                    videoUrl: "./media/tutorial540p.mp4#t=12",
                    videoDelayStart: 12000,
                    videoDuration: 20000,
                    nextNode: {
                        type: "monologue",
                        sentence: "Hoppas videon var till nytta. <break time='0.5s'/> \
                        Nu har jag några frågor åt er för att se om ni verkligen lyssnade.",
                        nextNode: {
                            type: "trickQuestion",
                            sentence: "Fråga 1. <break time='0.5s'/> Ibland börjar tänderna blöda \
                            när du använder tandtråd. Vad tror du det beror på. Säg: fel \
                            teknik, tecken på tandköttsinflammation, eller båda.",
                            answerA: "Fel teknik",
                            answerB: "Tecken på tandköttsinflammation",
                            answerC: "Båda",
                            nextNode: {
                                type: "monologue",
                                sentence: "Båda är rätta svaret. <break time='1s'/>",
                                nextNode: {
                                    type: "question",
                                    sentence: "Fråga 2. <break time='0.5s'/> Kommer ni ihåg hur ofta\
                                     det rekommenderades att ni bör använda tandtråd. Ni kan svara: \
                                     varje dag, varannan dag eller tredje dag.",
                                    answerA: "Varje",
                                    nodeA: {
                                        type: "monologue",
                                        sentence: "Det var rätt! Svaret är varje dag. <break time='1s'/>",
                                        nextNode: {
                                            type: "reset",
                                            sentence: "Det var allt jag hade om tandtråd. \
                                    <break time='0.5s'/> Kom ihåg att diskutera med en riktig tandläkare \
                                    eller tandhygienist för att lära er mer.",
                                        },
                                    },
                                    answerB: "Varannan",
                                    nodeB: {
                                        type: "monologue",
                                        sentence: "Det var fel. Svaret är varje dag. <break time='1s'/>",
                                        nextNode: {
                                            type: "reset",
                                            sentence: "Det var allt jag hade om tandtråd. \
                                    <break time='0.5s'/> Kom ihåg att diskutera med en riktig tandläkare \
                                    eller tandhygienist för att lära er mer.",
                                        },
                                    },
                                    answerC: "Tredje",
                                    nodeC: {
                                        type: "monologue",
                                        sentence: "Det var fel. Svaret är varje dag. <break time='1s'/>",
                                        nextNode: {
                                            type: "reset",
                                            sentence: "Det var allt jag hade om tandtråd. \
                                    <break time='0.5s'/> Kom ihåg att diskutera med en riktig tandläkare \
                                    eller tandhygienist för att lära er mer.",
                                        },
                                    },
                                }
                            }
                        }
                    }
                }
            },
            answerB: "Tandborstning",
            nodeB: {
                type: "monologue",
                sentence: "Jag har fem enkla punkter direkt från folktandvårdens hemsida om hur ni bör borsta tänderna.",
                nextNode: {
                    type: "monologue",
                    sentence: "1. Det är viktigt att du borstar dina tänder på rätt sätt.<break time='0.5s'/>",
                    nextNode: {
                        type: "monologue",
                        sentence: "2. Borsta dina tänder två gånger om dagen, morgon och kväll.<break time='0.5s'/>",
                        nextNode: {
                            type: "monologue",
                            sentence: "3. Borsta tänderna i två minuter, ungefär en minut i vardera käke.<break time='0.5s'/>",
                            nextNode: {
                                type: "monologue",
                                sentence: "4. Spotta ut tandkrämen, men undvik att skölja munnen \
                                eller dricka något efteråt. <break time='0.5s'/> Då sköljer du bort fluoret som skyddar dina tänder.<break time='0.5s'/>",
                                nextNode: {
                                    type: "monologue",
                                    sentence: "5. Känn med tungan efteråt om dina tänder är rena. \
                                    <break time='0.5s'/> Tungan ska glida lätt och tändernas yta ska \
                                    kännas glatt. Om ytan känns sträv behöver du borsta lite mer.<break time='0.5s'/>",
                                    nextNode: {
                                        type: "monologue",
                                        sentence: "Nu har jag en fråga för att se om ni lyssnade.",
                                        nextNode: {
                                            type: "question",
                                            sentence: "<break time='0.5s'/> Påstod jag att det är bättre\
                                             eller sämre att skölja munnen efter tandborstning?",
                                            answerA: "Sämre",
                                            nodeA: {
                                                type: "monologue",
                                                sentence: "Vilken tur att ni visste! <break time='1.0s'/>",
                                                nextNode: {
                                                    type: "reset",
                                                    sentence: "Det var allt jag hade om tandborstning. <break time='0.5s'/> \
                                            Kom ihåg att diskutera med en riktig tandläkare eller tandhygienist för att lära er mer."
                                                }
                                            },
                                            answerB: "Bättre",
                                            nodeB: {
                                                type: "monologue",
                                                sentence: "Nej. <break time='0.5s'/> Man bör undvika att skölja\
                                                 eller dricka efter att man borstat tänderna. <break time='1.0s'/>",
                                                nextNode: {
                                                    type: "reset",
                                                    sentence: "Det var allt jag hade om tandborstning. <break time='0.5s'/> \
                                            Kom ihåg att diskutera med en riktig tandläkare eller tandhygienist för att lära er mer."
                                                }
                                            },
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            answerC: "Avsluta",
            nodeC: {
                type: "reset",
                sentence: "Okej. <break time='0.5s'/> Sköt om dig nu och ha det så bra.",
            }
        }
    }
}

const generateTree = (node) => {
    switch (node.type) {
        case "question":
            if (node.nodeC) {
                const q = new Question(node.sentence, node.answerA, node.answerB, node.answerC);
                q.setNodes(generateTree(node.nodeA), generateTree(node.nodeB), generateTree(node.nodeC))
                return q
            } else {
                const q = new Question(node.sentence, node.answerA, node.answerB);
                q.setNodes(generateTree(node.nodeA), generateTree(node.nodeB))
                return q
            }
            break;
        case "trickQuestion":
            const t = new trickQuestion(node.sentence, node.answerA, node.answerB, node.answerC);
            t.setNodes(generateTree(node.nextNode));
            return t
        case "video":
            const v = new Video(node.sentence);
            v.setVideo(node.videoUrl, node.videoDelayStart, node.videoDuration);
            v.setNodes(generateTree(node.nextNode));
            return v
            break;
        case "monologue":
            const m = new Monologue(node.sentence);
            m.setNodes(generateTree(node.nextNode));
            return m
            break;
        case "reset":
            const r = new Monologue(node.sentence);
            return r
            break;
        default:
            console.log("Default");
            break;
    }
}
/*
TODO: A question which leads to the same next question is now splitting the tree
    (ie. Hur många gånger flossa? "det var fel" och "det var rätt!" leder båda till "det var allt jag hade om tandtråd"
    men denna end node finns två gånger)
*/
function createTree() {
    const tree = generateTree(swe_tree);
    console.log("The tree is:", tree);
    return tree;
}
