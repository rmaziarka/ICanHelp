using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ICanHelp.Dto;
using Nancy;
using Nancy.Bootstrapper;
using Nancy.Conventions;
using Nancy.Responses;
using Nancy.TinyIoc;

namespace ICanHelp
{
    public class ApplicationBootstrapper : DefaultNancyBootstrapper
    {
        protected override void ConfigureConventions(Nancy.Conventions.NancyConventions nancyConventions)
        {
            nancyConventions.StaticContentsConventions.Add(StaticContentConventionBuilder.AddDirectory("Scripts", @"Scripts"));

            nancyConventions.StaticContentsConventions.Add(StaticContentConventionBuilder.AddDirectory("App", @"App"));
            base.ConfigureConventions(nancyConventions);
        }

        protected override void ApplicationStartup(TinyIoCContainer container, IPipelines pipelines)
        {
            pipelines.OnError += (ctx, ex) => ArgumentExceptionReact(ex);


            base.ApplicationStartup(container, pipelines);
        }


        private Response ArgumentExceptionReact(Exception ex)
        {
            if (ex is ArgumentException)
            {
                return new JsonResponse(new ErrorReponseDto { Message = ex.Message }, new DefaultJsonSerializer())
                {
                    StatusCode = HttpStatusCode.BadRequest
                };
            }
            return null;

        }
    }
}