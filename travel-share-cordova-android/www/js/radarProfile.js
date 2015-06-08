window.onload = getUser();

function getUser() {
    var url_TS = "http://10.89.57.199:3000/user/" + window.localStorage.getItem("userProfileID") + "/" + window.localStorage.getItem("token");
    console.log(url_TS);
    $.ajax({
        url: url_TS,
        type: 'GET',
        crossDomain: true,
        dataType: "json",
        success: function (data) {
            var user = data;

            $("#userNick").text(user.username);
            $("#userAge").text("Nombre: " + user.name);
            $("#userNation").text("Nacionalidad: " + user.nation);
            $("#userDescription").text(user.description);


            for (var i = 1; i <= user.needs.length; i++) {
                $("#N" + i).text(" - " + user.needs[i - 1]);
            }

            for (var j = 1; j <= user.offers.length; j++) {
                $("#O" + j).text(" - " + user.offers[j - 1]);
            }

            document.getElementById("avatar").src = "http://147.83.7.201/avatar/" + window.localStorage.getItem("userProfileID") + ".jpg";
            window.localStorage.setItem("userProfileusername", user.username);
        }, error: function () {
            window.alert("FAIL: Los monos ya han tocado algo que no debian...");
        }

    });
}

function create() {
    var url_TS = "http://147.83.7.201:3000/user/chat/" + window.localStorage.getItem("userID");
    var chatID = window.localStorage.getItem("username") + "-" + window.localStorage.getItem("userProfileusername");

    var user = new Object();
    user.chatID = chatID;
    var data = JSON.stringify(user);

    $.ajax({
        url: url_TS,
        type: 'PUT',
        crossDomain: true,
        contentType: 'application/json',
        data: data,
        success: function () {
            create2();
        },
        error: function () {
            window.alert("FAIL Own Chat");
        }
    });
}

function create2() {
    var url_TS2 = "http://147.83.7.201:3000/user/chat/" + window.localStorage.getItem("userProfileID");
    var chatID = window.localStorage.getItem("username") + "-" + window.localStorage.getItem("userProfileusername");

    $.ajax({
        url: url_TS2,
        type: 'PUT',
        crossDomain: true,
        contentType: 'application/json',
        data: data,
        success: function () {
            window.location.href = "chat_open.html";
        },
        error: function () {
            window.alert("FAIL Chat Friend");
        }
    });
}