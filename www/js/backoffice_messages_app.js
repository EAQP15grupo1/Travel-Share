var app = angular.module('examen', ['ui.bootstrap']);

function messageController($scope, $http) {
    $scope.newMessage = {};
    $scope.messages = {};
    $scope.selected = false;

    // Obtener lista completa de zapatos
    $http.get('http://localhost:3000/backoffice/messages/').success(function (data) {
        $scope.messages = data;

        $scope.filteredTodos = []
            , $scope.currentPage = 1
            , $scope.numPerPage = 3
            , $scope.maxSize = 5;

        $scope.makeTodos = function () {
            $scope.todos = [];
            for (i = 1; i <= $scope.messages.length; i++) {
                $scope.todos.push($scope.messages[i - 1]);
            }
        };
        $scope.makeTodos();

        $scope.numPages = function () {
            return Math.ceil($scope.todos.length / $scope.numPerPage);
        };

        $scope.$watch('currentPage + numPerPage', function () {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;

            $scope.filteredTodos = $scope.todos.slice(begin, end);
            console.log($scope.todos.length);
        });
    }).error(function (error) {
        window.alert("FAIL: " + error);
    });

    // Borrar mensaje de la lista
    $scope.deleteMessage = function (message) {
        $http.delete('http://localhost:3000/backoffice/message/' + message._id)
            .success(function (data) {
                var index = $scope.messages.indexOf(message);
                $scope.messages.splice(index, 1);
                $scope.newMessage = {};
            })
            .error(function (error) {
                window.alert("FAIL: " + error);
            });
    };

    // Ver detalles de un mensaje
    $scope.viewMessage = function (message) {
        document.cookie = "messageID=" + message._id;
        window.location.href = "backoffice_messages_messageDetail.html";
    };

    // Crear mensaje
    $scope.addMessage = function () {
        window.location.href = "backoffice_messages_postMessage.html";
    };

    // Volver a la página principal
    $scope.goBack = function () {
        window.location.href = "backoffice_messages.html";
    };

    // Crear mensaje
    $scope.postMessage = function () {
        $http.post('http://localhost:3000/backoffice/messages/', $scope.newMessage)
            .success(function (data) {
                $scope.newShoe = {}; // Borramos los datos del formulario
                window.location.href = "backoffice_messages.html";
            })
            .error(function (error) {
                window.alert("FAIL: " + error);
            });
    };

    // Seleccionar zapato para modificar
    $scope.selectShoe = function (shoe) {
        $scope.newShoe = shoe;
        $scope.selected = true;
        console.log($scope.newShoe, $scope.selected);
    };
}