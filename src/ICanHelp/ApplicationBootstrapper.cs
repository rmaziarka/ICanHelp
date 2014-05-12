using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using ICanHelp.Dto;
using ICanHelp.Model;
using ICanHelp.Model.Migrations;
using Nancy;
using Nancy.Authentication.Forms;
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

        public ApplicationBootstrapper()
        {
            AppDomainAssemblyTypeScanner.AddAssembliesToScan("ICanHelp.Dto");
        }

        protected override void ConfigureConventions(Nancy.Conventions.NancyConventions nancyConventions)
        {
            nancyConventions.StaticContentsConventions.Add(StaticContentConventionBuilder.AddDirectory("Scripts", @"Scripts"));

            nancyConventions.StaticContentsConventions.Add(StaticContentConventionBuilder.AddDirectory("App", @"App"));
            base.ConfigureConventions(nancyConventions);
        }


        protected override void ApplicationStartup(IKernel kernel, IPipelines pipelines)
        {

            var formsAuthConfiguration = new FormsAuthenticationConfiguration()
            {
                RedirectUrl = "~/login",
                UserMapper = kernel.Get<IUserMapper>(),
                DisableRedirect = true
            };
            FormsAuthentication.Enable(pipelines, formsAuthConfiguration);
            pipelines.OnError += (ctx, ex) => ArgumentExceptionReact(ex);
            pipelines.OnError += (ctx, ex) => ExceptionReact(ex);
            base.ApplicationStartup(kernel, pipelines);
        }

        protected override void ConfigureApplicationContainer(IKernel container)
        {
            Database.SetInitializer(
                new MigrateDatabaseToLatestVersion<DatabaseContext, DatabaseConfiguration>());

            container.Bind<IAuthenticationCallbackProvider>().To<AuthenticationCallbackProvider>();
            container.Bind<IUserMapper>().To<UserMapper>();

        }

        protected override void ConfigureRequestContainer(IKernel container, NancyContext context)
        {
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
        private Response ExceptionReact(Exception ex)
        {
            return new JsonResponse(new ErrorReponseDto { Message = "Wystąpił niespodziewany błąd. Spróbuj odświeżyć stronę i spróbować ponownie." }, new DefaultJsonSerializer())
            {
                StatusCode = HttpStatusCode.InternalServerError
            };
        }
    }
}