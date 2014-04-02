/// <reference path="../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../scripts/typings/sugar/sugar.d.ts" />
/// <reference path="../scripts/typings/angularjs/angular-route.d.ts" />
declare module Shared.Validators {
    function UniqueEmail($http: ng.IHttpService): ng.IDirective;
}
declare class IndexController {
    public heading: string;
    constructor();
}
declare module Account.Login {
    class LoginController {
        public email: string;
        public password: string;
        public submit: () => void;
    }
}
