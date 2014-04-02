using System;
using ICanHelp.Dto.Account;
using Nancy;
using Nancy.Authentication.Forms;
using Nancy.ModelBinding;
using Nancy.Responses.Negotiation;

namespace ICanHelp.Modules
{
    public class AccountModule : NancyModule
    {
        public AccountModule()
            : base("account")
        {
            Post["/login"] = Login;
        }

        public Response Login(dynamic data)
        {
            var login = this.Bind<LoginDto>();
            Guid? guid = null;

            if (login.Password == "123" && login.Email == "maziarka.radoslaw@outlook.com")
            {
                guid = new Guid("5D58C9C4-A92A-4223-9CDF-951A2B463A62");
            }

            if (guid == null)
                throw new ArgumentException("Podano z³y email lub has³o. Spróbuj ponownie.");


            var authResponse = this.LoginWithoutRedirect(guid.Value);
            var result = new LoginResponseDto();

            var response = Response.AsJson(result);

            result.AuthToken = authResponse.Cookies[0].Value;

            return response;
        }
    }
}