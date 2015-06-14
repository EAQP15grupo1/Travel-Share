'use strict';


angular


    .module('app', ['angularFileUpload'])


    .controller('AppController', ['$scope', 'FileUploader', function($scope, FileUploader) {


        var userid=Cookies.get('userid');

        console.log("userid en controller.js",userid);


        var uploader = $scope.uploader = new FileUploader({
            url: 'http://147.83.7.201:3000/user/avatar/'+userid
        });

        // FILTERS

        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            alert("An Error has occured");
            console.info('onErrorItem', fileItem, response, status, headers);
            window.location.href='../index.html';
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            alert("Upload Canceled");
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            alert("Upload Completed");
            console.info('onCompleteItem', fileItem, response, status, headers);
            window.location.href='../index.html';
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
            window.location.href='../index.html';
        };

        console.info('uploader', uploader);



    }]);