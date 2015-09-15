(function () {
    'use strict';
    angular
        .module('app.layout')
        .controller('shell', shell);
    shell.$inject = ['$rootScope', '$location', 'config'];
    function shell($rootScope, $location, config) {
        var vm = this;
        var events = config.events;

        vm.spinnerOptions = {
            radius: 40,
            lines: 7,
            length: 0,
            width: 30,
            speed: 1.7,
            corners: 1.0,
            trail: 100,
            color: '#F58A00'
        };
        vm.busyMessage = 'Cargando ...';
        vm.isBusy = true;

        function toggleSpinner(on) { vm.isBusy = on; }

        $rootScope.$on('$routeChangeStart',
            function (event, next, current) {
                toggleSpinner(true);
            }
            );

        $rootScope.$on(events.controllerActivateSuccess,
            function (data) { toggleSpinner(false); }
            );

        $rootScope.$on(events.spinnerToggle,
            function (data) { toggleSpinner(data.show); }
            );

    }
})();