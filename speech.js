// SPEECH RECOGNITION

function createRecognitionObject() {

  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
  var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
  var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

  // Not sure how,why,when the grammar works need to read more documentation
  const speechRecognitionList = new SpeechGrammarList();
  const words = ['nej', 'jo', 'joo', 'spänd', 'lugn'];
  const grammar = '#JSGF V1.0; grammar words; public <words> =  ' + words.join(" | ") + ';';
  speechRecognitionList.addFromString(grammar, 1);

  recognition = new SpeechRecognition();
  recognition.grammars = speechRecognitionList;
  recognition.lang = "sv-SE"
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;
  let result = document.getElementById("result")

  // Whenever a result is returned from the webspeechAPI
  recognition.onresult = (e) => {
    result.innerHTML = e.results[0][0].transcript;
    // If it is the final result stop recognition
    if (e.results[0].isFinal) {
      recognition.stop();
    }
  };
  // If recognition stops
  recognition.onend = () => { checkInput(); }
  return recognition;
}

// SPEECH SYNTHESIS

  // This function returns a function called textToSpeech eventhough the function is never resolved or called while it being created.
  // textToSpeech uses the variable context and calls on the function playAudio which the function "remembers" from them being in the same scope when created
  // If this seems like funky code read more about closures
function createSpeechFunction() {

  const context = new AudioContext();

  let textToSpeech = (text) => {
    let url = "https://alf-tts-api.herokuapp.com/tts?ReqString=" + text
    fetch(url)
      .then(response => response.arrayBuffer())
      .then(buffer => context.decodeAudioData(buffer))
      .then(audio => playAudio(audio))
  }

  function playAudio(audioBuffer) {
    const source = context.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(context.destination);
    source.start();
  }
  return textToSpeech;
}
