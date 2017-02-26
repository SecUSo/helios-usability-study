'use strict';

heliosStudyInstitutesApp.controller("auditCtrl", function ($rootScope, $scope, $routeParams, $window) {

    $scope.show_progress = false;
    $scope.ballot = $routeParams['encrypted_vote'];


});