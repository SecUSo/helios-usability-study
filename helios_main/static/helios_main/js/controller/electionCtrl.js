'use strict';

heliosStudyMainApp.controller("electionCtrl", function ($scope, $routeParams, $location, Backend, $rootScope, $window) {

    var choiceBackground = "00";
    var encrypted_vote = "";
    $scope.auditClick = false;

    //Do when page loaded
    Backend.assign($routeParams['id']).success(function (data) {
        var result = angular.fromJson(data);
        if ("Error" in result) {
            $location.path('/error/' + $routeParams['id'] + '/' + result["Error"]);
        }

        //TODO Why is this not displayed?
        $scope.subject = $routeParams['id'];
        console.log($routeParams['id']);
        $scope.experimentData = result;
        $scope.options = result.question_data.options;
        $rootScope.startTimeAll = Date.now();

    });


    $scope.saveChoice = function (code, choice) {
        choiceBackground = code;
        $rootScope.choice = choice;
        console.log('Choice is ' + choiceBackground);
    };


    //Pseudo-encryption of the vote. Well, the option code is hidden between random values.
    function encrypt() {

        encrypted_vote = "";
        $rootScope.auditData = "";

        for (var i = 0; i < 100; i++) {
            encrypted_vote += Math.floor(Math.random() * (10));
        }
        encrypted_vote += choiceBackground;

        for (var i = 0; i < 100; i++) {
            encrypted_vote += Math.floor(Math.random() * (10));
        }

        //"Hashing" the encrypted vote. No seriously, this is not a hash.
        //$rootScope.auditData += "{\"randomness\": \"" + encrypted_vote + "\"}";
        $rootScope.ballot_tracker = btoa(encrypted_vote).toString().substr(0, 42);
        $rootScope.auditData = buildBallot(encrypted_vote);
        console.log($rootScope.auditData);
        console.log(encrypted_vote);
        console.log('Hash in scope ' + $scope.ballot_tracker);
    }


    //From election to review
    $scope.proceedButton = function () {
        //$scope.startTime = Date.now();
        encrypt();
        $location.path('review/' + $routeParams['id']);
    }

    //From displays audit info
    $scope.auditButton = function () {
        if ($scope.auditClick == false) {
            $scope.auditClick = true;
        } else {
            $scope.auditClick = false
        }

    };

    //From review to audit
    $scope.verifyButton = function () {
        $location.path('institute/' + $routeParams['id']);
    };

    //From review to login for casting
    $scope.submitVoteButton = function () {
        $location.path('castlogin/' + $routeParams['id']);
    };

    //Login for casting the ballot and redirect to final overview
    $scope.loginCastButton = function () {
        $location.path('final/' + $routeParams['id']);
    }

    //From review to election
    $scope.backToElectionButton = function () {
        $location.path('election/' + $routeParams['id']);
    };

    //Redirect to new tab with institutes
    $scope.chooseInstitute = function () {
        //$location.path('institute/' + $routeParams['id']);
    };

    //From institutes back to review
    $scope.backToReviewButton = function () {
        $location.path('review/' + $routeParams['id']);
    };

    $scope.backToVotingButton = function () {
        encrypt();
        $location.path('review/' + $routeParams['id']);
    }

    $scope.cancelButton = function () {
    };

    $scope.castButton = function () {
        $location.path('cast/' + $routeParams['id']);
    };

    $scope.redirectToInstituteButton = function () {
        $location.path('audit/' + $routeParams['id']);
    }

    function buildBallot(encrypted_vote) {
        var auditInfo = "{\"answers\": [{\"choices\": ["+makeAlphaBeta()+", "+makeAlphaBeta()+", "+makeAlphaBeta()+
            "], \"individual_proofs\": [["+makeCCR()+", "+makeCCR()+"], ["+makeCCR()+", "+makeCCR()+"], ["+makeCCR()+", "
            +makeCCR()+"]], \"overall_proof\": ["+makeCCR()+", "+makeCCR()+"], \"answer\": [0], \"randomness\": \""+
        encrypted_vote+"\"}]}";
        return auditInfo;
    }

    function makeAlphaBeta() {
        var res = "{\"alpha\": "+makeXRandoms(616)+", \"beta\": "+makeXRandoms(616)+"}";
        return res;
    }

    function makeCCR() {
        var res = "{\"challenge\": "+makeXRandoms(77)+", \"commitment\": {\"A\": "+makeXRandoms(616)+", \"B\": "+
            makeXRandoms(616)+"}, \"response\": "+makeXRandoms(77)+"}";
        return res;
    }

    function makeXRandoms(count) {
        var res = "\"";
        for (var i = 0; i < count; i++) {
            res += Math.floor(Math.random() * (10));
        }
        res += "\"";
        return res;
    }

});
