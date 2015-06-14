/**
 * Created by yifeige on 14/06/15.
 */

(function () {



    var app = angular.module('profileApp', []);



    app.controller('UpdateController', ['$http', '$log', '$scope', '$window', function ($http, $log, $scope) {

        //document.getElementById("img_perfil").src = "avatar/" + id_user;
        var Urlactual=window.location;


        $log.debug('Url actual con parametros',Urlactual);

        $log.debug('Url.href',Urlactual.href);

        var userData=Urlactual.href.split("?");

        $log.debug('userData value',userData);




        $scope.signUpInfo = {};
        buffer = $scope.signUpInfo;
        $scope.signUpInfo.isHide = false;
        $scope.signUpInfo.isDisabled=true;
        $scope.signupUser = function () {
            var needsArray = buffer.needs;
            var offersArray = buffer.offers;


            var userInfo = new Object();
            userInfo.username = buffer.username;
            userInfo.email = buffer.email;
            userInfo.nacionalidad = buffer.nacionalidad;
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

                    Cookies.set('userid', data);

                    window.location.href="image-preview/upload.html";





                }

            });
            res.error(function (error) {
                alert("An error has occured");
            });

        };

    }]);









})();