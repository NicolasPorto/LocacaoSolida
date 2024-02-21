﻿using Solid.Domain.Entities;
using Solid.Domain.Interfaces.Repositories.Base;
using Solid.Infra.Enums;

namespace Solid.Domain.Interfaces.Repositories
{
    public interface IParteEnvolvidaRepository : IBaseRepository<ParteEnvolvida, int>
    {
        void Inserir(ParteEnvolvida parteEnvolvida);
        List<ParteEnvolvida> BuscarPartesEnvolvidasPorTipoParte(TipoParte? tipo, Guid codigoCorretor);
    }
}
