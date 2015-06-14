// Declare app level module which depends on views, and components
var id;
(function () {

    var obj = {};
    var box = {};
    var buffer = {};


    var app = angular.module('loginApp', ['ngAnimate', 'mgcrea.ngStrap', 'ngSanitize']);


    app.controller('DemoController', function ($scope, $modal, $log) {
        // Show a basic modal from a controller

        //var myModal = $modal({title: 'My Title', content: 'My Content', show: true});
        var myOtherModal2 = $modal({scope: $scope, template: 'modal.tpl.demo2.html', show: false});
        $scope.showModal2 = function () {
            myOtherModal2.$promise.then(myOtherModal1.show);
        };

        // Pre-fetch an external template populated with a custom scope
        var myOtherModal = $modal({scope: $scope, template: 'modal.tpl.demo.html', show: false});
        // Show when some event occurs (use $promise property to ensure the template has been loaded)
        $scope.showModal = function () {
            myOtherModal.$promise.then(myOtherModal.show);
        };

    });

    app.controller('signUpController', ['$http', '$log', '$scope', function ($http, $log, $scope) {
        $scope.signUpInfo = {};
        buffer = $scope.signUpInfo;



        $scope.signupUser = function () {


            var needsArray = buffer.needs;
            var offersArray = buffer.offers;


            var userInfo = new Object();
            userInfo.username = buffer.username;
            userInfo.name=buffer.name;
            userInfo.email = buffer.email;
            userInfo.nation = buffer.nacionalidad;
            userInfo.password = buffer.password;
            userInfo.idiomas = buffer.idiomas;
            userInfo.description = buffer.description;
            userInfo.needs = needsArray;
            userInfo.offers = offersArray;
            $log.debug(userInfo);

            $scope.signUpInfo.isHide = !$scope.signUpInfo.isHide;

            $scope.signUpInfo.isDisabled=!$scope.signUpInfo.isDisabled;

            var res = $http.post('http://147.83.7.201:3000/users', userInfo);
            res.success(function (data) {
                if (data == "Usuario existe!") {
                    //alert("Usuario ya existe");
                    //window.location.reload();
                }
                else {

                    alert("Usuario creado");

                    userid=data;
                    $log.debug("valor del userid",userid);

                    Cookies.set('userId', data);

                    window.location.href="image-preview/upload.html";





                }

            });
            res.error(function (error) {
                alert("An error has occured");
            });

        };

    }]);


    app.controller('loginController', ['$http', '$log', '$scope', '$window', function ($http, $log, $scope, $window) {
        $scope.userInfo = {};
        box = $scope.userInfo;
        $log.debug(box);
        $scope.login = function () {
            if (box.username == "admin" && box.password == "admin") {
                $window.location.href = 'backoffice.html';
            } else {
                var res = $http.post('http://147.83.7.201:3000/login', box);
                res.success(function (data) {
                    if (data.token != null) {

                        Cookies.set('username', box.username);
                        Cookies.set('token', data.token);
                        Cookies.set('userId', data.userId);
                        var nombre = Cookies.get('username');
                        var tok = Cookies.get('token');
                        var id = Cookies.get('userId');
                        $log.debug(nombre);
                        $log.debug(tok);
                        $log.debug(id);
                        //alert("Username and password match");
                        $window.location.href = 'home.html';
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
            }
        };
        $scope.loginFB = function () {
            $window.location.href = 'http://147.83.7.201:3000/facebook';
        };
        $scope.backoffice = function () {
            $window.location.href = 'backoffice.html';
        };
    }]);



    app.controller('UpdateController_Facebook', ['$http', '$log', '$scope','$window', function ($http, $log, $scope,$window) {

            $scope.UpdateInfo_Facebook = {};
            buffer = $scope.UpdateInfo_Facebook;

            var Urlactual=$window.location;


            $log.debug('Url actual con parametros',Urlactual);

            $log.debug('Url.href',Urlactual.href);

            var userData=Urlactual.href.split("?");

            $log.debug('userData value',userData);


            var username=userData[3].split("@");

            $log.debug('token',userData[1]);
            $log.debug('userId',userData[2]);
            $log.debug('username',username[0]);


            var userId=userData[2];

            Cookies.set('token',userData[1]);
            Cookies.set('userId',userData[2]);
            Cookies.set('username',username[0]);



        $scope.updateUser_Facebook = function () {



            var needsArray = buffer.needs;
            var offersArray = buffer.offers;


            var UpdateInfo_Facebook = new Object();

            UpdateInfo_Facebook.name=buffer.name;
            UpdateInfo_Facebook.email = buffer.email;
            UpdateInfo_Facebook.nation = buffer.nacionalidad;
            UpdateInfo_Facebook.idiomas = buffer.idiomas;
            UpdateInfo_Facebook.description = buffer.description;
            UpdateInfo_Facebook.needs = needsArray;
            UpdateInfo_Facebook.offers = offersArray;

            console.log(UpdateInfo_Facebook);

            id=Cookies.get('userId');
            console.log("userId cookie",id)
            Cookies.set('userId',id);

            var res = $http.put('http://147.83.7.201:3000/user/'+id, UpdateInfo_Facebook);
            res.success(function (data) {
                if (data == "Usuario existe!") {
                    //alert("Usuario ya existe");
                    //window.location.reload();
                }
                else
                {
                    //alert("User Updated");
                    window.location.href="image-preview/upload.html";
                }

            });
            res.error(function (error) {
                alert("An error has occured");
            });

        };

    }]);



    app.controller('UpdateController', ['$http', '$log', '$scope','$window', function ($http, $log, $scope,$window) {

        $scope.UpdateInfo = {};
        buffer = $scope.UpdateInfo;



        var id=Cookies.get('userId');

        $scope.updateUser = function () {



            var needsArray = buffer.needs;
            var offersArray = buffer.offers;


            var UpdateInfo = new Object();
            //userInfo.username = buffer.username;
            UpdateInfo.name=buffer.name;
            UpdateInfo.email = buffer.email;
            UpdateInfo.nation = buffer.nacionalidad;
            //userInfo.password = buffer.password;
            UpdateInfo.idiomas = buffer.idiomas;
            UpdateInfo.description = buffer.description;
            UpdateInfo.needs = needsArray;
            UpdateInfo.offers = offersArray;

            console.log(UpdateInfo);

            id=Cookies.get('userId');
            console.log("userId cookie",id)
            Cookies.set('userId',id);

            var res = $http.put('http://147.83.7.201:3000/user/'+id, UpdateInfo);
            res.success(function (data) {
                if (data == "Usuario existe!") {
                    //alert("Usuario ya existe");
                    //window.location.reload();
                }
                else
                {
                    //alert("User Updated");
                    window.location.href="image-preview/upload.html";
                }

            });
            res.error(function (error) {
                alert("An error has occured");
            });

        };

    }]);










})();