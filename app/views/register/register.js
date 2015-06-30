'use strict';
angular.module('myApp.register', ['ngRoute'])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/register', {
                templateUrl: 'views/register/register.html',
                controller: 'RegisterCtrl'
            });
        }
    ])
    .controller('RegisterCtrl', ['$scope', '$location', '$firebaseAuth',
        function($scope, $location, $firebaseAuth) {
            $scope.mesg = 'Hello';
            var firebaseObj = new Firebase("https://l4lsites.firebaseio.com");
            //authentication here
            var auth = $firebaseAuth(firebaseObj);
            $scope.signUp = function() {
                if (!$scope.regForm.$invalid) {
                    var email = $scope.user.email;
                    var password = $scope.user.password;
                    if (email && password) {
                        // create user here
                        auth.$createUser(email, password)
                            .then(function() {
                                // do things if success
                                console.log('User creation success');
                                $location.path('/home');
                            }, function(error) {
                                // do things if failure
                                console.log(error);
                                $scope.regError = true;
                                $scope.regErrorMessage = error.message;
                            });
                    }
                }
            };
        }
    ]);