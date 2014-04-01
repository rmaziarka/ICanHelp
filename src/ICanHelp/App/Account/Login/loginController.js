var Account;
(function (Account) {
    /// <reference path="../../references.ts" />
    (function (Login) {
        var LoginController = (function () {
            function LoginController() {
                var _this = this;
                this.email = "a";
                this.password = "b";
                this.submit = function () {
                    var k = _this.email + _this.password;
                };
            }
            return LoginController;
        })();
        Login.LoginController = LoginController;
    })(Account.Login || (Account.Login = {}));
    var Login = Account.Login;
})(Account || (Account = {}));
//# sourceMappingURL=loginController.js.map
