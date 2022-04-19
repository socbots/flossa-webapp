// SPEECH SYNTHESIS

// This function returns a function called textToSpeech that we can save to a variable and call when needed.
// textToSpeech uses the variable context and calls on the function playAudio which the function "remembers" i.e. Closure
function createSpeechFunction() {
    const context = new AudioContext();
    let textToSpeech = (text) => {
        url = makeUrl(appLanguage, text)
            fetch(url)
                .then(response => response.arrayBuffer())
                .then(buffer => context.decodeAudioData(buffer)) // Being called on startup, needs more logic?
                .then(audio => playAudio(audio))
    }

    function playAudio(audioBuffer) {
        kaldi.listening = false;
        const source = context.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(context.destination);
        source.detune.value = -400;
        source.start();
        console.log(source);
        source.onended = () => {
            interaction()
        }
    }
    return textToSpeech;
}


function makeUrl(lang, text){
    let url = ""
    if (lang === "swe"){
        url = "https://alf-tts-api.herokuapp.com/tts?ReqString=" + text + "&lang=sv-SE&gender=FEMALE-A&rate=1.3&pitch=1.2"  //swedish
    } else if (lang === "eng"){
        url = "https://alf-tts-api.herokuapp.com/tts?ReqString=" + text + "&lang=en-US&gender=FEMALE&rate=1.2&pitch=1.5"    //english
    } else {
        url = "https://alf-tts-api.herokuapp.com/tts?ReqString=" + text + "&lang=en-US&gender=FEMALE&rate=1.2&pitch=1.5"    //default --english
    }
    return url
}