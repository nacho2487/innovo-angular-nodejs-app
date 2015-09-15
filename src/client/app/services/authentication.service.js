
var serviceId = 'authenticationservice';
angular.module('app').factory(serviceId, ['$http', 'session', AuthService]);

function AuthService($http, session) {
    var authService = {};

    authService.login = function (credentials) {
        return $http
            .post('login', credentials)
            .then(function (res) {
                session.create(res.data.id, res.data.user.id,
                    res.data.user.role);
                return res.data.user;
            });
    };

    authService.isAuthenticated = function () {
        return !!session.userId;
    };

    authService.isAuthorized = function (authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }
        return (authService.isAuthenticated() &&
            authorizedRoles.indexOf(session.userRole) !== -1);
    };

    return authService;
}
