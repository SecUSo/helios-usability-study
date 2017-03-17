'use strict';

heliosStudySmartphoneApp.controller("electionCtrl", function ($scope, $routeParams, $location, Backend, $rootScope, $window) {

    $scope.ballot = $routeParams['encrypted_vote'];

    var encrypted_vote = "";
    $scope.head_line = "Bundestagswahl 2017";
    $scope.show_progress = true;

    $rootScope.choice;
    $rootScope.selected_code = null;

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
        case "institute":
            $scope.show_progress = false;
            break;
        case "cast":
            $scope.show_progress = false;
            break;
        default:
            $scope.show_progress = true;
            $scope.current_step = 0;
    }

    //Do when page loaded
    Backend.assign($routeParams['id']).success(function (data) {
        var result = angular.fromJson(data);
        if ("Error" in result) {
            $location.path('/error/' + $routeParams['id'] + '/' + result["Error"]);
        }

        console.log($routeParams['id']);
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
            console.log('Choice is ' + $rootScope.choice);
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
        //$scope.startTime = Date.now();

        encrypt();

        console.log(encrypted_vote);

        console.log('Hash in scope ' + $scope.ballot_tracker);
        $location.path('review/' + $routeParams['id']);
    };

    $scope.startButton = function () {
        $location.path('election/' + $routeParams['id']);
    };

    //From review to audit
    $scope.verifyButton = function () {
        $location.path('auditdone/' + $routeParams['id']);
        $window.open('institute/' + $rootScope.encrypted_vote, '_blank');
    };

    //From review to final overview
    $scope.submitVoteButton = function () {
        $location.path('final/' + $routeParams['id']);
    };

    //From review to election
    $scope.backToElectionButton = function () {
        $location.path('election/' + $routeParams['id']);
    };

    //From institutes back to review
    $scope.backToReviewButton = function () {
        $location.path('review/' + $routeParams['id']);
    };

    $scope.cancelButton = function () {
    };

    $scope.castButton = function () {
        if ($scope.userid == 'Hugo' && $scope.userpass == '1234') {
            $location.path('cast/' + "final");
        } else {
            alert("Du Idiot!");
        }
    };

    // $scope.closeAudit = function () {
    //     $window.close();
    // };

});
