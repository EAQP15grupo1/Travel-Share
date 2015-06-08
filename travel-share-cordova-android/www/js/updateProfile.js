window.onload = onDeviceReady();

function loadAvatar() {

    document.getElementById("myImage").src="http://10.89.54.173/avatar/"+window.localStorage.getItem("userID")+".jpg";
}

function onDeviceReady() {
    $("#archive").hide();
    document.addEventListener("deviceready", onDeviceReady, false);
}

$("#cancelBtn").click(function () {
    window.location.href = 'index.html';
});

function selectPicture() {
    if (!navigator.camera) {
        alert("Camera API not supported", "Error");
        return;
    }
    var options = {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: 0,      // 0:Photo Library, 1=Camera, 2=Saved Album
        encodingType: 0     // 0=JPG 1=PNG
    };

    navigator.camera.getPicture(onSuccess, onFail, options);
}

function onSuccess(imageURI) {
    var image = document.getElementById('myImage');
    image.src = imageURI;
    $("#selectbtn").hide();
}

function onFail(message) {
    alert('Failed because: ' + message);
}


function uploadPicture() {
    window.alert("upload picture");
// Get URI of picture to upload
    var server = "http://147.83.7.201:3000/user/avatar/" + window.localStorage.getItem("userID");
    var img = document.getElementById('myImage').src;
    var options=new FileUploadOptions();
    options.fileKey = "avatar";
    options.fileName = img.substr(img.lastIndexOf('/') + 1);
    options.httpMethod="PUT";

    var ft=new FileTransfer();

    ft.upload(img,encodeURI(server), function (data){
        window.location.href='userProfile.html';
    }, function fail(error){
        window.alert("error al subir la foto"+error);
    }, options, true);


}

function updateUser() {

    var url_TS = "http://147.83.7.201:3000/user/" + window.localStorage.getItem("userID");
    var email = $("#email").val();
    var nation = $("#nation").val();
    var descripcion = $("#description").val();
    var needs = [];
    var offers = [];
    var user = new Object();

    if (document.getElementById("sportN").checked) {
        needs.push("Deporte");
    }
    if (document.getElementById("musicN").checked) {
        needs.push("Musica");
    }
    if (document.getElementById("jobN").checked) {
        needs.push("Trabajo");
    }
    if (document.getElementById("cultureN").checked) {
        needs.push("Cultura");
    }
    if (document.getElementById("sportO").checked) {
        offers.push("Deporte");
    }
    if (document.getElementById("musicO").checked) {
        offers.push("Musica");
    }
    if (document.getElementById("jobO").checked) {
        offers.push("Trabajo");
    }
    if (document.getElementById("cultureO").checked) {
        offers.push("Cultura");
    }


    if (email) {
        user.email = email;
    }
    if (nation) {
        user.nation = nation;
    }
    if (descripcion) {
        user.description = descripcion;
    }
    user.needs = needs;
    user.offers = offers;
    user.username = window.localStorage.getItem("username");
    var data = JSON.stringify(user);

    $.ajax({
        url: url_TS,
        type: 'PUT',
        crossDomain: true,
        contentType: 'application/json',
        data: data,
        success: function (data) {
            window.location.href = 'userProfile.html';

        },
        error: function (data) {
            console.log(data);
            console.log("error");
        }
    });
}