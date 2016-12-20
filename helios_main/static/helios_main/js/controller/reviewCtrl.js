'use strict';

heliosStudyMainApp.controller("reviewCtrl", function ($scope, $routeParams, $location, Backend) {
    $scope.auditButton = function () {
        //    $location.path('review/' + $routeParams['id']);
    }

    $scope.castVoteButton = function () {
        //    $location.path('review/' + $routeParams['id']);
    }

     $scope.backButton = function () {
        $location.path('election/' + $routeParams['id']);
    }
});