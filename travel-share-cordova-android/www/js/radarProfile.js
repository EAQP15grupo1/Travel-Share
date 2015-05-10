window.onload = getUser();

function getUser() {
    var url_TS = "http://localhost:3000/user/" + getCookie("userID");
    console.log(url_TS);
    $.ajax({
        url: url_TS,
        type: 'GET',
        crossDomain: true,
        dataType: "json",
        success: function (data) {
            var user = data;

            $("#userNick").text("Nick: " + user.nick);
            $("#userAge").text("Edad: " + user.age);
            $("#userNation").text("Nacionalidad: " + user.nation);
            $("#userDescription").text(user.description);
        }, error: function () {
            window.alert("FAIL: Los monos ya han tocado algo que no debian...");
        }

    });
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}