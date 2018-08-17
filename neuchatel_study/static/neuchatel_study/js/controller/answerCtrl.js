'use strict';

neuchatelStudyApp.controller("answerCtrl", function ($scope, $rootScope, $routeParams, Backend) {
    $scope.id = $routeParams['id'];

    $scope.save_sus = function () {

        console.log("Saving SUS");

        Backend.save_answer($scope.id, $scope.sus_one, $scope.sus_two, $scope.sus_three, $scope.sus_four,
            $scope.sus_five, $scope.sus_six, $scope.sus_seven, $scope.sus_eight, $scope.sus_nine, $scope.sus_ten);
        alert("Vielen Dank für Ihre Teilnahme. Bitte holen Sie jetzt die Versuchsleitung.");
    }

});