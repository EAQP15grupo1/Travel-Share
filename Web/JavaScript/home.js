/**
 * Created by Miranda on 24/04/2015.
 */
var map;
var markers=[];
var filteredmarkers=[];
var geolocation;

var tags = [{
    nombre: "sin filtro",
    id: 0,
    color : "white"
},{
    nombre: "deporte",
    id: 1,
    color : "lightgreen"
}, {
    nombre: "música",
    id: 2,
    color: "lightskyblue"
},{
    nombre: "cine",
    id: 3,
    color : "yellow"
},{
    nombre: "party",
    id: 4,
    color: "palevioletred"
}];

// datos dummy
var marcadores =[{
    latitude:41.3850639,
    longitude:2.1734034999999494,
    event:'Música', //Categoria
    tag:2, // "nombre"
    content:"ir al concierto U2", //Eventname
    eventid:"2"
    //date
}, {
    latitude:41.3910524,
    longitude:2.180644900000061,
    event:'Deporte',
    tag:1,
    content:"Busco gente para ir a correr juntos",
    eventid:"5"
}, {
    latitude: 41.278451,
    longitude: 1.978837,
    event: 'Party',
    tag:4,
    content: "ir al Razz juntos",
    eventid: "19"
}, {
    latitude: 41.302827,
    longitude: 2.001935,
    event: 'Cine',
    tag:3,
    content: "ver la teoria del todo",
    eventid: "34"
},{
    latitude: 41.380894,
    longitude: 2.189385,
    event: 'Deporte',
    tag:1,
    content: "Hacer surfing",
    eventid: "34"
},  {
    latitude: 41.3931702,
    longitude: 2.1639602000000195,
    event: 'Party',
    tag:4,
    content: "Salir a tomar algo",
    eventid: "7"
},    {
    latitude: 41.366186,
    longitude: 2.116494,
    event: 'Cine',
    tag:3,
    content: "Ir al cine para ver el Jurassic World",
    eventid: "39"

}];


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
            var event="none"
            var tag = "0";
            addMarker(geolocation,content,map,event,tag);
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
        var content = marcadores[i].content;
        var event=marcadores[i].event;
        var tag = marcadores[i].tag;
        var detalle="Event: "+event+"<br>"+"Content: "+content;

        var position=new google.maps.LatLng(marcadores[i].latitude,marcadores[i].longitude);
        addMarker(position,detalle,map,event,tag);
    }

    //Creamos el boton de buscar
    var input = ( document.getElementById('pac-input'));
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    //var searchBox = new google.maps.places.SearchBox((input));
}

function placeMarker(position, map) {

    var content="Crear un evento";
    var event="undefined";
    var tag = 0;
    addMarker(position,content,map,event,tag);
    // Te centra el marcador en el centro del mapa
}
google.maps.event.addDomListener(window, 'load', initialize);



//-----------------------------Modificado por Yifei--------------------------------------------------------------

function info_evento(marker){
 var color = tags[marker.tag].color;
    document.getElementById("panel_info").style.backgroundColor = color;
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

function addMarker(position,detalle,map,evento,tag) {

    var icon = "icon/pos_"+tag+".png"
    var marker= new google.maps.Marker
    ({
        position: position,
        map: map,
        content:detalle,
        event: evento,
        icon: icon,
        tag : tag,
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
        google.maps.event.addListener(marker, 'click', function() {
            map.panTo(marker.position);
            document.getElementById("panel_tag").style.visibility = 'hidden';
            document.getElementById("panel_info").style.visibility = 'visible';
            info_evento(marker);
        });

    })(marker, detalle);
}

function pushMarker(marker)
{
    markers.push(marker);
}

function addfilterMarker(position,detalle,map,evento,tag)
{
    var icon = "icon/pos_"+tag+".png"

    var marker= new google.maps.Marker
    ({
        position: position,
        map: map,
        content:detalle,
        event: evento,
        icon: icon,
        tag: tag,
        animation: google.maps.Animation.DROP
    });
    pushfilterMarker(marker);
    var infowindow2 = new google.maps.InfoWindow
    ({
        content: ''
    })
    var content = content;
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
            map.panTo(marker.position);
            document.getElementById("panel_tag").style.visibility = 'hidden';
            document.getElementById("panel_info").style.visibility = 'visible';
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
    console.log(filteredmarkers.length);
    for(i=0;i<filteredmarkers.length;i++)
    {
        filteredmarkers[i].setMap(map);

        var marker=filteredmarkers[i];

        var infowindow2 = new google.maps.InfoWindow
        ({
            content: ''
        })
        var detalle = filteredmarkers[i].content;
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

console.log(markers);

function filterMarkers(keyWord)
{
    var data=marcadores;
    var i=0;
    var isFiltered=false;
    console.log(data.length);
    if(keyWord=="Nada"){
        while(i<data.length)
        {
                isFiltered=true;
                var content = data[i].content;
                var evento=data[i].event;
                var position=new google.maps.LatLng(data[i].latitude,data[i].longitude);
                var detalle="Event: "+evento+"<br>"+"Content: "+content;
                var tag= data[i].tag;
                addfilterMarker(position,detalle,map,evento,tag);
                i++;

        }
    }
    else{
        while(i<data.length)
        {
            if(data[i].event==keyWord)
            {
                isFiltered=true;
                var content = data[i].content;
                var evento=data[i].event;
                var position=new google.maps.LatLng(data[i].latitude,data[i].longitude);
                var detalle="Event: "+evento+"<br>"+"Content: "+content;
                var tag= data[i].tag;
                addfilterMarker(position,detalle,map,evento,tag);
                i++;
            }
            i++;
        }
    }
    console.log(filteredmarkers);
    if(isFiltered==true)
    {
        restart();
    }
}








