window.onload = function () {
    getChat();
    $("#user").text("Tu usuario: " + window.localStorage.getItem("username"));
}

function getChat() {
    var url_TS = "http://147.83.7.201:3000/user/" + window.localStorage.getItem("userID");
    //var url_TS = "http://147.83.7.201:3000/user/" + "5565d7a08c3ec1500e000003";

    $.ajax({
        url: url_TS,
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
            var box = PUBNUB.$('box'), input = PUBNUB.$('input'), channel = data.chatID;

            PUBNUB.subscribe({
                channel: channel,
                callback: function (text) {
                    box.innerHTML = ('' + text).replace(/[<>]/g, '') + '<br>' + box.innerHTML
                }
            });
            PUBNUB.bind('keyup', input, function (e) {
                (e.keyCode || e.charCode) === 13 && PUBNUB.publish({
                    channel: channel, message: input.value, x: (input.value = '')
                })
            })
        },
        error: function () {
            window.alert("FAIL Own Chat");
        }
    });
}

//(function () {
//    var box = PUBNUB.$('box'), input = PUBNUB.$('input'), channel = 'chat';
//    PUBNUB.subscribe({
//        channel: channel,
//        callback: function (text) {
//            box.innerHTML = ('' + text).replace(/[<>]/g, '') + '<br>' + box.innerHTML
//        }
//    });
//    PUBNUB.bind('keyup', input, function (e) {
//        (e.keyCode || e.charCode) === 13 && PUBNUB.publish({
//            channel: channel, message: input.value, x: (input.value = '')
//        })
//    })
//})()