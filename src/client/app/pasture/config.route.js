(function () {
    'use strict';

    angular
        .module('app.pasture')
        .run(routeConfig);

    routeConfig.$inject = ['routehelper'];
    
    function routeConfig(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/potreros',
                config: {
                    templateUrl: 'app/pasture/pastures.html',
                    controller: 'Pastures',
                    controllerAs: 'vm',
                    title: 'Potreros',
                    settings: {
                        nav: 2,
                        content: '</span><span class="menu-text"> Potreros</span>'
                    }
                }
            },
            {
                url: '/potreros/:pastureId/:pastureType',
                config: {
                    templateUrl: 'app/pasture/pasture.html',
                    controller: 'Pasture',
                    controllerAs: 'vm',
                    title: 'Potreros',
                    settings: {

                    }
                }
            },
        ];
    }
})();