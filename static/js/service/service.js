'use strict';

angular.module('BackendService', [])
    .factory('Backend', function ($http) {
        return {
            submit: function (id, resultData) {
                return $http({
                    method: "POST",
                    url: '/task/submit',
                    data: 'id=' + id + '&result_data=' + angular.toJson(resultData),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
            }
        }
});
