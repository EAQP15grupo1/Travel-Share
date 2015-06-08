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

        console.log(data);

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
                window.localStorage.setItem("token",data_API.token);
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