using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using ICanHelp.Model;
using ICanHelp.Model.Model;
using Nancy;
using Nancy.Authentication.Forms;
using Nancy.Security;

namespace ICanHelp
{
    public class UserMapper : IUserMapper
    {
        private DatabaseContext _context;

        public UserMapper(DatabaseContext context)
        {
            _context = context;
        }

        public IUserIdentity GetUserFromIdentifier(Guid identifier, NancyContext context)
        {
            var user = _context.Set<User>().FirstOrDefault(el => el.Guid == identifier);
            return user == null 
                ? null 
                : new UserIdentity(){UserName = user.Email};
        }
    }
}