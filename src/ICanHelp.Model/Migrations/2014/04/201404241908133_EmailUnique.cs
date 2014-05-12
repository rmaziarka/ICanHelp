namespace ICanHelp.Model.Migrations._2014._04
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class EmailUnique : DbMigration
    {
        public override void Up()
        {
            this.CreateIndex("User","Email",true,"User_Email_Unique");
        }
        
        public override void Down()
        {
            this.DropIndex("User", "User_Email_Unique");
        }
    }
}
