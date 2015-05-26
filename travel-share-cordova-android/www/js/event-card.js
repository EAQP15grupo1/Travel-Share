// event-card
Polymer({
    buttonTapped: function (event, detail, sender) {
        window.localStorage.setItem("eventID", this.eventID);
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
    },
    eventsLoaded: function () {
        // Make a copy of the loaded data
        this.events = this.$.ajax.response.slice(0);
    }
});