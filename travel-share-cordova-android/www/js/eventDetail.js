window.onload = function () {
    getEventData();
    getEventComments();
};

function getEventData() {
    var url_TS = "http://10.89.38.183:3000/event/" + window.localStorage.getItem("eventID");
    $.ajax({
        url: url_TS,
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
            $("#eventName").text(data.eventname);
            $("#eventTag").text(data.tag);
            $("#eventDate").text(data.date);
        },
        error: function () {
            window.alert("FAIL: No se han obtenido los datos del evento");
        }
    });
};

function getEventComments() {
    var url_TS = "http://10.89.38.183:3000/messages/event/" + window.localStorage.getItem("eventID");
    $.ajax({
        url: url_TS,
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
            for (i = 0; i < data.length; i++) {
                if (data[i].username == "David")
                    $('<div style="background-color: #FFF6CB; width: 90%; text-align: right; padding: 10px">' + '<label style="margin: 10px; font-size: 150%"> <strong>' + data[i].username + '</strong> <br> </label>' + '<label>' + data[i].content + '</label>' + '</div>').appendTo($('#comments'));
                else
                    $('<div style="background-color: #ffffff; width: 90%; text-align: left; padding: 10px">' + '<label style="margin: 10px; font-size: 150%"> <strong>' + data[i].username + '</strong> <br> </label>' + '<label>' + data[i].content + '</label>' + '</div>').appendTo($('#comments'));

                $('<br>').appendTo($('#comments'));
            }
        },
        error: function () {
            window.alert("FAIL: No se han obtenido los datos del evento");
        }
    });
};

$("#postBtn").click(function postMessage() {
    var content = $("#comment").val();

    if (content == "") {
        window.alert("No se pueden publicar mensajes vacíos");
    } else {
        var message = new Object();
        message.username = "David";
        message.content = content;
        message.eventid = window.localStorage.getItem("eventID");
        var data = JSON.stringify(message);

        $.ajax({
            url: "http://10.89.38.183:3000/messages",
            type: 'POST',
            crossDomain: true,
            contentType: 'application/json',
            data: data,
            success: function () {
                window.location.reload();
            },
            error: function () {
                window.alert("FAIL: No se ha podido publicar el mensaje");
            }
        });
    }
});

$("#joinBtn").click(function joinEvent() {


        var joinURL = "http://10.89.38.183:3000/event/join/"+ window.localStorage.getItem("eventID");
        var attendee = new Object();
        attendee.attendees = "5562e79d4509ab9902000001";
        var data = JSON.stringify(attendee);

        $.ajax({
            url: joinURL,
            type: 'PUT',
            crossDomain: true,
            contentType: 'application/json',
            data: data,
            success: function () {
                //window.location.reload();
                document.querySelector('#toast1').show()
            },
            error: function () {
                window.alert("FAIL: No se ha podido publicar el mensaje");
            }
        });

});



var maxLength = 150;
$('textarea').keyup(function () {
    var length = $(this).val().length;
    var length = maxLength - length;
    $('#chars').text(length);
});