"use strict";

let answerFound = false;
let kaldi;

async function kaldiMain() {
    // Initializes the kaldiweb class. The 2nd param is the name of the model to download/use.
    kaldi = new KaldiWeb.KaldiASR("https://johan.onl/models", "english");
    // getUserMedia
    await kaldi.askForMicrophone();
    // Download the model and start listening.
    await kaldi.init();
    // Set kaldi to not listen until other parts of the app are ready.
    kaldi.listening = false;
    console.log("running kaldi");
}
kaldiMain();


let notUnderstoodCount = 0;

// Listen to the custom event that emits new transcriptions.
// Audio is transcripted continuously while the person is talking.
window.addEventListener("onTranscription", (msg) => {
    const sorryThreshold = 1;
    const { transcription, isFinal } = msg.detail;

    // Run check input only if there was text in the transcription.
    if (transcription && !isSpeaking) {
        console.log("Transcription:", transcription);
        document.getElementById("result").textContent = transcription;
        answerFound = checkUserInput(transcription, isFinal);
        kaldi.listening = false;
        console.log("kaldi.listening=", kaldi.listening);
        console.log("answerFound state=", answerFound);
        console.log("isFinal=", isFinal);
        console.log("notUnderstoodCount=", notUnderstoodCount);
        if (answerFound) {
            console.log("answerFound, going to next node");
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
});