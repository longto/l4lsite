'use strict';

angular.module('myApp.home', ['ngRoute', 'firebase'])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'views/home/home.html',
            controller: 'HomeCtrl'
        });
    }
])

.controller('HomeCtrl', ['$scope', '$location', 'sessionService', '$firebaseAuth',
    function($scope, $location, sessionService, $firebaseAuth) {
        var firebaseObj = new Firebase("https://l4lsites.firebaseio.com");
        //authentication here
        var loginObj = $firebaseAuth(firebaseObj);
        $scope.user = {};
        $scope.login = {};
        $scope.ckEditors = [];
        
        $scope.SignIn = function(e) {
            e.preventDefault();
            var username = $scope.user.email;
            var password = $scope.user.password;
            $scope.login.loading = true;
            // authentication with password here
            loginObj.$authWithPassword({
                email: username,
                password: password
            })
                .then(function(user) {
                    //Success callback
                    console.log('Authentication successful');
                    $location.path('/welcome');
                    sessionService.setUserName(username);
                    $scope.login.loading = false;
                }, function(error) {
                    //Failure callback
                    console.log('Authentication failure');
                    $scope.login.loading = false;
                });
        }

        

    }
])
.directive('laddaLoading', [
    function() {
        return {
            link: function(scope, element, attrs) {
                var Ladda = window.Ladda;
                var ladda = Ladda.create(element[0]);
                // Watching login.loading for change
                scope.$watch(attrs.laddaLoading, function(newVal, oldVal) {
                    // Based on the value start and stop the indicator
                    if (newVal) {
                        ladda.start();
                    } else {
                        ladda.stop();
                    }
                });
            }
        };
    }
])
.directive('ckEditor', [function () {
    return {
        require: '?ngModel',
        link: function ($scope, elm, attr, ngModel) {
            var ck = CKEDITOR.replace(elm[0]);
            ck.on('pasteState', function () {
                $scope.$apply(function () {
                    ngModel.$setViewValue(ck.getData());
                });
            });
            ngModel.$render = function (value) {
                ck.setData(ngModel.$modelValue);
            };
        }
    };
}])
;