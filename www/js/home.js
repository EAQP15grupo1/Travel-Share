var map;
var marcadores=[];
var markers=[];
var new_marker;
var filteredmarkers=[];
var geolocation;
var filter =0;
var id;
var new_event_click= false;

var username=Cookies.get('username');
var token=Cookies.get('token');
var username_id=Cookies.get('userId');
username = "123";
username_id = "554c7d88c863dda837000002";


var tags = [{
    nombre: "sin filtro",
    id: 0,
    color : "white"
},{
    nombre: "Deporte",
    tag: "Deporte",
    id: 1,
    color : "lightgreen"
},{
    nombre: "Música",
    tag: "Musica",
    id: 2,
    color: "lightskyblue"
},{
    nombre: "Cultura",
    tag: "Cultura",
    id: 3,
    color : "yellow"
},{
    nombre: "Fiesta",
    tag: "Fiesta",
    id: 4,
    color: "palevioletred"
}];

//Seleccionar el color del evento para el panel
function color_new_event(){
    var e = document.getElementById("event_tag");
    var id_value = e.options[e.selectedIndex].value;
    document.getElementById("panel_new_event").style.borderColor = tags[id_value].color;
    $(".fa.fa-times").css("color",tags[id_value].color);
    $("#event_tag").css("background-color",tags[id_value].color);


}

//Abrir el panel del nuevo evento
function newevent(){
    document.getElementById("panel_tag").style.visibility = 'hidden';
    document.getElementById("panel_info").style.visibility = 'hidden';
    document.getElementById("panel_new_event").style.visibility = 'visible';
    document.getElementById("new_event_button").style.visibility = 'hidden';

    new_event_click=true;
    $(".fa.fa-times").css("color","black");
    setAllMap(null,filter);

    google.maps.event.addListener(map, 'click', function(e)
    {
        placeMarker(e.latLng, map);

    });
    $('#datetimepicker').datetimepicker({
        inline: true,
        lang: 'es',
        minDate: '0',
        onSelectDate: function (ct, $i) {
            $("#date").val(ct.dateFormat('Y-m-d H:i'))
        },
        onSelectTime:function(ct,$i){
            $("#date").val(ct.dateFormat('Y-m-d H:i'))
        }
    });
}

//Abrir panel inforamcion del evento
function info_evento(marker){
    var color = tags[marker.tag].color;
    document.getElementById("panel_tag").style.visibility = 'hidden';
    document.getElementById("panel_info").style.visibility = 'visible';
    document.getElementById("buttonjoin").style.backgroundColor = color;
    document.getElementById("buttonjoin").style.visibility = 'visible';
    if(marker.owner == username_id){
        document.getElementById("buttonjoin").style.visibility = 'hidden';
    }

    document.getElementById("panel_info").style.borderColor = color;

    $(".fa.fa-times").css("color",color);

    document.getElementById("A").innerHTML = marker.event;
    $("#A").css("color",color);
    document.getElementById("B").innerHTML = marker.content;

    document.getElementById("description").innerHTML = marker.description;
    document.getElementById("fecha").innerHTML = marker.date;
    id= marker.id;
}


//Salir del panel nuevo evento
function exitpanel2(){
    document.getElementById("panel_tag").style.visibility = 'visible';
    document.getElementById("panel_info").style.visibility = 'hidden';
    document.getElementById("panel_new_event").style.visibility = 'hidden';
    document.getElementById("new_event_button").style.visibility = 'visible';

    setAllMap(map,filter);
    $("#new_eventname").val("");
    $("#new_description").val("");
    $("#datetimepicker").val("");
    $("#date").val("");
    document.getElementById("panel_new_event").style.borderColor = "black";
    $(".fa.fa-times").css("color","black");
    $("#event_tag").css("background-color","white");
    var e = document.getElementById("event_tag");
    e.value = 0;
    google.maps.event.clearListeners(map, 'click', function(e){});
    google.maps.event.clearListeners(map, 'dragend', function(e){});
    if(new_marker != null && new_marker != "")
    {
        new_marker.setMap(null);
        new_marker = null;
    }
}


//Carga los marcadores de la API
(function() {
    var app = angular.module('Eventos', []);
    app.controller('CargarEventos', ['$http', '$log', function ($http) {
        $http.get('http://localhost:3000/events').success(function (data) {
            marcadores = data;
            my_position();
            filterMarkers("Nada");
        });
    }]);
})();


