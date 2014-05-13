/// <reference path="../references.ts" />
var Account;
(function (Account) {
    var LoginResponse = (function () {
        function LoginResponse() {
        }
        return LoginResponse;
    })();
    Account.LoginResponse = LoginResponse;

    var AccountService = (function () {
        function AccountService($http, $q) {
            var _this = this;
            this.$http = $http;
            this.$q = $q;
            this.register = function (email, password) {
                var defer = _this.$q.defer();

                var model = {
                    email: email,
                    password: password
                };

                _this.$http.post('/api/account/register/', model).success(function () {
                    defer.resolve();
                }).error(function (data) {
                    defer.reject(data);
                });

                return defer.promise;
            };
            this.login = function (email, password) {
                var defer = _this.$q.defer();

                var model = {
                    email: email,
                    password: password
                };

                _this.$http.post('/api/account/login/', model).success(function (authToken) {
                    defer.resolve(authToken);
                }).error(function (error) {
                    defer.reject(error);
                });

                return defer.promise;
            };
        }
        return AccountService;
    })();
    Account.AccountService = AccountService;
})(Account || (Account = {}));
//# sourceMappingURL=accountService.js.map
