
using Nancy;

namespace ICanHelp.Modules
{
    public class StartModule:NancyModule
    {
        public StartModule()
        {
            Get["/"] = _ => View["Layout"];
        }

    }
}