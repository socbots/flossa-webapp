// SPEECH SYNTHESIS

// This function returns a function called textToSpeech that we can save to a variable and call when needed.
// textToSpeech uses the variable context and calls on the function playAudio which the function "remembers" i.e. Closure

function createSpeechFunction() {
    const context = new AudioContext();

    let textToSpeech = (text) => {
            let url = "https://alf-tts-api.herokuapp.com/tts?ReqString=" + text + "&lang=en-US&rate=1.4"
            fetch(url)
                .then(response => response.arrayBuffer())
                .then(buffer => context.decodeAudioData(buffer)) // Being called on startup, needs more logic?
                .then(audio => playAudio(audio))
    }

    function playAudio(audioBuffer) {
        kaldi.listening = false;
        const source = context.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(context.destination);
        source.detune.value = -400;
        source.start();
        console.log(source);
        source.onended = () => {
            if (currentNode instanceof Question || currentNode instanceof trickQuestion) {
                setAnswers(currentNode, understood);
                clearResult();
                startRecording();
            } else if (currentNode instanceof Monologue) {
                currentNode = currentNode.nextNode;
                nodeStart();
            } else if (currentNode instanceof Video) {
                // Video class can play without stt, hence it is forwarded to nextNode in setVideo in main.js
                return
            } else {
                setTimeout(function() {
                    window.location.reload(1); // reload page on end
                }, 3500);
            }
        }
    }
    return textToSpeech;
}

function startRecording() {
    kaldi.listening = true;
}