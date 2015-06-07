angular.module('MainApp', [])
var id_event;
id_event = "55634674f5dc43640900000d";
var id_user;
id_user ="556324cff5dc436409000001";
var username;
username = "prueba";

var map;
var event_marker;
var geolocation;
var position;

var geocoder;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var infowindow = new google.maps.InfoWindow();


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

function mainController($scope, $http) {
    //GET Event
    $http.get('http://localhost:3000/event/'+id_event).success(function(data) {
        event_marker=data;
        geocoder = new google.maps.Geocoder();
        marker();
        geoposition();
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.messages = {};
    //Get Messages from event
    $http.get('http://localhost:3000/messages/event/'+id_event).success(function (data) {
        $scope.messages = data;
    }).error(function (error) {
        window.alert("FAIL: " + error);
    });



}

function geoposition(){
    // Try HTML5 geolocation
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(function(position) {
            geolocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            addGeoMarker(geolocation);
            console.log(geolocation)
        }, function() {
            handleNoGeolocation(true);
        });
    } else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(false);
    }
}

function marker() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var mapOptions = {
        zoom: 15,
        draggable: true,
        zoomControl : true,
        disableDefaultUI: true,
        center: { lat: event_marker.place[0], lng: event_marker.place[1]}
    };

    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('directions-panel'));

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    addMarker(event_marker);

    var routeControlDiv = document.createElement('div');
    var routeControl = new RouteControl(routeControlDiv, map);
    routeControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(routeControlDiv);
}

function RouteControl(controlDiv, map) {

    // Set CSS for the control border
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.style.marginLeft="10px"
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = 'Calcular ruta';
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to
    // Chicago
    google.maps.event.addDomListener(controlUI, 'click', function() {
        Cookies.set('start_position',JSON.stringify(geolocation));
        Cookies.set('end_position',JSON.stringify(position));
        console.log(geolocation);
        window.location.href='route_event.html';
    });

}

function addGeoMarker(position) {
   // var icon = "img/pos_0.png";
    var marker= new google.maps.Marker
    ({
        //icon: icon,
        position: position,
        map: map
    });
    google.maps.event.addListener(marker, 'mouseover', function()
    {
        infowindow.setContent("Tú estas aquí!");
        infowindow.open(map, marker);
    });
    google.maps.event.addListener(marker, 'mouseout', function() {
        infowindow.close(map, marker);
    });

}

function addMarker(marcador) {
    //var icon = "img/pos_"+marcador.idtag+".png"
    position = new google.maps.LatLng(marcador.place[0],marcador.place[1]);
    geocoder.geocode({'latLng': position}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
                marker = new google.maps.Marker({
                    position: position,
                    map: map,
                    animation: google.maps.Animation.DROP
                });

                google.maps.event.addListener(marker, 'click', function()
                {
                    infowindow.setContent(results[1].formatted_address);
                    infowindow.open(map, marker);
                });
                google.maps.event.addListener(map, 'center_changed', function() {
                    window.setTimeout(function() {
                        map.panTo(marker.getPosition());
                    }, 1000);
                });

            } else {
                alert('No results found');
            }
        } else {
            alert('Geocoder failed due to: ' + status);
        }
    });
}

