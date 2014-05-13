namespace ICanHelp.Model.Migrations._2014._05
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddGuidToUser : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.User", "Guid", c => c.Guid(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.User", "Guid");
        }
    }
}
