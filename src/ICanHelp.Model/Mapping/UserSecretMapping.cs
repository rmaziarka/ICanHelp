using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ICanHelp.Model.Model;

namespace ICanHelp.Model.Mapping
{
    public class UserSecretMapping : BaseMapping<UserSecret>
    {
        public UserSecretMapping()
        {
            Property(m => m.Hash).IsRequired();

            HasRequired(el => el.User)
                .WithOptional(el => el.UserSecret)
                .WillCascadeOnDelete(true);
        }
    }
}
