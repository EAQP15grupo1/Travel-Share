var base_URL;

window.onload = function () {
    $.ajax({
        url: "js/URL.json",
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            base_URL = data.url;
        },
        error: function (error) {
            window.alert("IP not found in file");
        }
    });
}

function backoffice() {
    window.location.href = 'backoffice_mensajes.html';
}

$("#LoginBtn").click(function () {
    var username = $("#username").val();
    var password = $("#password").val();


    if (username != "" && password != "") {
        var user = new Object();
        user.username = username;
        user.password = password;
        var data = JSON.stringify(user);

        $.ajax({
            url: "http://" + base_URL + "/login",
            type: 'POST',
            crossDomain: true,
            contentType: 'application/json',
            dataType: 'json',
            data: data,
            success: function (data_API) {
                window.localStorage.setItem("username", user.username);
                window.localStorage.setItem("userID", data_API.userId);
                window.localStorage.setItem("token", data_API.token);
                window.location.href = 'index.html';
            },
            error: function (error_API) {
                window.alert(error_API.response);
            }
        });
    } else {
        window.alert("Todos los campos son obligatorios");
    }
});

$("#RegisterBtn").click(function () {
    window.location.href = "createUser.html"
});

$("#FacebookBtn").click(function () {
    //window.location.href = "http://147.83.7.201:3000/facebook";

    window.location = (window.location.protocol + "//147.83.7.201:3000/facebook");

    //$.ajax({
    //    url: "http://147.83.7.201:3000/facebook",
    //    type: 'GET',
    //    crossDomain: true,
    //    dataType: 'json',
    //    success: function (data) {
    //        //window.location.href = 'updateProfile.html';
    //        console.log(data);
    //    },
    //    error: function (error_API) {
    //        console.log(error_API);
    //        //window.alert(error_API.response);
    //        //window.localStorage.setItem("userID", error_API.userId);
    //        //window.localStorage.setItem("token", error_API.token);
    //        //window.location.href = 'updateProfile.html';
    //    }
    //});

    //var url = "http://localhost:3000/facebook";
    //var method = "GET";
    //
    //var xhr = new XMLHttpRequest();
    //
    //if ("withCredentials" in xhr) {
    //    // Most browsers.
    //    xhr.open(method, url, true);
    //    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    //    xhr.setRequestHeader("Access-Control-Allow-Credentials", "true");
    //    xhr.setRequestHeader("Access-Control-Allow-Methods", "GET");
    //}
    //else if (typeof XDomainRequest != "undefined") {
    //    // IE8 & IE9
    //    xhr = new XDomainRequest();
    //    xhr.open(method, url);
    //}
    //else {
    //    // CORS not supported.
    //    xhr = null;
    //}
    //
    //if (xhr != null) {
    //    xhr.followsRedirect = false;
    //    xhr.withCredentials = true;
    //    xhr.onreadystatechange = function () {
    //        if (xhr.readyState == 4) {
    //            if (xhr.status == 200) {
    //                alert(xhr.responseText);
    //            }
    //            else {
    //                alert("error");
    //            }
    //        }
    //    }
    //    xhr.send();
    //}
});