// 1. Play camera video
const videoGrid = document.getElementById("video-grid");
var myVideo = document.createElement("video");
// myVideo.muted = true; //to mute myself

/* Stream it to video element */

function startStream() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: true, peerIdentity: "userId" })
    .then((stream) => {
      myVideo.srcObject = stream;
      //   1.
      //   myVideo.addEventListener("loadedmetadata", () => {
      //     myVideo.play();
      //   });
      //   2.
      //   myVideo.play();
      //   3.
      //   myVideo.setAttribute("autoplay", "autoplay");
      //   4.
      myVideo.autoplay = true;

      videoGrid.append(myVideo);
    });
}

function volumeUp() {
  console.log("🚀  myVideo.volume", myVideo.volume);
  if (myVideo.volume === 1) {
    myVideo.volume = 1;
  } else {
    myVideo.volume += 0.1;
  }
}
function volumeDown() {
  console.log("🚀  myVideo.volume", myVideo.volume);
  if (myVideo.volume === 0) {
    myVideo.volume = 0;
  } else {
    myVideo.volume -= 0.1;
  }
}
function muteVolume() {
  myVideo.volume = 0;
}

// console.log(location);
// console.log(screen);
