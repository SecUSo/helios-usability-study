'use strict';

heliosStudyMainApp.controller("electionCtrl", function ($scope, $routeParams, $location, Backend) {

    var choiceBackground = 123456
    var hashBackground = 'test'

    //Do when page to loaded
    Backend.assign($routeParams['id']).success(function (data) {
        var result = angular.fromJson(data);
        if ("Error" in result) {
            $location.path('/error/' + $routeParams['id'] + '/' + result["Error"]);
        }
        $scope.experimentData = result;
        $scope.experimentData.question = result.question.question;
        $scope.experimentData.answers = result.question.answers;
        $scope.startTimeAll = Date.now();
    });

    //From election to review
    $scope.proceedButton = function () {
        //$scope.startTime = Date.now();
        $scope.choice = choiceBackground
        $scope.hash = hashBackground
        console.log('Hash is ' + $scope.hash)
        $location.path('review/' + $routeParams['id']);
    }

    //From review to audit
    $scope.auditButton = function () {
        $location.path('institute/' + $routeParams['id']);
    }

    //From review to final overview
    $scope.submitVoteButton = function () {
        $location.path('final/' + $routeParams['id']);
    }

    //From review to election
    $scope.backToElectionButton = function () {
        $location.path('election/' + $routeParams['id']);
    }

    //Redirect to new tab with institutes
    $scope.chooseInstitute = function () {
        //$location.path('institute/' + $routeParams['id']);
    }

    //From institutes back to review
    $scope.backToReviewButton = function () {
        $location.path('review/' + $routeParams['id']);
    }

    $scope.cancelButton = function () {
    }

    $scope.castButton = function () {
        $location.path('cast/' + $routeParams['id']);
    }
});
