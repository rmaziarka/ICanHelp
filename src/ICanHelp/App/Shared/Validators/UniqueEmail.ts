/// <reference path="../../references.ts" />

module Shared.Validators {

    export function UniqueEmail($http:ng.IHttpService): ng.IDirective {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: (scope: ng.IScope, element: JQuery, attr: any, ctrl: ng.INgModelController) => {
                ctrl.$parsers.push(viewValue=> {
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
                            $http.get('/api/user/email/' + viewValue + '/available')
                                .success(()=> {
                                    ctrl.$setValidity('uniqueEmail', true);
                                    ctrl.$setValidity('checkingEmail', true);
                                })
                                .error(()=> {
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
 }