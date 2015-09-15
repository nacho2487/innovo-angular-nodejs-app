(function () {
angular
    .module('app.batch')
    .controller('BatchDetail', ['$routeParams', 'spinner', 'batchcontext', BatchDetail]);

function BatchDetail($routeParams, spinner, batchcontext) {
    var vm = this;
    vm.measures = [];
    vm.measure = {};
    vm.categoriesPieData = [];
    vm.breedsPieData = [];

    activate();

    function activate() {
        getBatchMeasures($routeParams.batchId).then(function () {
            vm.categoriesPieData = PieChartData(vm.measure, 'categories');
            vm.breedsPieData = PieChartData(vm.measure, 'breeds');
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