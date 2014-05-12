/// <reference path="../../references.ts" />
module Account {

    export  class LoginRouteParams implements ng.route.IRouteParamsService {
        email:string
    }

    export class LoginController {

        constructor(
            private $location: ng.ILocationService,
            private $routeParams: LoginRouteParams,
            private $cookieStore: ng.cookies.ICookieStoreService,
            private service: Account.AccountService)
        {
            this.email = $routeParams.email;
        }

        email: string = "";
        password: string = "";
        error: string = "";

        submit = () => {
            this
                .service
                .login(this.email, this.password)
                .then(this.loginSuccess, this.loginError);

        };

        loginSuccess = (reponse: LoginResponse) => {
            var authCookie = "_ncfa=" + reponse.authToken + ";";
            document.cookie = authCookie;

            this.$location.path("/");
        }

        loginError = (error: Shared.Models.ErrorModel) => {
            this.error = error.message;
        }
    }

}