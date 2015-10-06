(function () {
    'use strict';
    angular
        .module('app.batch')
        .controller('Batch', Batch);
    Batch.$inject = ['$routeParams'];
    function Batch($routeParams) {
        var vm = this;
        vm.batchType = $routeParams.batchType;
        vm.batchId = $routeParams.batchId;

    }
})();