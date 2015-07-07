'use strict';
angular.module('myApp.welcome', ['ngRoute'])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/welcome', {
                templateUrl: 'views/welcome/welcome.html',
                controller: 'WelcomeCtrl'
            });
        }
    ])
    .controller('WelcomeCtrl', ['$scope', '$firebase', 'sessionService',
        function($scope, $firebase, sessionService) {
            $scope.username = sessionService.getUserName();
            var firebaseObj = new Firebase("https://l4lsites.firebaseio.com/Articles");
            var sync = $firebase(firebaseObj.startAt($scope.username).endAt($scope.username));
            $scope.articles = sync.$asArray();
            $scope.editPost = function(id) {
                console.log(id);
                var firebaseObj = new Firebase("https://l4lsites.firebaseio.com/Articles/" + id);
                var syn = $firebase(firebaseObj);
                $scope.postToUpdate = syn.$asObject();
                $('#editModal').modal();
            }
            $scope.update = function() {
                console.log($scope.postToUpdate.$id);
                var fb = new Firebase("https://l4lsites.firebaseio.com/Articles/" + $scope.postToUpdate.$id);
                var article = $firebase(fb);
                article.$update({
                    title: $scope.postToUpdate.title,
                    post: $scope.postToUpdate.post,
                    emailId: $scope.postToUpdate.emailId
                }).then(function(ref) {
                    console.log(ref.key()); // bar
                    $('#editModal').modal('hide')
                }, function(error) {
                    console.log("Error:", error);
                });
            }
            $scope.confirmDelete = function(id) {
                var fb = new Firebase("https://l4lsites.firebaseio.com/Articles/" + id);
                var article = $firebase(fb);
                $scope.postToDelete = article.$asObject();
                $('#deleteModal').modal();
            }
            $scope.deletePost = function() {
                var fb = new Firebase("https://l4lsites.firebaseio.com/Articles/" + $scope.postToDelete.$id);
                var article = $firebase(fb);
                article.$remove().then(function(ref) {
                    $('#deleteModal').modal('hide');
                }, function(error) {
                    console.log("Error:", error);
                });
            }
        }]);
    
   

