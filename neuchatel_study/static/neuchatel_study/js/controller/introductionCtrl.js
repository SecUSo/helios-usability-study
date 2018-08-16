'use strict';

neuchatelStudyApp.controller("introductionCtrl", function (Backend, $rootScope, $scope, $routeParams, $location) {

    $rootScope.subject = $location.path().split("/")[2];

    $scope.startButton = function () {
        Backend.save_timestamp($rootScope.subject, new Date().getTime(), "Neuchatel Study (0): Overall start (start login)");
        $location.path('login/' + $routeParams['id']);
    }
});
