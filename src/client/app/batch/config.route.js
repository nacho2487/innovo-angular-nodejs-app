(function () {
    'use strict';

    angular
        .module('app.batch')
        .run(routeConfig);

    routeConfig.$inject = ['routehelper'];
    
    function routeConfig(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

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
                url: '/lotes/:batchId/:batchType',
                config: {
                    templateUrl: 'app/batch/batch.html',
                    controller: 'Batch',
                    controllerAs: 'vm',
                    title: 'Lotes',
                    settings: {

                    }
                }
            }
        ];
    }
})();