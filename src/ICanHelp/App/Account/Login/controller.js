
angular.module('iCanHelp')
    .controller('account.loginController', [
        '$scope', '$location', '$routeParams', 'messageBus', 'account.service', function ($scope, $location, $routeParams,messageBus, service) {
            $scope.password = "";
            $scope.error = "";
            $scope.email = $routeParams.email;
            $scope.submit = function () {
                service.login($scope.email, $scope.password)
                    .then($scope.loginSuccess, $scope.loginError);
            };

            $scope.loginSuccess = function (reponse) {
                var authCookie = "_ncfa=" + reponse.authToken + ";";
                document.cookie = authCookie;

                messageBus.emitMsg("user.login", $scope.email);

                $location.path("/");
            };
            $scope.loginError = function (error) {
                $scope.error = error.message;
            };

        }
    ]);