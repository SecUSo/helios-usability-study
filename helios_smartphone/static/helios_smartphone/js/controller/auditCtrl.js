'use strict';

heliosStudySmartphoneApp.controller("auditCtrl", function ($rootScope, $scope, $routeParams, $window) {

    $scope.show_progress = false;
    $scope.ballot = $routeParams['encrypted_vote'];

    $scope.closeAudit = function () {
        $window.close();
    };

});
