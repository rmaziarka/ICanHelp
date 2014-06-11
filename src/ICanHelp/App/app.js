
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
            controller: "account.loginController"
        }),
        $routeProvider.when('/account/register', {
            templateUrl: 'app/account/register/register.html',
            controller: "account.registerController",
            controllerAs: 'contr'
        })
    ];
}]);
