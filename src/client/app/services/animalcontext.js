(function () {
    'use strict';

    var serviceId = 'animalcontext';
    angular.module('app').factory(serviceId, ['$http', 'common', animalcontext]);

    function animalcontext($http, common) {
        var $q = common.$q;
        var service = {
            getAllAnimals: getAllAnimals,
            getAnimal: getAnimal
        };

        return service;


        function getAllAnimals() {
            return $http.get('api/animals').then(function (data) {
                return $q.when(data);
            });
        }
        function getAnimal(animalId) {
            return $http.get('api/animals/' + animalId).then(function (data) {
                return $q.when(data);
            });
        }
    }
})();