'use strict';

angular.module('myApp', [
    'ngRoute',
    'myApp.sessionService',
    'myApp.home',
    'myApp.register',
    'myApp.welcome',
    'myApp.addPost'
])
.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/home'
        });
    }
])
.filter("htmlContent", ['$sce', function($sce) {
  return function(htmlCode){
    return $sce.trustAsHtml(htmlCode);
  }
}]);
;