(function () {
    angular
        .module('app.batch')
        .controller('BatchDetail', ['$routeParams', 'spinner', 'batchcontext', 'charts', BatchDetail]);

    function BatchDetail($routeParams, spinner, batchcontext, charts) {
        var vm = this;
        vm.measures = [];
        vm.measure = {};
        vm.categoriesPieData = [];
        vm.breedsPieData = [];

        activate();

        function activate() {
            getBatchMeasures($routeParams.batchId).then(function () {
                vm.categoriesPieData = charts.getPieData(vm.measure, 'categories');
                vm.breedsPieData = charts.getPieData(vm.measure, 'breeds');
                spinner.spinnerHide();
            });
        }

        function getBatchMeasures(batchId) {
            return batchcontext.getBatchMeasures(batchId).then(function (data) {
                vm.measures = data.data;
                vm.measure = data.data[0];
                return data.data;
            });
        }

    }
})();