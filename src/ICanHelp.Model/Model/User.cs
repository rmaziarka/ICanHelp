using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ICanHelp.Model.Model
{
    public class User:BaseModel
    {
        public string Email { get; set; }

        public UserSecret UserSecret { get; set; }
        public Guid Guid { get; set; }
    }
}
