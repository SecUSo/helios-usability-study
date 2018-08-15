'use strict';

neuchatelApp.controller("introductionCtrl", function (Backend, $rootScope, $scope, $routeParams, $location) {

    $rootScope.subject = $location.path().split("/")[2];

    $scope.startButton = function () {
        Backend.save_timestamp($rootScope.subject, new Date().getTime(), "Neuchatel(0): Overall start (start login)");
        $location.path('login/' + $routeParams['id']);
    }
});
