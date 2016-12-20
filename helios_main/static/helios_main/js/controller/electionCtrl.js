'use strict';

heliosStudyMainApp.controller("electionCtrl", function ($scope, $routeParams, $location, Backend) {
    $scope.proceedButton = function () {

        $location.path('review/' + $routeParams['id']);

    //     Backend.assign($routeParams['id']).success(function (data) {
    //         var result = angular.fromJson(data);
    //         if ("Error" in result) {
    //             $location.path('/error/' + $routeParams['id'] + '/' + result["Error"]);
    //         }
    //         $scope.experimentData = result;
    //         $scope.startTime = Date.now();
    //         $location.path('election/' + $routeParams['id']);
    //     });
     }
});
