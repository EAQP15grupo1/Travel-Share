/**
 * Created by Alejandro on 4/5/15.
 */
window.onload = getUser();
function getUser() {

    $.ajax({
        url: "http://147.83.7.201:3000/users",
        type: 'GET',
        crossDomain: true,
        dataType: "json",
        success: function (data) {

            var user = data[3];

            $("#userNick").text("Nick: " + user.nick);
            $("#userAge").text("Edad: " + user.age);
            $("#userNation").text("Nacionalidad: " + user.nation);
            $("#userDescription").text(user.description);


        }, error: function () {
            window.alert("FAIL: Los monos ya han tocado algo que no debian...");
        }

    });
}