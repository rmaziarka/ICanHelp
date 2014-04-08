using System;
using System.Data.Entity;
using System.Threading;
using System.Threading.Tasks;
using ICanHelp.Dto.Account;
using ICanHelp.Model;
using Nancy;
using Nancy.Authentication.Forms;
using Nancy.ModelBinding;
using Nancy.Responses.Negotiation;

namespace ICanHelp.Modules
{
    public class AccountModule : NancyModule
    {
        private DatabaseContext _context;

        public AccountModule(DatabaseContext context)
            : base("api/account")
        {
            _context = context;

            Post["/login"] = Login;

            Get["/emailUnique/{email}",true] = EmailUnique;
        }

        private async Task<dynamic> EmailUnique(dynamic data, CancellationToken cancellationToken)
        {
            string email = data["email"].ToString();

            var unique = await _context.Users.AllAsync(el => el.Email != email);

            if (unique)
                return null;

            throw new ArgumentException("Email istnieje w bazie");
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