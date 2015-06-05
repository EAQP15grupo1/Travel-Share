window.onload = getUser();

function loadAvatar(){
    document.getElementById("avatar").src="http://10.89.56.116/avatar/"+window.localStorage.getItem("userID")+".jpg";
}

function getUser() {

    var url_TS = "http://10.89.56.116:3000/user/" + window.localStorage.getItem("userID");
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
            loadAvatar();
        }, error: function () {
            window.alert("FAIL: Los monos ya han tocado algo que no debian...");
        }

    });
}
