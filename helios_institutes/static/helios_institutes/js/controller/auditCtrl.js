'use strict';

heliosStudyInstitutesApp.controller("auditCtrl", function ($rootScope, $scope, $routeParams, $window, $location, $http) {

    $scope.show_progress = false;
    $scope.vote = $routeParams['encrypted_vote'];
    $scope.ballot_tracker = btoa($scope.vote).toString().substr(0, 16);
    console.log($scope.ballot_tracker);


    //From institutes back to review
    $scope.backToReviewButton = function () {
        $location.path('review/' + $routeParams['id']);
    };

    $scope.redirectToInstituteButton = function () {
        //$http.post('//127.0.0.1:8080/verifier_one', "vote" + $scope.vote + "tracker" + $scope.ballot_tracker);
        //$window.open('//127.0.0.1:8080/verifier_one', '_blank');
        $location.path('election/' + $routeParams['id']);

    };

});