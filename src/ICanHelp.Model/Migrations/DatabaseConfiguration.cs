using System.Collections.Generic;
using ICanHelp.Model.Model;

namespace ICanHelp.Model.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    public sealed class DatabaseConfiguration : DbMigrationsConfiguration<ICanHelp.Model.DatabaseContext>
    {
        public DatabaseConfiguration()
        {
            this.MigrationsNamespace = "ICanHelp.Model.Migrations._" + DateTime.Now.Year +"._"+ DateTime.Now.Month.ToString("00");
            this.MigrationsDirectory = "Migrations\\" + DateTime.Now.Year + "\\" + DateTime.Now.Month.ToString("00");
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(DatabaseContext context)
        {

            var users = new List<User>()
            {
                new User() {Email = "maziarka.radoslaw@outlook.com"},
                new User() {Email = "baran.dominika@hotmail.com"},
            };

            users.ForEach(el => context.Set<User>().AddOrUpdate(p => p.Email,el));


        }
    }
}
