angular.module('CalendarApp', [])
var token=Cookies.get('token');
if (token == null)
{
    window.location.href="index.html";
}
var id_event;
var id_user;
id_user = Cookies.get("userId");
var username;
username= Cookies.get("username");


var eventos=[];
var my_event=[];
var formattedEventData;
var id;
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
    nombre: "M�sica",
    tag: "Musica",
    id: 2,
    color: "lightskyblue"
},{
    nombre: "Cultura",
    tag: "Cultura",
    id: 3,
    color : "yellow"
},{
    nombre: "Trabajo",
    tag: "Trabajo",
    id: 4,
    color: "palevioletred"
}];

function mainController($scope, $http) {
    //GET Event
    $scope.eventos = {};
    //Get Messages from event
    $http.get('http://147.83.7.201:3000/events/calendario/'+id_user).success(function (data) {

        //Scope.Eventos(Eventos a la derecha de la web en forma de lista)
        $scope.eventos = data;
        console.log(data);
        my_events = data;
        myevents();
    })
}


function goToEvent(id){
    Cookies.set('id_event',id);
    Cookies.set('id_user',id_user);
    Cookies.set('username',username);
    window.location.href="event.html";
}
function myevents(){
    eventos = [];
    for (var i = 0; i  < my_events.length; i++)
    {
        var color_event = tags[my_events[i].idtag].color;
        eventos.push({
            title : my_events[i].eventname,
            start : my_events[i].date.split(" ",1).toString(),
            id : my_events[i]._id,
            backgroundColor : color_event,
            borderColor :"black",
            textColor : "black",
            url: "event.html"
        });
    }
    console.log(eventos);
    calendar();
}

function calendar() {
    $('#calendar').fullCalendar({
        events: eventos,
        eventClick: function(event) {
            if (event.url) {
                Cookies.set('id_event',event.id);
               window.location(event.url);
                //window.open(event.url);
            }
        }
    });
}

