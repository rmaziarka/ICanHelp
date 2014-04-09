using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ICanHelp.Model.Model;

namespace ICanHelp.Model.Mapping
{
    public class UserMapping : BaseMapping<User>
    {
        public UserMapping()
        {
            Property(m => m.Email).IsRequired().HasMaxLength(250);
        }
    }
}
