using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using ICanHelp.Dto;
using ICanHelp.Model;
using ICanHelp.Model.Migrations;
using Nancy;
using Nancy.Bootstrapper;
using Nancy.Bootstrappers.Ninject;
using Nancy.Conventions;
using Nancy.Responses;
using Nancy.SimpleAuthentication;
using Nancy.TinyIoc;
using Ninject;

namespace ICanHelp
{
    public class ApplicationBootstrapper : NinjectNancyBootstrapper
    {
        protected override void ConfigureConventions(Nancy.Conventions.NancyConventions nancyConventions)
        {
            nancyConventions.StaticContentsConventions.Add(StaticContentConventionBuilder.AddDirectory("Scripts", @"Scripts"));

            nancyConventions.StaticContentsConventions.Add(StaticContentConventionBuilder.AddDirectory("App", @"App"));
            base.ConfigureConventions(nancyConventions);
        }

        protected override void ApplicationStartup(IKernel kernel, IPipelines pipelines)
        {
            pipelines.OnError += (ctx, ex) => ArgumentExceptionReact(ex);

            base.ApplicationStartup(kernel, pipelines);
        }

        protected override void ConfigureApplicationContainer(IKernel container)
        {
            Database.SetInitializer(
                new MigrateDatabaseToLatestVersion<DatabaseContext, DatabaseConfiguration>());

            container.Bind<IAuthenticationCallbackProvider>().To<AuthenticationCallbackProvider>();
        }

        protected override void ConfigureRequestContainer(IKernel container, NancyContext context)
        {
            //container here is a child container. I.e. singletons here are in request scope.
            //IDisposables will get disposed at the end of the request when the child container does.
            container
                .Bind<DatabaseContext>()
                .To<DatabaseContext>()
                .InSingletonScope()
                .WithConstructorArgument("connectionStringName", "ICanHelp");
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