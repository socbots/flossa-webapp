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
    const leftbtn = document.getElementById("left_answer");
    const rightbtn = document.getElementById("right_answer");

    leftbtn.addEventListener("click", () => { checkInput(leftbtn.innerHTML, true) })
    rightbtn.addEventListener("click", () => { checkInput(rightbtn.innerHTML, true) })
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
        let startSoundLevel = 0;
        let currentSoundLevel = 0;
        let soundMeterValuesToSum = 10;
        let previousSoundLevel = 0;

        meterRefresh = setInterval(() => {
            soundMeterValues.push(parseFloat(soundMeter.instant.toFixed(4)));
            /* console.log(soundMeter.instant.toFixed(4)); */
            currentSoundLevel = soundMeterValues.reduceRight((accumulator, currentValue, index) => {
                if (index < soundMeterValues.length - soundMeterValuesToSum) return accumulator;
                return accumulator + currentValue;
            }, 0);
            /* console.log(currentSoundLevel); */


            if (soundMeter.instant.toFixed(4) > previousSoundLevel + 0.01) {
                if (mediaRecorder.state == "inactive") {
                    console.log("Starting@ " + currentSoundLevel);
                    startSoundLevel = currentSoundLevel;
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
            } else if (
                mediaRecorder.state == "recording" && startSoundLevel > currentSoundLevel) {
                console.log("Stopping@ " + currentSoundLevel);
                mediaRecorder.stop();
                startSoundLevel = 0;
                soundMeterValues = [];
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
                formData.set("file", blob, "this.ogg");
                console.log(formData.get("file"));
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
                            setTimeout(() => {
                                isRec = false;
                                console.log("isRec == " + isRec);
                                console.log("answerFound state == " + answerFound);
                                console.log("notUndersod state == " + notUnderstod);
                                console.log("Timer typeof == " + typeof(timer));
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
    result = result.toLowerCase();
    console.log("checkInput result == " + result);
    let results = result.split(" ");
    for (const r of results) {
        console.log("result: " + r);
    }
    if (typeof currentNode == "undefined") {
        console.log("initializing button clickers")
    } else {
        // If we cant find a match for the input our user gives we startDialog with the current node and set the notUnderstod parameter to true
        if (isFinal) {
            console.log("true final");
            // quickfix: I don't like this global variable but it works
            if (!answerFound) {
                notUnderstod = true;
            }
        }
        for (const r of results) {
            // Test the user input against the left and right answers in our node.
            if (currentNode.rightAnswer.includes(r) && r) {
                console.log("Going right");
                // rec.abort() terminates
                isRec = false;
                currentNode = currentNode.rightNode;
                answerFound = true;
                break;
            } else if (currentNode.leftAnswer.includes(r) && r) {
                console.log("Going left");
                answerFound = true;
                isRec = false;
                currentNode = currentNode.leftNode;
                break;
            }
        }
    }
}

let answerFound = false;

navigator.mediaDevices
    .getUserMedia(constraints)
    .then(handleSuccess)
    .catch(handleError);