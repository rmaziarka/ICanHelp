
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