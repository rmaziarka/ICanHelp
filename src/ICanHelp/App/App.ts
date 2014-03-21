/// <reference path="references.ts" />

angular.module("icanhelp", ["ui.bootstrap", 'ngRoute'])
    .config(($routeProvider: ng.route.IRouteProvider) => [
        $routeProvider.when('/', {
            templateUrl: 'html/home.html',
            controller: HomeController
        })
    ]);