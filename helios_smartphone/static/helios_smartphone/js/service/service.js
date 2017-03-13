'use strict';

angular.module('BackendService', [])
    .factory('Backend', function ($http) {
        return {
            assign: function (id) {
                return $http({
                    method: "POST",
                    url: '/smartphone/assign',
                    data: 'id=' + id,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
            },
            save_timestamp: function (subject, timestamp, type) {
                return $http({
                    method: "POST",
                    url: '/save',
                    data: 'id=' + subject +
                    '&timestamp=' + timestamp +
                    '&type=' + type,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
            }
        }
    });
