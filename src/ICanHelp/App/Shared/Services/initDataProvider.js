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