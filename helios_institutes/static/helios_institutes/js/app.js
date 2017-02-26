'use strict';

var heliosStudyInstitutesApp = angular.module(
    "heliosStudyInstitutes",
    [
        "ngAnimate",
        "ngRoute",
        "localization",
        "BackendService"
    ]
).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.
        when('/:id', {templateUrl: '/static/helios_institutes/partials/introduction.html', controller: 'electionCtrl'}).
        when('/election/:id', {templateUrl: '/static/helios_institutes/partials/election.html', controller: 'electionCtrl'}).
        when('/review/:id', {templateUrl: '/static/helios_institutes/partials/review.html', controller: 'electionCtrl'}).
        when('/institute/:encrypted_vote', {templateUrl: '/static/helios_institutes/partials/institute.html', controller: 'electionCtrl'}).
        when('/cast/:id', {templateUrl: '/static/helios_institutes/partials/cast.html', controller: 'electionCtrl'}).
        when('/final/:id', {templateUrl: '/static/helios_institutes/partials/finaloverview.html', controller: 'electionCtrl'}).
        when('/error/', {templateUrl: '/static/helios_institutes/partials/error.html', controller: 'errorCtrl'}).
        otherwise({templateUrl: '/static/helios_institutes/partials/introduction.html', controller: 'electionCtrl'});
    // use the HTML5 History API
    $locationProvider.html5Mode(true).hashPrefix('!');
}]);

heliosStudyInstitutesApp.run(function ($rootScope, $window, $document, localize) {
    // root scope functions
    $rootScope.getLanguages = function () {
        return ['en', 'de'];
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
        $rootScope.language = "en";
    }
});