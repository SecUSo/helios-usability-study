'use strict';

var neuchatelApp = angular.module(
    "heliosStudyMain",
    [
        "ngAnimate",
        "ngRoute",
        "localization",
        "BackendService"
    ]
).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.
        when('/error/', {templateUrl: '/static/neuchatel/partials/error.html', controller: 'errorCtrl'}).
        when('/:id', {templateUrl: '/static/neuchatel/partials/introduction.html', controller: 'introductionCtrl'}).
        when('/login/:id', {templateUrl: '/static/neuchatel/partials/login.html', controller: 'electionCtrl'}).
        when('/election/:id', {templateUrl: '/static/neuchatel/partials/election.html', controller: 'electionCtrl'}).
        when('/candidate/:id', {templateUrl: '/static/neuchatel/partials/candidate.html', controller: 'electionCtrl'}).
        when('/review-plain/:id', {templateUrl: '/static/neuchatel/partials/review-plain.html', controller: 'electionCtrl'}).
        when('/review/:id', {templateUrl: '/static/neuchatel/partials/review.html', controller: 'electionCtrl'}).
        when('/verify/:id', {templateUrl: '/static/neuchatel/partials/verify.html', controller: 'electionCtrl'}).
        when('/final/:id', {templateUrl: '/static/neuchatel/partials/final.html', controller: 'electionCtrl'}).
        when('/cleanup/:id', {templateUrl: '/static/neuchatel/partials/cleanup.html', controller: 'electionCtrl'}).
        when('/sus/:id', {templateUrl: '/static/neuchatel/partials/sus.html', controller: 'answerCtrl'}).
        otherwise({templateUrl: '/static/neuchatel/partials/introduction.html', controller: 'introductionCtrl'});
    // use the HTML5 History API
    $locationProvider.html5Mode(true).hashPrefix('!');

}]);

neuchatelApp.run(function ($rootScope, $window, $document, localize) {
    // root scope functions
    $rootScope.getLanguages = function () {
        return ['de'];
    };
    $rootScope.$watch('language', function (newLang) {
        localize.setLanguage(newLang);
        $rootScope.$broadcast('langChange', newLang);
    });

    // initialization
    if (!$rootScope.language) {
        $rootScope.language = $window.navigator.userLanguage ||
                              $window.navigator.language ||
                              $document.getElementsByTagName('html')[0].lang;
        if ($rootScope.language && ($rootScope.language.length > 2)) {
            $rootScope.language = $rootScope.language.substr(0, 2);
        }
        //If hard coding a language is desired, do it here, if not delete the following line
        $rootScope.language = "de";
     }
});

