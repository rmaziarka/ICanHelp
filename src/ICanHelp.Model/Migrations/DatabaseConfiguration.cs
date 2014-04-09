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
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(ICanHelp.Model.DatabaseContext context)
        {

            var users = new List<User>()
            {
                new User() {Email = "maziarka.radoslaw@outlook.com"},
                new User() {Email = "baran.dominika@hotmail.com"},
            };

            users.ForEach(el => context.Users.AddOrUpdate(p => p.Email,el));


        }
    }
}
