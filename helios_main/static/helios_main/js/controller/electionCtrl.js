'use strict';

heliosStudyMainApp.controller("electionCtrl", function ($scope, $routeParams, $location, Backend) {

    var choiceBackground = "00";
    var hashBackground;
    var encrypted_vote = "";

    //Do when page loaded
    Backend.assign($routeParams['id']).success(function (data) {
        var result = angular.fromJson(data);
        if ("Error" in result) {
            $location.path('/error/' + $routeParams['id'] + '/' + result["Error"]);
        }
        $scope.experimentData = result;
        $scope.options = result.question_data.options;
        console.log(result);
        console.log(result.question_data.options);

        $scope.startTimeAll = Date.now();

    });
    
    
    $scope.saveChoice = function (code) {
        choiceBackground = code;
        console.log('Choice is ' + choiceBackground);
    };


    //Pseudo-encryption of the vote
    $scope.encrypt = function () {
        for (var i=0; i<50; i++){
            encrypted_vote += Math.floor( Math.random() * (10));
        }
        encrypted_vote += choiceBackground;

         for (var i=0; i<50; i++){
            encrypted_vote += Math.floor( Math.random() * (10));
        }

        console.log(encrypted_vote);

    }
    

    //From election to review
    $scope.proceedButton = function () {
        //$scope.startTime = Date.now();

        for (var i=0; i<50; i++){
            encrypted_vote += Math.floor( Math.random() * (10));
        }
        encrypted_vote += choiceBackground;

         for (var j=0; j<50; j++){
            encrypted_vote += Math.floor( Math.random() * (10));
        }

        console.log(encrypted_vote);

        console.log('Hash is ' + $scope.hash);
        $location.path('review/' + $routeParams['id']);
    }

    //From review to audit
    $scope.auditButton = function () {
        $location.path('institute/' + $routeParams['id']);
    };

    //From review to final overview
    $scope.submitVoteButton = function () {
        $location.path('final/' + $routeParams['id']);
    };

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
});
