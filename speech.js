// SPEECH RECOGNITION

function createRecognitionObject() {

  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
  var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
  var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

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

  recognition.onresult = (e) => {
    result.innerHTML = e.results[0][0].transcript;
    if (e.results[0].isFinal) {
      recognition.stop();
    }
  };
  recognition.onend = () => { checkInput(); }
  return recognition;
}

// SPEECH SYNTHESIS

  // This function returns a function called textToSpeech
  // It calls on the function play and uses the context variable which are "remebered" i.e closures
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