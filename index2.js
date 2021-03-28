const FPS = 25;

const x = 0;
const y = 0;
const width = 240;
const height = 180;
let cameraStream = null;
let processingStream = null;
let mediaRecorder = null;
let recordingIntervalId = null;
let mediaChunks = null;
const processingPreview = document.getElementById("processingPreview");
const ctx = processingPreview.getContext("2d");
const cameraPreview = document.getElementById("cameraPreview");
cameraPreview.muted = true;

function processFrame() {
  ctx.drawImage(cameraPreview, x, y, width, height);
}

function start() {
  const constraints = { video: true, audio: true };
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      cameraStream = stream;
      //   var videoTracks = stream.getVideoTracks();
      //   console.log("Using video device: " + videoTracks[0].label);
      //   stream.onremovetrack = function () {
      //     console.log("Stream ended");
      //   };
      // window.stream = stream; // make variable available to browser console
      cameraPreview.srcObject = stream;
    })
    .catch((err) => {
      alert("No media device found!");
    });
}

function startRecording() {
  processingStream = processingPreview.captureStream(FPS);

  mediaRecorder = new MediaRecorder(cameraStream);
  console.log({ mediaRecorder });

  mediaRecorder.ondataavailable = function (event) {
    mediaChunks = event.data;
    // event.data = {size,type}
    if (mediaRecorder.state == "inactive") {
      playRecordedVideo();
    }
  };

  mediaRecorder.start();
  recordingIntervalId = setInterval(processFrame, 1000 / FPS);
}

function stopCamera() {
  if (cameraStream != null) {
    cameraStream.getTracks().forEach(function (track) {
      console.log("🚀 ~ stopCamera ~ track", track);
      track.stop();
    });
  }
}

function stopRecording() {
  if (processingStream != null) {
    processingStream.getTracks().forEach(function (track) {
      track.stop();
    });
  }

  if (mediaRecorder != null) {
    if (mediaRecorder.state == "recording") {
      mediaRecorder.stop();
    }
  }

  if (recordingIntervalId != null) {
    clearInterval(recordingIntervalId);
    recordingIntervalId = null;
  }
}

function playRecordedVideo() {
  const mediaBlob = new Blob([mediaChunks], { type: "video/mp4" });
  const mediaBlobUrl = URL.createObjectURL(mediaBlob);

  const recordingPreview = document.getElementById("recordingPreview");
  recordingPreview.src = mediaBlobUrl;

  // Custom download button with href, <a> tag.
  //   let downloadButton = document.getElementById("downloadButton");
  //   downloadButton.setAttribute("href", mediaBlobUrl);
  //   downloadButton.download = `RecordedVideo-${mediaRecorder.stream.id}.mp4`;
}

const liveStream = document.getElementById("liveStream");
function startLiveStream() {
  liveStream.srcObject = cameraStream;
}
function stopLiveStream() {
  if (liveStream.srcObject.active) {
    liveStream.srcObject.getTracks().forEach(function (track) {
      //   track.stop();
      console.log("stopLiveStream", track);
    });
  }
}
