﻿using Solid.Domain.Messaging.ParteEnvolvida;
using Solid.Domain.Models;
using Solid.Infra.Enums;
using Solid.Infra.Extensions;
using System.ComponentModel.DataAnnotations.Schema;

namespace Solid.Domain.Entities
{
    [Table("ParteEnvolvida", Schema = "cad")]
    public class ParteEnvolvida : EntityBase
    {
        public Guid CodigoCorretor { get; set; }
        public TipoParte TipoParte { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string CPF { get; set; }
        public string? CEP { get; set; }
        public string? Logradouro { get; set; }
        public int? NumeroLogradouro { get; set; }
        public string? Cidade { get; set; }
        public string? Bairro { get; set; }
        public string Nacionalidade { get; set; }
        public string? Profissao { get; set; }
        public string? Empresa { get; set; }
        public string? NumeroCelular { get; set; }
        public string? TelefoneComercial { get; set; }
        public decimal? ValorRenda { get; set; }
        public EstadoCivil EstadoCivil { get; set; }
        public bool PossuiConjuge { get; set; } = false;
        public string? Conjuge { get; set; }
        public string? CPFConjuge { get; set; }
        public DateTime DtInclusao { get; set; }

        public ParteEnvolvida() { }

        public ParteEnvolvida(RegistrarParteEnvolvidaRequest request, Guid codigoCorretor) 
        {
            Codigo = Guid.NewGuid();
            DtInclusao = DateTime.Now;
            CodigoCorretor = codigoCorretor;
            Nome = request.Nome;
            Email = request.Email;
            CPF = request.CPF.SomenteNumeros();
            TipoParte = request.TipoParte;
            EstadoCivil = request.EstadoCivil;
            Profissao = request.Profissao;
            Nacionalidade = request.Nacionalidade;
            CEP = request.CEP?.SomenteNumeros();
            Logradouro = request.Logradouro;
            NumeroLogradouro = request.NumeroLogradouro;
            Bairro = request.Bairro;
            Cidade = request.Cidade;
            Empresa = request.Empresa;
            NumeroCelular = request.NumeroCelular?.SomenteNumeros();
            TelefoneComercial = request.TelefoneComercial?.SomenteNumeros();
            ValorRenda = request.ValorRenda;
            PossuiConjuge = request.PossuiConjuge;
            Conjuge = request.Conjuge;
            CPFConjuge = request.CPFConjuge?.SomenteNumeros();
        }
    }
}
