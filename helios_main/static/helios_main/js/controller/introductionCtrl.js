'use strict';

heliosStudyMainApp.controller("introductionCtrl", function (Backend, $rootScope, $scope, $routeParams, $location) {

    $scope.startButton = function () {
        $location.path('election/' + $routeParams['id']);
    }
});
