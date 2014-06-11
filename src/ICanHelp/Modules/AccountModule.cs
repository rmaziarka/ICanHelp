using System;
using System.Data.Entity;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ICanHelp.Dto.Account;
using ICanHelp.Model;
using ICanHelp.Model.Model;
using Nancy;
using Nancy.Authentication.Forms;
using Nancy.ModelBinding;
using Nancy.Responses.Negotiation;
using Nancy.Security;
using Nancy.Validation;

namespace ICanHelp.Modules
{
    public class AccountModule : BaseModule
    {
        private readonly DatabaseContext _context;

        public AccountModule(DatabaseContext context)
            : base("api/account")
        {
            _context = context;

            Post["/register", true] = Register;

            Post["/login",true] = Login;

            Get["/emailUnique/{email}",true] = EmailUnique;
        }
        
        public async Task<dynamic> EmailUnique(dynamic data, CancellationToken cancellationToken)
        {
            string email = data["email"].ToString();

            var unique = await _context.Set<User>().AllAsync(el => el.Email != email, cancellationToken);

            if (unique)
                return null;

            throw new ArgumentException("Email istnieje w bazie");
        }

        public async Task<dynamic> Register(dynamic data, CancellationToken cancellationToken)
        {
            var register = this.BindAndValidate<RegisterDto>();
            this.CheckValidation();
            var hash = BCrypt.Net.BCrypt.HashPassword(register.Password, 12);
            var user = new User
            {
                Email = register.Email,
                Guid = Guid.NewGuid(),
                UserSecret = new UserSecret()
                {
                    Hash = hash
                }
            };

            _context.Set<User>().Add(user);
            await _context.SaveChangesAsync(cancellationToken);
            return null;
        } 

        public async Task<dynamic> Login(dynamic data, CancellationToken cancellationToken)
        {
            var login = this.Bind<LoginDto>();

            var userSecret = await _context
                .Set<UserSecret>()
                .FirstOrDefaultAsync(el => el.User.Email == login.Email, cancellationToken);

            if (userSecret == null)
                throw new ArgumentException("Podano z造 email lub has這. Spr鏏uj ponownie.");

            var verified = BCrypt.Net.BCrypt.Verify(login.Password, userSecret.Hash);

            if (!verified)
                throw new ArgumentException("Podano z造 email lub has這. Spr鏏uj ponownie.");

            var authResponse = this.LoginWithoutRedirect(userSecret.User.Guid);

            var authToken = authResponse.Cookies[0].Value;

            var responseModel = new LoginResponseDto() {AuthToken = authToken};
            var response = Response.AsJson(responseModel);


            return response;
        }
    }
}