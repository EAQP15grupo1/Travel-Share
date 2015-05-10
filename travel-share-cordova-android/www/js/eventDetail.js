window.onload = getEventData();

function getEventData() {
    $.ajax({
        url: "http://147.83.7.201:3000/event/554ba070a5efd41e03000004",
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