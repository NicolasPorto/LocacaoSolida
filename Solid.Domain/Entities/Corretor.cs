using Microsoft.AspNetCore.Http;
using Solid.Domain.Messaging.Corretor;
using Solid.Domain.Models;
using Solid.Infra.Enums;
using Solid.Infra.Extensions;
using System.ComponentModel.DataAnnotations.Schema;

namespace Solid.Domain.Entities
{
    [Table("Corretor", Schema = "cad")]
    public class Corretor : EntityBase
    {
        public Guid Codigo { get; set; }
        public required string Email { get; set; }
        public required string Senha { get; set; }
        public required string DocumentoFederal { get; set; }
        public required string Nome { get; set; }
        public TipoPessoa TipoPessoa { get; set; }
        public Situacao Situacao { get; set; }
        public required string NumeroCelular { get; set; }
        public required string Empresa { get; set; }
        public TipoCorretor TipoCorretor { get; set; }
        public DateTime DtInclusao { get; set; }
        public byte[]? FotoPerfil {  get; set; }

        public static Corretor ConverterParaEntidade(CorretorRequest request)
        {
            return new Corretor()
            {
                Codigo = Guid.NewGuid(),
                Email = request.Email,
                Senha = "12345678",
                DocumentoFederal = request.DocumentoFederal.SomenteNumeros(),
                Nome = request.Nome,
                TipoPessoa = request.TipoPessoa,
                Situacao = request.Situacao,
                NumeroCelular = request.NumeroCelular.SomenteNumeros(),
                Empresa = request.Empresa,
                TipoCorretor = request.TipoCorretor,
                DtInclusao = DateTime.Now
            };
        }
    }
}