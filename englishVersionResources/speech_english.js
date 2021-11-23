/** ENLGISH VERSION
 * Main change:
 *   uses new url
 */

// SPEECH SYNTHESIS

// This function returns a function called textToSpeech that we can save to a variable and call when needed.
// textToSpeech uses the variable context and calls on the function playAudio which the function "remembers" i.e. Closure

function createSpeechFunction() {

    let isSpeaking = false;
    const context = new AudioContext();

    let textToSpeech = (text) => {
        if (!isSpeaking) {
            //let url = "https://alf-tts-api.herokuapp.com/tts?ReqString=" + text + "&lang=sv-SE&rate=1.4"
            let url = "https://alf-tts-api.herokuapp.com/tts?ReqString=" + text + "&lang=en-US&rate=1.4"
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
            setAnswers(currentNode, notUnderstod);
            isSpeaking = false;
            if (currentNode.nodeAAnswer != undefined) {
                startRecording();
                hideResult();
            }
            // This is so fucking spaghetti, must make better solution... sometime
            else if (currentNode instanceof Question && currentNode.monologue) {
                console.log("Monologue finished, going to next node");
                isRec = false;
                currentNode = currentNode.nodeA;
                startDialogue(notUnderstod = false);
            }
            /* If it's a EndTree then it is the end of the interaction tree
             ** So we reset the tree to wait for the next person to talk with.
             ** Actually it's better to do a location.reload() here because google stt is being used.
             ** But if kaldi was in use instead, the rootNode could just be an empty question
             ** which listens for "hej" or something else for voice activation.
             */
            else if (currentNode instanceof EndTree) {
                console.log("source.onended: is EndTree.");
                /* currentNode = rootNode;
                startDialogue(); */

                // reloads page after 5 seconds
                setTimeout(function() {
                    window.location.reload(1);
                }, 5000);
            }
        }
    }
    // make dummy request to wake up server
    textToSpeech(" ");

    return textToSpeech;
}

function startRecording() {
    if (!(currentNode instanceof EndTree) && !isRec) {
        console.log("Startrecording setting isRec == " + isRec);
        isRec = true;
        notUnderstod = false;
    }
}

let isRec = false;
let timeroffset = false;
let timer;