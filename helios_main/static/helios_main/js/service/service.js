'use strict';

angular.module('BackendService', [])
    .factory('Backend', function ($http) {
        return {
            assign: function (id) {
                return $http({
                    method: "POST",
                    url: '/main/assign',
                    data: 'id=' + id,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
            },
            submit: function (id, introduction, number_verification, overall, voting, verification) {
                return $http({
                    method: "POST",
                    url: '/main/submit',
                    data:
                    'id=' + id +
                    '&introduction=' + angular.toJson(introduction) +
                    '&number=' + angular.toJson(number_verification) +
                    '&overall=' + angular.toJson(overall) +
                    '&voting=' + angular.toJson(voting) +
                    '&verification=' + angular.toJson(verification),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
            }
        }
    });
