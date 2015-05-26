/**
 * Created by Miranda on 24/04/2015.
 */
var map;
var marcadores=[];
var markers=[];
//var marker=[];
var new_marker;
var filteredmarkers=[];
var geolocation;
var new_event_click= false;
var usenrame= "prueba";
var username_id="556324cff5dc436409000001";

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



function newevent(){
    document.getElementById("panel_tag").style.visibility = 'hidden';
    document.getElementById("panel_info").style.visibility = 'hidden';
    document.getElementById("panel_new_event").style.visibility = 'visible';
    new_event_click=true;
}

function exitpanel(){
    document.getElementById("panel_tag").style.visibility = 'visible';
    document.getElementById("panel_info").style.visibility = 'hidden';
    document.getElementById("panel_new_event").style.visibility = 'hidden';
    //new_event_click=false;
    setAllMap(map);
    new_marker = "";

}

//Carga los marcadores de la API
(function() {
    var app = angular.module('Eventos', []);
    app.controller('CargarEventos', ['$http', '$log', function ($http) {
        $http.get('http://localhost:3000/events').success(function (data) {
            console.log(data);
            marcadores = data;
        });
    }]);
})();



function initialize() {



    var mapOptions = {
        zoom: 12,
        draggable: true,
        zoomControl : true,
        disableDoubleClickZoom: true
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var infowindow = new google.maps.InfoWindow({content: ''});

    // Try HTML5 geolocation
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(function(position) {
            geolocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var content="You're here";
            var event="none";
            var detalle = "Tú estas aquí";
            var tag = "0";
            addMarker(geolocation,detalle,map,content,event,tag);
            map.panTo(geolocation);
        }, function() {
            handleNoGeolocation(true);
        });
    } else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(false);
    }

    // Thread espera que se le clique
    google.maps.event.addListener(map, 'click', function(e)
    {
        placeMarker(e.latLng, map);

    });

    // se añanden los macadores y se añade sus valores
    for (var i = 0, j = marcadores.length; i < j; i++)
    {
        var content = marcadores[i].eventname; // content Salir a tomar algo
        var event=marcadores[i].tag; //event antes Fiesta
        var tag = marcadores[i].idtag;
        var detalle="Event: "+event+"<br>"+"Content: "+content;
        var color = marcadores[i].color;
        var date = marcadores[i].date;
        var description = marcadores[i].description;

        var position=new google.maps.LatLng(marcadores[i].place[0],marcadores[i].place[1]);
        addMarker(position,detalle,map,content,event,tag,color,date,description);
    }

    //Creamos el boton de buscar
    var input = ( document.getElementById('pac-input'));
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    //var searchBox = new google.maps.places.SearchBox((input));
}
google.maps.event.addDomListener(window, 'load', initialize);





function setAllMap(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}


function new_marker_post(){
    var e = document.getElementById("event_tag");
    var idtag = e.options[e.selectedIndex].value;


    var new_event =new Object();
    new_event.eventname = $("#new_eventname").val();
    new_event.tag = tags[idtag].tag;
    new_event.idtag = idtag;
    new_event.description = $("#new_description").val();
    new_event.owner = username_id;
    var lat = new_marker.position.lat();
    var lng= new_marker.position.lng();
    var place= new Array();
        place[0] = ''+lat+'';
        place[1] = ''+lng+'';
    //console.log('["'+new_marker.position.lat()+'","'+new_marker.position.lng()+'"]');
    new_event.place = place;
    new_event.date = $("#datetimepicker6").val();
    console.log(place);
    var data = JSON.stringify(new_event);
    console.log(data);
    $.ajax({
            url: "http://localhost:3000/event",
            type: 'POST',
            crossDomain: true,
            dataType: 'json',
            contentType: 'application/json',
            data: data,
            success: function (data) {
                console.log("correct");
            },
            error: function () {

            }
        });
}

