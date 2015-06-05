window.onload = onDeviceReady();

function loadAvatar() {
    window.alert(window.localStorage.getItem("userID"));
    //document.getElementById("avatarup").src="http://10.89.54.173/avatar/"+window.localStorage.getItem("userID")+".jpg";
}

function onDeviceReady() {
    //window.alert("device ready");
    document.addEventListener("deviceready", onDeviceReady, false);
}

$("#cancelBtn").click(function () {
    window.location.href = 'index.html';
});

function selectPicture() {
    //if (!navigator.camera) {
    //    alert("Camera API not supported", "Error");
    //    return;
    //}
    //var options = {
    //    quality: 50,
    //    destinationType: Camera.DestinationType.DATA_URL,
    //    sourceType: 0,      // 0:Photo Library, 1=Camera, 2=Saved Album
    //    encodingType: 0     // 0=JPG 1=PNG
    //};
    //
    //navigator.camera.getPicture(
    //    function (imgData) {
    //        $('.media-object', this.$el).attr('src', "data:image/jpeg;base64," + imgData);
    //    },
    //    function () {
    //        alert('Error taking picture', 'Error');
    //    },
    //    options);

    navigator.camera.getPicture(onSuccess, onFail, {
        sourceType: navigator.camera.PictureSourceType.CAMERA,
        destinationType: navigator.camera.DestinationType.FILE_URI
    });
    //uploadPicture();
}

function onSuccess(imageURI) {
    var image = document.getElementById('myImage');
    image.src = imageURI;
}

function onFail(message) {
    alert('Failed because: ' + message);
}


function uploadPicture() {
    window.alert("upload picture");
// Get URI of picture to upload
    var img = document.getElementById('camera_image');
    var imageURI = img.src;
    if (!imageURI || (img.style.display == "none")) {
        document.getElementById('camera_status').innerHTML = "Take picture or select picture from library first.";
        return;
    }
    // Verify server has been entered
    server = "http://147.83.7.201:3000/user/avatar/" + window.localStorage.getItem("userID");
    if (server) {
        // Specify transfer options
        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        options.chunkedMode = false;
        // Transfer picture to server
        var ft = new FileTransfer();
        ft.upload(imageURI, server, function (r) {
            document.getElementById('camera_status').innerHTML = "Upload successful: " + r.bytesSent + " bytes uploaded.";
        }, function (error) {
            document.getElementById('camera_status').innerHTML = "Upload failed: Code = " + error.code;
        }, options);
    }
}

//function uploadAvatar(){
//
//    var urlav="http://localhost:3000/user/avatar/"+window.localStorage.getItem("userID");
//    var file = !!this.file ? this.file : [];
//    //file=file.submit();
//    //var file=$("#file").val();
//    window.alert(file);
//    var reader= new FileReader;
//    //var filename = file.replace(/^.*\\/, "");
//    var archivo=reader.readAsDataURL(file);
//    //console.log(archivo);
//
//
//    //var files = new Object();
//    //files.avatar=archivo;
//    window.alert(urlav);
//
//    $.ajax({
//        url: urlav,
//        type: 'PUT',
//        data: false,
//        files:archivo,
//        processData:false,
//        contentType:false,
//        //dataType:'file',
//        crossDomain: true,
//        success: function (data) {
//            window.location.href='userProfile.html';
//        },
//        error: function (data) {
//            window.alert("fallo al subir foto");
//            console.log("error");
//        }
//    });
//
//}


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