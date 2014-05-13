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
declare module Account {
    class LoginRouteParams implements ng.route.IRouteParamsService {
        public email: string;
    }
    class LoginController {
        private $location;
        private $routeParams;
        private service;
        constructor($location: ng.ILocationService, $routeParams: LoginRouteParams, service: AccountService);
        public email: string;
        public password: string;
        public submit: () => void;
    }
}
declare module Account {
    class RegisterController {
        private $location;
        private service;
        constructor($location: ng.ILocationService, service: AccountService);
        public email: string;
        public password: string;
        public error: string;
        public submit: () => void;
        public registerSuccess: () => void;
        public registerError: (error: string) => void;
    }
}
declare module Account {
    class AccountService {
        private $http;
        private $q;
        constructor($http: ng.IHttpService, $q: ng.IQService);
        public register: (email: string, password: string) => ng.IPromise<{}>;
    }
}
