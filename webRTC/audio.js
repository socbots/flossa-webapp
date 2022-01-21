/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

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


// Listen to the custom event that emits new transcriptions.
// Audio is transcripted continuously while the person is talking.
window.addEventListener("onTranscription", (msg) => {
    const { transcription, isFinal } = msg.detail;
    // Run check input only if there was text in the transcription.
    if (transcription  && !isSpeaking) {
        if (kaldi.listening){ // <---- Add this since it keeps loop?
        console.log("Transcription:", transcription);
        document.getElementById("result").textContent = transcription;
        checkUserInput(transcription, isFinal);

        // The tree will move forward after 1 second. Iirc if there's no delay after checkUserInput,
        // there's gonna be a 'not understood' infinite loop
        // setTimeout(() => {
                kaldi.listening = false;
                console.log("kaldi.listening=", kaldi.listening);
                console.log("answerFound state=", answerFound);
                if (answerFound) {
                    console.log("answerFound, going to next node");
                    nodeStart(understood = true);
                } else {
                    console.log("answerFound=false, asking again");
                    kaldi.listening = true;
                    //nodeStart(understood = false);
                }
            }
        // }, 1000)
    }
});