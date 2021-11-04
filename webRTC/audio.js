/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

"use strict";

// Put variables in global scope to make them available to the browser console.
const audio = document.querySelector("audio");
let rest = document.getElementById("result");

function setButtonListeners() {
    const nodeAbtn = document.getElementById("node-A");
    const nodeBbtn = document.getElementById("node-B");
    const nodeCbtn = document.getElementById("node-C");

    nodeAbtn.addEventListener("click", () => { checkInput(nodeAbtn.innerHTML, true) })
    nodeBbtn.addEventListener("click", () => { checkInput(nodeBbtn.innerHTML, true) })
    nodeCbtn.addEventListener("click", () => { checkInput(nodeCbtn.innerHTML, true) })
}

setButtonListeners();

var recordedChunks = [];
let meterRefresh = null;
const reader = new FileReader();

const constraints = (window.constraints = {
    audio: true,
});

try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    window.audioContext = new AudioContext();
} catch (e) {
    alert("Web Audio API not supported.");
}

function handleSuccess(stream) {
    var options = {
        mimeType: "audio/webm;codecs=opus",
    };
    const mediaRecorder = new MediaRecorder(stream, options);

    const audioTracks = stream.getAudioTracks();
    window.stream = stream;
    console.log("Got stream with constraints:", constraints);
    console.log("Using audio device: " + audioTracks[0].label);
    stream.oninactive = function() {
        console.log("Stream ended");
    };
    var blob;
    //audio.srcObject = stream;
    const soundMeter = (window.soundMeter = new SoundMeter(window.audioContext));
    soundMeter.connectToSource(stream, function(e) {
        if (e) {
            alert(e);
            return;
        }

        let soundMeterValues = []
        let currentSoundLevel = 0;
        let soundMeterValuesToSum = 10;
        let previousSoundLevel = 0;

        meterRefresh = setInterval(() => {
            if (!isRec) {
                return; // Some problem with Alf listening to himself
            }
            soundMeterValues.push(parseFloat(soundMeter.instant.toFixed(4)));
            /* console.log(soundMeter.instant.toFixed(4)); */ //Check sound meter auido level
            currentSoundLevel = soundMeterValues.reduceRight((accumulator, currentValue, index) => {
                if (index < soundMeterValues.length - soundMeterValuesToSum) return accumulator;
                return accumulator + currentValue;
            }, 0);


            /* Every (4) miliseconds the soundmeter checks the audio level
             * If we are recording and the new audio level + (some arbitary test number)
             * if lower than the previous sound level we finnish the recording and send the blob
             * 
             * If the current sound level isn't lower than (4) miliseconds ago
             * we'll continue/start recording
             */
            if (mediaRecorder.state == "recording" && previousSoundLevel > currentSoundLevel + 0.02) {
                console.log("Stopping recording");
                mediaRecorder.stop();
                soundMeterValues = [];
            } else {
                if (mediaRecorder.state == "inactive") {
                    console.log("Starting recording");
                    mediaRecorder.start();
                    mediaRecorder.ondataavailable = (data) => {
                        recordedChunks.push(data.data);
                    }
                }
                if (mediaRecorder.state == "recording") {
                    mediaRecorder.ondataavailable = (data) => {
                        recordedChunks.push(data.data);
                    };
                }
            }
            previousSoundLevel = currentSoundLevel;
        }, 75);

        mediaRecorder.onresult = (e) => {
            console.log(e);
            result.innerHTML = e.results[0][0].transcript;
            checkInput(e.results[0][0].transcript)
                // recognition.stop();
                // If it is the final result stop recognition
            if (e.results[0].isFinal) {
                checkInput(e.results[0][0].transcript, true)
            }
        };


        mediaRecorder.onstop = () => {

            if (isRec == true) {
                isRec = false;
                blob = new Blob(recordedChunks, { type: "audio/webm" });
                console.log(blob);
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.style = "display:none";

                reader.readAsDataURL(blob);
                //reader.readAsArrayBuffer(blob);
                let url = URL.createObjectURL(blob);
                a.href = url;
                a.download = "test.ogg";
                //a.click();

                const alfttsurl = "https://alf-tts-api.herokuapp.com/stt";
                let formData = new FormData();
                const nodeAAnswer = document.getElementById("node-A").innerHTML;
                const nodeBAnswer = document.getElementById("node-B").innerHTML;
                const nodeCAnswer = document.getElementById("node-C").innerHTML;

                formData.set("file", blob, "this.ogg");
                formData.set("grammar", [nodeAAnswer, nodeBAnswer, nodeCAnswer]);
                console.log(formData.get("file"));
                console.log("grammar=", formData.get("grammar"));

                fetch(alfttsurl, {
                        method: "POST",
                        body: formData,
                    })
                    .then((response) => response.text())
                    .then((result) => {
                        console.log("Success from " + alfttsurl);
                        if (result) {
                            console.log("Result from success: " + result);
                            rest.textContent = result;
                            checkInput(result);

                            // if (!currentNode.monologue && currentNode.video == undefined) {
                            //     console.log("audio.js: Setting timeout");
                            //     setTimeout(() => {
                            //         isRec = false;
                            //         console.log("isRec == " + isRec);
                            //         console.log("answerFound state == " + answerFound);
                            //         console.log("notUndersod state == " + notUnderstod);
                            //         if (answerFound) {
                            //             console.log("answerFound, going to next node")
                            //         } else {
                            //             console.log("notUnderstod true, asking again")
                            //             startDialogue(notUnderstod = true)
                            //         }
                            //     }, 15000)
                            // }

                        } else {
                            console.log("No result from success")
                            startDialogue(notUnderstod = true);
                        }
                    })
                    .catch((error) => {
                        console.error("Error", error);
                    });
                recordedChunks = [];
            }
        };
    });
    console.log("data-available");
}

