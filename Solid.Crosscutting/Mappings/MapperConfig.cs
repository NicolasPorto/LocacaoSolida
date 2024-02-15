using AutoMapper;
using Solid.Domain.Entities;
using Solid.Domain.Messaging.Corretor;
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
        }
    }
}
