'use strict';

heliosStudyMainApp.controller("finalOverviewCtrl", function ($scope, $routeParams, $location, Backend) {
    $scope.cancelButton = function () {
            }

    $scope.castButton = function () {
        $location.path('cast/' + $routeParams['id']);
            }
});
