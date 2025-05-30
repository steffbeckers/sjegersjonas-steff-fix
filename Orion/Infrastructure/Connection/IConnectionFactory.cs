using Microsoft.Data.Sqlite;
using System.Threading.Tasks;

namespace Orion.Infrastructure.Connection
{
    public interface IConnectionFactory
    {
        Task<SqliteConnection> Create();
    }
}
