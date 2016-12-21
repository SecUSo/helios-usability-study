'use strict';

heliosStudyMainApp.controller("introductionCtrl", function ($rootScope, $scope, $routeParams, $location) {

    //TODO Set language here
    $rootScope.language = "en"

    $scope.startButton = function () {
            $location.path('election/' + $routeParams['id']);
    }
});
