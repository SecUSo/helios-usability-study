'use strict';

heliosStudyInstitutesApp.controller("auditCtrl", function ($rootScope, $scope, $routeParams, $window, $location, $timeout) {

    $scope.show_progress = false;
    $scope.vote = $routeParams['encrypted_vote'];
    $scope.ballot_tracker = (btoa($scope.vote).toString()).substr(0, 16);
    console.log($scope.ballot_tracker);


    //From institutes back to review
    $scope.backToReviewButton = function () {
        $location.path('review/' + $routeParams['id']);
    };

    $scope.redirectToInstituteButton = function () {
        $timeout(function () {
            $location.path('election/' + $routeParams['id']);
        }, 10);
    };

});