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