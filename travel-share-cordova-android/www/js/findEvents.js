// event-card

// Posible solución: función que compare con lista y cambie el valor hidden en consecuencia

Polymer({
    publish: {
        hidden: true
    },
    buttonTapped: function (event, detail, sender) {
        window.location.href = 'createUser.html';
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

//Polymer({}); //event-list