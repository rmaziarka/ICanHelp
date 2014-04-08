var Shared;
(function (Shared) {
    (function (Validators) {
        function UniqueEmail($http) {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, element, attr, ctrl) {
                    ctrl.$parsers.push(function (viewValue) {
                        ctrl.$setValidity('uniqueEmail', true);
                        if (ctrl.$valid) {
                            ctrl.$setValidity('checkingEmail', false);

                            if (viewValue !== "" && typeof viewValue !== "undefined") {
                                $http.get('/ICanHelp/api/account/emailUnique/' + viewValue).success(function () {
                                    ctrl.$setValidity('uniqueEmail', true);
                                    ctrl.$setValidity('checkingEmail', true);
                                }).error(function () {
                                    ctrl.$setValidity('uniqueEmail', false);
                                    ctrl.$setValidity('checkingEmail', true);
                                });
                            } else {
                                ctrl.$setValidity('uniqueEmail', false);
                                ctrl.$setValidity('checkingEmail', true);
                            }
                        }
                        return viewValue;
                    });
                }
            };
        }
        Validators.UniqueEmail = UniqueEmail;
    })(Shared.Validators || (Shared.Validators = {}));
    var Validators = Shared.Validators;
})(Shared || (Shared = {}));
var IndexController = (function () {
    function IndexController() {
        this.heading = "Fajny nagłówek";
    }
    return IndexController;
})();
var Account;
(function (Account) {
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
angular.module("icanhelp", ["ui.bootstrap", 'ngRoute']).config(function ($routeProvider) {
    return [
        $routeProvider.when('/', {
            templateUrl: 'app/home/index/index.html',
            controller: IndexController,
            controllerAs: 'cont'
        }),
        $routeProvider.when('/account/login', {
            templateUrl: 'app/account/login/login.html',
            controller: "loginController",
            controllerAs: 'cont'
        })
    ];
}).controller("loginController", Account.Login.LoginController).directive("uniqueEmail", ["$http", Shared.Validators.UniqueEmail]);
