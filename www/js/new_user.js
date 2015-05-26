/**
 * Created by yifeige on 11/05/15.
 */
var app=angular.module('myApp',['ngAnimate', 'mgcrea.ngStrap','ngSanitize']);

var myOtherModal;
var buffer={};

    app.controller('DemoCtrl', function($scope, $modal,$log) {
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

         /*var res= $http.post('http://localhost:3000/login',box);
         res.success(function(data)
         {
         if(data.username!=null)
         {
         alert("Username and password match");
         $window.location.href='/Travel-Share/www/home.html';
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
         });*/

         };

         /*$scope.loginFacebook=function()
         {

         var res=$https.redirect('/auth/facebook');
         res.success()
         };*/

    }]);