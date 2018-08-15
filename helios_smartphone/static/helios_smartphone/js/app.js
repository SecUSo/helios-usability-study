'use strict';


var heliosStudySmartphoneApp = angular.module(
    "heliosStudySmartPhone",
    [
        "ngAnimate",
        "ngRoute",
        "localization",
        "BackendService",
        "monospaced.qrcode"
    ]
).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.
        when('/:id', {templateUrl: '/static/helios_smartphone/partials/introduction.html', controller: 'electionCtrl'}).
        when('/login/:id', {templateUrl: '/static/helios_smartphone/partials/login.html', controller: 'electionCtrl'}).
        when('/election/:id', {templateUrl: '/static/helios_smartphone/partials/election.html', controller: 'electionCtrl'}).
        when('/review-plain/:id', {templateUrl: '/static/helios_smartphone/partials/review-plain.html', controller: 'electionCtrl'}).
        when('/review/:id', {templateUrl: '/static/helios_smartphone/partials/review.html', controller: 'electionCtrl'}).
        when('/institute/:encrypted_vote', {templateUrl: '/static/helios_smartphone/partials/institute.html', controller: 'electionCtrl'}).
        when('/auditdone/:id', {templateUrl: '/static/helios_smartphone/partials/auditdone.html', controller: 'electionCtrl'}).
        when('/cast/:id', {templateUrl: '/static/helios_smartphone/partials/cast.html', controller: 'electionCtrl'}).
        when('/cleanup/:id', {templateUrl: '/static/helios_smartphone/partials/cleanup.html', controller: 'electionCtrl'}).
//        when('/final/:id', {templateUrl: '/static/helios_smartphone/partials/finaloverview.html', controller: 'electionCtrl'}).
        when('/error/', {templateUrl: '/static/helios_smartphone/partials/error.html', controller: 'errorCtrl'}).
        otherwise({templateUrl: '/static/helios_smartphone/partials/introduction.html', controller: 'electionCtrl'});
    // use the HTML5 History API
    $locationProvider.html5Mode(true).hashPrefix('!');
}]);

heliosStudySmartphoneApp.run(function ($rootScope, $window, $document, localize) {
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