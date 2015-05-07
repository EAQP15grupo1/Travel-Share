// event-card
Polymer({
    buttonTapped: function (event, detail, sender) {
        window.location.href = 'eventDetail.html';
    },
    hideCards: function (event, detail, sender) {
        console.log(this.eventTag);
        var arrayTags = ["Deporte", "Musica"];
        if ($.inArray(this.eventTag, arrayTags) == -1)
            this.setAttribute("hidden", true);
    }
});

//event-service
Polymer('event-service', {
    created: function () {
        this.events = [];

        //$.ajax({
        //    url: "http://10.189.186.175:3000/events",
        //    type: 'GET',
        //    crossDomain: true,
        //    dataType: 'json',
        //    success: function (data) {
        //        this.eventsLoaded();
        //    },
        //    error: function () {
        //        window.alert("FAIL: No se han obtenido los datos del evento");
        //    }
        //});
    },
    eventsLoaded: function () {
        // Make a copy of the loaded data
        this.events = this.$.ajax.response.slice(0);
    }
});