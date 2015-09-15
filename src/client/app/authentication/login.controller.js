angular
    .module('app')
    .controller('LoginController', ['spinner', '$scope', '$rootScope', 'AUTH_EVENTS', 'authService', Login]);
function Login(spinner, $scope, authService) {
    spinner.spinnerHide();
    $scope.credentials = {
        username: '',
        password: ''
    };
    $scope.login = function (credentials) {
        spinner.spinnerHide();
        $scope.loginData = {
            userName: "",
            password: ""
        };

        $scope.message = "";

        $scope.login = function () {

            authService.login($scope.loginData).then(function (response) {

                $location.path('/orders');

            },
             function (err) {
                 $scope.message = err.error_description;
             });
        };
    };
}