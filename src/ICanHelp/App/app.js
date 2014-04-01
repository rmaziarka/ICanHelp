/// <reference path="references.ts" />
angular.module("icanhelp", ["ui.bootstrap", 'ngRoute']).config(function ($routeProvider) {
    return [
        $routeProvider.when('/', {
            templateUrl: 'app/home/index/index.html',
            controller: IndexController,
            controllerAs: 'cont'
        }),
        $routeProvider.when('/account/login', {
            templateUrl: 'app/account/login/login.html',
            controller: "loginController",
            controllerAs: 'cont'
        })
    ];
}).controller("loginController", Account.Login.LoginController).directive("uniqueEmail", ["$http", Shared.Validators.UniqueEmail]);
//# sourceMappingURL=app.js.map
