using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration;
using System.Data.Entity.ModelConfiguration.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ICanHelp.Model.Mapping;
using ICanHelp.Model.Model;

namespace ICanHelp.Model
{
    public class DatabaseContext:DbContext
    {
        public DatabaseContext(string connectionStringName) :base(connectionStringName)
        {
            
        }
        public DatabaseContext()
            : base("ICanHelp")
        {

        }

        public new IDbSet<T> Set<T>() where T : class
        {
            return base.Set<T>();
        } 

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            var addMethod = typeof(ConfigurationRegistrar)
                .GetMethods()
                .Single(m =>
                m.Name == "Add"
                && m.GetGenericArguments().Any(a => a.Name == "TEntityType"));

            foreach (var assembly in AppDomain.CurrentDomain
              .GetAssemblies()
              .Where(a => a.GetName().Name != "EntityFramework"))
            {
                var configTypes = assembly
                  .GetTypes()
                  .Where(t => t.BaseType != null
                    && t.BaseType.IsGenericType
                    && t.BaseType.GetGenericTypeDefinition() == typeof(BaseMapping<>));

                foreach (var type in configTypes)
                {
                    var entityType = type.BaseType.GetGenericArguments().Single();

                    var entityConfig = assembly.CreateInstance(type.FullName);
                    addMethod.MakeGenericMethod(entityType)
                      .Invoke(modelBuilder.Configurations, new object[] { entityConfig });
                }
            }
        }
    }
}
