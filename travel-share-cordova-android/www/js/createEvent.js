$("#createBtn").click(function () {
    var eventName = $("#eventName").val();
    var eventDescription = $("#eventDescription").val();
    var eventTag = "";
    var eventDate = $("#sel").val();

    if (document.getElementById("sport").checked) {
        eventTag = "Deporte";
    } else if (document.getElementById("music").checked) {
        eventTag = "Musica";
    } else if (document.getElementById("job").checked) {
        eventTag = "Trabajo";
    } else if (document.getElementById("culture").checked) {
        eventTag = "Cultura";
    }

    var event = new Object();
    event.eventname = eventName;
    event.tag = eventTag;
    event.date = eventDate;
    var data = JSON.stringify(event);

    $.ajax({
        url: "http://10.89.40.14:3000/event",
        type: 'POST',
        crossDomain: true,
        contentType: 'application/json',
        data: data,
        success: function () {
            window.location.href = 'index.html';
        },
        error: function () {
            window.alert("FAIL: Los monos ya han tocado algo que no debian...");
        }
    });
});

$("#cancelBtn").click(function () {
    window.location.href = 'index.html';
});


//var formData = JSON.stringify($("#userForm").serialize());
////window.alert(formData);
//
//var o = {};
//var a = $("#userForm").serializeArray();
//$.each(a, function () {
//    if (o[this.name] !== undefined) {
//        if (!o[this.name].push) {
//            o[this.name] = [o[this.name]];
//        }
//        o[this.name].push(this.value || '');
//    } else {
//        o[this.name] = this.value || '';
//    }
//});
//
//var dataOK = JSON.stringify(o);
//window.alert(dataOK);
//
//$.ajax({
//    url: "http://192.168.2.103:3000/users",
//    method: "POST",
//    contentType: "application/json",
//    data: dataOK
//}).done(function (data, status, jqxhr) {
//    window.alert("OK");
//}).fail(function () {
//    window.alert("FAIL");
//});

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