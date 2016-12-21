'use strict';

heliosStudyMainApp.controller("introductionCtrl", function ($scope, $routeParams, $location, Backend) {
    $scope.startButton = function () {
            $location.path('election/' + $routeParams['id']);
    }
});
