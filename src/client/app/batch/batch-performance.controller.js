(function() {
    angular
        .module('app.batch')
        .controller('BatchPerformance', ['$routeParams', 'common', 'commonConfig','batchcontext', BatchPerformance]);

    function BatchPerformance($routeParams, common, commonConfig, batchcontext) {

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
                vm.weightGainAverageData = BarChartData(vm.measures, vm.measure, 'averageWeightGain', 'averageWeightGainExpected');
                vm.weightAverageData = BarChartData(vm.measures, vm.measure, 'averageWeight', 'averageWeightExpected');
                vm.breedWeightGainData = LinesChartData(vm.measures, vm.measure, 'breeds', 'weightGain', 'averageWeightGain');
                vm.breedWeightData = LinesChartData(vm.measures, vm.measure, 'breeds', 'weight', 'averageWeight');
                vm.categoryWeightGainData = LinesChartData(vm.measures, vm.measure, 'categories', 'weightGain', 'averageWeightGain');
                vm.categoryWeightData = LinesChartData(vm.measures, vm.measure, 'categories', 'weight', 'averageWeight');
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