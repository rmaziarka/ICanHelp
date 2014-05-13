var Shared;
(function (Shared) {
    (function (Validators) {
        function UniqueEmail($http) {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, element, attr, ctrl) {
                    ctrl.$parsers.push(function (viewValue) {
                        ctrl.$setValidity('uniqueEmail', true);
                        if (ctrl.$valid) {
                            ctrl.$setValidity('checkingEmail', false);

                            if (viewValue !== "" && typeof viewValue !== "undefined") {
                                $http.get('/api/account/emailUnique/' + viewValue).success(function () {
                                    ctrl.$setValidity('uniqueEmail', true);
                                    ctrl.$setValidity('checkingEmail', true);
                                }).error(function () {
                                    ctrl.$setValidity('uniqueEmail', false);
                                    ctrl.$setValidity('checkingEmail', true);
                                });
                            } else {
                                ctrl.$setValidity('uniqueEmail', false);
                                ctrl.$setValidity('checkingEmail', true);
                            }
                        }
                        return viewValue;
                    });
                }
            };
        }
        Validators.UniqueEmail = UniqueEmail;
    })(Shared.Validators || (Shared.Validators = {}));
    var Validators = Shared.Validators;
})(Shared || (Shared = {}));
var Shared;
(function (Shared) {
    (function (Models) {
        var ErrorModel = (function () {
            function ErrorModel() {
                this.message = "";
            }
            return ErrorModel;
        })();
        Models.ErrorModel = ErrorModel;
    })(Shared.Models || (Shared.Models = {}));
    var Models = Shared.Models;
})(Shared || (Shared = {}));
var IndexController = (function () {
    function IndexController() {
        this.heading = "Fajny nagłówek";
    }
    return IndexController;
})();
var Account;
(function (Account) {
    var LoginRouteParams = (function () {
        function LoginRouteParams() {
        }
        return LoginRouteParams;
    })();
    Account.LoginRouteParams = LoginRouteParams;

    var LoginController = (function () {
        function LoginController($location, $routeParams, $cookieStore, service) {
            var _this = this;
            this.$location = $location;
            this.$routeParams = $routeParams;
            this.$cookieStore = $cookieStore;
            this.service = service;
            this.email = "";
            this.password = "";
            this.error = "";
            this.submit = function () {
                _this.service.login(_this.email, _this.password).then(_this.loginSuccess, _this.loginError);
            };
            this.loginSuccess = function (reponse) {
                var authCookie = "_ncfa=" + reponse.authToken + ";";
                document.cookie = authCookie;

                _this.$location.path("/");
            };
            this.loginError = function (error) {
                _this.error = error.message;
            };
            this.email = $routeParams.email;
        }
        return LoginController;
    })();
    Account.LoginController = LoginController;
})(Account || (Account = {}));
var Account;
(function (Account) {
    var RegisterController = (function () {
        function RegisterController($location, service) {
            var _this = this;
            this.$location = $location;
            this.service = service;
            this.email = "";
            this.password = "";
            this.error = "";
            this.submit = function () {
                _this.service.register(_this.email, _this.password).then(_this.registerSuccess, _this.registerError);
            };
            this.registerSuccess = function () {
                _this.error = "";
                _this.$location.path("/account/login/" + _this.email);
            };
            this.registerError = function (error) {
                _this.error = error;
            };
        }
        return RegisterController;
    })();
    Account.RegisterController = RegisterController;
})(Account || (Account = {}));
var Account;
(function (Account) {
    var LoginResponse = (function () {
        function LoginResponse() {
        }
        return LoginResponse;
    })();
    Account.LoginResponse = LoginResponse;

    var AccountService = (function () {
        function AccountService($http, $q) {
            var _this = this;
            this.$http = $http;
            this.$q = $q;
            this.register = function (email, password) {
                var defer = _this.$q.defer();

                var model = {
                    email: email,
                    password: password
                };

                _this.$http.post('/api/account/register/', model).success(function () {
                    defer.resolve();
                }).error(function (data) {
                    defer.reject(data);
                });

                return defer.promise;
            };
            this.login = function (email, password) {
                var defer = _this.$q.defer();

                var model = {
                    email: email,
                    password: password
                };

                _this.$http.post('/api/account/login/', model).success(function (authToken) {
                    defer.resolve(authToken);
                }).error(function (error) {
                    defer.reject(error);
                });

                return defer.promise;
            };
        }
        return AccountService;
    })();
    Account.AccountService = AccountService;
})(Account || (Account = {}));
angular.module("icanhelp", ["ui.bootstrap", 'ngRoute', 'ngCookies']).config(function ($routeProvider) {
    return [
        $routeProvider.when('/', {
            templateUrl: 'app/home/index/index.html',
            controller: IndexController,
            controllerAs: 'contr'
        }),
        $routeProvider.when('/account/login/:email?', {
            templateUrl: 'app/account/login/login.html',
            controller: "loginController",
            controllerAs: 'contr'
        }),
        $routeProvider.when('/account/register', {
            templateUrl: 'app/account/register/register.html',
            controller: "registerController",
            controllerAs: 'contr'
        })
    ];
}).service("accountService", ["$http", "$q", Account.AccountService]).controller("registerController", ["$location", "accountService", Account.RegisterController]).controller("loginController", ["$location", "$routeParams", "$cookieStore", "accountService", Account.LoginController]).directive("uniqueEmail", ["$http", Shared.Validators.UniqueEmail]);
