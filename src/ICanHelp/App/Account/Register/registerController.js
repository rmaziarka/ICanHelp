/// <reference path="../../references.ts" />
var Account;
(function (Account) {
    var RegisterController = (function () {
        function RegisterController($location, service) {
            var _this = this;
            this.$location = $location;
            this.service = service;
            this.email = "";
            this.password = "";
            this.error = "";
            this.submit = function () {
                _this.service.register(_this.email, _this.password).then(_this.registerSuccess, _this.registerError);
            };
            this.registerSuccess = function () {
                _this.error = "";
                _this.$location.path("/account/login/" + _this.email);
            };
            this.registerError = function (error) {
                _this.error = error;
            };
        }
        return RegisterController;
    })();
    Account.RegisterController = RegisterController;
})(Account || (Account = {}));
//# sourceMappingURL=registerController.js.map
