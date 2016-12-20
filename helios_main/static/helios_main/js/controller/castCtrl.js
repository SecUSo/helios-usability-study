'use strict';

heliosStudyMainApp.controller("castCtrl", function ($scope, $routeParams, $location, Backend) {
  $scope.backButton = function () {
        $location.path('review/' + $routeParams['id']);
     }
});
