using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ICanHelp.Model.Model
{
    public class UserSecret:BaseModel
    {
        public string Hash { get; set; }

        public User User { get; set; }
    }
}
