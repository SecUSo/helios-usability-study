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
            save_answer: function (subject, sus_one, sus_two, sus_three, sus_four, sus_five, sus_six, sus_seven,
                                   sus_eight, sus_nine, sus_ten) {

                console.log("Saving SUS in Backend");
                return $http({
                    method: "POST",
                    url: '/sus',
                    data:
                    'id=' + subject +
                    '&sus_one=' + sus_one +
                    '&sus_two=' + sus_two +
                    '&sus_three=' + sus_three +
                    '&sus_four=' + sus_four +
                    '&sus_five=' + sus_five +
                    '&sus_six=' + sus_six +
                    '&sus_seven=' + sus_seven +
                    '&sus_eight=' + sus_eight +
                    '&sus_nine=' + sus_nine +
                    '&sus_ten=' + sus_ten,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
            },
            save_timestamp: function (subject, timestamp, duration, type) {
                return $http({
                    method: "POST",
                    url: '/save',
                    data:
                    'id=' + subject +
                    '&timestamp=' + timestamp +
                    '&duration=' + duration +
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
