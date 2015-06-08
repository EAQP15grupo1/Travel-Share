window.onload = function () {
    createChat();
    $("#user").text("Tu usuario: " + window.localStorage.getItem("username"));
}

function createChat() {
    var url_TS = "http://147.83.7.201:3000/user/chat/" + window.localStorage.getItem("userID");
    var url_TS2 = "http://147.83.7.201:3000/user/chat/" + window.localStorage.getItem("userProfileID");
    var chatID = window.localStorage.getItem("userID") + "-" + window.localStorage.getItem("userProfileID");

    var user = new Object();
    user.chatID = chatID;
    var data = JSON.stringify(user);

    $.ajax({
        url: url_TS,
        type: 'PUT',
        crossDomain: true,
        contentType: 'application/json',
        data: data,
        success: function () {
            var box = PUBNUB.$('box'), input = PUBNUB.$('input'), channel = chatID;

            PUBNUB.subscribe({
                channel: channel,
                callback: function (text) {
                    console.log(text.text);
                    $('<br>' + '<strong>' + text.username + '</strong> <label>' + text.text + '</label>').appendTo($('#box'));
                    //box.innerHTML = ('' + text).replace(/[<>]/g, '') + '<br>' + box.innerHTML
                }
            });
            PUBNUB.bind('keyup', input, function (e) {
                (e.keyCode || e.charCode) === 13 && PUBNUB.publish({
                    channel: channel,
                    message: {username: window.localStorage.getItem("username"), text: input.value},
                    x: (input.value = '')
                })
            });
            PUBNUB.history({
                channel: channel,
                limit: 100
            }, function (messages) {
                messages = messages[0];
                messages = messages || [];

                for (var i = 0; i < messages.length; i++) {
                    console.log(messages[i]);
                    $('<br>' + '<strong>' + messages[i].username + '</strong> <label>' + messages[i].text + '</label>').appendTo($('#box'));
                    //box.innerHTML = ('<strong>' + messages[i].username + '</strong>' + messages[i].text).replace(/[<>]/g, '') + '<br>' + box.innerHTML;
                }

                $(document).scrollTop($(document).height());
            });
        },
        error: function () {
            window.alert("FAIL Own Chat");
        }
    });

    $.ajax({
        url: url_TS2,
        type: 'PUT',
        crossDomain: true,
        contentType: 'application/json',
        data: data,
        success: function () {

        },
        error: function () {
            window.alert("FAIL Chat Friend");
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