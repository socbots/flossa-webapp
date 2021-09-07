// SPEECH RECOGNITION

function createRecognitionObject() {
  console.log("createRecognitionObject is Chrome only webspeechAPI!, currently commented out")
}

// SPEECH SYNTHESIS

// This function returns a function called textToSpeech that we can save to a variable and call when needed.
// textToSpeech uses the variable context and calls on the function playAudio which the function "remembers" i.e. Closure

function createSpeechFunction() {

  let isSpeaking = false;
  const context = new AudioContext();

  let textToSpeech = (text) => {
    //console.log(text);
    if (!isSpeaking) {
      let url = "https://alf-tts-api.herokuapp.com/tts?ReqString=" + text + "&lang=sv-SE&rate=1.4"
      fetch(url)
        .then(response => response.arrayBuffer())
        .then(buffer => context.decodeAudioData(buffer)) // Being called on startup, needs more logic?
        .then(audio => playAudio(audio))
    }
  }

  function hideResult() {
    document.getElementById("result").innerHTML = ""
  }

  function playAudio(audioBuffer) {
    isRec = false;
    isSpeaking = true;
    const source = context.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(context.destination);
    source.detune.value = -400;
    source.start();
    console.log(source);
    source.onended = () => {
      isSpeaking = false;
      if (currentNode.nodeAAnswer != undefined) {
        startRecording();
        hideResult();
      }
      // This is so fucking spaghetti, must make better solution... sometime
      else if (currentNode instanceof Question && currentNode.monologue) {
        console.log("Monologue finished, going to next node");
        isRec = false;
        answerFound = true;
        currentNode = currentNode.nodeA;
        startDialogue(notUnderstod = false);
      }
      /* If it's a RobotFunction then it is the end of the interaction tree
      ** So we reset the tree to wait for the next person to talk with.
      ** Actually it's better to do a location.reload() here because google stt is being used.
      ** But if kaldi was in use instead, the rootNode could just be an empty question
      ** which listens for "hej" or something else for voice activation.
      */
      else if (currentNode instanceof RobotFunction) {
        console.log("source.onended: is RobotFunction.");
        currentNode = rootNode;
        startDialogue();
      }
    }
  }
  // make dummy request to wake up server
  textToSpeech(" ");

  return textToSpeech;
}

function startRecording() {
  if (!(currentNode instanceof RobotFunction) && !isRec) {
    console.log("Startrecording setting isRec == " + isRec);
    isRec = true;
    notUnderstod = false;
  }
}

let isRec = false;
let timeroffset = false;
let timer;

/* let rec = createRecognitionObject(); // Should remove */