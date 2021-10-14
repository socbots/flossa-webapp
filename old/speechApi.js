const start = document.getElementById("start");
start.addEventListener("click", startChain);

// const questionField = document.getElementById("question");
let currentQuestion = null;
const result = document.getElementById("result");
result.innerHTML = "";
const alfTalk = document.getElementById("alf_talkbox");

//const rec = document.getElementById("record");
//const stopR = document.getElementById("stopR");
//rec.addEventListener("click",record);
//stopR.addEventListener("click",stop)

function record() {
    recognition.start();
    recognizing = true;
    console.log("I hear voices");
}

function stop() {
    recognition.stop();
    recognizing = false;
    console.log(currentQuestion);
    if (result.innerHTML.includes(currentQuestion.answers.right)) {
        console.log("Going right");
        currentQuestion = currentQuestion.right;
        refreshQuestion();

    } else if (result.innerHTML.includes(currentQuestion.answers.right)) {
        console.log("Going left");
        currentQuestion = currentQuestion.left;
        refreshQuestion();

    } else {
        alfTalk.innerHTML = "Jag förstod inte vad du menade"
        result.innerHTML = "";
    }
}

function startChain() {
    result.innerHTML = "";
    if (currentQuestion == null) {
        currentQuestion = greeting;
    }
    refreshQuestion();
}

function refreshQuestion() {
    if (result.innerHTML != "") {
        stop();
    }
    result.innerHTML = "";
    // questionField.innerHTML = currentQuestion.question;
    record();
}

// SPEECH RECOGNITION

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

recognition = new SpeechRecognition();
recognition.lang = "sv-SE"
recognition.continuous = true;
recognition.interimResults = true;
recognition.maxAlternatives = 1;

recognition.onresult = (e) => {
    //  console.log(e.results)
    console.log(e.results[0][0].transcript);
    result.innerHTML = e.results[0][0].transcript;
}

// SPEECH SYNTHESIS
function createSpeechSynth() {
    const speak = document.getElementById("speak");
    const textInput = document.getElementById("textinput");
    let synth = window.speechSynthesis;
    let voices = [];
    speak.addEventListener("click", speakNow);

    let speakNow = () => {
        su = new SpeechSynthesisUtterance(textInput.value);
        voices = synth.getVoices();
        //su.voice = "sv-SE";
        su.lang = "sv-SE";
        synth.speak(su);
    }
    return speakNow;
}

// AMPLITUDE DETECTION

let recognizing = false;
let amplitudeLevel = false;
let ampLimit = 0;

navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
        // const mediaRecorder = new MediaRecorder(stream);

        audioContext = new AudioContext();
        analyser = audioContext.createAnalyser();
        microphone = audioContext.createMediaStreamSource(stream);
        javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 1024;

        microphone.connect(analyser);
        analyser.connect(javascriptNode);
        javascriptNode.connect(audioContext.destination);
        javascriptNode.onaudioprocess = function() {
            var array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            var values = 0;

            var length = array.length;
            for (var i = 0; i < length; i++) {
                values += (array[i]);
            }

            var average = values / length;

            // if (average > 50 && !recognizing){
            //   record();
            // }
            if (average > 50) {
                ampLimit = 0;
            } else if (average < 50 && result.innerHTML != "") {
                ampLimit += 1;
                if (ampLimit > 30) {
                    console.log("Stopping")
                    ampLimit = 0;
                    stop();
                }
            }
            //console.log("microphone input volume "+Math.round(average));
        }
    });

// QUESTIONS 

class Question {
    constructor(question, answers) {
        this.question = question;
        this.answers = answers;
    }
    setChildren(left, right) {
        this.left = left;
        this.right = right;
    }
}

class Answer {
    constructor(left, right) {
        this.left = left;
        this.right = right;
    }
}

let yesNo = new Answer("nej", "jo");
let goodbye = new Answer(null, "Tack och ha en bra dag!");

let greeting = new Question("Hej! Vill du tala med mig", yesNo);
let greetingFollow = new Question("Hur Känner du dig inför besöket?", new Answer("spänd", "lugn"));
greeting.setChildren(goodbye, greetingFollow);

let flossing = new Question("Vill du ha hygienråd?", yesNo);
let relax = new Question("Kan jag hjälpa dig slappna av", yesNo);
greetingFollow.setChildren(relax, flossing);

let flossingFollow = new Question("Använder du tandtråd?", yesNo);
let guidance = new Question("Hjälp med att hitta rätt?", yesNo);
flossing.setChildren(flossingFollow, guidance);

let guidanceFollow = new Question("Välj din tandläkare");
guidance.setChildren(goodbye, guidanceFollow);

console.log(greeting);