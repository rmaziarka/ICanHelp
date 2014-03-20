using Nancy;

namespace ICanHelp.Modules
{
    public class AccountModule:NancyModule
    {
        public AccountModule() : base("api/account")
        {
            Get["zaloguj"] = _ => View["Login"];
        }
    }
}