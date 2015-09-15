(function () {
    'use strict';

    var app = angular.module('app');

    // Collect the routes

    app.constant('routes', getRoutes());


    // Configure the routes and route resolvers
    app.config(['$locationProvider', '$routeProvider', 'routes', routeConfigurator]);
    function routeConfigurator($locationProvider, $routeProvider, routes) {
        //$locationProvider.html5Mode(true).hashPrefix('!');
        routes.forEach(function (r) {
            $routeProvider.when(r.url, r.config);
        });

        $routeProvider.otherwise({ redirectTo: '/' });
        //$locationProvider.html5Mode(true);
    }

    // Define the routes 
    function getRoutes() {
        return [
            {
                url: '/',
                config: {
                    templateUrl: 'app/batch/batches.html',
                    controller: 'Batches',
                    controllerAs: 'vm',
                    title: 'Lotes',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i><span class="menu-text"> Lotes</span>'
                    }
                }
            },
            {
                templateUrl: 'app/authentication/login.html',
                controller: 'Login',
                config: {
                    settings: {

                    }
                }
            },
            {
                url: '/lotes/:batchId/:batchType',
                config: {
                    templateUrl: 'app/batch/batch.html',
                    controller: 'Batch',
                    controllerAs: 'vm',
                    title: 'Lotes',
                    settings: {

                    }
                }
            },
            {
                url: '/potreros',
                config: {
                    templateUrl: 'app/pasture/pastures.html',
                    controller: 'Pastures',
                    controllerAs: 'vm',
                    title: 'Potreros',
                    settings: {
                        nav: 2,
                        content: '<span class="icon-pasture"></span><span class="menu-text"> Potreros</span>'
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
            {
                url: '/animales',
                config: {
                    templateUrl: 'app/animal/animals.html',
                    controller: 'Animals',
                    controllerAs: 'vm',
                    title: 'Animales',
                    settings: {
                        nav: 3,
                        content: '<span class="icon-Cow"></span><span class="menu-text"> Animales</span>'
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
            },
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
            },
            {
                url: '/comparaciones',
                config: {
                    templateUrl: 'app/compare/compare.html',
                    controller: 'Dashboard',
                    controllerAs: 'vm',
                    title: 'Comparaciones',
                    settings: {
                        nav: 5,
                        content: '<i class="fa fa-exchange"></i><span class="menu-text"> Comparaciones</span>'
                    }
                }
            },
            {
                url: '/cerrar-sesion',
                config: {
                    templateUrl: 'Account/LogOff',
                    resolve: {
                        spinner: function (spinner) {
                            spinner.spinnerHide();
                        }
                    },
                    settings: {

                    }
                }
            }


        ];
    }
})();