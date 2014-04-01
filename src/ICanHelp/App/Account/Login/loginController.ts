/// <reference path="../../references.ts" />
module Account.Login {

    export class LoginController {
        email: string = "a";
        password: string = "b";
        submit = ()=> {
            var k = this.email + this.password;
        };
    }

}