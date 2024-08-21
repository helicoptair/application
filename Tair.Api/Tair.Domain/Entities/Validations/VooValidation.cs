using FluentValidation;

namespace Tair.Domain.Entities.Validations
{
    public class VoosValidation : AbstractValidator<Voos>
    {
        public VoosValidation()
        {
            RuleFor(c => c.CategoriaDeVoo)
                .NotNull().WithMessage("O campo {PropertyName} precisa ser fornecido");

            RuleFor(c => c.PrecoCartaoTotal)
                .NotNull().WithMessage("O campo {PropertyName} precisa ser fornecido")
                .GreaterThanOrEqualTo(0).WithMessage("Valor do voo não pode ser menor que zero");

            RuleFor(c => c.PrecoCartaoPessoa)
                .NotNull().WithMessage("O campo {PropertyName} precisa ser fornecido")
                .GreaterThanOrEqualTo(0).WithMessage("Valor do voo não pode ser menor que zero");

            RuleFor(c => c.PrecoPixTotal)
                .NotNull().WithMessage("O campo {PropertyName} precisa ser fornecido")
                .GreaterThanOrEqualTo(0).WithMessage("Valor do voo não pode ser menor que zero");

            RuleFor(c => c.PrecoPixPessoa)
                .NotNull().WithMessage("O campo {PropertyName} precisa ser fornecido")
                .GreaterThanOrEqualTo(0).WithMessage("Valor do voo não pode ser menor que zero");

            RuleFor(c => c.QuantidadePax)
                .NotNull().WithMessage("O campo {PropertyName} precisa ser fornecido")
                .GreaterThanOrEqualTo(1).WithMessage("Mínimo de 1 passageiro no voo");

            RuleFor(c => c.TempoDeVooMinutos)
                .NotNull().WithMessage("O campo {PropertyName} precisa ser fornecido")
                .GreaterThanOrEqualTo(0).WithMessage("Valor do voo não pode ser menor que zero");

            RuleFor(c => c.TipoDeVoo)
                .NotNull().WithMessage("O campo {PropertyName} precisa ser fornecido");

            RuleFor(c => c.ImagemPequena)
                .NotEmpty().WithMessage("O campo {PropertyName} precisa ser fornecido");

            RuleFor(c => c.ImagemMedia)
                .NotEmpty().WithMessage("O campo {PropertyName} precisa ser fornecido");

            RuleFor(c => c.ImagemGrande)
                .NotEmpty().WithMessage("O campo {PropertyName} precisa ser fornecido");

            RuleFor(c => c.Titulo)
                .NotEmpty().WithMessage("O campo {PropertyName} precisa ser fornecido");

            RuleFor(c => c.Status)
                .NotEmpty().WithMessage("O campo {PropertyName} precisa ser fornecido");
        }
    }
}
