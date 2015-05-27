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

// FUNCIONA, ANTIGUA
//function loadCircles() {
//    var draw = function (context, x, y, fillcolor, radius, linewidth, strokestyle, fontcolor, textalign, fonttype, filltext) {
//        context.beginPath();
//        context.arc(x, y, radius, 0, 2 * Math.PI, false);
//        context.fillStyle = fillcolor;
//        context.fill();
//        context.lineWidth = linewidth;
//        context.strokeStyle = strokestyle;
//        context.stroke();
//
//        context.fillStyle = fontcolor;
//        context.textAlign = textalign;
//        context.font = fonttype;
//
//        //context.fillText(filltext, x, y);
//    };
//
//    var Circle = function (x, y, radius, id) {
//        this.left = x - radius;
//        this.top = y - radius;
//        this.right = x + radius;
//        this.bottom = y + radius;
//        this.id = id;
//    };
//
//    var drawCircle = function (context, x, y, fillcolor, radius, linewidth, strokestyle, fontcolor, textalign, fonttype, filltext, circles, id) {
//        draw(context, x, y, fillcolor, radius, linewidth, strokestyle, fontcolor, textalign, fonttype, filltext);
//        var circle = new Circle(x, y, radius, id);
//        circles.push(circle);
//    };
//
//    var url_TS = "http://10.89.38.183:3000/users";
//    $.ajax({
//        url: url_TS,
//        type: 'GET',
//        crossDomain: true,
//        dataType: 'json',
//        success: function (data) {
//            imageObj.src = 'img/radar.png';
//            context.drawImage(imageObj, 0, 0, 350, 350);
//            drawCircle(context, 100, 100, "#FFFF99", 20, 3, "#FF9933", "white", "center", "bold 32px Arial", "1", circles, data[0]._id);
//            drawCircle(context, 250, 150, "#FF4D4D", 20, 3, "#800000", "white", "center", "bold 32px Arial", "2", circles, data[1]._id);
//            drawCircle(context, 80, 250, "#CCFF99", 20, 3, "#336600", "white", "center", "bold 32px Arial", "3", circles, data[2]._id);
//        },
//        error: function () {
//            window.alert("FAIL: Usuarios radar");
//        }
//    });
//
//    $('#radarCanvas').click(function (e) {
//        var clickedX = e.pageX - $(this).offset().left;
//        var clickedY = e.pageY - $(this).offset().top;
//
//        for (var i = 0; i < circles.length; i++) {
//            if (clickedX < circles[i].right && clickedX > circles[i].left && clickedY > circles[i].top && clickedY < circles[i].bottom) {
//                //document.cookie = "userID=" + circles[i].id;
//                window.localStorage.setItem("userID", circles[i].id);
//                window.location = '../www/radarProfile.html';
//            }
//        }
//    });
//
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

        context.fillText(filltext, x, y);
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

    var userURL = "http://147.83.7.201:3000/users/find/" + window.localStorage.getItem("userID");
    $.ajax({
        url: userURL,
        type: 'GET',
        crossDomain: true,
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
            imageObj.src = 'img/radar_square.png';
            context.drawImage(imageObj, 0, 0, 350, 350);

            for (i = 0; i < data.length; i++) {
                var width, height, min, max, color, text, username;
                if (data[i].distance <= 100) {
                    min = 120;
                    max = 230;
                    width = Math.floor(Math.random() * (max - min + 1)) + min;
                    height = Math.floor(Math.random() * (max - min + 1)) + min;
                } else if ((data[i].distance > 100) && (data[i].distance <= 200)) {
                    var j = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
                    if (j == 1) {
                        minW = 60;
                        maxW = 90;
                        minH = 60;
                        maxH = 280;
                        width = Math.floor(Math.random() * (maxW - minW + 1)) + minW;
                        height = Math.floor(Math.random() * (maxH - minH + 1)) + minH;
                    } else if (j == 2) {
                        minW = 250;
                        maxW = 280;
                        minH = 60;
                        maxH = 280;
                        width = Math.floor(Math.random() * (maxW - minW + 1)) + minW;
                        height = Math.floor(Math.random() * (maxH - minH + 1)) + minH;
                    } else if (j == 3) {
                        minW = 60;
                        maxW = 280;
                        minH = 60;
                        maxH = 90;
                        width = Math.floor(Math.random() * (maxW - minW + 1)) + minW;
                        height = Math.floor(Math.random() * (maxH - minH + 1)) + minH;
                    } else if (j == 4) {
                        minW = 60;
                        maxW = 280;
                        minH = 250;
                        maxH = 280;
                        width = Math.floor(Math.random() * (maxW - minW + 1)) + minW;
                        height = Math.floor(Math.random() * (maxH - minH + 1)) + minH;
                    }
                } else if ((data[i].distance > 200) && (data[i].distance <= 300)) {
                    var j = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
                    if (j == 1) {
                        minW = 20;
                        maxW = 45;
                        minH = 20;
                        maxH = 325;
                        width = Math.floor(Math.random() * (maxW - minW + 1)) + minW;
                        height = Math.floor(Math.random() * (maxH - minH + 1)) + minH;
                    } else if (j == 2) {
                        minW = 300;
                        maxW = 325;
                        minH = 20;
                        maxH = 325;
                        width = Math.floor(Math.random() * (maxW - minW + 1)) + minW;
                        height = Math.floor(Math.random() * (maxH - minH + 1)) + minH;
                    } else if (j == 3) {
                        minW = 20;
                        maxW = 325;
                        minH = 20;
                        maxH = 45;
                        width = Math.floor(Math.random() * (maxW - minW + 1)) + minW;
                        height = Math.floor(Math.random() * (maxH - minH + 1)) + minH;
                    } else if (j == 4) {
                        minW = 20;
                        maxW = 325;
                        minH = 300;
                        maxH = 325;
                        width = Math.floor(Math.random() * (maxW - minW + 1)) + minW;
                        height = Math.floor(Math.random() * (maxH - minH + 1)) + minH;
                    }
                }

                color = "#" + Math.random().toString(16).slice(2, 8);
                username = data[i].username;
                var text = username.substring(0, 1);
                //console.log(data[i].distance);
                drawCircle(context, width, height, color, 20, 3, "#000000", "black", "center", "bold 20px Arial", text, circles, data[i].id);
                //drawCircle(context, 300, 100, "#FFFF99", 20, 3, "#FF9933", "white", "center", "bold 32px Arial", "1", circles, data[0].id);
            }
        }
        ,
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
    //window.alert("Device Ready");
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

// onSuccess Geolocation
function onSuccess(position) {

    //window.alert("latitudes");
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    altitude = position.coords.altitude;
    updatePosition();
}

// onError Callback receives a PositionError object
function onError(error) {
    alert('code: ' + error.code + '\n' +
    'message: ' + error.message + '\n');
}

//Actualizar la posición actual del usuario
function updatePosition() {
    //window.alert("Update");

    var location = new Object();
    location.latitude = latitude;
    location.longitude = longitude;
    location.altitude = altitude;
    var data = JSON.stringify(location);

    // HAY QUE DESCOMENTAR ESTA LÍNEA
    //var locationURL = "http://147.83.7.201:3000/user/" + window.localStorage.getItem("userID");

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
            window.alert("FAIL");
        }
    });
}

function getMatches() {
    var userURL = "http://147.83.7.201:3000/users/find/" + window.localStorage.getItem("userID");

    $.ajax({
        url: userURL,
        type: 'GET',
        crossDomain: true,
        contentType: 'application/json',
        dataType: 'json',
        success: function (results) {
            var usuarios = results;
            for (var i = 0; i < usuarios.length; i++) {
                console.log("id: " + usuarios[i].id + " distancia: " + usuarios[i].distance);
            }
        },
        error: function () {
            window.alert("FAIL");
        }
    });
}