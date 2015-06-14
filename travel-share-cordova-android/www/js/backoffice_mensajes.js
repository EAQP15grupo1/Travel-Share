
window.onload = get();
var order = 0;
var today;
var element = new Object();
var elementu = new Object();
$("#username").attr('disabled', 'disabled');


function warning(id) {
    document.getElementById('warning' + id).show();
}

function ordenar() {
    if (order == 0) {
        order = 1;
        get();
    }
    else {
        order = 0;
        get();
    }
}
function newpost() {
    document.getElementById("A").style.visibility = 'hidden';
    document.getElementById("B").style.display = 'block';
    document.getElementById("new").style.visibility = 'hidden';
    document.getElementById("back").style.display = 'block';
    $("#A").hide();
    $("#username").val("admin");
    $("#content").val('');
    $("#eventid").val('');
}
function back() {
    document.getElementById("A").style.visibility = 'visible';
    document.getElementById("B").style.display = 'none';
    document.getElementById("new").style.visibility = 'visible';
    document.getElementById("back").style.display = 'none';
    $("#A").show();
}
function info() {
    document.getElementById("A").style.visibility = 'hidden';
    document.getElementById("C").style.display = 'block';
    document.getElementById("new").style.visibility = 'hidden';
    document.getElementById("back2").style.display = 'block';
    $("#A").hide();
}
function back2() {
    document.getElementById("A").style.visibility = 'visible';
    document.getElementById("C").style.display = 'none';
    document.getElementById("new").style.visibility = 'visible';
    document.getElementById("back2").style.display = 'none';
    $("#A").show();
}


function get_id(id) {
    info();
    var url = "http://147.83.7.201:3000/backoffice/message/"+ id;
    $.ajax({
        url: url,
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
            console.log(data);

            var _id = data._id;
            var usernameu = data.username;
            var contentu = data.content;
            var eventidu = data.eventid;

            $("#usernameu").val(usernameu);
            $("#contentu").val(contentu);
            $("#eventidu").val(eventidu);
            $("#eventidu").attr('disabled', 'disabled');
            $("#usernameu").attr('disabled', 'disabled');
            console.log(id);
            elementu._id = _id;
            elementu.eventid = eventidu;
            elementu.username = usernameu;
            console.log(elementu);
        },
        error: function (data) {
            window.alert(data);
        }
    });
}

function update() {
    console.log(elementu);
    var contentu = $("#contentu").val();
    if ( contentu != "") {
        fecha();
        elementu.fecha = today;

        elementu.content = contentu;
        var data = JSON.stringify(elementu);
        console.log(elementu)

        var url = "http://147.83.7.201:3000/backoffice/message/" + elementu._id;
        console.log(url);

        $.ajax({
            url: url,
            type: 'PUT',
            crossDomain: true,
            contentType: 'application/json',
            data: data,
            success: function (data) {
                document.getElementById("A").style.visibility = 'visible';
                document.getElementById("C").style.display = 'none';
                document.getElementById("new").style.visibility = 'visible';
                document.getElementById("back2").style.display = 'none';
                $("#A").show();
                $('#getlist').text('');
                get();
                warning(5);
            },
            error: function (data) {
                console.log(data);
                console.log("error");
            }
        });
    }
    else {
        warning(6);
    }
}

function delete_id(id) {
    var url = "http://147.83.7.201:3000/backoffice/message/"+id;
    $.ajax({
        url: url,
        type: 'DELETE',
        crossDomain: true,
        success: function (data) {
            console.log(data);
            $('#getlist').text('')
            get();
            warning(4);
        },
        error: function (data) {
            window.alert("Error");
        }
    });
}

function get() {
    var i;
    $('#getlist').text('');
    $.ajax({
        url: "http://147.83.7.201:3000/messages",
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            if (order == 0) {
                for (i = data.length - 1; i >= 0; i--) {
                    $('<div  style="border:solid;border-color:#DDDDDD;box-shadow: 5px 5px 5px #e2d9d4"><h2> ' + data[i].username + '</h2><strong> Comentario: </strong> ' + data[i].content + '<br><strong> Evento_id: </strong> ' + data[i].eventid + '</h2><strong> Date: </strong> ' + data[i].fecha + '<br><br><paper-button id=' + data[i]._id + ' class="coloredDelete" raised="true" role="button" onclick="delete_id(id)">DELETE</paper-button><br><br></div><br>').appendTo($('#getlist'));
                //<paper-button id=' + data[i]._id + ' class="colored" style="background-color:#ffcf24" raised="true" role="button" onclick="get_id(id)">UPDATE</paper-button>
                }
            }
            else {
                for (i = 0; i < data.length; i++) {
                    $('<div  style="border:solid;border-color:#DDDDDD;box-shadow: 5px 5px 5px #e2d9d4"><h2> ' + data[i].username + '</h2><strong> Comentario: </strong> ' + data[i].content + '<br><strong> Evento: </strong> ' + data[i].eventid + '</h2><strong> Date: </strong> ' + data[i].fecha + '<br><br><paper-button id=' + data[i]._id + ' class="coloredDelete" raised="true" role="button" onclick="delete_id(id)">DELETE</paper-button><br><br></div><br>').appendTo($('#getlist'));
                }
            }
        },
        error: function () {
            window.alert("Error");
        }
    });
}

function fecha() {
    today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    d = new Date();
    datetext = d.toTimeString();
    datetext = datetext.split(' ')[0];
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    today = yyyy + '/' + mm + '/' + dd +" - "+ datetext ;
    console.log(today);
}

function post() {
    var username = $("#username").val();
    var content = $("#content").val();
    var eventid = $("#eventid").val();
    if (username != "" && content != "" && eventid !="") {
        fecha();
        element.username = username;
        element.content = content;
        element.eventid = eventid;
        element.fecha = today;
        var data = JSON.stringify(element);
        console.log(data);
        $.ajax({
            url: "http://147.83.7.201:3000/messages",
            type: 'POST',
            crossDomain: true,
            dataType: 'json',
            contentType: 'application/json',
            data: data,
            success: function (data) {
                console.log(data);
                document.getElementById("A").style.visibility = 'visible';
                document.getElementById("B").style.display = 'none';
                document.getElementById("new").style.visibility = 'visible';
                document.getElementById("back").style.display = 'none';
                $("#A").show();
                $('#getlist').text('')
                get();
                warning(3);
            },
            error: function () {
                warning(2);

            }
        });
    }
    else {
        warning(1);
    }

}
