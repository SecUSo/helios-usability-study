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
            submit: function (subject, timestamp, type) {
                return $http({
                    method: "POST",
                    url: '/main/submit',
                    data:
                    'id=' + subject +
                    '&timestamp=' + angular.toJson(timestamp) +
                    '&type=' + angular.toJson(type),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
            }
        }
    });
