(function() {
    'use strict';
    angular
        .module('app.dashboard')
        .controller('Dashboard', Dashboard);
    Dashboard.$inject = ['common', 'commonConfig', 'batchcontext', 'charts'];

    function Dashboard(common, commonConfig, batchcontext, charts) {
        var vm = this;
        vm.batch = {};
        vm.batches = [];
        vm.pies = [{
            title: "Raza"
        }, {
            title: "Categoría"
        }];
        vm.selectedType = "Raza";
        vm.changeMeasures = changeMeasures;
        vm.changeMeasure = changeMeasure;
        vm.changePieChart = changePieChart;
        activate();
        function activate() {
            getBatches().then(getBatchMeasures).then(function() {
                loadMeasure();
                //common.$broadcast(commonConfig.config.controllerActivateSuccessEvent, { controllerId: 'Dashboard' })
            });
        }

        function getBatches() {
            return batchcontext.getBatches().then(function(data) {
                vm.batches = data.data;
                vm.batch = data.data[0];
                return data.data[0].id;
            });
        }

        function getBatchMeasures(batchId) {
            return batchcontext.getBatchMeasures(batchId).then(function(data) {
                vm.measures = data.data;
                vm.measure = data.data[0];
                return data.data;
            });
        }

        function changeMeasures(batch) {
            vm.batch = batch;
            batchcontext.getBatchMeasures(batch.Id).then(function(data) {
                loadMeasure();
            });
        }

        function changeMeasure(measureModel) {
            vm.measure = measureModel;
            loadMeasure();
        }

        function changePieChart(pie, event) {
            vm.piedata = pie.data;
            vm.types = pie.types;
            vm.selectedType = pie.title;
            event.preventDefault();
        }

        function loadMeasure() {
            vm.pies[0].data = charts.getPieData(vm.measure, 'breeds');
            vm.pies[0].types = charts.getPieCount(vm.measure, 'breeds');
            vm.pies[1].data = charts.getPieData(vm.measure, 'categories');
            vm.pies[1].types = charts.getPieCount(vm.measure, 'categories');
            vm.piedata = charts.getPieData(vm.measure, 'breeds');
            vm.types = charts.getPieCount(vm.measure, 'breeds');
            vm.weightGainAverageData = charts.getBarsData(vm.measures, vm.measure, 'averageWeightGain', 'averageWeightGainExpected');
            vm.weightAverageData = charts.getBarsData(vm.measures, vm.measure, 'averageWeight', 'averageWeightExpected');
            vm.breedWeightGainData = charts.getLinesData(vm.measures, vm.measure, 'breeds', 'weightGain', 'averageWeightGain');
            vm.breedWeightData = charts.getLinesData(vm.measures, vm.measure, 'breeds', 'weight', 'averageWeight');
            vm.categoryWeightGainData = charts.getLinesData(vm.measures, vm.measure, 'categories', 'weightGain', 'averageWeightGain');
            vm.categoryWeightData = charts.getLinesData(vm.measures, vm.measure, 'categories', 'weight', 'averageWeight');
            vm.percentageExpectedWeightGain = percentageExpected(vm.measure.averageWeightGain, vm.measure.averageWeightGainExpected);
            vm.percentageExpectedWeight = percentageExpected(vm.measure.averageWeight, vm.measure.averageWeightExpected);
            vm.treatment = vm.measure.treatments[0];
        }

        function percentageExpected(actual, expected) {
            var percent = actual > 0 ? ((actual - expected) / actual) * 100 : 0;
            return Math.round(percent);
        }
    }



})();