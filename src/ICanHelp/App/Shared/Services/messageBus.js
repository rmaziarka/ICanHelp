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