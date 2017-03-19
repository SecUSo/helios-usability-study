'use strict';

heliosStudyMainApp.controller("introductionCtrl", function (Backend, $rootScope, $scope, $routeParams, $location) {

    $rootScope.subject = $location.path().split("/")[2];

    $scope.startButton = function () {
        Backend.save_timestamp($rootScope.subject, new Date().getTime(), "Old: Overall start");
        $location.path('election/' + $routeParams['id']);
    }
});
