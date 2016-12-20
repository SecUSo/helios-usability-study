'use strict';

heliosStudyMainApp.controller("reviewCtrl", function ($scope, $routeParams, $location, Backend) {
    $scope.auditButton = function () {
        $location.path('institute/' + $routeParams['id']);
    }

    $scope.submitVoteButton = function () {
        $location.path('final/' + $routeParams['id']);
    }

    $scope.backButton = function () {
        $location.path('election/' + $routeParams['id']);
    }
});