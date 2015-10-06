(function() {
    'use strict';

    var core = angular.module('app.core');

    var events = {
        controllerActivateSuccess: 'controller.activateSuccess',
        spinnerToggle: 'spinner.toggle'
    };

    var config = {        
        appErrorPrefix: '[HT Error] ', //Configure the exceptionHandler decorator
        docTitle: 'Innovo - ',
        events: events,
        version: '1.0.0'
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
            routeCfg.config.docTitle = config.docTitle;
        }
    }
})();