'use strict';

heliosStudySmartphoneApp.controller("auditCtrl", function ($rootScope, $scope, $routeParams, $location, $window) {

    $scope.show_progress = false;
    $scope.ballot = ($location.path().split("/")[2]);

    $scope.closeAudit = function () {
        $window.close();
    };

});
