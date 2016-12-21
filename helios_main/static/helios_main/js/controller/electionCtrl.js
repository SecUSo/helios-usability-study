'use strict';

heliosStudyMainApp.controller("electionCtrl", function ($scope, $routeParams, $location, Backend) {

    Backend.assign($routeParams['id']).success(function (data) {
        var result = angular.fromJson(data);
        if ("Error" in result) {
            $location.path('/error/' + $routeParams['id'] + '/' + result["Error"]);
        }
        $scope.experimentData = result;
        $scope.experimentData.question = result.question.question;
        $scope.startTimeAll = Date.now();
    });

    $scope.proceedButton = function () {
        //$scope.startTime = Date.now();
        $location.path('review/' + $routeParams['id']);
    }
});
