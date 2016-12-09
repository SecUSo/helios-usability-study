'use strict';

heliosStudyApp.controller("introductionCtrl", function ($scope, $routeParams, $location) {
    $scope.continueButton = function () {
        $location.path('/login/');
    };
});