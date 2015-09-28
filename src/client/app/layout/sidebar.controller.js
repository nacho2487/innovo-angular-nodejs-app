(function () { 
    'use strict';
    
    angular.module('app.layout').controller('sidebar',
        ['$route', 'config', 'routehelper', sidebar]);

    function sidebar($route, config, routehelper) {
        var vm = this;

        vm.isCurrent = isCurrent;
        vm.routes = routehelper.getRoutes();
        activate();

        function activate() { getNavRoutes(); }
        
        function getNavRoutes() {
            vm.navRoutes = vm.routes.filter(function(r) {
                return r.settings && r.settings.nav;
            }).sort(function(r1, r2) {
                return r1.settings.nav - r2.settings.nav;
            });
        }
        
    function isCurrent(route) {
            if (!route.title || !$route.current || !$route.current.title) {
                return '';
            }
            var menuName = route.title;
            return $route.current.title.substr(0, menuName.length) === menuName ? 'active' : '';
        }
    };
})();
