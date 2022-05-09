"use strict";

let answerFound = false;
let kaldi;
let idle = true;

class CoquiSTT {
    constructor(url, workerPath) {
        this.DOWNSAMPLING_WORKER = workerPath;
        this.url = url;
        this.connected = false;
        this.recording = false;
        this.recognitionOutput = [];
        this.recognitionCount = 0;
        this.recordingInterval = null;
        this.recordingStart = null;
        this.recordingTime = null;
        this.audioContext = null;
        this.mediaStream = null;
        this.connect(url);

    }
    connect(url) {
        this.socket = io(url);

        console.log("this.socket=", this.socket);

        this.socket.on('connect', () => {
            console.log("socket connected");
            this.connected = true;
            this.startRecording();
        });

        this.socket.on("disconnect", () => {
            console.log("socket disconnected");
            this.connected = false;
        });

        this.socket.on("recognize", (results) => {
            console.log("Recognized:", results);
            const recognition = this.recognitionOutput;
            results.id = this.recognitionCount++;
            recognition.unshift(results);
            this.recognitionOutput = recognition;
            console.log("this.recognitionOutput=", this.recognitionOutput);

            // A custom event listener for announcing every time a new transcription is available
            const evt = new CustomEvent("onTranscription", {
                detail: {
                    ...results
                }
            });
            dispatchEvent(evt);
        })
    }


    createAudioProcessor(context, source) {
        const processor = context.createScriptProcessor(4096, 1, 1);

        const sampleRate = source.context.sampleRate;

        const downsampler = new Worker(this.DOWNSAMPLING_WORKER);
        downsampler.postMessage({ command: "init", inputSampleRate: sampleRate });
        downsampler.onmessage = (e) => {
            if (this.socket.connected) {
                this.socket.emit("stream-data", e.data.buffer);
            }
        };

        processor.onaudioprocess = (e) => {
            if (this.recording) {
                const data = e.inputBuffer.getChannelData(0);
                downsampler.postMessage({ command: "process", inputFrame: data });
            }
        };

        processor.shutdown = () => {
            processor.disconnect();
            this.onaudioprocess = null;
        };

        processor.connect(context.destination);

        return processor;
    }


    startRecording(e) {
        if (!this.recording) {
            this.recordingInterval = setInterval(() => {
                this.recordingTime = new Date().getTime() - this.recordingStart;
            }, 100);

            this.recording = true;
            this.recordingStart = new Date().getTime();
            this.recordingTime = 0;

            this.startMicrophone();
        }
    }


    startMicrophone() {
        this.audioContext = new AudioContext();

        const success = stream => {
            console.log("Started recording");
            this.mediaStream = stream;
            this.mediaStreamSource = this.audioContext.createMediaStreamSource(stream);
            this.processor = this.createAudioProcessor(this.audioContext, this.mediaStreamSource);
            this.mediaStreamSource.connect(this.processor);

            // A custom event listener for announcing when the ASR is available
            const asrReady = new CustomEvent("onASRStart", {
                detail: {
                    ready: true,
                }
            });
            dispatchEvent(asrReady);
        };

        const fail = e => {
            console.error("Recording failure:", e);
        }

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({
                video: false,
                audio: true,
            })
                .then(success)
                .catch(fail);
        }
        else {
            navigator.getUserMedia({
                video: false,
                audio: true,
            }, success, fail);
        }
    };


    stopRecording = e => {
        if (this.recording) {
            if (this.socket.connected) {
                this.socket.emit("stream-reset");
            }
            clearInterval(this.recordingInterval);
            this.recording = false;
            this.stopMicrophone();
        }
    };

    stopMicrophone() {
        if (this.mediaStream) {
            this.mediaStream.getTracks()[0].stop();
        }
        if (this.mediaStreamSource) {
            this.mediaStreamSource.disconnect();
        }
        if (this.processor) {
            this.processor.shutdown();
        }
        if (this.audioContext) {
            this.audioContext.close();
        }
    }



}
const STT = new CoquiSTT(
    "https://coqui-nodejs-socbots-flask.rahtiapp.fi/",
    "./webRTC/downsampling_worker.js"
);



function handleSpeech(transcription) {
    console.log("[handleSpeech] Transcription:", transcription);
    document.getElementById("result").textContent = transcription;
    answerFound = checkUserInput(transcription);
    stopRecording();
    if (answerFound) {
        console.log("[handleSpeech] answerFound, going to next node");
        nodeStart();
    }
}

/**
 * Start the interaction tree if one of the correct activation words have been spoken.
 * @param {string} transcription Input text to compare on
 */
function handleVoiceActivation(transcription) {
    console.log("[handleVoiceActivation] transcription=", transcription);
    setFeedbackContainer(transcription);
    const sentence = transcription.toLowerCase();
    // Loop through the words, start interaction tree if a word is found
    for (const w of activationWords) {
        if (sentence.includes(w)) {
            idle = false;
            document.getElementById("app-language").disabled = true;
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
    const { text } = msg.detail;

    /* 
    idle == interface is on main screen, interaction tree has not started yet.
    Run check input only if there was text in the transcription.
    */
    if (idle && text) {
        handleVoiceActivation(text);
    }
    else if (text) {
        handleSpeech(text);
    }
});