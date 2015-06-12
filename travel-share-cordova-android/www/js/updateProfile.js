window.onload = onDeviceReady();

function loadAvatar() {

    document.getElementById("myImage").src = "http://10.89.54.173/avatar/" + window.localStorage.getItem("userID") + ".jpg";
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
    var options = new FileUploadOptions();
    options.fileKey = "avatar";
    options.fileName = "patata";
    options.httpMethod = "PUT";

    var ft = new FileTransfer();

    ft.upload(img, encodeURI(server), function (data) {
        window.location.href = 'userProfile.html';
    }, function fail(error) {
        window.alert("error al subir la foto" + error);
    }, options, true);


}

function updateUser() {
    var url_TS = "http://147.83.7.201:3000/user/" + window.localStorage.getItem("userID");
    var email = $("#email").val();
    var nation = $("#nation").val();
    var description = $("#description").val();
    var needs = needsArray;
    var offers = offersArray;
    var user = new Object();

    if (email)
        user.email = email;
    if (nation)
        user.nation = nation;
    if (description)
        user.description = description;
    if (needs.length > 0)
        user.needs = needs;
    if (offers.length > 0)
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

var countN = 0;
var needsArray = [];
$("#sportN").change(function () {
    if (this.checked) {
        countN++;
        if (countN > 3) {
            this.checked = false;
            countN--;
        } else {
            needsArray.push("Deporte");
        }
    } else {
        countN--;
        var index = needsArray.indexOf("Deporte");
        if (index > -1) {
            needsArray.splice(index, 1);
        }
    }
});
$("#musicN").change(function () {
    if (this.checked) {
        countN++;
        if (countN > 3) {
            this.checked = false;
            countN--;
        } else {
            needsArray.push("Musica");
        }
    } else {
        countN--;
        var index = needsArray.indexOf("Musica");
        if (index > -1) {
            needsArray.splice(index, 1);
        }
    }

    if (countN > 3) {
        this.checked = false;
        countN--;
    }
});
$("#jobN").change(function () {
    if (this.checked) {
        countN++;
        if (countN > 3) {
            this.checked = false;
            countN--;
        } else {
            needsArray.push("Trabajo");
        }
    } else {
        countN--;
        var index = needsArray.indexOf("Trabajo");
        if (index > -1) {
            needsArray.splice(index, 1);
        }
    }

    if (countN > 3) {
        this.checked = false;
        countN--;
    }
});
$("#cultureN").change(function () {
    if (this.checked) {
        countN++;
        if (countN > 3) {
            this.checked = false;
            countN--;
        } else {
            needsArray.push("Cultura");
        }
    } else {
        countN--;
        var index = needsArray.indexOf("Cultura");
        if (index > -1) {
            needsArray.splice(index, 1);
        }
    }

    if (countN > 3) {
        this.checked = false;
        countN--;
    }
});

var countO = 0;
var offersArray = [];
$("#sportO").change(function () {
    if (this.checked) {
        countO++;
        if (countO > 3) {
            this.checked = false;
            countO--;
        } else {
            offersArray.push("Deporte");
        }
    } else {
        countO--;
        var index = offersArray.indexOf("Deporte");
        if (index > -1) {
            offersArray.splice(index, 1);
        }
    }

    if (countO > 3) {
        this.checked = false;
        countO--;
    }
});
$("#musicO").change(function () {
    if (this.checked) {
        countO++;
        if (countO > 3) {
            this.checked = false;
            countO--;
        } else {
            offersArray.push("Musica");
        }
    } else {
        countO--;
        var index = offersArray.indexOf("Musica");
        if (index > -1) {
            offersArray.splice(index, 1);
        }
    }

    if (countO > 3) {
        this.checked = false;
        countO--;
    }
});
$("#jobO").change(function () {
    if (this.checked) {
        countO++;
        if (countO > 3) {
            this.checked = false;
            countO--;
        } else {
            offersArray.push("Trabajo");
        }
    } else {
        countO--;
        var index = offersArray.indexOf("Trabajo");
        if (index > -1) {
            offersArray.splice(index, 1);
        }
    }

    if (countO > 3) {
        this.checked = false;
        countO--;
    }
});
$("#cultureO").change(function () {
    if (this.checked) {
        countO++;
        if (countO > 3) {
            this.checked = false;
            countO--;
        } else {
            offersArray.push("Cultura");
        }
    } else {
        countO--;
        var index = offersArray.indexOf("Cultura");
        if (index > -1) {
            offersArray.splice(index, 1);
        }
    }

    if (countO > 3) {
        this.checked = false;
        countO--;
    }
});

var maxLength = 200;
$('textarea').keyup(function () {
    var length = $(this).val().length;
    var length = maxLength - length;
    $('#chars').text(length);
});