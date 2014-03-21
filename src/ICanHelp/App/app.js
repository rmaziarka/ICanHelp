/// <reference path="references.ts" />
angular.module("icanhelp", ["ui.bootstrap", 'ngRoute']).config(function ($routeProvider) {
    return [
        $routeProvider.when('/', {
            templateUrl: 'html/home.html',
            controller: HomeController
        })
    ];
});
//# sourceMappingURL=App.js.map
