angular.module('myApp.sessionService', [])
.factory('sessionService', ['$rootScope', '$http', '$log', function ($rootScope, $http, $log) {
    'use strict';
    var service = { };
    var dataStore = { } ;

    service.setUserName = function(userName) {
        dataStore.userName = userName;
    };

    service.getUserName = function(){
        if (!dataStore.userName) return "long@yahoo.com";
        return dataStore.userName;
    }

    service.clearSession = function(){
        $log.debug("Clear called!");
        dataStore = { } ;
    };

    $rootScope.$on('userLoggedOut', function() { service.clearSession(); });

    return service;
    
}]);