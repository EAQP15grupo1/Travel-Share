var tabs = document.querySelector('paper-tabs');
var list = document.querySelector('event-list');
tabs.addEventListener('core-select', function () {
    list.show = tabs.selected;
});
addEvent = function () {
    window.location.href = 'createEvent.html';
}

// Manage the tags chosen by the user
var arrayTags = ["Deporte", "Musica", "Trabajo", "Cultura"];

document.querySelector("#sportBtn").addEventListener('change', function () {
    if (this.checked) {
        arrayTags.push("Deporte");
    } else {
        var index = arrayTags.indexOf("Deporte");
        if (index > -1) {
            arrayTags.splice(index, 1);
        }
    }
});

document.querySelector("#musicBtn").addEventListener('change', function () {
    if (this.checked) {
        arrayTags.push("Musica");
    } else {
        var index = arrayTags.indexOf("Musica");
        if (index > -1) {
            arrayTags.splice(index, 1);
        }
    }
});

document.querySelector("#jobBtn").addEventListener('change', function () {
    if (this.checked) {
        arrayTags.push("Trabajo");
    } else {
        var index = arrayTags.indexOf("Trabajo");
        if (index > -1) {
            arrayTags.splice(index, 1);
        }
    }
});

document.querySelector("#cultureBtn").addEventListener('change', function () {
    if (this.checked) {
        arrayTags.push("Cultura");
    } else {
        var index = arrayTags.indexOf("Cultura");
        if (index > -1) {
            arrayTags.splice(index, 1);
        }
    }
});

hidingCarts = function () {
    var cartas = document.querySelector('event-list');
    var arrayLength = cartas.events.length;
    console.log(cartas);
    for (var i = 0; i < arrayLength; i++) {
        if ($.inArray(cartas.events[i].tag, arrayTags) != -1) {
            window.alert(cartas.events[i].eventname);
        }
    }
};

//    // PRUEBAS DE CÓDIGO
//
//    //window.alert("HOLA");
//
//    //var element = document.querySelector('event-service');
//    //element.tags = {'name':'Web Guru','email':'guru@example.com'};
//
//    //Otro posible código
//
//    //var data = [{"tag": "Deporte"}, {"tag": "Trabajo"}];
//    //var tags = {"tags": data};
//    ////window.alert(JSON.stringify(tags));
//    //
//    //var ajax = document.querySelector('event-service');
//    //
//    //ajax.method = 'POST';
//    //ajax.handleAs = 'JSON';
//    //ajax.contentType = 'application/json';
//    //ajax.params = JSON.stringify(tags);
//    //
//    //ajax.go();
//});