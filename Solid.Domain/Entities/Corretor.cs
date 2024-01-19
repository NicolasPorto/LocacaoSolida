﻿using Solid.Domain.Models;
using Solid.Infra.Enums;

namespace Solid.Domain.Entities
{
    public class Corretor : EntityBase
    {
        public Guid Codigo { get; set; }
        public required string Email { get; set; }
        public required string Senha { get; set; }
        public required string DocumentoFederal { get; set; }
        public required string Nome {  get; set; }
        public TipoPessoa TipoPessoa { get; set; }
        public Situacao Situacao { get; set; }
        public required string NumeroCelular { get; set; }
        public required string Empresa { get; set; }
        public TipoCorretor TipoCorretor { get; set; }
        public DateTime DtInclusao { get; set; }
    }
}