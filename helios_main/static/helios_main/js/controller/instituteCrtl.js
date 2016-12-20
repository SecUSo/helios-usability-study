'use strict';

heliosStudyMainApp.controller("instituteCtrl", function ($scope, $routeParams, $location, Backend) {
    $scope.chooseInstitute = function () {
        //$location.path('institute/' + $routeParams['id']);
     }

       $scope.backButton = function () {
        $location.path('review/' + $routeParams['id']);
     }
});
