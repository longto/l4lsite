'use strict';

angular.module('myApp.addPost', ['ngRoute'])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/addPost', {
            templateUrl: 'views/addPost/addPost.html',
            controller: 'AddPostCtrl'
        });
    }
])

.controller('AddPostCtrl', ['$scope', '$firebase','sessionService','$location',
    function($scope, $firebase, sessionService,$location) {
        $scope.AddPost = function() {
            var title = $scope.article.title;
            var post = $scope.article.post;

            var firebaseObj = new Firebase("https://l4lsites.firebaseio.com/Articles");
            var fb = $firebase(firebaseObj);

            fb.$push(
            	{
            		title: title,
            		post: post,
                    emailId: sessionService.getUserName(),
                    '.priority': sessionService.getUserName()
            	}
            ).then(function(ref) {
                console.log(ref);
            }, function(error) {
                console.log("Error:", error);
            });
        };

        $scope.cancelPost = function () {
            $location.path('/welcome');
        };
    }
])
;