// event-card
Polymer({
    publish: {
        isHidden: "false"
    },
    buttonTapped: function (event, detail, sender) {
        window.location.href = 'eventDetail.html';
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
    },
    isCardHidden: function () {
        return true;
    }
});