
angular.module('iCanHelp')
.service('account.service', ['$http', '$q', '$timeout'
    , function ($http, $q, $timeout) {
        this.$http = $http;
        this.$q = $q;
        this.register = function (email, password) {
            var defer = $q.defer();

            var model = {
                email: email,
                password: password
            };

            $http.post('/api/account/register/', model).success(function () {
                defer.resolve();
            }).error(function (data) {
                defer.reject(data);
            });

            return defer.promise;
        };
        this.login = function (email, password) {
            var defer = $q.defer();
            $timeout(function() {
                var model = {
                    email: email,
                    password: password
                };


                $http.post('/api/account/login/', model).success(function(authToken) {
                    defer.resolve(authToken);
                }).error(function(error) {
                    defer.reject(error);
                });
            });
            return defer.promise;
        };
    }
])
