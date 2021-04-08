//record = document.getElementById("record");
//stopRecord = document.getElementById("stopRecord");

navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
    const mediaRecorder = new MediaRecorder(stream);

    audioContext = new AudioContext();
    analyser = audioContext.createAnalyser();
    microphone = audioContext.createMediaStreamSource(stream);
    javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);
  
    analyser.smoothingTimeConstant = 0.8;
    analyser.fftSize = 1024;
  
    microphone.connect(analyser);
    analyser.connect(javascriptNode);
    javascriptNode.connect(audioContext.destination);
    javascriptNode.onaudioprocess = function() {
        var array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        var values = 0;
  
        var length = array.length;
        for (var i = 0; i < length; i++) {
          values += (array[i]);
        }
  
        var average = values / length;
  
      //console.log("microphone input volume "+Math.round(average));
      }
    });

//    record.onclick = e => {
//      console.log("clicked");
//      mediaRecorder.start();
//    }
//    stopRecord.onclick = e =>{
//      console.log("stop clicked");
//      mediaRecorder.stop();
//    }
//    const audioChunks = [];
//
//    mediaRecorder.addEventListener("dataavailable", e =>{
//      audioChunks.push(e.data);
//    });
//
    mediaRecorder.addEventListener("stop", () =>{
      console.log(audioChunks);
      const audioBlob = new Blob(audioChunks);
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onload = d => console.log(reader.result);
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    })
  });
