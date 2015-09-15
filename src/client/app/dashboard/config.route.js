(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .run(routeConfig);

    routeConfig.$inject = ['routehelper'];
    /* @ngInject */
    function routeConfig(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/historial',
                config: {
                    templateUrl: 'app/dashboard/dashboard.html',
                    controller: 'Dashboard',
                    controllerAs: 'vm',
                    title: 'Historial',
                    settings: {
                        nav: 4,
                        content: '<i class="fa fa-history"></i><span class="menu-text"> Historial</span>'
                    }
                }
            }
        ];
    }
})();