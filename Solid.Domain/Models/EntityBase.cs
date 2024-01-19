using System.ComponentModel.DataAnnotations;

namespace Solid.Domain.Models
{
    public abstract class EntityBase
    {
        [Key]
        public int? Id { get; set; }
    }
}
