'use strict';

heliosStudySmartphoneApp.controller("electionCtrl", function ($scope, $routeParams, $location, Backend, $rootScope, $window) {

    $scope.ballot = $routeParams['encrypted_vote'];

    var encrypted_vote = "";
    $scope.head_line = "Bundestagswahl 2021";
    $scope.show_progress = true;

    $scope.saveChoice = function (code, choice) {

        if ($rootScope.selected_code == code) {
            $rootScope.selected_code = null;
        } else {
            $rootScope.selected_code = code;
            $rootScope.choice = choice;
            console.log('Choice is ' + $rootScope.choice);
        }
    };

    $scope.resetChoice = function () {
        $rootScope.selected_code = null;
        $rootScope.choice = null;
    }

    switch ($location.path().split("/")[1]) {
        case "login":
            $scope.show_progress = true;
            $scope.current_step = 1;
            break;
        case "election":
            $scope.show_progress = true;
            $scope.current_step = 2;
            $scope.resetChoice();
            break;
        case "review-plain":
            $scope.show_progress = true;
            $scope.current_step = 3;
            break;
        case "review":
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
        console.log($scope.options);
        $rootScope.startTimeAll = Date.now();

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

    //Pseudo-encryption of the vote. Well, the option code is hidden between random values.
    function encryptContd(is_manipulated) {
        console.log("choice");
        console.log($rootScope.choice);
        console.log("selected_code");
        console.log($rootScope.selected_code);
        console.log("manipulated");
        console.log(is_manipulated);

        for (var i = 0; i < 100; i++) {
            encrypted_vote += Math.floor(Math.random() * (10));
        }

        // Manipulate the chosen option to FDP when SPD is voted for.
        if (is_manipulated && $rootScope.choice == "SPD") {
            for (var option in $scope.options) {
                if ($scope.options[option].option == "FDP") {
                    $rootScope.selected_code = option;
                    console.log('Choice modified from SPD to ' + $scope.options[$rootScope.selected_code].option);
                    break;
                }
            }
        }

        encrypted_vote += $rootScope.selected_code;

        for (var i = 0; i < 100; i++) {
            encrypted_vote += Math.floor(Math.random() * (10));
        }

        //"Hashing" the encrypted vote. No seriously, this is not a hash.
        var temp_tracker = deconfuse(btoa(encrypted_vote).toString().substr(0, 43), dictionaryBase64);
        $rootScope.ballot_tracker = split43In4s(temp_tracker);

        console.log(encrypted_vote);
        $rootScope.encrypted_vote = encrypted_vote;

        console.log("Ballot-Tracker");
        console.log($rootScope.ballot_tracker);
        console.log("Ballot");
        console.log($scope.ballot);
        console.log("encrypted_vote");
        console.log($rootScope.encrypted_vote);

        $location.path('review/' + $routeParams['id']);
    }

    var dictionaryBase64 = {"O": 'o', "I": 'i', "l": 'L',"zero": '2', "one": '3'};

    function deconfuse(regularBase64Hash, dictionary) {
        var res = regularBase64Hash.replace(/O/g, dictionary.O);
        res = res.replace(/I/g, dictionary.I);
        res = res.replace(/l/g, dictionary.l);
        res = res.replace(/0/g, dictionary.zero);
        res = res.replace(/1/g, dictionary.one);
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

    $scope.startButton = function () {
        Backend.save_timestamp($rootScope.subject, new Date().getTime(), "Benaloh(0): Overall start (start login)");
        $location.path('login/' + $routeParams['id']);
    }

    //From login back to introduction
    $scope.backToIntroductionButton = function () {
        $location.path('/' + $routeParams['id']);
    }

    //From login to election
    $scope.loginButton = function () {
        if($scope.userid == 'k5k6j2kfL4' && $scope.userpass == '7FCMvqbyK3') {
            Backend.save_timestamp($rootScope.subject, new Date().getTime(), "Benaloh(1): Election start");
            $location.path('election/' + $routeParams['id']);
        } else {
            alert("Sie haben Ihren Benutzernamen oder Ihr Passwort falsch eingegeben. Bitte geben Sie es erneut ein.");
        }
    };

    //From election to review
    $scope.proceedButton = function () {
        console.log("choice");
        console.log($rootScope.choice);
        console.log("selected_code");
        console.log($rootScope.selected_code);

        // if no choice is made vote "invalid"
        if ($rootScope.selected_code == null) {
            $scope.saveChoice('00', 'Ungültige Stimme');
        }

        Backend.save_timestamp($rootScope.subject, new Date().getTime(), "Benaloh(2): Election end");
        $location.path('review-plain/' + $routeParams['id']);
    };

    // to election
    $scope.backToElectionButton= function () {
        $location.path('election/' + $routeParams['id']);
    };

    //From review-plain to review
    $scope.encryptVoteButton = function () {
        Backend.save_timestamp($rootScope.subject, new Date().getTime(), "Benaloh(3): Plain review end");
        encrypt();
    }

    //From review to audit
    $scope.verifyButton = function () {
        Backend.save_timestamp($rootScope.subject, new Date().getTime(), "Benaloh(4): Audit start");
        $location.path('auditdone/' + $routeParams['id']);
        $window.open('institute/' + $rootScope.encrypted_vote, '_blank');
    };

    //From review to final overview
    $scope.submitVoteButton = function () {
        Backend.save_timestamp($rootScope.subject, new Date().getTime(), "Benaloh(6): Cast vote. Finished");
        $location.path('cast/' + $routeParams['id']);
    };

    //From auditEnd to election
    $scope.auditToElectionButton = function () {
        Backend.save_timestamp($rootScope.subject, new Date().getTime(), "Benaloh(5): Audit end");
        $location.path('election/' + $routeParams['id']);
    };

    //From institutes back to review
    $scope.backToReviewButton = function () {
        $location.path('review/' + $routeParams['id']);
    };

    $scope.cancelButton = function () {
    };

    // cleanup and restart
    $scope.cleanupButton = function () {
        Backend.unmanipulate($rootScope.subject);
        $location.path('/' + $routeParams['id']);
    }
});
