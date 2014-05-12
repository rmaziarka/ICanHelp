/// <reference path="../references.ts" />
module Account {
    export class LoginResponse {
        authToken:string;
    }


    export class AccountService {



        constructor(private $http: ng.IHttpService, private $q: ng.IQService) {
        }

        register = (email: string, password: string) => {
            var defer = this.$q.defer();

            var model = {
                email: email,
                password: password
            };

            this.$http.post('/api/account/register/',model)
                .success(() => { defer.resolve(); })
                .error(data => { defer.reject(data); });

            return defer.promise;
        };

        login = (email: string, password: string)=> {
            var defer = this.$q.defer();

            var model = {
                email: email,
                password: password
            };

            this.$http.post('/api/account/login/', model)
                .success((authToken: LoginResponse) => { defer.resolve(authToken); })
                .error((error:string)  => { defer.reject(error); });

            return defer.promise;
        }
    }

}