$("#createBtn").click(function () {
    var usernick = $("#nick").val();
    var userusername = $("#username").val();
    var usernation = $("#nation").val();
    var password = $("#password").val();
    var password2 = $("#password2").val();

    if (password != password2) {
        window.alert("Las contraseñas no coinciden");
    } else {
        var user = new Object();
        user.nick = usernick;
        user.username = userusername;
        user.nation = usernation;
        user.password = password;
        var data = JSON.stringify(user);

        //window.alert(data);

        //window.location.href = 'index.html';

        $.ajax({
            url: "http://10.89.38.183:3000/users",
            type: 'POST',
            crossDomain: true,
            contentType: 'application/json',
            data: data,
            success: function () {
                window.location.href = 'index.html';
            },
            error: function () {
                window.alert("FAIL: Los monos ya han tocado algo que no debian...");
            }
        });
    }
});

$("#cancelBtn").click(function () {
    window.location.href = 'login.html';
});