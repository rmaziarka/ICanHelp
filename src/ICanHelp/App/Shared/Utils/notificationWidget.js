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