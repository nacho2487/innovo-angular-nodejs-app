(function() {
    angular
        .module('app.batch')
        .controller('BatchPerformance', ['$routeParams', 'common', 'commonConfig','batchcontext', 'charts', BatchPerformance]);

    function BatchPerformance($routeParams, common, commonConfig, batchcontext, charts) {

        var vm = this;
        vm.measures = [];
        vm.measure = {};
        vm.weightGainAverageData = [];
        vm.weightAverageData = [];
        vm.breedWeightGainData = [];
        vm.breedWeightData = [];
        vm.categoryWeightGainData = [];
        vm.categoryWeightData = [];

        activate();

        function activate() {
            getBatchMeasures($routeParams.batchId).then(function() {
                vm.weightGainAverageData = charts.getBarsData(vm.measures, vm.measure, 'averageWeightGain', 'averageWeightGainExpected');
                vm.weightAverageData = charts.getBarsData(vm.measures, vm.measure, 'averageWeight', 'averageWeightExpected');
                vm.breedWeightGainData = charts.getLinesData(vm.measures, vm.measure, 'breeds', 'weightGain', 'averageWeightGain');
                vm.breedWeightData = charts.getLinesData(vm.measures, vm.measure, 'breeds', 'weight', 'averageWeight');
                vm.categoryWeightGainData = charts.getLinesData(vm.measures, vm.measure, 'categories', 'weightGain', 'averageWeightGain');
                vm.categoryWeightData = charts.getLinesData(vm.measures, vm.measure, 'categories', 'weight', 'averageWeight');
                common.$broadcast(commonConfig.config.controllerActivateSuccessEvent, {
                    controllerId: 'BatchPerformance'
                });
            });
        }

        function getBatchMeasures(batchId) {
            return batchcontext.getBatchMeasures(batchId).then(function(data) {
                vm.measures = data.data;
                vm.measure = data.data[0];
                return data.data;
            });
        }
    }
})();