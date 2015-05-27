window.onload = zgetUser();

function getUser() {
    var url_TS = "http://147.83.7.201:3000/user/" + window.localStorage.getItem("userID");
    console.log(url_TS);
    $.ajax({
        url: url_TS,
        type: 'GET',
        crossDomain: true,
        dataType: "json",
        success: function (data) {
            var user = data;

            $("#userNick").text("Username: " + user.username);
            $("#userAge").text("Edad: " + user.age);
            $("#userNation").text("Nacionalidad: " + user.nation);
            $("#userDescription").text(user.description);
        }, error: function () {
            window.alert("FAIL: Los monos ya han tocado algo que no debian...");
        }

    });
}