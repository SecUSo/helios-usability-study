'use strict';

heliosStudyInstitutesApp.controller("electionCtrl", function ($scope, $routeParams, $location, Backend, $rootScope, $timeout) {

    var encrypted_vote = "";
    $scope.show_progress = true;

    if ($location.path().split("/")[1] == "institute") {
        $scope.vote = $routeParams['encrypted_vote'];
        $scope.ballot_tracker = (btoa($scope.vote).toString()).substr(0, 16);
    }


    switch ($location.path().split("/")[1]) {
        case "election":
            $scope.show_progress = true;
            $scope.current_step = 1;
            break;
        case "review":
            $scope.show_progress = true;
            $scope.current_step = 2;
            break;
        case "final":
            $scope.show_progress = true;
            $scope.current_step = 3;
            break;
        case "auditdone":
            $scope.show_progress = false;
            break;
        case "cast":
            $scope.show_progress = false;
            break;
        case "institute":
            $scope.show_progress = false;
            break;
        default:
            $scope.show_progress = true;
            $scope.current_step = 0;
    }

    $rootScope.choice;
    $rootScope.selected_code = null;

    Backend.assign($routeParams['id']).success(function (data) {
        var result = angular.fromJson(data);
        if ("Error" in result) {
            $location.path('/error/' + $routeParams['id'] + '/' + result["Error"]);
        }

        $rootScope.subject = $routeParams['id'];
        $scope.experimentData = result;
        $scope.options = result.question_data.options;
        console.log($scope.options);
        $rootScope.startTimeAll = Date.now();

    });

    $scope.saveChoice = function (code, choice) {

        if ($rootScope.selected_code == code) {
            $rootScope.selected_code = null;
        } else {
            $rootScope.selected_code = code;
            $rootScope.choice = choice;
            console.log('Choice is ' + $rootScope.selected_code);
        }
    };


    //Pseudo-encryption of the vote. Well, the option code is hidden between random values.
    function encrypt() {
        for (var i = 0; i < 100; i++) {
            encrypted_vote += Math.floor(Math.random() * (10));
        }
        encrypted_vote += $rootScope.selected_code;

        for (var i = 0; i < 100; i++) {
            encrypted_vote += Math.floor(Math.random() * (10));
        }

        //"Hashing" the encrypted vote. No seriously, this is not a hash.
        $rootScope.ballot_tracker = btoa(encrypted_vote).toString().substr(0, 16);
        console.log(encrypted_vote);
        $rootScope.encrypted_vote = encrypted_vote;
    }

    //From election to review
    $scope.proceedButton = function () {
        Backend.save_timestamp($rootScope.subject, new Date().getTime(), "Institute: Election end");
        encrypt();
        $location.path('review/' + $routeParams['id']);
    };

    $scope.startButton = function () {
        Backend.save_timestamp($rootScope.subject, new Date().getTime(), "Institute: Overall start");
        $location.path('election/' + $routeParams['id']);
    };

    //From review to audit
    $scope.verifyButton = function () {
        Backend.save_timestamp($rootScope.subject, new Date().getTime(), "Institute: Audit start");
        $location.path('institute/' + $rootScope.encrypted_vote);
    };

    //From review to final overview
    $scope.submitVoteButton = function () {
        $location.path('final/' + $routeParams['id']);
    };

    //From review to election
    $scope.backToElectionButton = function () {
        $location.path('election/' + $routeParams['id']);
    };

    //From auditEnd to election
    $scope.auditToElectionButton = function () {
        Backend.save_timestamp($rootScope.subject, new Date().getTime(), "Institute: Audit end");
        $location.path('election/' + $routeParams['id']);
    };

    //reencrypt after audit
    $scope.reEncryptButton = function () {
        $location.path('review/' + $routeParams['id']);
    };

    //From institutes back to review
    $scope.backToReviewButton = function () {
        Backend.save_timestamp($rootScope.subject, new Date().getTime(), "Institute: Audit abort");
        $location.path('review/' + $routeParams['id']);
    };

    $scope.castButton = function () {
        if ($scope.userid == 'k5k6j2kfL4' && $scope.userpass == '23kg!k?f%v') {
            Backend.save_timestamp($rootScope.subject, new Date().getTime(), "Institute: Overall end");
            $location.path('cast/' + "final");
        } else {
            alert("Sie haben Ihren Benutzernamen oder Ihr Passwort falsch eingegeben. Bitte geben Sie es erneut ein.");
        }
    };

    //audit specific
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
