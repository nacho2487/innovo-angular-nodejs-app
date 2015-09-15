angular
    .module('app.batch')
.controller(Batch);

function Batch($routeParams, spinner) {
    var vm = this;
    vm.batchType = $routeParams.batchType;
    vm.batchId = $routeParams.batchId;

}