'use strict';

heliosStudyMainApp.controller("introductionCtrl", function (Backend, $rootScope, $scope, $routeParams, $location) {

    $rootScope.startTimeAll = Date.now();

    $scope.startButton = function () {
        $location.path('election/' + $routeParams['id']);
        $rootScope.introTime = Date.now() - $rootScope.startTimeAll;
    }
});
