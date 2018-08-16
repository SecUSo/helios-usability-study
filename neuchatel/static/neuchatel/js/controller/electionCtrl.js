'use strict';

neuchatelApp.controller("electionCtrl", function ($scope, $routeParams, $location, Backend, $rootScope, $window) {

    var encrypted_vote = "";
    $scope.auditClick = false;
    $scope.show_progress = true;

    $scope.saveChoice = function (code, choice) {

        if ($rootScope.selected_code == code) {
            $scope.resetChoice();
        } else {
            $rootScope.selected_code = code;
            $rootScope.choice = choice;

            // ungueltige Stimme
            if (code == "00") {
                $rootScope.return_code = "4B54423";
            } else {
                $rootScope.return_code = $scope.options[code].option_return_code;
            }

            console.log('Choice is ' + $rootScope.choice);
        }
    };

    $scope.saveFirstChoice = function (code, choice) {

        if ($rootScope.selected_code_one == code) {
            $scope.resetFirstChoice();
        } else {
            $rootScope.selected_code_one = code;
            $rootScope.choice_one = choice;

            // ungueltige Stimme
            if (code == "00") {
                $rootScope.return_code_one = "53495435";
            } else {
                $rootScope.return_code_one = $scope.options_one[code].option_return_code;
            }

            console.log('First choice is ' + $rootScope.choice_one);
        }
    };

    $scope.resetFirstChoice = function () {
        $rootScope.selected_code_one = null;
        $rootScope.choice_one = null;
        $rootScope.return_code_one = null;
    };

    $scope.resetChoice = function () {
        $rootScope.selected_code = null;
        $rootScope.choice = null;
        $rootScope.return_code = null;
    };

    switch ($location.path().split("/")[1]) {
        case "error":
            $scope.show_progress = false;
            break;
        case "login":
            $scope.show_progress = true;
            $scope.current_step = 1;
            break;
        case "election":
            $scope.show_progress = true;
            $scope.current_step = 2;
            break;        case "election":
            $scope.show_progress = true;
            $scope.current_step = 2;
            break;
        case "candidate":
            $scope.show_progress = true;
            $scope.current_step = 2;
            break;
        case "review":
            $scope.show_progress = true;
            $scope.current_step = 3;
            break;
        case "review-plain":
            $scope.show_progress = true;
            $scope.current_step = 3;
            break;
        case "verify":
            $scope.show_progress = true;
            $scope.current_step = 4;
            break;
        case "confirm":
            $scope.show_progress = true;
            $scope.current_step = 5;
            break;
        case "final":
            $scope.show_progress = true;
            $scope.current_step = 5;
            break;
        default:
            $scope.show_progress = true;
            $scope.current_step = 0;
    }


    $rootScope.subject = $routeParams['id'];
    console.log("Subject:" + $rootScope.subject);

    //Do when page loaded
    Backend.assign($routeParams['id']).success(function (data) {
        var result = angular.fromJson(data);
        if ("Error" in result) {
            $location.path('/error/' + $routeParams['id'] + '/' + result["Error"]);
        }

        console.log($routeParams['id']);
        $scope.experimentData = result;
        $scope.options = result.question_data.options;
        $scope.options_one = result.question_data.options_one;
    });

    // retrieve information, whether to manipulate the vote or not and encrypt afterwards
    function encrypt() {
        Backend.get_manipulated($routeParams['id']).success(function (data) {
            var result = angular.fromJson(data);
            if ("Error" in result) {
                $location.path('/error/' + $routeParams['id'] + '/' + result["Error"]);
            }
            encryptContd(result.is_manipulated);
        });
    }

    // "encrypt" the vote
    function encryptContd(is_manipulated) {
        // Manipulate the chosen option to FDP when SPD is voted for.
        if (is_manipulated && $rootScope.choice == "SPD") {
            for (var option in $scope.options) {
                if ($scope.options[option].option == "FDP") {
                    $rootScope.selected_code = option;
                    $rootScope.choice = $scope.options[option].option;
                    $rootScope.return_code = $scope.options[option].option_return_code;
                    console.log('Choice modified from SPD to ' + $scope.options[$rootScope.selected_code].option);
                    break;
                }
            }
        }
    }

    //From login back to introduction
    $scope.backToIntroductionButton = function () {
        $location.path('/' + $routeParams['id']);
    }

    //From login to election
    $scope.loginButton = function () {
        if($scope.initCode0 == '2rgi' && $scope.initCode1 == 'ptwg' && $scope.initCode2 == '6zpn'
            && $scope.initCode3 == 'j48h' && $scope.initCode4 == '65de' && $scope.userpass == '1987') {
        //if($scope.userid == '2rgiptwg6zpnj48h65de' && $scope.userpass == '1987') {
            Backend.save_timestamp($rootScope.subject, new Date().getTime(), "Neuchatel(1): Election start");
            $location.path('candidate/' + $routeParams['id']);
        } else {
            alert("Falscher Initialisierungscode oder falsches Geburtsjahr. Überprüfen Sie den Code auf Ihrem Stimmrechtsausweis und versuchen Sie es erneut.");
        }
    };

    //From election to review-plain
    $scope.proceedButton = function () {
        // if no choice is made vote "invalid"
        if ($rootScope.selected_code == null) {
            $scope.saveChoice('00', 'Ungültige Stimme');
        }

        Backend.save_timestamp($rootScope.subject, new Date().getTime(), "Neuchatel(2): Second vote end");
        $location.path('review-plain/' + $routeParams['id']);
    };

    //From first to second vote
    $scope.proceedToPartyButton = function () {
        // if no choice is made vote "invalid"
        if ($rootScope.selected_code_one == null) {
            $scope.saveChoice('00', 'Ungültige Stimme');
        }

        Backend.save_timestamp($rootScope.subject, new Date().getTime(), "Neuchatel(2): First vote end");
        $location.path('election/' + $routeParams['id']);
    };

    //To election
    $scope.backToElectionButton = function () {
        $location.path('election/' + $routeParams['id']);
    };

    //Election to first vote
    $scope.backToFirstVoteButton = function () {
        $location.path('candidate/' + $routeParams['id']);
    };

    //From review-plain to review
    $scope.encryptVoteButton = function () {
        Backend.save_timestamp($rootScope.subject, new Date().getTime(), "Neuchatel(3): Plain review end");
        //$location.path('review/' + $routeParams['id']);
        $location.path('verify/' + $routeParams['id']);
        setTimeout(function () {
            encrypt();
        }, 500);
    };

    //
    $scope.finishButton = function() {
        $location.path('sus/' + $routeParams['id']);
    };

    //From review to return code verification
    $scope.submitVoteButton = function () {
        Backend.save_timestamp($rootScope.subject, new Date().getTime(), "Neuchatel(4): Verify start");
        $location.path('verify/' + $routeParams['id']);
    };

    //wrong return code verification
    $scope.gotoErrorButton = function (errorReason) {
        switch (errorReason) {
            case "verify":
                $rootScope.errorReason = '_verificationError_';
                Backend.save_timestamp($rootScope.subject, new Date().getTime(), "Neuchatel(5.1): Verification Error detected. Finished");
                break;
            case "confirm":
                $rootScope.errorReason = '_confirmationError_';
                break;
            case "finalize":
                $rootScope.errorReason = '_finalizationError_';
                break;
            default:
                $rootScope.errorReason = '_defaultError_';
                break;
        }
        $location.path('/error/');
    };

    //From return code verification to confirmation code input
    $scope.confirmReturnButton = function () {
        Backend.save_timestamp($rootScope.subject, new Date().getTime(), "Neuchatel(5.2): Return-Code validated");
        $location.path('confirm/' + $routeParams['id']);
    };

    //From confirmation code input to finalization code verification
    $scope.confirmVoteButton = function () {
        if($scope.confcode0 === 'xArc' && $scope.confcode1 === 'uTvK' && $scope.confcode2 === 'MyfY'
            && $scope.confcode3 === 'mvPN' && $scope.confcode4 === 'na') {
             Backend.save_timestamp($rootScope.subject, new Date().getTime(), "Neuchatel(6): Confirmation-Code entered valid. Finished");
             $location.path('final/' + $routeParams['id']);
        } else {
            alert("Sie haben Ihren Bestätigungscode falsch eingegeben. Bitte versuchen Sie es erneut.");
        }
    };

    // cleanup and restart
    $scope.cleanupButton = function () {
        Backend.unmanipulate($rootScope.subject);
        $location.path('/' + $routeParams['id']);
    }

    $scope.space = function (str, after) {
        after = after || 4;
        var v = str.replace(/[^\dA-Z]/g, ''),
            reg = new RegExp(".{" + after + "}", "g");
        return v.replace(reg, function (a) {
            return a + ' ';
        });
    }

    //var el = document.getElementById('init-code');
    //el.addEventListener('keyup', function () {
    //    this.value = $scope.space(this.value, 4);
    //});

    $scope.testChange = function () {
        console.log('Hallo!');
    }

});
