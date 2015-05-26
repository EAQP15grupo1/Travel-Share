console.log("Bievenido al examen de EA");
window.onload= get();
var order =0;
var today;
var element = new Object();
var elementu =new Object();

function warning(id) {
    document.getElementById('warning'+id).show();
}

function ordenar() {
    if (order == 0) {
        order = 1;
        get();
    }
    else {
        order = 0;
        get();
    }
}
function newpost(){
    document.getElementById("A").style.visibility = 'hidden';
    document.getElementById("B").style.display = 'block';
    document.getElementById("new").style.visibility = 'hidden';
    document.getElementById("back").style.display = 'block';
    $( "#A" ).hide();

    $("#name").val("");
    $("#comments").val('');
}
function back(){
    document.getElementById("A").style.visibility = 'visible';
    document.getElementById("B").style.display = 'none';
    document.getElementById("new").style.visibility = 'visible';
    document.getElementById("back").style.display = 'none';
    $( "#A" ).show();
}
function info(){
    document.getElementById("A").style.visibility = 'hidden';
    document.getElementById("C").style.display = 'block';
    document.getElementById("new").style.visibility = 'hidden';
    document.getElementById("back2").style.display = 'block';
    $( "#A" ).hide();
}
function back2(){
    document.getElementById("A").style.visibility = 'visible';
    document.getElementById("C").style.display = 'none';
    document.getElementById("new").style.visibility = 'visible';
    document.getElementById("back2").style.display = 'none';
    $( "#A" ).show();
}


function get_id(id){
    info();
    var url= "http://localhost:3000/comment/"+id;
    $.ajax({
        url: url,
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
            console.log(data);

            var id = data._id;
            var nameu = data.name;
            var commentsu = data.comments;
            var eventu = data.event;

            $("#nameu").val(nameu);
            $("#commentsu").val(commentsu);
            $("#eventu").val(eventu);
            $("#eventu").attr('disabled','disabled');
            console.log(id);
            elementu._id=id;
            elementu.event=eventu;
        },
        error: function (data) {
            window.alert(data);
        }
    });
}

function update(){
    console.log(elementu);

    var nameu = $("#nameu").val();
    var commentsu = $("#commentsu").val();
    if(nameu!="" && commentsu!="" ){
        fecha();
        elementu.fecha=today;
        elementu.name = nameu;
        elementu.comments = commentsu;
        var data = JSON.stringify(elementu);
        console.log(elementu)
        var url = "http://localhost:3000/comment/"+elementu._id;
        $.ajax({
            url: url,
            type: 'PUT',
            crossDomain: true,
            contentType: 'application/json',
            data: data,
            success: function (data) {
                document.getElementById("A").style.visibility = 'visible';
                document.getElementById("C").style.display = 'none';
                document.getElementById("new").style.visibility = 'visible';
                document.getElementById("back2").style.display = 'none';
                $( "#A" ).show();
                $('#getlist').text('');
                get();
                warning(5);
            },
            error: function (data) {
                console.log(data);
                console.log("error");
            }
        });
    }
    else{
        warning(6);
    }
}

function delete_id(id){
    var url= "http://localhost:3000/comment/"+id;
    $.ajax({
        url: url,
        type: 'DELETE',
        crossDomain: true,
        success: function (data) {
            $('#getlist').text('')
            get();
            warning(4);
        },
        error: function (data) {
            window.alert("Error");
        }
    });
}

function get() {
    var i;
    $('#getlist').text('');
    $.ajax({
        url: "http://localhost:3000/comments",
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
            if(order == 0){
                for ( i = data.length-1; i >=0; i--) {
                    $('<div  style="border:solid;border-color:#DDDDDD;box-shadow: 5px 5px 5px #e2d9d4"><h2> ' + data[i].name + '</h2><strong> Comentario: </strong> ' + data[i].comments + '<br><strong> Evento: </strong> ' + data[i].event + '</h2><strong> Date: </strong> ' + data[i].fecha + '<br><br><paper-button id=' + data[i]._id + ' class="coloredDelete" raised="true" role="button" onclick="delete_id(id)">DELETE</paper-button><paper-button id=' + data[i]._id + ' class="colored" style="background-color:#ffcf24" raised="true" role="button" onclick="get_id(id)">UPDATE</paper-button><br><br></div><br>').appendTo($('#getlist'));
                }
            }
            else{
                for (i = 0; i < data.length; i++) {
                    $('<div  style="border:solid;border-color:#DDDDDD;box-shadow: 5px 5px 5px #e2d9d4"><h2> ' + data[i].name + '</h2><strong> Comentario: </strong> ' + data[i].comments + '<br><strong> Evento: </strong> ' + data[i].event + '</h2><strong> Date: </strong> ' + data[i].fecha + '<br><br><paper-button id=' + data[i]._id + ' class="coloredDelete" raised="true" role="button" onclick="delete_id(id)">DELETE</paper-button><paper-button id=' + data[i]._id + ' class="colored" style="background-color:#ffcf24" raised="true" role="button" onclick="get_id(id)">UPDATE</paper-button><br><br></div><br>').appendTo($('#getlist'));
                }
            }
        },
        error: function () {
            window.alert("Error");
        }
    });
}

function fecha(){
    today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    d = new Date();
    datetext = d.toTimeString();
    datetext = datetext.split(' ')[0];
    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    }
    if(mm<10){
        mm='0'+mm
    }
    today = datetext+' - '+dd+'/'+mm+'/'+yyyy;
    console.log(today);
    }

function post() {
    var name = $("#name").val();
    var comments = $("#comments").val();
    var e = document.getElementById("event");
    var event = e.options[e.selectedIndex].value;
    if(name!="" && comments!=""){

        fecha();
        element.name = name;
        element.comments = comments;
        element.event = event;
        element.fecha=today;
        var data = JSON.stringify(element);
        console.log(data);

        $.ajax({
            url: "http://localhost:3000/comments",
            type: 'POST',
            crossDomain: true,
            dataType: 'json',
            contentType: 'application/json',
            data: data,
            success: function (data) {

                document.getElementById("A").style.visibility = 'visible';
                document.getElementById("B").style.display = 'none';
                document.getElementById("new").style.visibility = 'visible';
                document.getElementById("back").style.display = 'none';
                $( "#A" ).show();
                $('#getlist').text('')
                get();
                warning(3);
            },
            error: function () {
                warning(2);

            }
        });
    }
    else{
        warning(1);
    }

}
