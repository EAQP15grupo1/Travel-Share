function backoffice(){
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
            url: "http://10.89.38.183:3000/login",
            type: 'POST',
            crossDomain: true,
            contentType: 'application/json',
            dataType: 'json',
            data: data,
            success: function (data_API) {
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