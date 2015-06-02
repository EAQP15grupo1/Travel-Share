// Declare app level module which depends on views, and components
(function () {

    var obj = {};
    var box = {};
    var buffer={};

    var urlremota_login='http://147.83.7.201:3000/login';
    var urlremota_createUser='http://147.83.7.201:3000/users';
    var urllocal_login='http://localhost:3000/login';
    var urllocal_createUser='http://localhost:3000/users';
    var Windowlocationremota_login='home.html';
    var Windowlocationremota_createUser='index.html';
    var Windowlocationlocal_login='/Travel-Share/www/home.html';
    var Windowlocationlocal_createUser='/Project EA/Travel-Share/www/index.html';

    var app = angular.module('loginApp', ['ngAnimate', 'mgcrea.ngStrap','ngSanitize']);


    app.controller('DemoController', function($scope, $modal,$log) {
        // Show a basic modal from a controller
        //var myModal = $modal({title: 'My Title', content: 'My Content', show: true});

        // Pre-fetch an external template populated with a custom scope
        myOtherModal = $modal({scope: $scope, template: 'modal.tpl.demo.html', show:false});
        // Show when some event occurs (use $promise property to ensure the template has been loaded)
        $scope.showModal = function()
        {
            myOtherModal.$promise.then(myOtherModal.show);
        };


        $scope.hideOtherModal=function()
        {
            $log.debug("Evalua la function");
            myOtherModal.hide();
        };
    });

    app.controller('signUpController',['$http','$log','$scope','$window',function($http,$log,$scope,$window)
    {
        $scope.signUpInfo={};
        buffer=$scope.signUpInfo;
        $scope.signUpInfo.value=false;
        $scope.signupUser=function()
        {
            var needsArray=buffer.needs.split(",");
            var offersArray=buffer.offers.split(",");


            var userInfo= new Object();
            userInfo.username=buffer.username;
            userInfo.email=buffer.email;
            userInfo.nacionalidad=buffer.nacionalidad;
            userInfo.password=buffer.password;
            userInfo.idiomas=buffer.idiomas;
            userInfo.description=buffer.description;
            userInfo.needs=needsArray;
            userInfo.offers=offersArray;
            $log.debug(userInfo);

            $scope.signUpInfo.value=!$scope.signUpInfo.value;

             var res= $http.post('http://localhost:3000/users',userInfo);
             res.success(function(data)
             {
             if(data=="Usuario existe!")
             {
             alert("Usuario ya existe");
             $window.location.href='/Project EA/Travel-Share/www/index.html';
             }
             else
             {
             alert("Usuario creado");
                 $window.location.href='/Project EA/Travel-Share/www/index.html';

             }

             });
             res.error(function(error)
             {
             alert("An error has occured");
             });

        };

    }]);






    app.controller('loginController', ['$http', '$log', '$scope', '$window', function ($http, $log, $scope, $window) {
        $scope.userInfo = {};
        box = $scope.userInfo;
        $log.debug(box);
        $scope.login = function () {

            var res = $http.post('http://localhost:3000/login', box);
            res.success(function (data) {
                if (data.token != null) {

                    Cookies.set('username',box.username);
                    Cookies.set('token',data.token);
                    Cookies.set('userId',data.userId);
                    var nombre=Cookies.get('username');
                    var tok=Cookies.get('token');
                    var id=Cookies.get('userId');
                    $log.debug(nombre);
                    $log.debug(tok);
                    $log.debug(id);
                    alert("Username and password match");
                    $window.location.href = '/Travel-Share/www/home.html';
                    $scope.userInfo.username = '';
                    $scope.userInfo.password = '';
                }
                else {
                    alert("Username or password invalid");
                    $scope.userInfo.username = '';
                    $scope.userInfo.password = '';

                }

            });
            res.error(function (error) {
                alert("An error has occured");
            });

        };

        $scope.backoffice = function () {
            $window.location.href = 'backoffice.html';
        };
    }]);
    /*app.controller('userController',['$scope','$log',function($scope,$log)
     {
     $scope.userInfo={};
     box=$scope.userInfo;
     $log.debug(box);

     $scope.login=function()
     {
     if(obj[3].username===box.name && obj[3].password===box.pass)
     {
     alert("Username and password match");
     }
     else
     {
     alert("Username or password is invalid");
     }
     };

     }]);*/
})();