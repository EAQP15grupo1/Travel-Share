$("#createBtn").click(function () {
    var username = $("#name").val();
    var userusername = $("#username").val();
    var usernation = $("#nation").val();
    var password = $("#password").val();
    var password2 = $("#password2").val();
    var needs = needsArray;
    var offers = offersArray;
    var description = $("#description").val();

    if (password != password2) {
        window.alert("Las contraseñas no coinciden");
    } else {
        var user = new Object();
        user.name = username;
        user.username = userusername;
        user.nation = usernation;
        user.password = password;
        user.needs = needs;
        user.offers = offers;
        user.description = description;
        var data = JSON.stringify(user);

        $.ajax({
            url: "http://147.83.7.201:3000/users",
            type: 'POST',
            crossDomain: true,
            contentType: 'application/json',
            data: data,
            success: function (data_API) {
                window.location.href = 'login.html';
            },
            error: function () {
                window.alert("FAIL");
            }
        });
    }
});

$("#cancelBtn").click(function () {
    window.location.href = 'login.html';
});

var countN = 0;
var needsArray = [];
$("#sportN").change(function () {
    if (this.checked) {
        countN++;
        needsArray.push("Deporte");
    }
    else {
        countN--;
        var index = needsArray.indexOf("Deporte");
        if (index > -1) {
            needsArray.splice(index, 1);
        }
    }

    if (countN > 3) {
        this.checked = false;
        countN--;
    }
});
$("#musicN").change(function () {
    if (this.checked) {
        countN++;
        needsArray.push("Musica");
    }
    else {
        countN--;
        var index = needsArray.indexOf("Musica");
        if (index > -1) {
            needsArray.splice(index, 1);
        }
    }

    if (countN > 3) {
        this.checked = false;
        countN--;
    }
});
$("#jobN").change(function () {
    if (this.checked) {
        countN++;
        needsArray.push("Trabajo");
    }
    else {
        countN--;
        var index = needsArray.indexOf("Trabajo");
        if (index > -1) {
            needsArray.splice(index, 1);
        }
    }

    if (countN > 3) {
        this.checked = false;
        countN--;
    }
});
$("#cultureN").change(function () {
    if (this.checked) {
        countN++;
        needsArray.push("Cultura");
    }
    else {
        countN--;
        var index = needsArray.indexOf("Cultura");
        if (index > -1) {
            needsArray.splice(index, 1);
        }
    }

    if (countN > 3) {
        this.checked = false;
        countN--;
    }
});

var countO = 0;
var offersArray = [];
$("#sportO").change(function () {
    if (this.checked) {
        countO++;
        offersArray.push("Deporte");
    }
    else {
        countO--;
        var index = offersArray.indexOf("Deporte");
        if (index > -1) {
            offersArray.splice(index, 1);
        }
    }

    if (countO > 3) {
        this.checked = false;
        countO--;
    }
});
$("#musicO").change(function () {
    if (this.checked) {
        countO++;
        offersArray.push("Musica");
    }
    else {
        countO--;
        var index = offersArray.indexOf("Musica");
        if (index > -1) {
            offersArray.splice(index, 1);
        }
    }

    if (countO > 3) {
        this.checked = false;
        countO--;
    }
});
$("#jobO").change(function () {
    if (this.checked) {
        countO++;
        offersArray.push("Trabajo");
    }
    else {
        countO--;
        var index = offersArray.indexOf("Trabajo");
        if (index > -1) {
            offersArray.splice(index, 1);
        }
    }

    if (countO > 3) {
        this.checked = false;
        countO--;
    }
});
$("#cultureO").change(function () {
    if (this.checked) {
        countO++;
        offersArray.push("Cultura");
    }
    else {
        countO--;
        var index = offersArray.indexOf("Cultura");
        if (index > -1) {
            offersArray.splice(index, 1);
        }
    }

    if (countO > 3) {
        this.checked = false;
        countO--;
    }
});

var maxLength = 200;
$('textarea').keyup(function () {
    var length = $(this).val().length;
    var length = maxLength - length;
    $('#chars').text(length);
});