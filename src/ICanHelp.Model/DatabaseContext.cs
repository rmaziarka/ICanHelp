using System;
using System.Collections.Generic;
using System.Data.Entity;
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


        public IDbSet<User> Users { get; set; } 
        public IDbSet<UserSecret> UserSecrets { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new UserMapping());
            modelBuilder.Configurations.Add(new UserSecretMapping());
        }
    }
}
