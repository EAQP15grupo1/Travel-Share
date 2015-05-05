'use strict';

// Declare app level module which depends on views, and components
(function (){

var app=angular.module('loginApp', []);

app.controller('loginController',['$http','$log',function($http,$log)
{
    $http.get('http://localhost:3000/users').success(function(data)
    {
        $log.debug('hemos hecho la petition get al API');
        $log.debug(data[3].username);
        $log.debug(data[3].password);
    });
}]);
})();