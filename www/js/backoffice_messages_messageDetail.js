var app = angular.module('examen', []);
angular.module('examen', [])

function detailController($scope, $http) {
    $scope.newMessage = {};
    $scope.messages = {};
    $scope.message = {};
    $scope.selected = false;

    // Obtener lista completa de zapatos
    $http.get('http://147.83.7.201:3000/backoffice/message/' + getCookie("messageID")).success(function (data) {
        $scope.newMessage = data;
        console.log(data);
    }).error(function (error) {
        window.alert("FAIL: " + error);
    });

    // Modificar mensaje
    $scope.updateMessage = function (newMessage) {
        console.log(newMessage);
        $http.put('http://147.83.7.201:3000/backoffice/message/' + getCookie("messageID"), $scope.newMessage)
            .success(function (data) {
            })
            .error(function (error) {
                window.alert("FAIL: " + error);
            });
    };

    // Volver a la página principal
    $scope.goBack = function () {
        window.location.href = "backoffice_messages.html";
    };
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}