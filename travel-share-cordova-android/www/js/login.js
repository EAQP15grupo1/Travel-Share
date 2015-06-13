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
        if (username == "admin" && password == "admin") {
            window.location.href = 'backoffice_mensajes.html';
        } else {
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
        }
    } else {
        window.alert("Todos los campos son obligatorios");
    }
});

$("#RegisterBtn").click(function () {
    window.location.href = "createUser.html"
});

$("#FacebookBtn").click(function () {
    //window.location.href = "http://147.83.7.201:3000/facebook";

    //xmlhttp = new XMLHttpRequest();
    //xmlhttp.open("GET", "http://147.83.7.201:3000/facebook", true);
    //xmlhttp.send();

    //$.ajax({
    //    type: "GET",
    //    dataType: 'jsonp',
    //    url: "http://147.83.7.201:3000/facebook",
    //    crossDomain: true,
    //    jsonpCallback: 'callback',
    //    xhrFields: {
    //        withCredentials: true
    //    }, success: function (data) {
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

    $.ajax({
        url: "http://localhost:3000/facebook",
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
            //window.location.href = 'updateProfile.html';
            console.log(data);
        },
        error: function (error_API) {
            console.log(error_API);
            //window.alert(error_API.response);
            //window.localStorage.setItem("userID", error_API.userId);
            //window.localStorage.setItem("token", error_API.token);
            //window.location.href = 'updateProfile.html';
        }
    });

    //$.ajax({
    //
    //    // The 'type' property sets the HTTP method.
    //    // A value of 'PUT' or 'DELETE' will trigger a preflight request.
    //    type: 'GET',
    //
    //    // The URL to make the request to.
    //    url: 'http://147.83.7.201:3000/facebook',
    //
    //    // The 'contentType' property sets the 'Content-Type' header.
    //    // The JQuery default for this property is
    //    // 'application/x-www-form-urlencoded; charset=UTF-8', which does not trigger
    //    // a preflight. If you set this value to anything other than
    //    // application/x-www-form-urlencoded, multipart/form-data, or text/plain,
    //    // you will trigger a preflight request.
    //    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    //
    //    xhrFields: {
    //        // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
    //        // This can be used to set the 'withCredentials' property.
    //        // Set the value to 'true' if you'd like to pass cookies to the server.
    //        // If this is enabled, your server must respond with the header
    //        // 'Access-Control-Allow-Credentials: true'.
    //        withCredentials: false
    //    },
    //
    //    success: function () {
    //        // Here's where you handle a successful response.
    //    },
    //
    //    error: function () {
    //        // Here's where you handle an error response.
    //        // Note that if the error was due to a CORS issue,
    //        // this function will still fire, but there won't be any additional
    //        // information about the error.
    //    }
    //});

    //var url = "http://147.83.7.201:3000/facebook";
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