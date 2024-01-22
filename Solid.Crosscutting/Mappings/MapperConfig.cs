using AutoMapper;
using Solid.Domain.Entities;
using Solid.Domain.Messaging.Corretor;

namespace Solid.Crosscutting.Mappings
{
    public class MapperConfig : Profile
    {
        public MapperConfig() { MapperConfigure(); }

        private void MapperConfigure() 
        {
            CreateMap<Corretor, CorretorResponse>();
            CreateMap<Corretor, CorretorRequest>();
        }
    }
}
