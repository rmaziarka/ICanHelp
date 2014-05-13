/// <reference path="references.ts" />

angular.module("icanhelp", ["ui.bootstrap", 'ngRoute', 'ngCookies'])
    .config(($routeProvider: ng.route.IRouteProvider) => [
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
    ])
    .service("accountService", ["$http", "$q", Account.AccountService])
    .controller("registerController", ["$location", "accountService", Account.RegisterController])
    .controller("loginController", ["$location", "$routeParams","$cookieStore", "accountService", Account.LoginController])
    .directive("uniqueEmail",["$http",Shared.Validators.UniqueEmail])
;