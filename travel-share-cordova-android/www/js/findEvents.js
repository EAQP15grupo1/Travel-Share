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
        var index = arrayTags.indexOf("Deporte");
        if (index > -1) {
        } else {
            arrayTags.push("Deporte");
        }
    } else {
        var index = arrayTags.indexOf("Deporte");
        if (index > -1) {
            arrayTags.splice(index, 1);
        }
    }
});

document.querySelector("#musicBtn").addEventListener('change', function () {
    if (this.checked) {
        var index = arrayTags.indexOf("Musica");
        if (index > -1) {
        } else {
            arrayTags.push("Musica");
        }
    } else {
        var index = arrayTags.indexOf("Musica");
        if (index > -1) {
            arrayTags.splice(index, 1);
        }
    }
});

document.querySelector("#jobBtn").addEventListener('change', function () {
    if (this.checked) {
        var index = arrayTags.indexOf("Trabajo");
        if (index > -1) {
        } else {
            arrayTags.push("Trabajo");
        }
    } else {
        var index = arrayTags.indexOf("Trabajo");
        if (index > -1) {
            arrayTags.splice(index, 1);
        }
    }
});

document.querySelector("#cultureBtn").addEventListener('change', function () {
    if (this.checked) {
        var index = arrayTags.indexOf("Cultura");
        if (index > -1) {
        } else {
            arrayTags.push("Cultura");
        }
    } else {
        var index = arrayTags.indexOf("Cultura");
        if (index > -1) {
            arrayTags.splice(index, 1);
        }
    }
});

// Obtener los eventos filtrados por las categorías seleccionadas
function getFilteredEventData() {
    if (arrayTags.length > 0) {
        var finalArray = {tags: []};

        for (var i = 0; i < arrayTags.length; i++) {
            finalArray.tags.push({"tag": arrayTags[i]});
        }

        var data = JSON.stringify(finalArray);
        $.ajax({
            url: "http://10.89.38.183:3000/events/advanced",
            type: 'POST',
            crossDomain: true,
            dataType: 'json',
            contentType: 'application/json',
            data: data,
            success: function (data) {
                document.querySelector('event-list').events = data;
            },
            error: function () {
                window.alert("FAIL: No se han cargado los eventos");
            }
        });
    } else {
        window.alert("Debes seleccionar alguna categoría");
    }
}

window.onload = getAllEventData();

// Obtener todos los eventos
function getAllEventData() {
    $.ajax({
        url: "http://10.89.38.183:3000/events",
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
            document.querySelector('event-list').events = data;
        },
        error: function () {
            window.alert("FAIL: No se han cargado los eventos");
        }
    });
}