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
    kaldi = new KaldiWeb.KaldiASR("http://0.0.0.0:4400/models", "english_small");
    await kaldi.askForMicrophone();
    await kaldi.init();
}
kaldiMain();

// Listen to the custom event that was created in updateTranscription
window.addEventListener("onTranscription", (msg) => {
    const { transcription, isFinal } = msg.detail;
    console.log("Transcription:", transcription);

    if (transcription) {
        document.getElementById("result").textContent = transcription;
        checkInput(transcription, isFinal);
        setTimeout(() => {
            isRec = false;
            console.log("isRec == " + isRec);
            console.log("answerFound state == " + answerFound);
            console.log("notUndersod state == " + notUnderstod);
            console.log("Timer typeof == " + typeof (timer));
            if (answerFound) {
                console.log("answerFound, going to next node")
                startDialogue(notUnderstod = false);
            } else if (timer) {
                console.log("Timer is on, startrecording()")
                startRecording();
            } else {
                console.log("notUnderstod true, asking again")
                startDialogue(notUnderstod = true);
            }
        }, 1000)

    }
});