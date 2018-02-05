"use strict";
let webcamHasAInstance = false;
let handleCaptureImage = function(){
  let data_uri = Webcam.snap();
  $('#btncapture').html('<i class="fa fa-camera"></i>   Chụp Lại'); 
  $('#image-camera').css({
    width: '50%',
    height: '50%'
  });       
  $('#camera').hide();  
  $('#image-camera').show();    
  $('#image-camera').attr("src", data_uri);
  $("#attachment-image").attr("src", data_uri);

  let raw_image_data = data_uri.replace(/^data\:image\/\w+\;base64\,/, '');
  $('#avatar').val(raw_image_data);
  

  $("#btncapture").unbind( "click" );
  $('#btncapture').on('click', handleClickButtonCameraOrImage);
}

let handleClickButtonCameraOrImage = function(){
  $('#image-camera').hide();
  $('#camera').show();
  $('#btncapture').html('<i class="fa fa-camera"></i>   Chụp Hình');
  Webcam.set({
    width: 128,
		height: 128,
    image_format: 'jpeg',
    jpeg_quality: 90
  });
  //set singleton Webcam
  if (!webcamHasAInstance) {
    webcamHasAInstance = true;
    Webcam.attach('#camera');
  } 
  $('#camera>video').css({
    width: '100%',
    height: '100%'
  });

  $("#btncapture").unbind( "click" );
  $('#btncapture').on('click', handleCaptureImage);
}

$('#btncapture').on('click', handleClickButtonCameraOrImage);
$('#image-camera').on('click', handleClickButtonCameraOrImage);

$(function () {
  $('#usersTable').DataTable({
    'paging'      : false,
    'lengthChange': true,
    'searching'   : false,
    'ordering'    : true,
    'info'        : true,
    'autoWidth'   : false
  })
})

// $(document).ready(() => {
//   console.log($('#usersTable_length>label'));
//   console.log($('#usersTable_length>label')[0].childNodes[0].text);
  
 
//   $('#usersTable_length>label')[0].innerHTML = "Hiển Thị <select name=\"usersTable_length\" aria-controls=\"usersTable\" class=\"form-control input-sm\"><option value=\"10\">10</option><option value=\"25\">25</option><option value=\"50\">50</option><option value=\"100\">100</option></select>";
// });