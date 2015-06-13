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

    var app = angular.module('loginApp', ['ngAnimate', 'mgcrea.ngStrap','ngSanitize','flow']);

    /*app.controller('FilesCtrl',function($scope) {
        $scope.uploader={};
        $scope.upload=function()
        {
            $scope.uploader.flow.upload();
        }
    });*/

    app.config(['flowFactoryProvider',function(flowFactoryProvider){
        flowFactoryProvider.defaults={
            target:'http://localhost:3000/user/avatar/5577efde30154da90f000003',
            permanetErrors:[404,500,501],
            maxChunkRetries:1,
            chunkRetryInterval:5000,
            simultaneousUploads:4,
            singleFile:true
        };
        flowFactoryProvider.on('catchAll',function(event)
        {
           console.log('catchAll',arguments);
        });
    }]);

    /*app.controller('imageUpload', function($scope, $timeout,$location, $http,$file)
    {
       $scope.media=[]

        $scope.media=$file[0]
        $http({

            method:'PUT',
            url:'http://localhost:3000/user/avatar/55645c8ebf408a2e26000007',
            data:{image_video: $scope.media, text: "text"}
            }).success(data)
        {
            console.log(data);
        }





    });*/



    app.controller('DemoController', function($scope, $modal,$log) {
        // Show a basic modal from a controller

        //var myModal = $modal({title: 'My Title', content: 'My Content', show: true});
        var myOtherModal2 = $modal({scope: $scope, template: 'modal.tpl.demo2.html', show:false});
        $scope.showModal2 = function()
        {
            myOtherModal2.$promise.then(myOtherModal1.show);
        };

        // Pre-fetch an external template populated with a custom scope
        var myOtherModal = $modal({scope: $scope, template: 'modal.tpl.demo.html', show:false});
        // Show when some event occurs (use $promise property to ensure the template has been loaded)
        $scope.showModal = function()
        {
            myOtherModal.$promise.then(myOtherModal.show);
        };

    });

    app.controller('signUpController',['$http','$log','$scope','$window',function($http,$log,$scope,$window, $modal)
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
                 window.location.reload();
             }
             else
             {
             alert("Usuario creado");
                 console.log(data);


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









})();