
angular
    .module("iCanHelp", ["ui.bootstrap", 'ngRoute'])
    .config(['$routeProvider',function ($routeProvider) {
    return [
        $routeProvider.when('/', {
            templateUrl: 'app/home/index/index.html',
            controller: 'home.indexController',
            controllerAs: 'contr'
        }),
        $routeProvider.when('/account/login/:email?', {
            templateUrl: 'app/account/login/login.html',
            controller: "account.loginController",
            controllerAs: 'contr'
        }),
        $routeProvider.when('/account/register', {
            templateUrl: 'app/account/register/register.html',
            controller: "account.registerController",
            controllerAs: 'contr'
        })
    ];
}]);


angular.module('iCanHelp')
.service('account.service', ['$http', '$q'
    , function ($http, $q) {
        this.$http = $http;
        this.$q = $q;
        this.register = function (email, password) {
            var defer = $q.defer();

            var model = {
                email: email,
                password: password
            };

            $http.post('/api/account/register/', model).success(function () {
                defer.resolve();
            }).error(function (data) {
                defer.reject(data);
            });

            return defer.promise;
        };
        this.login = function (email, password) {
            var defer = $q.defer();

            var model = {
                email: email,
                password: password
            };

            $http.post('/api/account/login/', model).success(function (authToken) {
                defer.resolve(authToken);
            }).error(function (error) {
                defer.reject(error);
            });

            return defer.promise;
        };
    }
])


angular.module('iCanHelp')
    .controller('account.loginController', [
        '$location', '$routeParams', 'account.service', function($location, $routeParams, service) {
            this.password = "";
            this.error = "";
            this.email = $routeParams.email;
            this.submit = function () {
                service.login(this.email, this.password).then(this.loginSuccess, this.loginError);
            };

            this.loginSuccess = function (reponse) {
                var authCookie = "_ncfa=" + reponse.authToken + ";";
                document.cookie = authCookie;

                this.$location.path("/");
            };
            this.loginError = function (error) {
                this.error = error.message;
            };

        }
    ]);
angular.module('iCanHelp')
    .controller('account.registerController', [
        '$location', '$routeParams', 'account.service', function ($location, $routeParams, service) {
            this.service = service;
            this.email = "";
            this.password = "";
            this.error = "";
            this.submit = function () {
                service.register(email, password).then(registerSuccess, registerError);
            };
            this.registerSuccess = function () {
                this.error = "";
                $location.path("/account/login/" + email);
            };
            this.registerError = function (error) {
                this.error = error;
            };
        }]);
angular.module("iCanHelp")
    .controller("home.indexController", function() {
        this.heading = "Fajny nagłówek";
    });