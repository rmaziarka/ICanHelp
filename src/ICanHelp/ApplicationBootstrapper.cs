using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Nancy;
using Nancy.Conventions;

namespace ICanHelp
{
    public class ApplicationBootstrapper:DefaultNancyBootstrapper
    {
        protected override void ConfigureConventions(Nancy.Conventions.NancyConventions nancyConventions)
        {
            nancyConventions.StaticContentsConventions.Add(StaticContentConventionBuilder.AddDirectory("Scripts", @"Scripts"));

            nancyConventions.StaticContentsConventions.Add(StaticContentConventionBuilder.AddDirectory("Html", @"Html"));
            base.ConfigureConventions(nancyConventions);
        }
    }
}