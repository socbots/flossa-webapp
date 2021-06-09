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
let sorry = document.getElementById("sorry");

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


            if (currentSoundLevel > previousSoundLevel + 0.015) {
                if (mediaRecorder.state == "inactive") {
                    console.log("Starting@ " + currentSoundLevel);
                    startSoundLevel = currentSoundLevel;
                    mediaRecorder.start();
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
        mediaRecorder.onstop = () => {
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

            let formData = new FormData();
            formData.set("file", blob, "this.ogg");
            console.log(formData.get("file"));
            fetch("https://alf-tts-api.herokuapp.com/stt", {
                    method: "POST",
                    body: formData,
                })
                .then((response) => response.text())
                .then((result) => {
                    console.log("Success", result);
                    if (result) {
                        rest.textContent = result;
                        sorry.style.display = "none";
                    } else {
                        sorry.style.display = "inline-block";
                        sorry.style.color = "#FF0000";
                        setTimeout(function() { sorry.style.color = "#FFFFFF"; }, 1500);
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
    document.getElementById("errorMsg").innerText = errorMessage;
    console.log(errorMessage);
}

navigator.mediaDevices
    .getUserMedia(constraints)
    .then(handleSuccess)
    .catch(handleError);