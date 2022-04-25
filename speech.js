// SPEECH SYNTHESIS

// This function returns a function called textToSpeech that we can save to a variable and call when needed.
// textToSpeech uses the variable context and calls on the function playAudio which the function "remembers" i.e. Closure

function createSpeechFunction() {

    let isSpeaking = false;
    const context = new AudioContext();

    let textToSpeech = (text) => {
        if (!isSpeaking) {
            let url = "https://alf-tts-api.herokuapp.com/tts?ReqString=" + text + "&lang=sv-SE&rate=1.4"
            // let url = "https://alf-tts-api.herokuapp.com/tts?ReqString=" + text + "&lang=en-US&rate=1.4"
            fetch(url)
                .then(response => response.arrayBuffer())
                .then(buffer => context.decodeAudioData(buffer)) // Being called on startup, needs more logic?
                .then(audio => playAudio(audio))
        }
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
            if (currentNode instanceof Question || currentNode instanceof trickQuestion) {
                setAnswers(currentNode, understood);
                clearResult();
                startRecording();
            } else if (currentNode instanceof Monologue) {
                currentNode = currentNode.nextNode;
                nodeStart();
            } else if (currentNode instanceof Video) {
                video = document.getElementById("video");
                document.getElementById("iframeModal").style.display = "none";
                video.pause(); //stop video
                currentNode = currentNode.nextNode;
                nodeStart();
            } else {
                console.log("reload me!");
            }
        }
    }

    // make dummy request to wake up server, heroku issue
    textToSpeech(" ");

    return textToSpeech;
}

function startRecording() {
    isRec = true;
}