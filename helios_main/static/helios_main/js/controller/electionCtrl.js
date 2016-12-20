'use strict';

heliosStudyMainApp.controller("electionCtrl", function ($scope, $routeParams, $location, Backend) {
    $scope.proceedButton = function () {
        //$scope.startTime = Date.now();
        $location.path('review/' + $routeParams['id']);


     }
});