function initialize() {
    //Cargamos las opciones del mapa
    var mapOptions = {
        zoom: 12,
        draggable: true,
        zoomControl : true,
        disableDoubleClickZoom: true
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);


//Obtiene My posicion
function my_position(){
    // Try HTML5 geolocation
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(function(position) {
            geolocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var content="-";
            var detalle = "Tú estas aquí";
            var tag = "0";
            //Añade el marcador al mapa
            addMarker(geolocation,detalle,map);
            map.panTo(geolocation);
        }, function() {
            handleNoGeolocation(true);
        });
    } else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(false);
    }
}
//Añadir el marcador de geopiscionamiento al mapa
function addMarker(position,detalle,map) {
    var icon = "img/pos_0.png";
    var marker= new google.maps.Marker
    ({
        id:id,
        position: position,
        map: map,
        detalle:detalle,
        icon: icon,
        animation: google.maps.Animation.DROP

    });
    pushMarker(marker);
    var infowindow2 = new google.maps.InfoWindow
    ({
        content: ''
    })
    var detalle = detalle;
    (function(marker,detalle) {
        google.maps.event.addListener(marker, 'mouseover', function()
        {
            infowindow2.setContent(detalle);
            infowindow2.open(map, marker);
        });
        google.maps.event.addListener(marker, 'mouseout', function() {
            infowindow2.close(map, marker);
        });
        if (marker.tag!=0)
        {
            google.maps.event.addListener(marker, 'click', function() {
                map.setCenter(marker.getPosition());
                info_evento(marker);
            });
        }
    })(marker, detalle);
}


//Funcion para pintar en el mapa despues de cerrar panel nuevo evento
function setAllMap(map,x) {
    if(x==0){
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }
    else{
        for (var i = 0; i < filteredmarkers.length; i++) {
            filteredmarkers[i].setMap(map);
        }
    }
}


//Clicar en el mapa para escojer la ubicación
function placeMarker(position, map) {
    if(new_event_click==true)
    {
        new_marker= new google.maps.Marker
        ({
            position: position,
            draggable: true,
            map: map
        });
        pushMarker(new_marker);
        //document.getElementById("label").innerText = new_marker.position.lat()+","+new_marker.position.lng();
        map.setCenter(new_marker.getPosition());

        new_event_click = false;

        google.maps.event.addListener(new_marker, 'dragend', function(e) {
            //    document.getElementById("label").innerText = e.latLng.lat() + ',' + e.latLng.lng();
            map.setCenter(new_marker.getPosition());
        });
    }
}
//Click en crear nuevo post
function new_marker_post(){
    var e = document.getElementById("event_tag");
    var idtag = e.options[e.selectedIndex].value;
    var join = false;
    if(new_marker != null )
    {
        var lat = new_marker.position.lat();
        var lng= new_marker.position.lng();
        var place= new Array();
        place[0] = ''+lat+'';
        place[1] = ''+lng+'';
    }
    if($("#new_eventname").val()!="" && $("#new_description").val()!="" &&  $("#datetimepicker6").val()!="" && idtag!="null"){
        join = true;
        var new_event =new Object();
            new_event.eventname = $("#new_eventname").val();
            new_event.tag = tags[idtag].tag;
            new_event.idtag = idtag;
            new_event.description = $("#new_description").val();
            new_event.owner = username_id;
            new_event.attendees = username_id;

            new_event.place = place;
            new_event.date = $("#date").val();
            var data = JSON.stringify(new_event);
            $.ajax({
                    url: "http://localhost:3000/event",
                    type: 'POST',
                    crossDomain: true,
                    dataType: 'json',
                    contentType: 'application/json',
                    data: data,
                    success: function (data) {
                        console.log("CorrectPost");
                        joinToEvent(data._id);

                    },
                    error: function () {
                    }
                });
    }
    if(place==null ){
        window.alert("Clicar en el mapa para indicar un sitio");
    }
    if(join == false) {
        window.alert("Rellene todos los datos");
    }
}

//Una vez creado el post, te unes al evento
function joinToEvent(id){
    var new_attednees =new Object();
    new_attednees.attendees = username_id;
    var data = JSON.stringify(new_attednees);
    $.ajax({
        url: "http://localhost:3000/event/join/"+id,
        type: 'PUT',
        crossDomain: true,
        dataType: 'json',
        contentType: 'application/json',
        data: data,
        success: function () {

        },
        error: function () {
            window.location.href="home.html";
        }
    });

}


