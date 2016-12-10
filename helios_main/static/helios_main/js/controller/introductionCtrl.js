'use strict';

heliosStudyMainApp.controller("introductionCtrl", function ($scope, $routeParams, $location) {
    $scope.startButton = function () {
        $location.path('election' + $routeParams['id']);
    }
});
