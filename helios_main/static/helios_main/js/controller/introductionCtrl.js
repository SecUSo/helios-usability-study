'use strict';

heliosStudyMainApp.controller("introductionCtrl", function ($scope, $routeParams, $location, Backend) {
    $scope.startButton = function () {

        Backend.assign($routeParams['id']).success(function (data) {
            var result = angular.fromJson(data);
            if ("Error" in result) {
                $location.path('/error/' + $routeParams['id'] + '/' + result["Error"]);
            }
            $scope.experimentData = result;
            $scope.startTime = Date.now();
            $location.path('election/' + $routeParams['id']);
        });
    }
});
