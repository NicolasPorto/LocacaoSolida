using Microsoft.EntityFrameworkCore;

namespace Solid.Domain.Interfaces.Data
{
    public interface IDbProvider
    {
        DbContext GetDbContext();
    }
}
