/// <reference path="../../references.ts" />
module Account {

    export class RegisterController {

        constructor(private $location: ng.ILocationService, private service: Account.AccountService) {
        }


        email: string = "";
        password: string = "";
        error:string = "";

        submit = () => {
            this
                .service
                .register(this.email, this.password)
                .then(this.registerSuccess, this.registerError);
        };

        registerSuccess = ()=> {
            this.error = "";
            this.$location.path("/account/login/"+this.email);
        }

        registerError = (error:string) => {
            this.error = error;
        }

    }

}