var HomeController = (function () {
    function HomeController($scope) {
        $scope.heading = "Fajny nagłówek";
    }
    return HomeController;
})();
angular.module("icanhelp", ["ui.bootstrap", 'ngRoute']).config(function ($routeProvider) {
    return [
        $routeProvider.when('/', {
            templateUrl: 'html/home.html',
            controller: HomeController
        })
    ];
});
