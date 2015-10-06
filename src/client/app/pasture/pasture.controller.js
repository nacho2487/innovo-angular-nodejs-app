(function () {
    'use strict';
    angular
        .module('app.pasture')
        .controller('Pasture', Pasture);

    Pasture.$inject = ['$routeParams', '$location'];

    function Pasture($routeParams, $location) {
        var vm = this;
        vm.pastureType = $routeParams.pastureType;
        vm.pastureId = $routeParams.pastureId;
        vm.isActive = function (path) {
            return $location.path().substr(0, path.length) == path;
        };

    }

})();