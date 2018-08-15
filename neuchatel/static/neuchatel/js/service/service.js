'use strict';

angular.module('BackendService', [])
    .factory('Backend', function ($http) {
        return {
            assign: function (id) {
                return $http({
                    method: "POST",
                    url: '/neuchatel/assign',
                    data: 'id=' + id,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
            },
            save_timestamp: function (subject, timestamp, type) {
                return $http({
                    method: "POST",
                    url: '/save',
                    data:
                    'id=' + subject +
                    '&timestamp=' + timestamp +
                    '&type=' + type,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
            },
            unmanipulate: function (subject) {
                return $http({
                    method: "POST",
                    url: '/unmanipulate',
                    data: 'id=' + subject,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
            },
            get_manipulated: function (subject) {
                return $http({
                    method: "POST",
                    url: '/get_manipulated',
                    data: 'id=' + subject,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
            }
        }
    });
