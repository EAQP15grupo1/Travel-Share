window.onload = function () {
    getEventData();
    getEventComments();
};

function getEventData() {
    var url_TS = "http://192.168.2.103:3000/event/" + window.localStorage.getItem("eventID");
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
    var url_TS = "http://192.168.2.103:3000/messages/event/" + window.localStorage.getItem("eventID");
    $.ajax({
        url: url_TS,
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
            for (i = 0; i < data.length; i++) {
                $('<label style="margin: 10px; font-size: 150%"> <strong>' + data[i].username + '</strong> </label>')
                    .appendTo($('#comments'));
                $('<label>' + data[i].content + '</label>').appendTo($('#comments'));
                $('<br> <br>').appendTo($('#comments'));
            }
        },
        error: function () {
            window.alert("FAIL: No se han obtenido los datos del evento");
        }
    });
};