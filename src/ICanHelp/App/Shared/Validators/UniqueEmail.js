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

