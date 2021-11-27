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

setButtonListeners();

var recordedChunks = [];
let meterRefresh = null;
let refreshInterval = 75
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
            // Stops Alf from listening to himself
            if (!isRec) {
                return
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
        }, refreshInterval);


        mediaRecorder.onresult = (e) => {
            console.log(e);
            result.innerHTML = e.results[0][0].transcript;
            checkUserInput(e.results[0][0].transcript)
        };


        mediaRecorder.onstop = () => {
            isRec = false;
            blob = new Blob(recordedChunks, { type: "audio/webm" });
            console.log(blob);
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display:none";

            reader.readAsDataURL(blob);
            let url = URL.createObjectURL(blob);
            a.href = url;
            a.download = "test.ogg";
            const alfttsurl = "https://alf-tts-api.herokuapp.com/enstt"; // english url
            //const alfttsurl = "https://alf-tts-api.herokuapp.com/stt";
            let formData = new FormData();
            let grammar = getAnswers();

            formData.set("file", blob, "this.ogg");
            formData.set("grammar", grammar);
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
                        checkUserInput(result);
                    } else {
                        console.log("No result from success")
                        nodeStart(understood = true);
                    }
                })
                .catch((error) => {
                    console.error("Error", error);
                });
            recordedChunks = [];
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

navigator.mediaDevices
    .getUserMedia(constraints)
    .then(handleSuccess)
    .catch(handleError);