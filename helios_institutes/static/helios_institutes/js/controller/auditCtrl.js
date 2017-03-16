'use strict';

heliosStudyInstitutesApp.controller("auditCtrl", function ($rootScope, $scope, $routeParams, $window, $location, $timeout) {

    $scope.show_progress = false;
    $scope.vote = $routeParams['encrypted_vote'];
    $scope.ballot_tracker = (btoa($scope.vote).toString()).substr(0, 16);

    //From institutes back to review
    $scope.backToReviewButton = function () {
        $location.path('review/' + $routeParams['id']);
    };

    $scope.redirectToInstituteBsiButton = function () {
        $timeout(function () {
            $location.path('auditdone/' + $routeParams['id']);
        }, 10);
    };

    $scope.redirectToInstituteOszeButton = function () {
        $timeout(function () {
            $location.path('auditdone/' + $routeParams['id']);
        }, 10);
    };
});