// Funcion unirse a un evento del mapa nos lleva a evento.html(FORO)
function join(){
    var join =new Object();
    join.attendees = username_id;
    var data = JSON.stringify(join);
    $.ajax({
        url: "http://localhost:3000/event/join/"+id,
        type: 'PUT',
        crossDomain: true,
        dataType: 'json',
        contentType: 'application/json',
        data: data,
        success: function (x) {
            Cookies.set('id_event',id);
            Cookies.set('id_user',username_id);
            Cookies.set('username',username);
        },
        error: function (x) {
            exitpanel();
            Cookies.set('id_event',id);
            Cookies.set('id_user',username_id);
            Cookies.set('username',username);
            window.location.href="event.html";
        }
    });
}

function Filter(type){
    var keyWord=type;
    filteredmarkers=[];
    filterMarkers(keyWord);
}


//Funciones para escojer segun los filtros los eventos que queremos visualizar
function pushMarker(marker){
    markers.push(marker);
}
function addfilterMarker(position,detalle,map,content,event,tag,color,date,description,id,owner){
    if(username_id ==  owner){
        var icon = "img/posmy_"+tag+".png"
    }
    else{
        var icon = "img/pos_"+tag+".png"
    }


    var marker= new google.maps.Marker
    ({
        id:id,
        position: position,
        map: map,
        content:content,
        event: event,
        icon: icon,
        tag: tag,
        animation: google.maps.Animation.DROP,
        detalle:detalle,
        color:color,
        date:date,
        description :description,
        owner: owner
    });
    pushfilterMarker(marker);
    var infowindow2 = new google.maps.InfoWindow
    ({
        content: ''
    })
    var detalle = detalle;
    (function(marker,detalle) {
        google.maps.event.addListener(marker, 'mouseover', function()
        {
            infowindow2.setContent(detalle);
            infowindow2.open(map, marker);
        });
        google.maps.event.addListener(marker, 'mouseout', function() {
            infowindow2.close(map, marker);
        });
        google.maps.event.addListener(marker, 'click', function() {
            map.setCenter(marker.getPosition());
            info_evento(marker);
        });
    })(marker, detalle);


}
function pushfilterMarker(marker){
    filteredmarkers.push(marker);
}
function showFilteredMarkers(){
    for(var i=0;i<filteredmarkers.length;i++)
    {
        filteredmarkers[i].setMap(map);

        var marker=filteredmarkers[i];

        var infowindow2 = new google.maps.InfoWindow
        ({
            detalle: ''
        })
        var detalle = filteredmarkers[i].detalle;
        (function(marker,detalle) {
            google.maps.event.addListener(marker, 'mouseover', function()
            {
                infowindow2.setContent(detalle);
                infowindow2.open(map, marker);
            });
            google.maps.event.addListener(marker, 'mouseout', function() {
                infowindow2.close(map, marker);
            });

        })(marker, detalle);

    }
    my_position();
}
function restart(){
    var mapOptions =
    {
        center:geolocation,
        zoom:11,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);


    showFilteredMarkers();
}
function filterMarkers(keyWord){
    var i=0;
    var isFiltered=false;
    if(keyWord=="Nada"){
        while(i<marcadores.length)
        {
            filter =1;
            isFiltered=true;
            var content = marcadores[i].eventname;
            var event=marcadores[i].tag;
            var position=new google.maps.LatLng(marcadores[i].place[0],marcadores[i].place[1]);
            var detalle="Event: "+event+"<br>"+"Content: "+content;
            var tag= marcadores[i].idtag;
            var color = marcadores[i].color;
            var date = marcadores[i].date;
            var description = marcadores[i].description;
            var id = marcadores[i]._id;
            var owner = marcadores[i].owner;

            addfilterMarker(position,detalle,map,content,event,tag,color,date,description,id,owner);
            i++;

        }
    }
    else{
        while(i<marcadores.length)
        {
            if(marcadores[i].tag==keyWord)
            {
                filter =1;
                isFiltered=true;
                var content = marcadores[i].eventname;
                var event =marcadores[i].tag;
                var position=new google.maps.LatLng(marcadores[i].place[0],marcadores[i].place[1]);
                var detalle="Event: "+event+"<br>"+"Content: "+content;
                var tag= marcadores[i].idtag;
                var color = marcadores[i].color;
                var date = marcadores[i].date;
                var description = marcadores[i].description;
                var id = marcadores[i]._id;
                var owner = marcadores[i].owner;

                addfilterMarker(position,detalle,map,content,event,tag,color,date,description,id,owner);

            }
            i++;
        }
    }
    if(isFiltered==true)
    {
        restart();
    }
}








