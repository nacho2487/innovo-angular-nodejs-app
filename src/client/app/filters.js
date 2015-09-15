angular.module('app')
    .filter('dateFormat', dateFormat);
dateFormat.$inject = ['$filter'];
function dateFormat($filter) {
    var angularDateFilter = $filter('date');
    return function(theDate) {
        return angularDateFilter(theDate, 'dd/MM/yyyy');
    }
};