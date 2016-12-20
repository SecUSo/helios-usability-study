'use strict';

heliosStudyMainApp.controller("linkInstituteCtrl", function ($scope, $routeParams, $location, Backend) {
    $scope.chooseInstitute = function () {
        // TODO Redirect to institute $location.path('review/' + $routeParams['id']);
     }

       $scope.backButton = function () {
        $location.path('review/' + $routeParams['id']);
     }
});
