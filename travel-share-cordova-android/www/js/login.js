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
            url: "http://localhost:3000/login",
            type: 'POST',
            crossDomain: true,
            contentType: 'application/json',
            dataType: 'json',
            data: data,
            success: function (data_API) {
                window.localStorage.setItem("username", user.username);
                window.localStorage.setItem("userID", data_API.userId);
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