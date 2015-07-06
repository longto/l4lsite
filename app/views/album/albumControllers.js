'use strict';

/* Controllers */

angular.module('albumControllers', ['angularFileUpload'])
.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/album', {
            templateUrl: 'views/album/album.html',
            resolve: {
                photoList: function($q, $rootScope, album) {
                    if (!$rootScope.serviceCalled) {
                        return album.photos({}, function(v) {
                            $rootScope.serviceCalled = true;
                            $rootScope.photos = v.resources;
                        });
                    } else {
                        return $q.when(true);
                    }
                }
            }
        });
    }
])
.controller('photoUploadCtrl', ['$scope', '$rootScope', '$routeParams', '$location', '$upload',
    /* Uploading with Angular File Upload */
    function($scope, $rootScope, $routeParams, $location, $upload) {

        $scope.$watch('files', function() {
            if (!$scope.files) return;
            $scope.files.forEach(function(file) {
                if (!$scope.title) $scope.title = file.name;
                $scope.upload = $upload.upload({
                    url: "https://api.cloudinary.com/v1_1/" + $.cloudinary.config().cloud_name + "/upload",
                    data: {
                        upload_preset: $.cloudinary.config().upload_preset,
                        tags: 'myphotoalbum',
                        context: 'photo=' + $scope.title
                    },
                    file: file
                }).progress(function(e) {
                    file.progress = Math.round((e.loaded * 100.0) / e.total);
                    file.status = "Uploading(" + file.progress + "%)";
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                }).success(function(data, status, headers, config) {
                    $rootScope.photos = $rootScope.photos || [];
                    data.context = {
                        custom: {
                            photo: $scope.title
                        }
                    };
                    file.result = data;
                    file.status = "Completed";
                    $rootScope.photos.push(data);
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                });
            });
        });

        /* Modify the look and fill of the dropzone when files are being dragged over it */
        $scope.dragOverClass = function($event) {
            var items = $event.dataTransfer.items;
            var hasFile = false;
            if (items != null) {
                for (var i = 0; i < items.length; i++) {
                    if (items[i].kind == 'file') {
                        hasFile = true;
                        break;
                    }
                }
            } else {
                hasFile = true;
            }
            return hasFile ? "dragover" : "dragover-err";
        };
    }
]);