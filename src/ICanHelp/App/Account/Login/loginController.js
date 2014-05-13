/// <reference path="../../references.ts" />
var Account;
(function (Account) {
    var LoginRouteParams = (function () {
        function LoginRouteParams() {
        }
        return LoginRouteParams;
    })();
    Account.LoginRouteParams = LoginRouteParams;

    var LoginController = (function () {
        function LoginController($location, $routeParams, $cookieStore, service) {
            var _this = this;
            this.$location = $location;
            this.$routeParams = $routeParams;
            this.$cookieStore = $cookieStore;
            this.service = service;
            this.email = "";
            this.password = "";
            this.error = "";
            this.submit = function () {
                _this.service.login(_this.email, _this.password).then(_this.loginSuccess, _this.loginError);
            };
            this.loginSuccess = function (reponse) {
                var authCookie = "_ncfa=" + reponse.authToken + ";";
                document.cookie = authCookie;

                _this.$location.path("/");
            };
            this.loginError = function (error) {
                _this.error = error.message;
            };
            this.email = $routeParams.email;
        }
        return LoginController;
    })();
    Account.LoginController = LoginController;
})(Account || (Account = {}));
//# sourceMappingURL=loginController.js.map
