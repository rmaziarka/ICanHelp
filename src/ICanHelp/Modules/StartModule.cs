using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Nancy;
using Simple.Data;

namespace ICanHelp.Modules
{
    public class StartModule:NancyModule
    {
        public StartModule()
        {
            Get["/"] = _ => View["Index"];
        }
    }
}