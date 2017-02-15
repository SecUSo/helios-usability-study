'use strict';

heliosStudyMainApp.controller("electionCtrl", function ($scope, $routeParams, $location, Backend, $rootScope, $window) {

    var choiceBackground = "00";
    var hashBackground;
    var hashVisible;
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
        $scope.startTimeAll = Date.now();

    });
    
    
    $scope.saveChoice = function (code, choice) {
        choiceBackground = code;
        $rootScope.choice = choice;
        console.log('Choice is ' + choiceBackground);
    };


    //Pseudo-encryption of the vote. Well, the option code is hidden between random values.
     function encrypt() {
        for (var i=0; i<100; i++){
            encrypted_vote += Math.floor( Math.random() * (10));
        }
        encrypted_vote += choiceBackground;

         for (var i=0; i<100; i++){
            encrypted_vote += Math.floor( Math.random() * (10));
        }

        //"Hashing" the encrypted vote. No seriously, this is not a hash.
         hashBackground = btoa(encrypted_vote);
         hashVisible = hashBackground.toString().substr(0, 42);
         console.log(encrypted_vote);

    }
    

    //From election to review
    $scope.proceedButton = function () {
        //$scope.startTime = Date.now();

        encrypt();

        console.log(encrypted_vote);

        $rootScope.ballot_tracker = hashVisible;

        console.log('Hash is ' + hashVisible);
        console.log('Hash in scope ' + $scope.ballot_tracker);
        $location.path('review/' + $routeParams['id']);
    }

    //From displays audit info
    $scope.auditButton = function () {
        if ($scope.auditClick==false) {
            $scope.auditClick=true;
        } else {
            $scope.auditClick=false
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

    $scope.cancelButton = function () {
    };

    $scope.castButton = function () {
        $location.path('cast/' + $routeParams['id']);
    };

    $scope.redirectToInstituteButton = function (){
        $window.open('https://www.google.com', '_blank');
        $location.path('main/' + $routeParams['id']);
    }

});
