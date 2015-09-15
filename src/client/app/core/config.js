(function() {
    'use strict';

    var core = angular.module('app.core');

    

    var config = {
        appErrorPrefix: '[CC Error] ', //Configure the exceptionHandler decorator
        version: '1.1.0'
    };

    core.constant('config', config);

    core.config(configure);

    configure.$inject = [
        '$routeProvider', 'routehelperConfigProvider'
    ];

    /* @ngInject */
    function configure(
         $routeProvider
        , routehelperConfigProvider) {

        configureRouting();

        function configureRouting() {
            var routeCfg = routehelperConfigProvider;
            routeCfg.config.$routeProvider = $routeProvider;
            routeCfg.config.docTitle = 'CC: ';
            routeCfg.config.resolveAlways = { /* @ngInject */
                ready: function(datacontext) {
                    return datacontext.ready();
                }
//                ready: ['datacontext', function (datacontext) {
//                    return datacontext.ready();
//                }]
            };
        }
    }
})();