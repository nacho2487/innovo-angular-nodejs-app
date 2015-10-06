(function () {
    'use strict';

    angular
        .module('app.animal')
        .run(routeConfig);

    routeConfig.$inject = ['routehelper'];
    
    function routeConfig(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {

                url: '/animales',
                config: {
                    templateUrl: 'app/animal/animals.html',
                    controller: 'Animals',
                    controllerAs: 'vm',
                    title: 'Animales',
                    settings: {
                        nav: 3,
                        content: '<span class="menu-text"> Animales</span>'
                    }
                }
            },
            {
                url: '/animales/:animalId',
                config: {
                    templateUrl: 'app/animal/animal.html',
                    controller: 'Animal',
                    controllerAs: 'vm',
                    title: 'Animales',
                    settings: {

                    }
                }
            }
        ];
    }
})();