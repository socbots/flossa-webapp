// SPEECH RECOGNITION

function createRecognitionObject() {

  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
  var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
  var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
  // var SpeechRecognition = SpeechRecognition 
  // var SpeechGrammarList = SpeechGrammarList 
  // var SpeechRecognitionEvent = SpeechRecognitionEvent 
  //
  // Not sure how,why,when the grammar works need to read more documentation
  const speechRecognitionList = new SpeechGrammarList();
  const words = ['nej', 'jo', 'spänd', 'lugn'];
  const grammar = '#JSGF V1.0; grammar words; public <words> =  ' + words.join(" | ") + ';';
  speechRecognitionList.addFromString(grammar, 1);

  recognition = new SpeechRecognition();
  recognition.grammars = speechRecognitionList;
  recognition.lang = "sv-SE"
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  let result = document.getElementById("result")

  let answerFound = false;
  function checkInput(res, isFinal = false) {
    let result = res.results[0][0].transcript;
    console.log("input " + result);

    // Test the user input against the left and right answers in our node.
    if (currentNode.rightAnswer.includes(result) && result) {
      console.log("Going right");
      // rec.abort() terminates
      rec.abort();
      isRec = false;
      currentNode = currentNode.rightNode;
      answerFound = true;


    }
    else if (currentNode.leftAnswer.includes(result) && result) {
      console.log("Going left");
      rec.abort();
      answerFound = true;
      isRec = false;
      currentNode = currentNode.leftNode;

    }
    // If we cant find a match for the input our user gives we startDialog with the current node and set the notUnderstod parameter to true
    else if (isFinal) {
      console.log("true final");
      // quickfix: I don't like this global variable but it works
      if (!answerFound) {
        notUnderstod = true;
      }
      rec.abort();

    }
  }

  let timeoffset = false;
  let timer;
  recognition.onstart = () => {
    if (!timer) {
      console.log("set timer");
      timer = setTimeout(() => {
        timeoffset = true;
        timer = undefined
      }, 15000);
    }
  }

  // Whenever a result is returned from the webspeechAPI
  recognition.onresult = (e) => {
    result.innerHTML = e.results[0][0].transcript;
    checkInput(e)
    // recognition.stop();
    // If it is the final result stop recognition
    if (e.results[0].isFinal) {
      checkInput(e, true)
    }
  };
  //// If recognition stops
  recognition.onend = () => {
    setTimeout(() => {
      isRec = false;
      if (answerFound) {
        startDialogue()
      }
      else if (timer) {
        startRecording();
      }
      else {
        notUnderstod = true;
        startDialogue();
      }
    }, 100)
  }
  return recognition;
}

// SPEECH SYNTHESIS

// This function returns a function called textToSpeech that we can save to a variable and call when needed.
// textToSpeech uses the variable context and calls on the function playAudio which the function "remembers" i.e. Closure

function createSpeechFunction() {

  let isSpeaking = false
  const context = new AudioContext();

  let textToSpeech = (text) => {
    console.log(text)
    if (!isSpeaking) {
      let url = "https://alf-tts-api.herokuapp.com/tts?ReqString=" + text + "&lang=sv-SE"
      fetch(url)
        .then(response => response.arrayBuffer())
        .then(buffer => context.decodeAudioData(buffer))
        .then(audio => playAudio(audio))
    }
  }

  function playAudio(audioBuffer) {
    isSpeaking = true;
    const source = context.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(context.destination);
    source.start();
    source.onended = () => {
      isSpeaking = false;
      if (currentNode.leftAnswer != undefined) {
        startRecording();
      }
    }

  }

  return textToSpeech;
}


function startRecording() {
  if (!(currentNode._text || undefined) && !isRec) {
    rec.start();
    isRec = true
  }
}

let isRec = false;

let rec = createRecognitionObject();

