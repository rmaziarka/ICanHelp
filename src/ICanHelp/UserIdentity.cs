using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using ICanHelp.Model;
using Nancy;
using Nancy.Authentication.Forms;
using Nancy.Security;

namespace ICanHelp
{
    public class UserIdentity : IUserIdentity
    {
        public string UserName { get;  set; }
        public IEnumerable<string> Claims { get; set; }
    }
}