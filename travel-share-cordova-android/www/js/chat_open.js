var chat;

window.onload = function () {
    getChat();
}

function getChat() {
    var url_TS = "http://10.89.56.116:3000/user/" + window.localStorage.getItem("userID");
    //var url_TS = "http://147.83.7.201:3000/user/" + "5565d7a08c3ec1500e000003";

    $.ajax({
        url: url_TS,
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
            var box = PUBNUB.$('box'), input = $('#input'), channel = data.chatID;
            chat = data.chatID;

            if (channel.split("-")[0] == window.localStorage.getItem("username"))
                $("#span").text("Chat con " + channel.split("-")[1]);
            else
                $("#span").text("Chat con " + channel.split("-")[0]);

            PUBNUB.subscribe({
                channel: channel,
                callback: function (text) {
                    //$('<br>' + '<strong>' + text.username + '</strong> <label>' + text.text + '</label>').appendTo($('#box'));

                    if (text.username == window.localStorage.getItem("username"))
                        $('<div class="rcorners2">' + '<label style="margin: 10px; font-size: 150%"> <strong>' + text.username + '</strong> <br> </label>' + '<label>' + text.text + '</label>' + '</div>').appendTo($('#box'));
                    else
                        $('<div class="rcorners1">' + '<label style="margin: 10px; font-size: 150%"> <strong>' + text.username + '</strong> <br> </label>' + '<label>' + text.text + '</label>' + '</div>').appendTo($('#box'));

                }
            });
            PUBNUB.bind('keyup', input, function (e) {
                (e.keyCode || e.charCode) === 13 && PUBNUB.publish({
                    channel: channel,
                    message: {username: window.localStorage.getItem("username"), text: input.val()},
                    x: (input.val(""))
                })
            });

            PUBNUB.history({
                channel: channel,
                limit: 100
            }, function (messages) {
                messages = messages[0];
                messages = messages || [];

                for (var i = 0; i < messages.length; i++) {
                    //$('<br>' + '<strong>' + messages[i].username + '</strong> <label>' + messages[i].text + '</label>').appendTo($('#box'));

                    if (messages[i].username == window.localStorage.getItem("username"))
                        $('<div class="rcorners2">' + '<label style="font-size: 150%"> <strong>' + messages[i].username + '</strong> <br> </label>' + '<label>' + messages[i].text + '</label>' + '</div>').appendTo($('#box'));
                    else
                        $('<div class="rcorners1">' + '<label style="margin: 10px; font-size: 150%"> <strong>' + messages[i].username + '</strong> <br> </label>' + '<label>' + messages[i].text + '</label>' + '</div>').appendTo($('#box'));

                }

                $(document).scrollTop($(document).height());
            });
        },
        error: function () {
            window.alert("FAIL Own Chat");
        }
    });
}

$('#input').keyup(function () {
    var empty = false;
    $('#input').each(function () {
        if ($(this).val().length == 0) {
            empty = true;
        }
    });

    if (empty) {
        $('#sendButton').attr('disabled', 'disabled');
    } else {
        $('#sendButton').removeAttr('disabled');
    }
});

function send() {
    var input = $('#input');
    PUBNUB.publish({
        channel: chat,
        message: {username: window.localStorage.getItem("username"), text: input.val()},
        x: (input.val(""))
    })
};

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