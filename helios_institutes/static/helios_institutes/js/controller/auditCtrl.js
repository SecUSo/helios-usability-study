'use strict';

heliosStudyInstitutesApp.controller("auditCtrl", function ($rootScope, $scope, $routeParams, $window, $location) {

    $scope.show_progress = false;
    $scope.vote = $routeParams['encrypted_vote'];


    //From institutes back to review
    $scope.backToReviewButton = function () {
        $location.path('review/' + $routeParams['id']);
    };

    $scope.redirectToInstituteButton = function () {
        $window.open('//127.0.0.1:8080/verifier_one', '_blank');
        $location.path('election/' + $routeParams['id']);
    };

});