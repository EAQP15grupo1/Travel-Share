window.onload = getUser();

function getUser() {
    var url_TS = "http://10.89.56.116:3000/user/" + window.localStorage.getItem("userProfileID")+"/"+window.localStorage.getItem("token");
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

function create() {
    var url_TS = "http://10.89.56.116:3000/user/chat/" + window.localStorage.getItem("userID");
    var url_TS2 = "http://10.89.56.116:3000/user/chat/" + window.localStorage.getItem("userProfileID");
    var chatID = window.localStorage.getItem("userID") + "-" + window.localStorage.getItem("userProfileID");
    //var url_TS = "http://147.83.7.201:3000/user/chat/" + "5565d7c38c3ec1500e000004";
    //var url_TS2 = "http://147.83.7.201:3000/user/chat/" + "5565d7a08c3ec1500e000003";
    //var chatID = "aaa" + "-" + "bbb";

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

        },
        error: function () {
            window.alert("FAIL Own Chat");
        }
    });

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