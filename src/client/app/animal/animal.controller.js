angular
    .module('app.animal')
.controller(Animal);

function Animal($routeParams, spinner, animalcontext) {
    var vm = this;
    vm.animal = {};
    activate();

    function activate() {
        getAnimal($routeParams.animalId).then(function() {
            spinner.spinnerHide();
        });
    }

    function getAnimal(animalId) {
        return animalcontext.getAnimal(animalId).then(function (data) {
            vm.animal = data.data;
            vm.measure = data.data.measures[0];
            vm.measures = data.data.measures;
            vm.weightGainData = IndividualLinesChartData(data.data.measures, 'dailyWeightGain', 'averageWeightGain');
            vm.weightData = IndividualLinesChartData(data.data.measures, 'weight', 'averageWeight');
            return vm.animal;
        });
    }
}