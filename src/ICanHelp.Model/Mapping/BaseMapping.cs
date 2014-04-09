using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ICanHelp.Model.Model;

namespace ICanHelp.Model.Mapping
{
    public abstract class BaseMapping<TEntity> : EntityTypeConfiguration<TEntity>
    where TEntity : BaseModel
    {
        protected BaseMapping()
        {
            var tableName = typeof(TEntity).Name;
            ToTable(tableName);
            HasKey(e => e.Id);
        }
    }
}
