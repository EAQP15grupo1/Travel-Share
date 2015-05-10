// Declare app level module which depends on views, and components
(function (){

    var obj={};
    var box={};
    var app=angular.module('loginApp', []);

    app.controller('loginController',['$http','$log','$scope','$window',function($http,$log,$scope,$window)
    {
        $scope.userInfo={};
        box=$scope.userInfo;
        $log.debug(box);
        $scope.login=function()
        {

            var res= $http.post('http://147.83.7.201:3000/login',box);
            res.success(function(data)
            {
                if(data.username!=null)
                {
                    alert("Username and password match");
                    $window.location.href='http://147.83.7.201:63342/Travel-Share/Web/Victor/home.html';
                    $scope.userInfo.username='';
                    $scope.userInfo.password='';
                }
                else
                {
                    alert("Username or password invalid");
                    $scope.userInfo.username='';
                    $scope.userInfo.password='';

                }

            });
            res.error(function(error)
            {
                alert("An error has occured");
            });

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