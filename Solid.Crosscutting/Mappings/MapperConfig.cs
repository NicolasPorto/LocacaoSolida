using AutoMapper;
using Solid.Domain.Entities;
using Solid.Domain.Messaging.Corretor;
using Solid.Domain.Messaging.Imovel;
using Solid.Domain.Messaging.ParteEnvolvida;
using Solid.Infra.Extensions;

namespace Solid.Crosscutting.Mappings
{
    public class MapperConfig : Profile
    {
        public MapperConfig() { MapperConfigure(); }

        private void MapperConfigure()
        {
            CreateMap<Corretor, CorretorResponse>();
            CreateMap<Corretor, CorretorRequest>();
            CreateMap<CorretorRequest, Corretor>()
                .ForMember(dest => dest.NumeroCelular, opt => opt.Condition(src => !string.IsNullOrEmpty(src.NumeroCelular)))
                .ForMember(dest => dest.NumeroCelular, opt => opt.MapFrom(src => src.NumeroCelular.SomenteNumeros()));


			CreateMap<AtualizarImovelRequest, Imovel>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));


            CreateMap<ParteEnvolvida, ParteEnvolvidaResponse>();
            CreateMap<AtualizarParteEnvolvidaRequest, ParteEnvolvida>()
                .ForMember(dest => dest.NumeroCelular, opt => opt.MapFrom(src => src.NumeroCelular.SomenteNumeros()))
                .ForMember(dest => dest.CPF, opt => opt.MapFrom(src => src.CPF.SomenteNumeros()))
                .ForMember(dest => dest.CPFConjuge, opt => opt.MapFrom(src => src.CPFConjuge.SomenteNumeros()))
                .ForMember(dest => dest.TelefoneComercial, opt => opt.MapFrom(src => src.TelefoneComercial.SomenteNumeros()))
                .ForMember(dest => dest.CEP, opt => opt.MapFrom(src => src.CEP.SomenteNumeros()));
        }
    }
}
