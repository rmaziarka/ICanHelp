
angular
    .module("iCanHelp", ["ui.bootstrap", 'ngRoute'])
    .config(['$routeProvider',function ($routeProvider) {
    return [
        $routeProvider.when('/', {
            templateUrl: 'app/home/index/index.html',
            controller: 'home.indexController',
            controllerAs: 'contr'
        }),
        $routeProvider.when('/account/login/:email?', {
            templateUrl: 'app/account/login/login.html',
            controller: "account.loginController"
        }),
        $routeProvider.when('/account/register', {
            templateUrl: 'app/account/register/register.html',
            controller: "account.registerController",
            controllerAs: 'contr'
        })
    ];
}]);

'use strict';

angular.module('iCanHelp')
// Declare an http interceptor that will signal the start and end of each request
.config(['$httpProvider', function ($httpProvider) {
    var $http,
        interceptor = ['$q', '$injector', function ($q, $injector) {
            var notificationChannel;

            var response = function(resp) {
                // get $http via $injector because of circular dependency problem
                $http = $http || $injector.get('$http');
                // don't send notification until all requests are complete
                if ($http.pendingRequests.length < 1) {
                    // get requestNotificationChannel via $injector because of circular dependency problem
                    notificationChannel = notificationChannel || $injector.get('requestNotificationChannel');
                    // send a notification requests are complete
                    notificationChannel.requestEnded();
                }
                return resp;
            };

            var responseError = function(resp) {
                // get $http via $injector because of circular dependency problem
                $http = $http || $injector.get('$http');
                // don't send notification until all requests are complete
                if ($http.pendingRequests.length < 1) {
                    // get requestNotificationChannel via $injector because of circular dependency problem
                    notificationChannel = notificationChannel || $injector.get('requestNotificationChannel');
                    // send a notification requests are complete
                    notificationChannel.requestEnded();
                }
                return $q.reject(resp);
            };

            var request = function (resp) {
                // get requestNotificationChannel via $injector because of circular dependency problem
                notificationChannel = notificationChannel || $injector.get('requestNotificationChannel');
                // send a notification requests are complete
                notificationChannel.requestStarted();
                return resp;
            };

            return {
                response: response,
                responseError: responseError,
                request: request
            };
        }];

    $httpProvider.interceptors.push(interceptor);
}])
// declare the notification pub/sub channel
.factory('requestNotificationChannel', ['$rootScope', function ($rootScope) {
    // private notification messages
    var _START_REQUEST_ = '_START_REQUEST_';
    var _END_REQUEST_ = '_END_REQUEST_';

    // publish start request notification
    var requestStarted = function () {
        $rootScope.$broadcast(_START_REQUEST_);
    };
    // publish end request notification
    var requestEnded = function () {
        $rootScope.$broadcast(_END_REQUEST_);
    };
    // subscribe to start request notification
    var onRequestStarted = function ($scope, handler) {
        $scope.$on(_START_REQUEST_, function (event) {
            handler();
        });
    };
    // subscribe to end request notification
    var onRequestEnded = function ($scope, handler) {
        $scope.$on(_END_REQUEST_, function (event) {
            handler();
        });
    };

    return {
        requestStarted: requestStarted,
        requestEnded: requestEnded,
        onRequestStarted: onRequestStarted,
        onRequestEnded: onRequestEnded
    };
}])
// declare the directive that will show and hide the loading widget
.directive('loadingWidget', ['requestNotificationChannel', function (requestNotificationChannel) {
    return {
        restrict: "A",
        link: function (scope, element) {
            // hide the element initially
            element.addClass('ng-hide');

            var startRequestHandler = function () {
                // got the request start notification, show the element
                element.removeClass('ng-hide');
            };

            var endRequestHandler = function () {
                // got the request start notification, show the element
                element.addClass('ng-hide');
            };
            // register for the request start notification
            requestNotificationChannel.onRequestStarted(scope, startRequestHandler);
            // register for the request end notification
            requestNotificationChannel.onRequestEnded(scope, endRequestHandler);
        }
    };
}]);
angular.module('iCanHelp')
    .directive('emailUnique', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ctrl) {
                ctrl.$parsers.push(function (viewValue) {
                    // set it to true here, otherwise it will not
                    // clear out when previous validators fail.
                    ctrl.$setValidity('uniqueEmail', true);
                    if (ctrl.$valid) {
                        // set it to false here, because if we need to check
                        // the validity of the email, it's invalid until the
                        // AJAX responds.
                        ctrl.$setValidity('checkingEmail', false);

                        // now do your thing, chicken wing.
                        if (viewValue !== "" && typeof viewValue !== "undefined") {
                            $http.get('/api/account/emailUnique/' + viewValue).success(function () {
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
        }
    });


angular.module("iCanHelp")
    .service('initDataProvider', ['$window', function ($window) {

        function getDataScopeFromWindow(name) {
            var data = $window[name];
            return data;
        }

        function copyDataPropertyToObject(sourceName, targetObject, property) {

            var data = getDataScopeFromWindow(sourceName);

            for (var prop in data) {
                if (data.hasOwnProperty(prop) && prop === property) {
                    targetObject[prop] = data[prop];
                }
            }
        }

        function copyDataToObject(sourceName, targetObject) {

            var data = getDataScopeFromWindow(sourceName);
            for (var prop in data) {
                if (data.hasOwnProperty(prop)) {
                    targetObject[prop] = data[prop];
                }
            }

        }

        return {
            copyDataToObject: copyDataToObject,
            getDataScopeFromWindow: getDataScopeFromWindow,
            copyDataPropertyToObject: copyDataPropertyToObject
        };


    }])
angular.module('iCanHelp')
    .factory('messageBus', ['$rootScope', function ($rootScope) {
    var msgBus = {};
    msgBus.emitMsg = function (msg, data) {
        data = data || {};
        $rootScope.$emit(msg, data);
    };
    msgBus.onMsg = function (msg, func, scope) {
        var unbind = $rootScope.$on(msg, func);
        if (scope) {
            scope.$on('$destroy', unbind);
        }
    };
    return msgBus;
}]);
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
angular.module("iCanHelp")
    .controller("home.indexController", function() {
        this.heading = "Fajny nagłówek";
    });