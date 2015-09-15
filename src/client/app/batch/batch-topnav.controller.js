(function () {
    'use strict';

    angular.module('app.batch').controller('batchTopnav',
        ['$location', '$routeParams', 'config', 'routes', batchTopnav]);

    function batchTopnav($location, $routeParams, config, routes) {
        var vm = this;
        vm.batchId = $routeParams.batchId;
        vm.isActive = function (path) {
            return $location.path().substr(0, path.length) == path;
        }
        activate();

        function activate() {  }
    };
})();
