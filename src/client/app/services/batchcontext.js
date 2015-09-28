(function () {
    'use strict';

    angular.module('app.services').factory('batchcontext', batchcontext);
    batchcontext.$inject = ['$http', 'common'];


    function batchcontext($http, common) {
        var $q = common.$q;
        var service = {
            getBatches: getBatches,
            getBatchMeasures: getBatchMeasures
        };

        return service;

        function getBatches() {
            return $http.get('api/batches').then(function (data) {
                return $q.when(data);
            });
        }

        function getBatchMeasures(batchId) {
            return $http.get('api/batches/' + batchId + '/measures').then(function (data) {
                return $q.when(data);
            });
        }
    }
})();