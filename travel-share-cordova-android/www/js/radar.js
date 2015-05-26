var canvas = document.getElementById('radarCanvas');
var context = canvas.getContext('2d');
var circles = [];
var imageObj = new Image();
var users;
var latitude;
var longitude;
var altitude;

window.onload = function () {
    loadCircles();
    onDeviceReady();
}

//function loadBackground() {
//    imageObj.src = 'img/radar.png';
//    context.drawImage(imageObj, 0, 0, 350, 350);
//}

function loadCircles() {
    var draw = function (context, x, y, fillcolor, radius, linewidth, strokestyle, fontcolor, textalign, fonttype, filltext) {
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI, false);
        context.fillStyle = fillcolor;
        context.fill();
        context.lineWidth = linewidth;
        context.strokeStyle = strokestyle;
        context.stroke();

        context.fillStyle = fontcolor;
        context.textAlign = textalign;
        context.font = fonttype;

        //context.fillText(filltext, x, y);
    };

    var Circle = function (x, y, radius, id) {
        this.left = x - radius;
        this.top = y - radius;
        this.right = x + radius;
        this.bottom = y + radius;
        this.id = id;
    };

    var drawCircle = function (context, x, y, fillcolor, radius, linewidth, strokestyle, fontcolor, textalign, fonttype, filltext, circles, id) {
        draw(context, x, y, fillcolor, radius, linewidth, strokestyle, fontcolor, textalign, fonttype, filltext);
        var circle = new Circle(x, y, radius, id);
        circles.push(circle);
    };

    var url_TS = "http://10.89.38.183:3000/users";
    $.ajax({
        url: url_TS,
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
            imageObj.src = 'img/radar.png';
            context.drawImage(imageObj, 0, 0, 350, 350);
            drawCircle(context, 100, 100, "#FFFF99", 20, 3, "#FF9933", "white", "center", "bold 32px Arial", "1", circles, data[0]._id);
            drawCircle(context, 250, 150, "#FF4D4D", 20, 3, "#800000", "white", "center", "bold 32px Arial", "2", circles, data[1]._id);
            drawCircle(context, 80, 250, "#CCFF99", 20, 3, "#336600", "white", "center", "bold 32px Arial", "3", circles, data[2]._id);
        },
        error: function () {
            window.alert("FAIL: Usuarios radar");
        }
    });

    $('#radarCanvas').click(function (e) {
        var clickedX = e.pageX - $(this).offset().left;
        var clickedY = e.pageY - $(this).offset().top;

        for (var i = 0; i < circles.length; i++) {
            if (clickedX < circles[i].right && clickedX > circles[i].left && clickedY > circles[i].top && clickedY < circles[i].bottom) {
                //document.cookie = "userID=" + circles[i].id;
                window.localStorage.setItem("userID", circles[i].id);
                window.location = '../www/radarProfile.html';
            }
        }
    });

}

//Intentando la geolocalizacion

document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready

function onDeviceReady() {
    window.alert("Device Ready");
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

// onSuccess Geolocation
//
function onSuccess(position) {

    window.alert("latitudes");
    latitude=position.coords.latitude;
    longitude=position.coords.longitude;
    altitude=position.coords.altitude;
    updatePosition();
}

// onError Callback receives a PositionError object

function onError(error) {
    alert('code: '    + error.code    + '\n' +
    'message: ' + error.message + '\n');
}

function updatePosition() {

        window.alert("Update");

        var location = new Object();
        location.latitude = latitude;
        location.longitude = longitude;
        location.altitude = altitude;
        var data = JSON.stringify(location);

        var locationURL="http://10.89.40.14:3000/user/"+"5562e79d4509ab9902000001";

        $.ajax({
            url: locationURL,
            type: 'PUT',
            crossDomain: true,
            contentType: 'application/json',
            data: data,
            success: function () {
                //window.location.reload();
                getMatches();
            },
            error: function () {
                window.alert("FAIL: No se ha podido publicar el mensaje");
            }
        });

}

function getMatches(){

    var userURL="http://10.89.40.14:3000/users/find/"+"5562e79d4509ab9902000001"

    $.ajax({
        url: userURL,
        type: 'GET',
        crossDomain: true,
        contentType: 'application/json',
        dataType: 'json',
        success: function (results) {
            window.alert("enviando usuarios");
            var usuarios=results;
            for(var i= 0; i<usuarios.length; i++)
            {
                console.log("id: "+usuarios[i].id + " distancia: "+usuarios[i].distance);
            }
        },
        error: function () {
            window.alert("FAIL: No se ha podido publicar el mensaje");
        }
    });
}