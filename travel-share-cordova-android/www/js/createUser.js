//var app = {
//    // Application Constructor
//    initialize: function () {
//        this.bindEvents();
//    },
//    // Bind Event Listeners
//    //
//    // Bind any events that are required on startup. Common events are:
//    // 'load', 'deviceready', 'offline', and 'online'.
//    bindEvents: function () {
//        document.addEventListener('deviceready', this.onDeviceReady, false);
//    },
//    // deviceready Event Handler
//    //
//    // The scope of 'this' is the event. In order to call the 'receivedEvent'
//    // function, we must explicitly call 'app.receivedEvent(...);'
//    onDeviceReady: function () {
//        app.receivedEvent('deviceready');
//    },
//    // Update DOM on a Received Event
//    receivedEvent: function (id) {
//        var parentElement = document.getElementById(id);
//        var listeningElement = parentElement.querySelector('.listening');
//        var receivedElement = parentElement.querySelector('.received');
//
//        listeningElement.setAttribute('style', 'display:none;');
//        receivedElement.setAttribute('style', 'display:block;');
//
//        console.log('Received Event: ' + id);
//    }
//};
//
//app.initialize();

$("#button").click(function () {
    var formData = JSON.stringify($("#userForm").serialize());
    //window.alert(formData);

    var o = {};
    var a = $("#userForm").serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });

    var dataOK = JSON.stringify(o);
    window.alert(dataOK);

    $.ajax({
        url: "http://192.168.2.103:3000/users",
        method: "POST",
        contentType: "application/json",
        data: dataOK
    }).done(function (data, status, jqxhr) {
        window.alert("OK");
    }).fail(function () {
        window.alert("FAIL");
    });
});

//$("#button").addEventListener("click", createUser);
//
//function createUser() {
//
//
//    //$.post("https://example.com/Bank/CreditScore", {
//    //    firstName: this.firstName.value,
//    //    lastName: this.lastName.value
//    //}).then(function (data) {
//    //    if (data.score >= 500) {
//    //        alert("Congratulations, you are eligible!");
//    //    } else {
//    //        alert("Sorry, but you are not eligible.");
//    //    }
//    //});
//};