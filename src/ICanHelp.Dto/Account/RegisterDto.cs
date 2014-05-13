using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using FluentValidation.Attributes;

namespace ICanHelp.Dto.Account
{
    [Validator(typeof(RegisterDtoValidator))]
    public class RegisterDto
    {
        public string Email { get; set; }

        public string Password { get; set; }
    }

    public class RegisterDtoValidator : AbstractValidator<RegisterDto>
    {
        public RegisterDtoValidator()
        {
            RuleFor(cr => cr.Email).EmailAddress().NotEmpty();
            RuleFor(cr => cr.Password).NotEmpty().Length(6, int.MaxValue);
        }
    }
}
