using System;
using System.Collections.Generic;
using System.Linq;
using Nancy;

namespace ICanHelp
{
    public abstract class BaseModule:NancyModule
    {
        protected BaseModule(string path):base(path)
        {
            
        }


        public void CheckValidation()
        {
            if (ModelValidationResult.IsValid)
                return;

            throw new ArgumentException(ModelValidationResult.Errors.First().Value.First().ErrorMessage);
        }
    }
}