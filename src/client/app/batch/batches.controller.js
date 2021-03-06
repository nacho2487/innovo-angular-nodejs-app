﻿(function () {
    'use strict';
    angular
        .module('app.batch')
    .controller('Batches', ['batchcontext', 'charts', Batches]);

    function Batches(batchcontext, charts) {
        var vm = this;
        vm.isCurrent = isCurrent;
        activate();

        function activate() {
             getBatches().then(getBatchMeasures).then(function () {
                vm.piedata = charts.getPieData(vm.measure, 'categories');               
            });
        }

        function getBatches() {
            return batchcontext.getBatches().then(function (data) {
                vm.batches = data.data;
                vm.batch = data.data[0];
                return data.data[0].id;
            });
        }

        function getBatchMeasures(batchId) {
            return batchcontext.getBatchMeasures(batchId).then(function (data) {
                vm.measures = data.data;
                vm.measure = data.data[0];
                return data.data;
            });
        }

        function isCurrent(route) {
            if (!route.config.title || !$route.current || !$route.current.title) {
                return '';
            }
            var menuName = route.config.title;
            return $route.current.title.substr(0, menuName.length) === menuName ? 'active' : '';
        }

    };
})();