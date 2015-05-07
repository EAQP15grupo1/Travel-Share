window.onload = getEventData();

function getEventData () {
    $.ajax({
        url: "http://10.89.5.151:3000/event/5543c34a0db7709023000001",
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