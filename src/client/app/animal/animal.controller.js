
(function () {
    'use strict';

    angular
        .module('app.animal')
        .controller('Animal', Animal);
        
    Animal.$inject = [
       '$routeParams', 'spinner', 'animalcontext', 'charts'
    ];


    function Animal($routeParams, spinner, animalcontext, charts) {
        var vm = this;
        vm.animal = {};
        activate();

        function activate() {
            getAnimal($routeParams.animalId).then(function () {
                spinner.spinnerHide();
            });
        }

        function getAnimal(animalId) {
            return animalcontext.getAnimal(animalId).then(function (data) {
                vm.animal = data.data;
                vm.measure = data.data.measures[0];
                vm.measures = data.data.measures;
                vm.weightGainData = charts.getAnimalLinesData(data.data.measures, 'dailyWeightGain', 'averageWeightGain');
                vm.weightData = charts.getAnimalLinesData(data.data.measures, 'weight', 'averageWeight');
                return vm.animal;
            });
        }
    }

})();