function placeMarker(position, map) {
    if(new_event_click==true)
    {
        //setAllMap(null);
        new_marker= new google.maps.Marker
        ({
            position: position,
            draggable: true,
            map: map
        });
        pushMarker(new_marker);
       // var pos = new_marker.position.split("(")
        document.getElementById("label").innerText = new_marker.position.lat()+","+new_marker.position.lng();
        map.setCenter(new_marker.getPosition());

        new_event_click = false;

        google.maps.event.addListener(new_marker, 'dragend', function(e) {
            document.getElementById("label").innerText = e.latLng.lat() + ',' + e.latLng.lng();
            map.setCenter(new_marker.getPosition());
        });
    }
}


function info_evento(marker){
 var color = tags[marker.tag].color; //CAMBIAR ESTO POR EL COLOR QUE VIEN DE LA API
    document.getElementById("panel_tag").style.visibility = 'hidden';
    document.getElementById("panel_info").style.visibility = 'visible';

    document.getElementById("panel_info").style.borderColor = color;
    $(".fa.fa-times").css("color",color);

    document.getElementById("A").innerHTML = marker.event;
    $("#A").css("color",color);
    document.getElementById("B").innerHTML = marker.content;

    document.getElementById("description").innerHTML = marker.description;
    document.getElementById("fecha").innerHTML = marker.date;
    //Etuqueta
    //Titulo
    //Informacion
    //boton unirte

}



function Filter(type)
{
    var keyWord=type;
    filteredmarkers=[];
    filterMarkers(keyWord);
}

function addMarker(position,detalle,map,content,evento,tag,color,date,description) {
    var icon = "img/pos_"+tag+".png"
    var marker= new google.maps.Marker
    ({
        position: position,
        map: map,
        content:content,
        event: evento,
        detalle:detalle,
        icon: icon,
        tag : tag,
        animation: google.maps.Animation.DROP,
        color : color,
        date: date,
        description: description
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

function pushMarker(marker)
{
    markers.push(marker);
}

function addfilterMarker(position,detalle,map,content,event,tag,color,date,description)
{
    var icon = "img/pos_"+tag+".png"

    var marker= new google.maps.Marker
    ({
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
        description :description
    });
    pushfilterMarker(marker);
    var infowindow2 = new google.maps.InfoWindow
    ({
        content: ''
    })
    console.log(detalle);
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

function pushfilterMarker(marker)
{
    filteredmarkers.push(marker);
}

function showFilteredMarkers()
{
    for(var i=0;i<filteredmarkers.length;i++)
    {
        filteredmarkers[i].setMap(map);

        var marker=filteredmarkers[i];

        var infowindow2 = new google.maps.InfoWindow
        ({
            detalle: ''
        })
        var detalle = filteredmarkers[i].detalle;
        console.log(filteredmarkers[i]);
        (function(marker,detalle) {
            console.log(detalle);
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
}

function restart()
{
    var mapOptions =
    {
        center:geolocation,
        zoom:11,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);


    showFilteredMarkers();
}


function filterMarkers(keyWord)
{
    var i=0;
    var isFiltered=false;
    if(keyWord=="Nada"){
        while(i<marcadores.length)
        {
            isFiltered=true;
            var content = marcadores[i].eventname;
            var event=marcadores[i].tag;
            var position=new google.maps.LatLng(marcadores[i].place[0],marcadores[i].place[1]);
            var detalle="Event: "+event+"<br>"+"Content: "+content;
            var tag= marcadores[i].idtag;
            var color = marcadores[i].color;
            var date = marcadores[i].date;
            var description = marcadores[i].description;

            addfilterMarker(position,detalle,map,content,event,tag,color,date,description);
            i++;

        }
    }
    else{
        while(i<marcadores.length)
        {
            if(marcadores[i].tag==keyWord)
            {
                isFiltered=true;
                var content = marcadores[i].eventname;
                var event =marcadores[i].tag;
                var position=new google.maps.LatLng(marcadores[i].place[0],marcadores[i].place[1]);
                var detalle="Event: "+event+"<br>"+"Content: "+content;
                var tag= marcadores[i].idtag;
                var color = marcadores[i].color;
                var date = marcadores[i].date;
                var description = marcadores[i].description;
                console.log("jijijijiji"+detalle);
                addfilterMarker(position,detalle,map,content,event,tag,color,date,description);
            }
            i++;
        }
    }
    if(isFiltered==true)
    {
        restart();
    }
}








