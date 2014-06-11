angular.module('iCanHelp')
    .controller('userPanelController', [
        'initDataProvider', 'messageBus', '$scope', '$timeout', function (provider, messageBus, $scope, $timeout) {

            provider.copyDataToObject("userPanelData", $scope);

            messageBus.onMsg("user.login", function (event, email) {
                $scope.email = email;
                $scope.isAuthenticated = true;
            });

        }
    ]);