function handleError(error) {
    const errorMessage =
        "navigator.MediaDevices.getUserMedia error: " +
        error.message +
        " " +
        error.name;
    console.log("navigator audio stream error: " + errorMessage);
}

function checkInput(result, isFinal = false) {

    isRec = false;

    // Get answers
    const nodeAAnswer = document.getElementById("node-A").innerHTML.toLowerCase();
    const nodeBAnswer = document.getElementById("node-B").innerHTML.toLowerCase();
    const nodeCAnswer = document.getElementById("node-C").innerHTML.toLowerCase();

    result = result.toLowerCase(); //set to lower case
    let results = result.split(" ");
    console.log("checkInput result word by word:");
    for (const r of results) {
        console.log("result: " + r);
    }
    if (typeof currentNode == "undefined") {
        console.log("initializing button clickers")
    } else {
        // If we cant find a match for the input our user gives we startDialog with the current node and set the notUnderstod parameter to true
        for (const r of results) {
            // Test the user input against nodes if answers in our nodes.
            // We only check the first word
            if (nodeAAnswer.toLowerCase().split(" ")[0] == r) {
                console.log("Going nodeA");
                // rec.abort() terminates
                isRec = false;
                answerFound = true;
                currentNode = currentNode.nodeA;
                startDialogue(notUnderstod = false);
                return;
            } else if (nodeBAnswer.toLowerCase().split(" ")[0] == r) {
                console.log("Going nodeB");
                isRec = false;
                answerFound = true;
                currentNode = currentNode.nodeB;
                startDialogue(notUnderstod = false);
                return;
            } else if (nodeCAnswer.toLowerCase().split(" ")[0] == r) {
                console.log("Going nodeC");
                isRec = false;
                answerFound = true;
                currentNode = currentNode.nodeC;
                startDialogue(notUnderstod = false);
                return;
            }
        }

        isRec = false;
        startDialogue(notUnderstod = true);
        console.log("answerFound state == " + answerFound);

    }
}

let answerFound = false;

navigator.mediaDevices
    .getUserMedia(constraints)
    .then(handleSuccess)
    .catch(handleError);