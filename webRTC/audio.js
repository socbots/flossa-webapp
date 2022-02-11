"use strict";

let answerFound = false;
let kaldi;
let notUnderstoodCount = 0;
let idle = true;

async function kaldiMain() {
    // Initializes the kaldiweb class. The 2nd param is the name of the model to download/use.
    kaldi = new KaldiWeb.KaldiASR("https://socbots-flask-production-socbots-flask.rahtiapp.fi/models", "swedish_v2");
    // getUserMedia
    await kaldi.askForMicrophone();
    // Download the model and start listening.
    console.log("[kaldiMain] Initiating kaldi");
    await kaldi.init();
    // Set kaldi to not listen until other parts of the app are ready.
    //kaldi.listening = false;
}
kaldiMain();



function handleSpeech(transcription, isFinal) {
    const sorryThreshold = 2;

    console.log("[handleSpeech] Transcription:", transcription);
    document.getElementById("result").textContent = transcription;
    answerFound = checkUserInput(transcription, isFinal);
    kaldi.listening = false;
    if (answerFound) {
        console.log("[handleSpeech] answerFound, going to next node");
        notUnderstoodCount = 0;
        nodeStart(understood = true);
    } else if (isFinal && notUnderstoodCount >= sorryThreshold) {
        // Person has stopped speaking and gotten the wrong answer too many times
        notUnderstoodCount++;
        nodeStart(understood = false);
    }
    else if (isFinal) {
        // Person has stopped speaking, no answer was found
        // Increment wrong answer count and continue listening
        notUnderstoodCount++;
        kaldi.listening = true;
    } else {
        // Answer was not found but the speaker is in the middle of a sentence
        // So not triggering 'not understood' audio
        // Only listening for new answers again
        kaldi.listening = true;
    }
}

/**
 * Start the interaction tree if one of the correct activation words have been spoken.
 * @param {string} transcription Input text to compare on
 * @param {boolean} isFinal If it's a completed sentence
 */
function handleVoiceActivation(transcription, isFinal) {
    console.log("[handleVoiceActivation] transcription=", transcription);
    const sentence = transcription.toLowerCase();
    // Loop through the words, start interaction tree if a word is found
    for (const w of activationWords) {
        if (sentence.includes(w)) {
            idle = false;
            changeInterfaceIntoInteraction();
            nodeStart();
            console.log("[handleVoiceActivation] Activation word found");
            break;
        }
    }
}

// Listen to the custom event that emits new transcriptions.
// Audio is transcripted continuously while the person is talking.
window.addEventListener("onTranscription", (msg) => {
    const { transcription, isFinal } = msg.detail;

    /* 
    idle == interface is on main screen, interaction tree has not started yet.
    Run check input only if there was text in the transcription.
    */
    if (idle && transcription) {
        handleVoiceActivation(transcription, isFinal);
    }
    else if (transcription) {
        handleSpeech(transcription, isFinal);
    }
});