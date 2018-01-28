"use strict";

let video = document.getElementById("camera");
let videoObj = { "video": true };
let canvas = document.getElementById("canvas");

let handleCaptureImage = () => {
  $('#attachment-image').hide();
  $('#canvas').show();
  let context = canvas.getContext("2d");
  context.drawImage(video, 0, 0, 140, 140);
  //console.log("capture"); 
}

let handleClickButtonCameraOrImage = () => {
  $('#image-camera').hide();
  $('#camera').show();
  let errBack = function(error) {
    console.log("Video capture error: ", error.code);
  };
  // Put video listeners into place
  if(navigator.getUserMedia) { // Standard
    navigator.getUserMedia(videoObj, function(stream) {
      video.src = stream;
      video.play();
    }, errBack);
  }
  else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
    navigator.webkitGetUserMedia(videoObj, function(stream){
    video.src = window.URL.createObjectURL(stream);
    video.play();
    }, errBack);
  }
  else if(navigator.mozGetUserMedia) { // WebKit-prefixed
    navigator.mozGetUserMedia(videoObj, function(stream){
    video.src = window.URL.createObjectURL(stream);
    video.play();
    }, errBack);
  }

  $("#btncapture").unbind( "click" );
  $('#btncapture').on('click', handleCaptureImage);
  $('#camera').on('click', handleCaptureImage);
};

$('#btncapture').on('click', handleClickButtonCameraOrImage);
$('#image-camera').on('click', handleClickButtonCameraOrImage);