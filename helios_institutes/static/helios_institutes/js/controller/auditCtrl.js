'use strict';

heliosStudyInstitutesApp.controller("auditCtrl", function ($rootScope, $scope, $routeParams, $window, $location, $timeout) {

    var dictionaryBase64 = {"O": 'o', "I": 'i', "l": 'L'};

    $scope.show_progress = false;
    $scope.audit_vote = $routeParams['encrypted_vote'];

     var temp_tracker = deconfuse(btoa($scope.audit_vote).toString().substr(0, 43), dictionaryBase64);
    $scope.audit_tracker = split43In4s(temp_tracker);

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

    function deconfuse(regularBase64Hash, dictionary) {
        var res = regularBase64Hash.replace(/O/g, dictionary.O);
        res = res.replace(/I/g, dictionary.I);
        res = res.replace(/l/g, dictionary.l);
        return res;
    }

     function split43In4s(hash43Base64) {
        var res = hash43Base64.substr(0, 4);
        var separator = "-";
        for (var i = 1; i < 11; i++) {
            res += separator + hash43Base64.substr(i * 4, 4);
        }
        return res;
    }

});